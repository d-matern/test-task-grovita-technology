import { Routes, Route } from 'react-router'

import { HomePage } from '../../pages/home';
import { ResultPage } from '../../pages/result';
import { App } from '../App';

export function AllRoutes () {
  return (
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='result' element={<ResultPage />} />
        </Route>
      </Routes>
  );
}
