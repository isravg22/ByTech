
import imgLogo from '@/app/img/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useNavigation } from 'next/navigation';


export default function Registro() {
    const navigation = useNavigation(); // Utiliza useNavigation en lugar de useRouter

    const goLogin = () => {
        navigation.navigate('/');
    }
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ backgroundColor: 'white', padding: '2em', borderRadius: '10px', width: '30%' }}>
                <Image src={imgLogo} alt="Logo" width="128" height="128" style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }} />
                <p style={{ marginBottom: '0.5em', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>Crear cuenta</p>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '16px' }}>Nombre:</label>
                    <input type="text" placeholder="Ejemplo" style={{ padding: '0.3em', borderRadius: '3px', fontSize: '14px' }} />
                    <label style={{ fontWeight: 'bold', fontSize: '16px' }}>Primer apellido:</label>
                    <input type="text" placeholder="Ejemplo" style={{ padding: '0.3em', borderRadius: '3px', fontSize: '14px' }} />
                    <label style={{ fontWeight: 'bold', fontSize: '16px' }}>Segundo apellido:</label>
                    <input type="text" placeholder="Ejemplo" style={{ padding: '0.3em', borderRadius: '3px', fontSize: '14px' }} />
                    <label style={{ fontWeight: 'bold', fontSize: '16px' }}>Correo:</label>
                    <input type="text" placeholder="Ejemplo123" style={{ padding: '0.3em', borderRadius: '3px', fontSize: '14px' }} />
                    <label style={{ fontWeight: 'bold', fontSize: '16px' }}>Nombre de usuario:</label>
                    <input type="text" placeholder="Ejemplo123" style={{ padding: '0.3em', borderRadius: '3px', fontSize: '14px' }} />
                    <label style={{ fontWeight: 'bold', fontSize: '16px' }}>Contraseña:</label>
                    <input type="password" placeholder="***********" style={{ padding: '0.3em', borderRadius: '3px', fontSize: '14px' }} />
                    <label style={{ fontWeight: 'bold', fontSize: '16px' }}>Repetir contraseña:</label>
                    <input type="password" placeholder="***********" style={{ padding: '0.3em', borderRadius: '3px', fontSize: '14px' }} />
                    <p style={{ fontSize: '14px', textAlign: 'center' }}>
                        Si ya tienes cuenta, pulsa <strong><Link href="/">aquí</Link></strong>.
                    </p>
                    <button style={{ backgroundColor: '#00a2ff', padding: '0.3em 0', borderRadius: '3px', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '16px' }} onClick={goLogin}>Crear cuenta</button>
                </form>
            </div>
        </div>

    )
}