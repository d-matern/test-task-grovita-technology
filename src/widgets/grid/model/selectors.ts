import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../shared/types/store';
import { CELL_COLOR_DEFAULT } from '../config/constants';
import { CellsResult } from './types/cells-result.type';

export const selectCells = (state: RootState) => state.grid.cells;
export const selectSelectedCells = (state: RootState) => state.grid.selectedCells;
export const selectSelecting = (state: RootState) => state.grid.isSelecting;
export const selectSelectedColor = (state: RootState) => state.grid.selectedColor;
export const selectCellsResult = createSelector(
  (state: RootState) => state.grid.cells,
  (cells) => {
    const result: CellsResult = {};

    cells.forEach((cell) => {
      if (result[cell.color]) {
        result[cell.color] += 1;
      } else if (cell.color !== CELL_COLOR_DEFAULT) {
        result[cell.color] = 1;
      }
    });

    return result;
  },
);
