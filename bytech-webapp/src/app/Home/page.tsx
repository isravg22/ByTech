'use client'
import imgLogo from '@/app/img/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {

  const router= useRouter()
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <h1>Prueba</h1>
      <button onClick={()=>router.push('/')}>asdasdad</button>
    </div>


  )
}