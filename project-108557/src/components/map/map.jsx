import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {offerPropTypes} from '../../prop-types';

import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = (props) => {
  const {points = [], activeCardId = ``, activeCard = {}, activeCity} = props;

  const mapRef = useRef();

  const cityLocation = points[0].city.location;

  useEffect(() => {
    mapRef.current = leaflet.map(`map`, {
      center: {
        lat: cityLocation.latitude,
        lng: cityLocation.longitude
      },
      zoom: cityLocation.zoom,
      zoomControl: false,
      marker: true
    });

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(mapRef.current);

    return () => {
      mapRef.current.remove();
    };
  }, [activeCity]);

  useEffect(() => {
    const markers = [];

    points.forEach((point) => {
      const icon = leaflet.icon({
        iconUrl: String(point.id) === String(activeCardId) ? `img/pin-active.svg` : `img/pin.svg`,
        iconSize: [30, 30]
      });

      markers.push(
          leaflet.marker({
            lat: point.location.latitude,
            lng: point.location.longitude
          }, {
            icon
          })
          .addTo(mapRef.current)
          .bindPopup(point.title)
      );
    });

    return () => {
      markers.forEach((marker) => mapRef.current.removeLayer(marker));
    };
  }, [activeCardId, activeCard]);

  useEffect(() => {
    let marker;
    if (activeCard.id) {
      const icon = leaflet.icon({
        iconUrl: `img/pin-active.svg`,
        iconSize: [30, 30]
      });

      marker = leaflet.marker({
        lat: activeCard.location.latitude,
        lng: activeCard.location.longitude
      }, {
        icon
      })
      .addTo(mapRef.current)
      .bindPopup(activeCard.title);
    }
    return () => {
      if (marker) {
        mapRef.current.removeLayer(marker);
      }
    };
  }, [activeCardId, activeCard]);

  return (
    <div id="map" style={{height: `100%`}}></div>
  );
};

Map.propTypes = {
  activeCardId: PropTypes.string,
  points: PropTypes.arrayOf(offerPropTypes),
  activeCity: PropTypes.string,
  activeCard: PropTypes.object,
};

export default Map;
