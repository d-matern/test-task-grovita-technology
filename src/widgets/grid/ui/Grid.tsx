import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/reduxHooks';
import { selectCell, setSelectedCells, setSelecting } from '../model/gridSlice';
import { RootState } from '../../../shared/types/store';
import { CELL_SIZE, COLS, ROWS } from '../config/constants';

const widthDefault = COLS * CELL_SIZE + 2;
const heigthDefault = ROWS * CELL_SIZE + 2;

export function Grid() {
  const dispatch = useAppDispatch();
  const { cells, selectedCells, isSelecting } = useAppSelector((state: RootState) => state.grid);

  const [widthElement, setWidthElement] = useState(widthDefault);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [scale, setScale] = useState(1);

  const gridContainerRef = useRef<HTMLDivElement | null>(null);
  const axisYRef = useRef<HTMLDivElement | null>(null);
  const axisXRef = useRef<HTMLDivElement | null>(null);

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

  const watchScrollGridContainer = (e: Event) => {
    const target = e.target as HTMLDivElement;
    if (axisYRef.current) {
      axisYRef.current.scrollTop = target.scrollTop;
    }
    if (axisXRef.current) {
      axisXRef.current.scrollLeft = target.scrollLeft;
    }
  };

  useEffect(() => {
    if (widthElement > document.documentElement.getBoundingClientRect().width) {
      setWidthElement(document.documentElement.getBoundingClientRect().width - 50);
    }
  }, [widthElement]);

  useEffect(() => {
    const gridContainer = gridContainerRef.current;
    if (gridContainer) {
      gridContainer.addEventListener('scroll', watchScrollGridContainer);
    }

    return () => {
      gridContainer?.removeEventListener('scroll', watchScrollGridContainer);
    }
  }, [gridContainerRef])

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
        {/* Ось Y (цифры) */}
        <div
          ref={axisYRef}
          className="w-8 flex flex-col items-center absolute top-0 left-0 overflow-y-auto no-scrollbar"
          style={{
            height: heigthDefault,
          }}
        >
          {Array.from({ length: ROWS }).map((_, y) => (
            <span
              key={y}
              className="absolute"
              style={{
                top: y * CELL_SIZE * scale,
              }}
            >
              {y + 1}
            </span>
          ))}
        </div>

        <div
          ref={gridContainerRef}
          className='overflow-auto'
          style={{
            width: widthElement,
            height: heigthDefault
          }}
        >
          <svg
            width={widthDefault * scale}
            height={heigthDefault * scale}
            onMouseUp={handleMouseUp}
          >
            {cells.map((cell) => (
              <rect
                key={cell.id}
                x={cell.x * scale + 2}
                y={cell.y * scale + 2}
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
        </div>

        {/* Ось X (Буквы) */}
        <div
          ref={axisXRef}
          className="h-8 flex flex-row items-center absolute left-7 bottom-0 overflow-y-auto no-scrollbar"
          style={{
            width: widthElement,
          }}
        >
          {Array.from({ length: COLS }).map((_, x) => (
            <span
              key={x}
              className="absolute"
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
