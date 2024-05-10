import Link from "next/link";

export default function SubMenu() {

    return (
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
                <li>
                    <Link href="/Ordenador" className="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">                        
                        <span>Ordenadores</span>
                    </Link>
                </li>
                <li>
                    <Link href="/Smartphone" className="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">                        
                        <span>Smartphones</span>
                    </Link>
                </li>
                <li>
                    <Link href="/Componentes" className="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">                        
                        <span>Componentes</span>
                    </Link>
                </li>
                <li>
                    <Link href="/Gaming" className="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">                        
                        <span>Gaming</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};