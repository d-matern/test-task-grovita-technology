import { RootState } from '../../../shared/types/store';

export const selectCells = (state: RootState) => state.grid.cells;
export const selectSelectedCells = (state: RootState) => state.grid.selectedCells;
export const selectSelecting = (state: RootState) => state.grid.isSelecting;
export const selectSelectedColor = (state: RootState) => state.grid.selectedColor;
