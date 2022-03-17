import mapboxgl, { LngLatLike } from 'mapbox-gl';
import './PlainMap.style.scss';
import { Feature, Point } from 'geojson';
import React, { useCallback, useEffect } from 'react';
import { accessToken } from '../../constants';
import { Property } from '../../types';

const PlainMapContainer : React.FC<{ property: Property }> = ({ property }) => {
    const getCoordinates = (item: Property) => ([item.longitude, item.latitude] as LngLatLike);

    const generateFeature = useCallback((propertyData: Property) => {
        const { longitude, latitude } = propertyData;

        return {
            type: 'Feature',
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
            container: 'map',
            style: 'mapbox://styles/mapbox/outdoors-v11?optimize=true',
            center: getCoordinates(property),
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
                        features: [generateFeature(property)]
                    }
                },
                layout: {
                    'icon-image': 'bakery-11',
                    'icon-size': 1.5
                }
            });
        });
    }, []);

    return <div id="map" />;
};

export default React.memo(PlainMapContainer);
