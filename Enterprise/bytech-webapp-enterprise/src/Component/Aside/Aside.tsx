import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { CgProfile, CgBox } from "react-icons/cg";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaProductHunt } from "react-icons/fa";

export default function Aside() {
    

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
                        <Link href="/Workers" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <BsPersonWorkspace className="w-6 h-6 mr-3 text-gray-500"/>
                            <span>Trabajadores</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/Products" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <FaProductHunt  className="w-6 h-6 mr-3 text-gray-500" />
                            <span>Productos</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/Profile" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <CgProfile className="w-6 h-6 mr-3 text-gray-500" />
                            <span>Cuenta</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
