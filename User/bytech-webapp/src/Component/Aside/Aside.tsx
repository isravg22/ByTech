import Link from "next/link";
import { AiFillHome, AiFillShopping } from "react-icons/ai";
import { CgProfile, CgBox } from "react-icons/cg";
import { useState } from "react";
import SubMenu from "../SubMenu/SubMenu";
import { Libre_Franklin } from "next/font/google";

export default function Aside() {
    const [showSubMenu, setShowSubMenu] = useState(false);

    const toggleSubMenu = () => {
        setShowSubMenu(!showSubMenu);
    };

    return (
        <aside
            id="logo-sidebar"
            className="fixed top-16 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidebar"
            style={{ top: '4rem' }}
        >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link href="/Home" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <AiFillHome className="w-6 h-6 mr-3 text-gray-500" />
                            <span>Inicio</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={toggleSubMenu}>
                            <AiFillShopping className="w-6 h-6 mr-3 text-gray-500"/>
                            <span>Productos</span>
                        </Link>
                        {showSubMenu && <SubMenu />} 
                    </li>
                    <li>
                        <Link href="/Profile" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <CgProfile className="w-6 h-6 mr-3 text-gray-500" />
                            <span>Cuenta</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/Order" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <CgBox className="w-6 h-6 mr-3 text-gray-500" />
                            <span>Pedidos</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
