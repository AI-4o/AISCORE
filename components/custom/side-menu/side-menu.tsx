import React from "react";
import "./style.css";
import Link from "next/link";

export type SideMenuProps = {
   links: {
    label: string;
    href: string;
    icon: React.ReactNode | React.JSX.Element;
   }[];
}

export default function SideMenu({links}: SideMenuProps) {
    return (
        <ul className="flex flex-col side-menu">
            {links.map((link) => (
                <li className="side-menu__li " key={link.href}>
                    <div className="flex items-center">
                        {link.icon}
                        <Link href={link.href}>{link.label}</Link>
                    </div>
                </li>
            ))}
        </ul>
    );
}