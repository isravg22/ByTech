import imgLogo from '@/app/img/logo.png';
import Image from 'next/image';
export default function LoginPage() {

  return (
    <>
        <form>
          <h3 style={{color:'white',alignContent:'center'}}>Bienvenido a ByTech</h3>
          <Image src={imgLogo} alt='logo ByTech'/>
        </form>
    </>
  );
}