import { customAlphabet } from 'nanoid';
import L from 'leaflet';
import markerSVG from 'assets/marker_icon.svg';
export const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 12);

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

export const SERVICE_TYPES = ['Lieferung', 'Abholung', 'Lokal'];

export const markerIcon = L.icon({
  iconUrl: markerSVG,

  iconSize: [18, 18], // size of the icon
});

export const STATUS_CODE = {
  NONE: 0,
  REQUEST: 1,
  SUCCESS: 2,
  INFO: 3,
  WARNING: 4,
  ERROR: 5,
};
