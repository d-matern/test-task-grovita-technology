import { NavLink, Outlet } from 'react-router';

export function AppLayout() {
  return (
    <>
      <header className="px-4 py-3 flex flex-row items-center justify-center">
        <nav className="flex items-center justify-center gap-3">
          <NavLink to="/">Главная</NavLink>
          <NavLink to="/result">Результат</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
