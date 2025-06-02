import Link from "next/link";
import { AiFillHome, AiFillShopping } from "react-icons/ai";
import { CgProfile, CgBox } from "react-icons/cg";
import { useState } from "react";
import SubMenu from "../SubMenu/SubMenu";

const menuItems = [
    {
        label: "Inicio",
        href: "/Home",
        icon: <AiFillHome className="w-6 h-6 mr-3 text-gray-500" />,
    },
    {
        label: "Productos",
        href: "#",
        icon: <AiFillShopping className="w-6 h-6 mr-3 text-gray-500" />,
        hasSubMenu: true,
    },
    {
        label: "Cuenta",
        href: "/Profile",
        icon: <CgProfile className="w-6 h-6 mr-3 text-gray-500" />,
    },
    {
        label: "Pedidos",
        href: "/Order",
        icon: <CgBox className="w-6 h-6 mr-3 text-gray-500" />,
    },
];

export default function Aside() {
    const [showSubMenu, setShowSubMenu] = useState(false);

    return (
        <aside
            id="logo-sidebar"
            className="fixed top-16 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-lg transition-all"
            aria-label="Sidebar"
            style={{ top: '4rem' }}
        >
            <nav className="h-full px-3 pb-4 overflow-y-auto" aria-label="Menú lateral">
                <ul className="space-y-2 font-medium">
                    {menuItems.map((item, idx) => (
                        <li key={item.label}>
                            <Link
                                href={item.href}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-50 dark:hover:bg-gray-700 group transition"
                                role="menuitem"
                                tabIndex={0}
                                onClick={item.hasSubMenu ? (e) => { e.preventDefault(); setShowSubMenu((v) => !v); } : undefined}
                                aria-haspopup={item.hasSubMenu ? "true" : undefined}
                                aria-expanded={item.hasSubMenu ? showSubMenu : undefined}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                            {item.hasSubMenu && showSubMenu && (
                                <div className="ml-6 mt-2 animate-fade-in">
                                    <SubMenu />
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
