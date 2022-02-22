import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import { accessToken } from './consts';
import './Map.style.scss';
import {useEffect, useState} from "react";

const Map = ({properties, activeItem, setActiveItem}) => {

  const [map, setMap] = useState();

  const generateFeature = ({ name, image, coordinates }, index) => {
    return {
      type: 'Feature',
      properties: {
        description: `<img width="100%" src="${image}" alt="img"/><b>${name}</b>`,
        id: index
      },
      geometry: {
        type: 'Point',
        coordinates
      }
    };
  }

  useEffect(async () => {
    mapboxgl.accessToken = accessToken;

    // Create the map
    const mapRef = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11?optimize=true',
      center: properties[0].coordinates,
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
          'icon-image': 'cafe-15',
          'icon-size': 1.5,
          'icon-allow-overlap': true
        }
      });

      // When clicking on a map marker
      mapRef.on('click', 'places', function({ features }) {
        const match = features[0];
        const coordinates = match.geometry.coordinates.slice();

        // Show popup
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(match.properties.description)
            .addTo(mapRef);

        // Set new active list item
        setActiveItem(match.properties.id);
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
    console.log(map, properties[activeItem].coordinates);
    if (map) {
      map.flyTo({
        center: properties[activeItem].coordinates
      });
    }
  }, [activeItem]);

  return <div id="map"/>;
}

export default Map;
