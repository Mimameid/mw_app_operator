import { createAction } from '@reduxjs/toolkit';

export const setDraw = createAction('mode/setDraw');
export const setEdited = createAction('mode/setEdited');
export const setChanged = createAction('mode/setChanged');
export const reset = createAction('mode/reset');
