import { ColorPicker } from '../../../features/color-picker';
import { Grid } from '../../../widgets/grid';

export function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="my-4 text-xl font-bold">SVG Сетка</h1>

      <ColorPicker />
      <Grid />
    </div>
  );
}
