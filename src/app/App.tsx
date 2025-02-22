import { Route, Routes } from 'react-router';
import { AppLayout } from '../shared/ui';
import { HomePage } from '../pages/home';
import { ResultPage } from '../pages/result';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="result" element={<ResultPage />} />
      </Route>
    </Routes>
  );
}
