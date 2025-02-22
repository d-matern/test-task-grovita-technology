import { useAppDispatch, useAppSelector } from '../../../shared/hooks/reduxHooks';
import { selectCell, clearSelection, setSelecting } from '../model/gridSlice';
import { RootState } from '../../../shared/types/store';

export function Grid() {
  const dispatch = useAppDispatch();
  const { cells, selectedCells, isSelecting } = useAppSelector((state: RootState) => state.grid);

  const handleMouseDown = (id: string) => {
    dispatch(clearSelection());
    dispatch(selectCell(id));
    dispatch(setSelecting(true));
  };

  const handleMouseEnter = (id: string) => {
    if (isSelecting) {
      dispatch(selectCell(id));
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
          onMouseDown={() => handleMouseDown(cell.id)}
          onMouseEnter={() => handleMouseEnter(cell.id)}
          className="cursor-pointer"
        />
      ))}
    </svg>
  );
}
