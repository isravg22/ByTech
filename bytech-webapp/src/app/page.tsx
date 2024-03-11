import imgLogo from '@/app/img/logo.png';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {


  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div style={{backgroundColor: 'white',padding: '2em', borderRadius: '20px',width: '30%'}}>
        <Image src={imgLogo} alt="Logo" width="256" height="256" style={{display: 'flex' ,justifyContent: 'center' ,margin:' 0 auto'}} />
        <p style={{marginBottom: '1em',fontSize:'32px',fontWeight:'bold',textAlign:'center'}}>Bienvenido a ByTech</p>
        <form style={{display: 'flex' ,flexDirection: 'column' ,gap: '1em'}}>
          <label style={{fontWeight:'bold',fontSize:'20px'}}>Nombre de usuario:</label>
          <input type="text" placeholder="Ejemplo123" style={{padding:' 0.5em',borderRadius: '5px',fontSize:'18px' }}/>
          <label style={{fontWeight:'bold',fontSize:'20px'}}>Contraseña:</label>
          <input type="password" placeholder="***********" style={{padding: '0.5em', borderRadius: '5px',fontSize:'18px'}} />
          <p>
            Si no tienes cuenta, pulsa
            <strong><Link href="/Register"> aquí</Link></strong>
          </p>
          <button style={{backgroundColor: '#00a2ff', padding: '0.5em 0', borderRadius: '5px' ,border: 'none', color: 'white', fontWeight: 'bold'}}>Iniciar Sesión</button>
        </form>
      </div>
    </div>


  )
}
