import { STATUS_REQUEST, STATUS_ERROR, STATUS_SUCCESS } from './types';

export function setStatusRequest(statusMessage) {
  return {
    type: STATUS_REQUEST,
    payload: statusMessage,
  };
}
export function setStatusError(statusMessage) {
  return {
    type: STATUS_ERROR,
    payload: statusMessage,
  };
}
export function setStatusSuccess(statusMessage) {
  return {
    type: STATUS_SUCCESS,
    payload: statusMessage,
  };
}
