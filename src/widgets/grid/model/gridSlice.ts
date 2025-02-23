import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cell } from './types/cell.type';
import { CELL_COLOR_DEFAULT, CELL_SIZE, COLS, ROWS } from '../config/constants';

interface GridState {
  cells: Cell[];
  selectedColor: string;
  selectedCells: string[];
  isSelecting: boolean;
}

const initialState: GridState = {
  cells: Array.from({ length: ROWS * COLS }, (_, index) => ({
    id: index.toString(),
    x: (index % COLS) * CELL_SIZE,
    y: Math.floor(index / COLS) * CELL_SIZE,
    color: CELL_COLOR_DEFAULT,
    selected: false,
  })),
  selectedColor: '#ff0000',
  selectedCells: [],
  isSelecting: false,
};

const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    selectCell: (state, action: PayloadAction<string>) => {
      const cellIndex = state.selectedCells.findIndex(c => c === action.payload);

      if (cellIndex >= 0) {
        state.selectedCells = state.selectedCells.splice(cellIndex, 1);
        return;
      }

      state.selectedCells.push(action.payload);
    },
    clearSelection: (state) => {
      state.selectedCells = [];
    },
    setSelecting: (state, action: PayloadAction<boolean>) => {
      state.isSelecting = action.payload;
    },
    applyColor: (state) => {
      state.selectedCells.forEach((id) => {
        const cell = state.cells.find((c) => c.id === id);
        if (cell) cell.color = state.selectedColor;
      });
      state.selectedCells = [];
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.selectedColor = action.payload;
    },
  },
});

export const { selectCell, clearSelection, setSelecting, applyColor, setColor } = gridSlice.actions;
export default gridSlice.reducer;
