import { useAppDispatch, useAppSelector } from '../../../shared/hooks/reduxHooks';
import { selectCell, clearSelection, setSelecting } from '../model/gridSlice';
import { RootState } from '../../../shared/types/store';
import { useState } from 'react';

export function Grid() {
  const dispatch = useAppDispatch();
  const { cells, selectedCells, isSelecting } = useAppSelector((state: RootState) => state.grid);

  const [startPos, setStartPos] = useState<{ x: number, y: number } | null>(null);

  const handleMouseDown = (x: number, y: number) => {
    dispatch(clearSelection());
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
        if (cell.x >= minX && cell.x < maxX + 40 && cell.y >= minY && cell.y < maxY + 40) {
          dispatch(selectCell(cell.id));
        }
      })
    }
  };

  const handleMouseUp = () => {
    dispatch(setSelecting(false));
  };

  return (
    <svg className="border" width={15 * 40 + 2} height={40 * 10 + 2} onMouseUp={handleMouseUp}>
      {cells.map((cell) => (
        <rect
          key={cell.id}
          x={cell.x}
          y={cell.y}
          width={40}
          height={40}
          fill={selectedCells.includes(cell.id) ? 'rgba(0, 0, 255, 0.3)' : cell.color}
          stroke="black"
          strokeWidth="1"
          onMouseDown={() => handleMouseDown(cell.x, cell.y)}
          onMouseMove={() => handleMouseMove(cell.x, cell.y)}
          className="cursor-pointer"
        />
      ))}
    </svg>
  );
}
