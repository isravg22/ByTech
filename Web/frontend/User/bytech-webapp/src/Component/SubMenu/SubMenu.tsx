import Link from "next/link";
import { FaLaptop, FaMobileAlt, FaMicrochip, FaGamepad } from "react-icons/fa";

const subMenuItems = [
    { label: "Ordenadores", href: "/Ordenador", icon: <FaLaptop className="w-5 h-5" /> },
    { label: "Smartphones", href: "/Smartphone", icon: <FaMobileAlt className="w-5 h-5" /> },
    { label: "Componentes", href: "/Componentes", icon: <FaMicrochip className="w-5 h-5" /> },
    { label: "Gaming", href: "/Gaming", icon: <FaGamepad className="w-5 h-5" /> },
];

export default function SubMenu() {
    return (
        <aside className="px-3 pb-4 bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-100 dark:border-gray-700">
            <ul className="space-y-2 font-medium">
                {subMenuItems.map((item) => (
                    <li key={item.label}>
                        <Link
                            href={item.href}
                            className="flex items-center gap-2 p-2 text-gray-700 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700 transition"
                            role="menuitem"
                            tabIndex={0}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}