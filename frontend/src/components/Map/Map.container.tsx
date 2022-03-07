import mapboxgl, {LngLatLike} from 'mapbox-gl';
import {accessToken, IMAGE_PLACEHOLDER} from '../../constants';
import './Map.style.scss';
import {useEffect, useState} from "react";
import {formatPrice, getHouseTitle} from "../../util";
import {Property} from "../../types";
import {Feature, Point} from "geojson";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {setActiveProperty} from "../../redux/search";

const MapContainer : React.FC = () => {

  const [map, setMap] = useState<mapboxgl.Map>();
  const dispatch = useAppDispatch();
  const {activeProperty, properties} = useAppSelector(({ search }) => search);

  const getCoordinates = (item: Property) => ([item.longitude, item.latitude] as LngLatLike);

  const generateFeature = (property: Property, index: number) => {
    const { bedroomCount, images, longitude, latitude, propertyType: {name}, price} = property;
    const heading = getHouseTitle(bedroomCount, name);

    return {
      type: 'Feature',
      properties: {
        description: `<img width="100%" src="${images[0]?.link || IMAGE_PLACEHOLDER}" alt="img"/><b>${heading}</b><p class="Map-Price">${formatPrice(price)}</p>`,
        id: index
      },
      geometry: {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    } as Feature<Point>;
  }

  useEffect(() => {
    mapboxgl.accessToken = accessToken;

    // Create the map
    const mapRef = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11?optimize=true',
      center: getCoordinates(properties[0]),
      zoom: 13
    });

    mapRef.on('load', () => {
      console.log('load');
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
        if(!features){
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
        // setActiveItem(match.properties?.id);
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
  }, [activeProperty, properties]);

  useEffect(() => {
    if(!map || !map.getSource('places')) {
      return;
    }
    const data = [...properties];

    // @ts-ignore
    map.getSource('places').setData({
      type: 'FeatureCollection',
      features: data.map(generateFeature)
    })
  }, [properties]);

  return <div id="map"/>;
}

export default MapContainer;
