import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cell } from './cell.type';

interface GridState {
  cells: Cell[];
  selectedColor: string;
  selectedCells: string[];
  isSelecting: boolean;
}

const ROWS = 10;
const COLS = 15;
const CELL_SIZE = 40;

const initialState: GridState = {
  cells: Array.from({ length: ROWS * COLS }, (_, index) => ({
    id: index.toString(),
    x: (index % COLS) * CELL_SIZE,
    y: Math.floor(index / COLS) * CELL_SIZE,
    color: '#ffffff',
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
