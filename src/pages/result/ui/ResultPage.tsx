import { useAppSelector } from '../../../shared/hooks/reduxHooks';
import { selectCellsResult } from '../../../widgets/grid/model/selectors';

export function ResultPage() {
  const cellsResult = useAppSelector(selectCellsResult);
  return (
    <div className="flex flex-col items-center">
      <h1 className="my-4 text-xl font-bold">Результат</h1>

      <ul>
        {Object.keys(cellsResult).map((key) => (
          <li key={key}>
            <p>
              Ячеек: <b>{cellsResult[key]}</b> Цвет:{' '}
              <span className="inline-block size-4" style={{ backgroundColor: key }} />
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
