import { useEffect, useState } from 'react';
import Image from 'next/image';
import imageLogo from '@/app/img/logo.png';
import Link from 'next/link';

export default function Footer() {
    const [showFooter, setShowFooter] = useState(false);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        function handleScroll() {
            const isBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
            setShowFooter(isBottom);
            setShowButton(window.scrollY > 20);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {showFooter && (
                <footer className="fixed bottom-0 w-full bg-white dark:bg-gray-900">
                    <div className="mx-auto w-full max-w-screen-xl px-8 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">© 2024 BYTECH™.</span>
                        <div className="flex items-center space-x-8 rtl:space-x-reverse">
                            <div className="flex items-center">
                                <Link href="https://discord.gg/C4Eh88nZ" className="text-gray-400 hover:text-gray-900 dark:hover:text-white" target='_blank'>
                                    <svg className="w-6 h-9" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                                        <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                                    </svg>
                                    <span className="sr-only">Discord community</span>
                                </Link>
                                <Link href="https://github.com/isravg22" className="text-gray-400 hover:text-gray-900 dark:hover:text-white" target='_blank'>
                                    <svg className="w-6 h-9" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd" />
                                    </svg>
                                    <span className="sr-only">GitHub account</span>
                                </Link>
                            </div>
                            <div >
                                <Image src={imageLogo} alt='Bytech Logo' height={40} width={40} />
                            </div>
                        </div>
                    </div>
                </footer>
            )}
            {showButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 bg-gray-800 p-2 rounded-full text-white focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                    </svg>
                </button>
            )}
        </>
    );
}

