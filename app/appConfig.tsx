import { SideMenuProps } from "components/custom/side-menu/side-menu"
import path from 'path';

export const BASEPATH = path.resolve(__dirname, '../../../');
export const API_PATH = path.join(BASEPATH, 'src/app/api/');
const sideMenuBallIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 inline-block mr-2"
    >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9l1.45 1.45c-.58.89-.94 1.95-.94 3.15 0 3.31 2.69 6 6 6 1.2 0 2.26-.36 3.15-.94l1.45 1.45C15.55 19.37 13.85 20 12 20zm4.9-1.69l-1.45-1.45c.58-.89.94-1.95.94-3.15 0-3.31-2.69-6-6-6-1.2 0-2.26.36-3.15.94L5.1 5.1C6.45 4.63 8.15 4 10 4c4.41 0 8 3.59 8 8 0 1.85-.63 3.55-1.69 4.9z" />
    </svg>
)

const sideMenuProps: SideMenuProps = {
    links: [
        { label: "changeLog", href: "/changelog", icon: sideMenuBallIcon },
        { label: "News", href: "/news", icon: sideMenuBallIcon },
        { label: "Pronostici", href: "/pronostici", icon: sideMenuBallIcon },
        { label: "Scommesse Live", href: "/scommesse-live", icon: sideMenuBallIcon },
    ]
}

export const config = {
    appName: "AISCORE360",
    appDescription: "Pronostici e analisi per il calcio",
    appUrl: "https://aiscore360.com",
    banner: "/banner.jpg",
    sfondo: "/sfondo.jpg",
    sidemenuItems: sideMenuProps,
    spinner: "https://lottie.host/82739a99-9fce-4535-9b4f-a3224f1a68a0/x4P2YjI7Si.lottie",
    blurDataUrlAPISort: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0XFyAeIRMeIR0dITcdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
    navLinks: [
        { title: "WINPRO", href: "/" },
        { title: "Serie A", href: "/diretta/serie-a" },
        { title: "Bundes Lega", href: "/diretta/bundes-lega" },
        { title: "Premier League", href: "/diretta/premier-league" },
        { title: "League One", href: "/diretta/league-one" },
        { title: "La Liga", href: "/diretta/la-liga" },
        { title: "Pronostici", href: "/pronostici" },
        { title: "Scommesse Live", href: "/scommesse-live" },
        { title: "Login", href: "/auth/login" },
        { title: "Registrazione", href: "/auth/register" }
    ],
    changeLog: [
        { version: "0.1.0", description: "Create homepage basic layout, add navigation" },
        { version: "0.2.0", description: "Add widget for fixtures in homepage" }
    ]
}