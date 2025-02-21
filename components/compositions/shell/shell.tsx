import { Navbar, NavbarItemProps } from "../navbar/navbar";
import "./style.css";

export type ShellProps = {
  navbarItems: NavbarItemProps[];
  banner?: React.ReactNode;
  sfondoPath?: string;
  mainChild?: React.ReactNode;
  leftSideChild?: React.ReactNode;
  rightSideChild?: React.ReactNode;
  footer?: React.ReactNode;
};

export function Shell({
  navbarItems,
  banner,
  sfondoPath,
  mainChild,
  leftSideChild,
  rightSideChild,
  footer,
}: ShellProps) {
  
  
  return (
    <div className="page-wrapper">
      <div
        className="sfondo-overlay sfondo-wrapper"
        style={{ backgroundImage: `url(${sfondoPath})` }}
      ></div>
      <div className="navbar-wrapper">
        <Navbar items={navbarItems} />
      </div>
      <div className="banner-wrapper">{banner}</div>
      <div className="main-wrapper flex">
        {leftSideChild}
        <div className="main-content flex justify-center items-start min-h-screen">
          {mainChild}
        </div>
        {rightSideChild}
      </div>
      <div className="footer-wrapper">{footer}</div>
    </div>
  );
}
