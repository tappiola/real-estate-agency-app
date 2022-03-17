import mapboxgl, { LngLatLike } from 'mapbox-gl';
import './DynamicMap.style.scss';
import { Feature, Point } from 'geojson';
import React, { useCallback, useEffect, useState } from 'react';
import { accessToken, IMAGE_PLACEHOLDER } from '../../constants';
import { formatPrice, getHouseTitle } from '../../util';
import { Image, Property } from '../../types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setActiveProperty } from '../../redux/search';

const DynamicMapContainer : React.FC = () => {
    const [map, setMap] = useState<mapboxgl.Map>();
    const dispatch = useAppDispatch();
    const { activeProperty, properties } = useAppSelector(({ search }) => search);

    const getCoordinates = (item: Property) => ([item.longitude, item.latitude] as LngLatLike);

    const getDescription = (heading: string, price: number, images: Image[]) => {
        const imgSrc = images[0]?.link || IMAGE_PLACEHOLDER;
        const priceStr = formatPrice(price);
        return `<img width="100%" src="${imgSrc}" alt="img"/><b>${heading}</b><p class="Map-Price">${priceStr}</p>`;
    };

    const generateFeature = useCallback((property: Property, index: number) => {
        const {
            bedroomCount,
            images,
            longitude,
            latitude,
            propertyType: { name },
            price
        } = property;

        const heading = getHouseTitle(bedroomCount, name);

        return {
            type: 'Feature',
            properties: {
                description: getDescription(heading, price, images),
                id: index
            },
            geometry: {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        } as Feature<Point>;
    }, []);

    useEffect(() => {
        mapboxgl.accessToken = accessToken;

        // Create the map
        const mapRef = new mapboxgl.Map({
            container: 'dynamic-map',
            style: 'mapbox://styles/mapbox/outdoors-v11?optimize=true',
            center: getCoordinates(properties[0]),
            zoom: 13
        });

        mapRef.on('load', () => {
            // Add markers to map
            mapRef.addLayer({
                id: 'places',
                type: 'symbol',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: properties.map(generateFeature)
                    }
                },
                layout: {
                    'icon-image': 'bakery-11',
                    'icon-size': 1.5,
                    'icon-allow-overlap': true
                }
            });

            // When clicking on a map marker
            mapRef.on('click', 'places', ({ features }) => {
                if (!features) {
                    return;
                }

                const match = features[0] as Feature<Point>;
                const coordinates = match.geometry.coordinates.slice();

                // Show popup
                new mapboxgl.Popup()
                    .setLngLat(coordinates as LngLatLike)
                    .setHTML(match.properties?.description)
                    .addTo(mapRef);

                // Set new active list item
                dispatch(setActiveProperty(match.properties?.id));
            });

            // Change the cursor to a pointer when the mouse is over the places layer.
            mapRef.on('mouseenter', 'places', () => {
                mapRef.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            mapRef.on('mouseleave', 'places', () => {
                mapRef.getCanvas().style.cursor = '';
            });
        });

        setMap(mapRef);
    }, []);

    // Update map center when active list item is updated via list
    useEffect(() => {
        if (map) {
            map.flyTo({
                center: getCoordinates(properties[activeProperty])
            });
        }
    }, [activeProperty, map, properties]);

    useEffect(() => {
        if (!map || !map.getSource('places')) {
            return;
        }
        const data = [...properties];

        // @ts-ignore
        map.getSource('places').setData({
            type: 'FeatureCollection',
            features: data.map(generateFeature)
        });
    }, [generateFeature, map, properties]);

    return <div id="dynamic-map" />;
};

export default React.memo(DynamicMapContainer);
