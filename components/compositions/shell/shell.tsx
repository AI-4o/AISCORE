/**
 * Shell Component
 *
 * Main layout component that structures the overall application interface.
 * Provides a consistent layout structure for all pages with configurable content areas.
 *
 * Features:
 * - Consistent navigation bar at the top
 * - Optional banner area below navigation
 * - Flexible main content area with optional sidebars
 * - Background image support with overlay effects
 * - Optional footer area
 * - Responsive layout that adapts to different screen sizes
 */
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
      <div className="main-wrapper flex justify-center items-center">
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
