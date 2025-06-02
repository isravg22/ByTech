'use client'
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import imageLogo from '@/app/img/logo.png';
import { CgProfile } from "react-icons/cg";
import Aside from '../Aside/Aside';

export default function NavBar() {
    const [showAside, setShowAside] = useState(false);
    const [showUserDetails, setShowUserDetails] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setShowUserDetails(false);
            }
        }
        if (showUserDetails) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showUserDetails]);

    return (
        <header>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="px-4 py-3 flex items-center justify-between">
                    {/* Logo y menú lateral */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowAside(!showAside)}
                            type="button"
                            className="inline-flex items-center p-2 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-label="Abrir menú lateral"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <Link href="/Home" className="flex items-center gap-2">
                            <Image src={imageLogo} alt="ByTech Logo" width={40} height={40} className="h-10 w-10" priority />
                            <span className="text-2xl font-bold text-[#1a237e] dark:text-white tracking-tight">ByTech</span>
                        </Link>
                    </div>
                    {/* Menú usuario */}
                    <div className="relative" ref={userMenuRef}>
                        <button
                            onClick={() => setShowUserDetails((v) => !v)}
                            className="inline-flex items-center p-2 text-gray-600 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-gray-300 dark:hover:bg-gray-700"
                            aria-label="Abrir menú de usuario"
                            aria-haspopup="true"
                            aria-expanded={showUserDetails}
                        >
                            <CgProfile className="w-7 h-7" />
                        </button>
                        <div className={`absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-150 ${showUserDetails ? 'block' : 'hidden'}`}>
                            <div className="py-2" role="menu" aria-orientation="vertical">
                                <Link href="/Profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 dark:text-gray-200 dark:hover:bg-gray-700 rounded transition" role="menuitem">
                                    Mi perfil
                                </Link>
                                <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 dark:text-gray-200 dark:hover:bg-gray-700 rounded transition" role="menuitem">
                                    Cerrar sesión
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {showAside && <Aside />}
            
            <div className="h-16" />
        </header>
    );
}
