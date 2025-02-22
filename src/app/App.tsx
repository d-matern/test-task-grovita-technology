import { NavLink, Outlet } from "react-router";

export function App () {
  return (
    <>
      <header>
        <nav>
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
