import { configureStore } from '@reduxjs/toolkit';
import { gridReducer } from '../widgets/grid';

export const store = configureStore({
  reducer: {
    grid: gridReducer,
  },
});
