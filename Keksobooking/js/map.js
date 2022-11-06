import {getCoordinates, switchFormState} from './form.js';
import {renderSimilarCard} from './offer.js';

const ZOOM_MAP = 10;
const INIT_MAP_COORDINATES = {
  lat: 35.681729,
  lng: 139.753927,
};
const MAIN_ICON_SIZE = [52, 52];
const MAIN_ICON_ANCHOR = [26, 52];
const MAIN_ADD_SIZE = [40, 40];
const MAIN_ADD_ANCHOR = [20, 40];
const LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION_LAYER = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const map = L.map('map-canvas');
const layerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: MAIN_ICON_SIZE,
  iconAnchor: MAIN_ICON_ANCHOR,
});

const mainPinMarker = L.marker(
  INIT_MAP_COORDINATES,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const addPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: MAIN_ADD_SIZE,
  iconAnchor: MAIN_ADD_ANCHOR,
});

const renderAddMarkers = (markers) => {
  markers.forEach((ad) => {
    const lat = ad.location.lat;
    const lng = ad.location.lng;
    const marker = L.marker({
      lat,
      lng,
    },
    {
      draggable: false,
      icon: addPinIcon,
    });

    marker.addTo(layerGroup).bindPopup(renderSimilarCard(ad));
  });
};

const createPinMarker = () => {
  getCoordinates(INIT_MAP_COORDINATES);

  mainPinMarker.on('move', (evt) => {
    getCoordinates(evt.target.getLatLng());
  });

  mainPinMarker.addTo(map);
};

const resetMap = () => {
  mainPinMarker.setLatLng(INIT_MAP_COORDINATES);
  map.setView(INIT_MAP_COORDINATES, ZOOM_MAP);
  getCoordinates(INIT_MAP_COORDINATES);
};

const resetMarkers = () => {
  layerGroup.clearLayers();
};

const initMap = (cb) => {
  map.on('load', () => {
    switchFormState(false);
    cb();
  })
    .setView(INIT_MAP_COORDINATES, ZOOM_MAP);

  L.tileLayer(
    LAYER,
    {
      attribution: ATTRIBUTION_LAYER,
    },
  ).addTo(map);

  createPinMarker();
};

export {initMap, resetMap, renderAddMarkers, resetMarkers};
