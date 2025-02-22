import { useAppDispatch, useAppSelector } from '../../../shared/hooks/reduxHooks';
import { applyColor, setColor } from '../../../widgets/grid/model/gridSlice';
import { selectSelectedColor } from '../../../widgets/grid/model/selectors';

export function ColorPicker() {
  const dispatch = useAppDispatch();
  const selectedColor = useAppSelector(selectSelectedColor);

  return (
    <div className="p-4 flex items-center gap-2">
      <input
        className="cursor-pointer"
        type="color"
        value={selectedColor}
        onChange={(e) => dispatch(setColor(e.target.value))}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer transition-colors hover:bg-blue-400"
        onClick={() => dispatch(applyColor())}
      >
        Применить цвет
      </button>
    </div>
  );
}
