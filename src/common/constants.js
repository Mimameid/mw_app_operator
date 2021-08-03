import { customAlphabet } from 'nanoid';

export const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 12);

const STATUS_CODE = {
  NONE: 0,
  REQUEST: 1,
  SUCCESS: 2,
  INFO: 3,
  WARNING: 4,
  ERROR: 5,
};

export default STATUS_CODE;
