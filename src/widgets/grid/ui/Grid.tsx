import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/reduxHooks';
import { selectCell, setSelectedCells, setSelecting } from '../model/gridSlice';
import { RootState } from '../../../shared/types/store';
import { CELL_SIZE, COLS, ROWS } from '../config/constants';

export function Grid() {
  const dispatch = useAppDispatch();
  const { cells, selectedCells, isSelecting } = useAppSelector((state: RootState) => state.grid);

  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [scale, setScale] = useState(1);

  const widthElement = COLS * CELL_SIZE + 2;
  const heigthElement = ROWS * CELL_SIZE + 2;

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

      const newSelectedCells = new Set(selectedCells);

      cells.forEach((cell) => {
        const insideX = cell.x + CELL_SIZE > minX && cell.x < maxX + CELL_SIZE;
        const insideY = cell.y + CELL_SIZE > minY && cell.y < maxY + CELL_SIZE;

        if (insideX && insideY) {
          newSelectedCells.add(cell.id);
        }
      });

      dispatch(setSelectedCells(Array.from(newSelectedCells)));
    }
  };

  const handleMouseUp = () => {
    dispatch(setSelecting(false));
  };

  // Масштабирование сетки
  const handleZoomIn = () => {
    if (scale >= 3.5) {
      return;
    }
    setScale(scale + 0.1);
  };

  const handleZoomOut = () => {
    if (scale <= 1) {
      return;
    }
    setScale(scale - 0.1);
  };

  return (
    <div className="relative">
      {/* Контролы зума */}
      <div className="mb-2.5 flex flex-row gap-3">
        <button onClick={handleZoomIn} disabled={scale >= 3.5}>
          Zoom In
        </button>
        <button onClick={handleZoomOut} disabled={scale <= 1}>
          Zoom Out
        </button>
        {scale}
      </div>

      <div className="pt-3 pl-8 pb-8 relative overflow-hidden">
        <div
          className="w-8 flex flex-col items-center absolute top-3 left-0"
          style={{
            height: heigthElement,
          }}
        >
          {/* Ось Y (цифры) */}
          {Array.from({ length: ROWS }).map((_, y) => (
            <span
              key={y}
              className="absolute -translate-y-1/2"
              style={{
                top: y * CELL_SIZE * scale,
              }}
            >
              {y + 1}
            </span>
          ))}
        </div>

        <svg
          width={widthElement}
          height={heigthElement}
          onMouseUp={handleMouseUp}
          className="border overflow-auto"
        >
          {cells.map((cell) => (
            <rect
              key={cell.id}
              x={cell.x * scale}
              y={cell.y * scale}
              width={CELL_SIZE * scale}
              height={CELL_SIZE * scale}
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

        <div
          className="h-8 flex flex-row items-center absolute left-8 bottom-0"
          style={{
            width: widthElement,
          }}
        >
          {/* Ось X (Буквы) */}
          {Array.from({ length: COLS }).map((_, x) => (
            <span
              key={x}
              className="absolute -translate-x-1/2"
              style={{
                left: x * CELL_SIZE * scale,
              }}
            >
              {String.fromCharCode(65 + x)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
