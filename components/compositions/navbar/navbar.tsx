"use client";

/**
 * Navbar Component
 *
 * Main navigation component for the application that displays the primary navigation links.
 * Supports both desktop and mobile views with responsive behavior.
 *
 * Features:
 * - Responsive design with mobile hamburger menu
 * - Animated mobile menu dropdown
 * - Configurable navigation items through props
 * - Styled consistent with the application theme
 * - Links to main sections of the application (home, leagues, predictions, etc.)
 * - Accessibility-friendly navigation
 */

import * as React from "react";
import Link from "next/link";
import { cn } from "utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "ui/navigation-menu";
import { Button } from "components/ui/button";
import { Menu } from "lucide-react";
import "./style.css";

/**
             1. home
            2. serie A 
            3. bundes lega
            4. premier league
            5. league one 
            6. la liga
            
            7. pronostici
            8. scommesse live → da vedere alla fine
 */

export type NavbarItemProps = {
  title: string;
  href: string;
};
export type NavbarProps = {
  items: NavbarItemProps[];
};

export function Navbar({ items }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [openClasses, setOpenClasses] = React.useState("");

  const toggleMenuDropdown = () => {
    if (!isOpen) {
      setIsOpen(true);
      setOpenClasses("open");
    } else {
      setOpenClasses("closing");
    }
  };
  React.useEffect(() => {
    if (openClasses === "closing") {
      setTimeout(() => {
        setIsOpen(false);
      }, 300);
    }
  }, [openClasses]);
  return (
    <header className="navbar border-b-slate-200 bg-black w-full">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold hover:opacity-80 truncate"
        >
          AISCORE360
        </Link>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenuDropdown}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="hidden justify-between px-4 pb-2 md:flex md:px-6 lg:px-8">
        <NavigationMenu>
          <NavigationMenuList className="flex flex-wrap gap-2">
            {items.map((item) => (
              <NavbarItem
                key={item.title}
                title={item.title}
                href={item.href}
              />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {isOpen && (
        <div className={`navbar-dropdown ${openClasses}`}>
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col p-4 space-y-2">
              {items.map((item) => (
                <NavbarItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const NavbarItem = ({ title, href }: NavbarItemProps) => {
  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink className="menu-item-link whitespace-nowrap text-sm">
          {title}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};
