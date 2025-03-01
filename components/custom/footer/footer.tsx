/**
 * Footer Component
 * 
 * A simple footer component that displays at the bottom of the application.
 * Provides a consistent footer area across all pages.
 * 
 * Features:
 * - Consistent styling with the application theme
 * - Fixed position at the bottom of the layout
 * - Placeholder for footer content (logo, links, copyright, etc.)
 * - Responsive design that adapts to different screen sizes
 */
import "./style.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__logo">...QUI IL FOOTER...</div>
      </div>
    </div>
  );
}
