import { customAlphabet } from 'nanoid';
import L from 'leaflet';
import markerSVG from 'assets/marker_icon.svg';

// import shopSVG from 'assets/favicon.ico';
import shopSVG from 'assets/shopIcon.svg';
export const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 12);

export const weekdays = {
  monday: 'Montag',
  tuesday: 'Dienstag',
  wednesday: 'Mittwoch',
  thursday: 'Donnerstag',
  friday: 'Freitag',
  saturday: 'Samstag',
  sunday: 'Sonntag',
};

export const dayAfterMap = {
  monday: 'tuesday',
  tuesday: 'wednesday',
  wednesday: 'thursday',
  thursday: 'friday',
  friday: 'saturday',
  saturday: 'sunday',
  sunday: 'monday',
};

export const discountTypes = {
  offer: 'offer',
  category: 'category',
  dish: 'dish',
};

export const getDiscountTypeName = (type) => {
  switch (type) {
    case discountTypes.offer:
      return 'Speisekarten';
    case discountTypes.category:
      return 'Kategorien';
    case discountTypes.dish:
      return 'Speisen';
    default:
      return '';
  }
};

export const CUISINE_TYPES = [
  'Fleischgerichte',
  'Fischgerichte',
  'Burger',
  'Pizza',
  'Asiatisch',
  'Sushi',
  'Mexikanisch',
  'Indisch',
  'Suppe',
  'Backwaren',
  'Wraps',
  'Salate',
  'Döner',
  'Vorspeisen',
  'Nudelgerichte',
  'Finger Food',
  'Süßspeisen',
  'Kartoffelgerichte',
  'Humus',
  'Falafel',
  'BBQ',
];

export const CUISINE_LABELS = ['Vegetarisch', 'Vegan', 'Halal', 'Glutenfrei'];

export const markerIcon = L.icon({
  iconUrl: markerSVG,

  iconSize: [18, 18],
});

export const shopIcon = L.icon({
  iconUrl: shopSVG,
  iconSize: [36, 36],
  iconAnchor: [16, 32],
  popupAnchor: [2.5, -15],
});

export const STATUS_CODE = {
  NONE: 0,
  REQUEST: 1,
  SUCCESS: 2,
  INFO: 3,
  WARNING: 4,
  ERROR: 5,
};

export const mapboxClient = window.mapboxSdk({
  accessToken: process.env.REACT_APP_MAPBOX_API_KEY,
});
