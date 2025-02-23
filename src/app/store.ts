import { configureStore } from '@reduxjs/toolkit';
import { gridReducer } from '../widgets/grid';

export const store = configureStore({
  reducer: {
    grid: gridReducer,
  },
});

if (process.env.NODE_ENV === 'development') {
  window.store = store; // store - это твой объект Redux
}
