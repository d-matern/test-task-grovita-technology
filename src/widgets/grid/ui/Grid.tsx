import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/reduxHooks';
import { selectCell, setSelecting } from '../model/gridSlice';
import { RootState } from '../../../shared/types/store';
import { CELL_SIZE, COLS, ROWS } from '../config/constants';

export function Grid() {
  const dispatch = useAppDispatch();
  const { cells, selectedCells, isSelecting } = useAppSelector((state: RootState) => state.grid);

  const [startPos, setStartPos] = useState<{ x: number, y: number } | null>(null);

  const handleMouseDown = (x: number, y: number) => {
    setStartPos({ x, y });
    dispatch(setSelecting(true));
  };

  const handleMouseMove = (x: number, y: number) => {
    if (isSelecting && startPos) {
      const minX = Math.min(startPos.x, x);
      const maxX = Math.max(startPos.x, x);
      const minY = Math.min(startPos.y, y);
      const maxY = Math.max(startPos.y, y);

      cells.forEach((cell) => {
        if (cell.x >= minX && cell.x < maxX + CELL_SIZE && cell.y >= minY && cell.y < maxY + CELL_SIZE) {
          dispatch(selectCell(cell.id));
        }
      })
    }
  };

  const handleMouseUp = () => {
    dispatch(setSelecting(false));
  };

  return (
    <svg width={COLS * CELL_SIZE + 50} height={ROWS * CELL_SIZE + 50} onMouseUp={handleMouseUp}>
      {/* Ось Y (цифры) */}
      {Array.from({ length: ROWS }).map((_, y) => (
        <text
          key={y}
          x={COLS}
          y={y * CELL_SIZE + CELL_SIZE / 2.5}
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
        >
          {y + 1}
        </text>
      ))}

      {/* Ось X (Буквы) */}
      {Array.from({ length: COLS }).map((_, x) => (
        <text
          key={x}
          x={x * CELL_SIZE + CELL_SIZE / 1.5}
          y={ROWS * CELL_SIZE + 25}
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
        >
          {String.fromCharCode(65 + x)}
        </text>
      ))}

      {/* Клетки */}
      {cells.map((cell) => (
        <rect
          key={cell.id}
          x={cell.x + 30}
          y={cell.y + 10}
          width={CELL_SIZE}
          height={CELL_SIZE}
          fill={selectedCells.includes(cell.id) ? 'rgba(0, 0, 255, 0.3)' : cell.color}
          stroke="black"
          strokeWidth="1"
          onClick={() => dispatch(selectCell(cell.id))}
          onMouseDown={() => handleMouseDown(cell.x, cell.y)}
          onMouseMove={() => handleMouseMove(cell.x, cell.y)}
          className="cursor-pointer"
        />
      ))}
    </svg>
  );
}
