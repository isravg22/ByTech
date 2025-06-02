'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import imageLogo from '@/app/img/logo.png';
import { CgProfile } from "react-icons/cg";
import Aside from '../Aside/Aside';

export default function NavBar() {
    const [showAside, setShowAside] = useState(false);
    const [showUserDetails, setShowUserDetails] = useState(false);
    const toggleAside = () => {
        setShowAside(!showAside);
    };
    const toggleUserDetails = () => {
        setShowUserDetails(!showUserDetails);
    };

    return (
        <div>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button onClick={toggleAside} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <Link href="/Home" className="flex ms-2 md:me-24">
                                <Image src={imageLogo} className="h-8 w-auto me-3" alt="ByTech Logo" width={32} height={32} />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">ByTech</span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <div className="relative ml-3">
                                <button onClick={toggleUserDetails} className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                    <CgProfile className="w-6 h-6" />
                                </button>
                                <div className={`${showUserDetails ? 'block' : 'hidden'} absolute right-0 w-auto mt-8 origin-top-right bg-white divide-y divide-gray-100 rounded shadow-md dark:bg-gray-700 dark:divide-gray-600 ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="horizontal" aria-labelledby="user-menu">
                                    <div className="py-1" role="none">
                                        <Link href="/Profile" className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" style={{ minWidth: '150px' }}>Mi perfil</Link>
                                        <Link href="/" className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" style={{ minWidth: '150px' }}>Cerrar Sesión</Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {showAside && <Aside />}
        </div>
    );
}
