import Link from "next/link";
import { NavItems, NavItemsAuth } from "../_data/NavBarItems";
import "../_styles/navbar.css";

export function NavBar({ isLogged }: { isLogged: boolean }) {
  return (
    <nav className="nav">
      <p className="nav__logo">Povarenok</p>
      <ul className="nav__list">
        {isLogged
          ? NavItemsAuth.map((el) => {
              return (
                <li className="list__item" key={el.href}>
                  <Link className="nav__link" href={el.href}>
                    {el.label}
                  </Link>
                </li>
              );
            })
          : NavItems.map((el) => {
              return (
                <li className="list__item" key={el.href}>
                  <Link className="nav__link" href={el.href}>
                    {el.label}
                  </Link>
                </li>
              );
            })}
      </ul>
    </nav>
  );
}
