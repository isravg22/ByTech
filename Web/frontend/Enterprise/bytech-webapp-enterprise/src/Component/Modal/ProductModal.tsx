import React, { useState, useRef, forwardRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import imgLogo from '@/app/img/logo.png';
import productType from '@/Maps/ProductType';
import { CircularProgress } from '@mui/material';

interface ProductModalProps {
    closeModal: () => void;
}
const inputStyle: React.CSSProperties = {
    padding: '10px',
    borderRadius: '7px',
    border: '1.5px solid #bfc0c0',
    fontSize: '1rem',
    background: '#f4f8ff',
    marginBottom: 4,
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s'
};

const labelStyle: React.CSSProperties = {
    fontWeight: 700,
    fontSize: 15,
    marginBottom: 2,
    color: '#1976d2',
    letterSpacing: 0.2
};

const errorStyle: React.CSSProperties = {
    color: '#e53935',
    fontSize: 13,
    marginBottom: 6,
    marginTop: -2,
    fontWeight: 500
};

const ProductModal = forwardRef<HTMLDivElement, ProductModalProps>(({ closeModal }, ref) => {
    const [selectedType, setSelectedType] = useState<string>(productType[0]?.value || '');
    const imgRef = useRef<HTMLInputElement>(null);
    const [inputPrecio, setInputPrecio] = useState<number>();
    const [inputUnidades, setInputUnidades] = useState<number>();
    const [inputNombre, setInputNombre] = useState<string>('');
    const [inputDescripcion, setInputDescripcion] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value);
    };

    const handleImage = () => {
        // Solo para preview si lo necesitas
    };

    const handlePrecioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputPrecio(parseInt(event.target.value));
    };

    const handleUnidadesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputUnidades(parseInt(event.target.value));
    };

    const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputNombre(event.target.value);
    };

    const handleDescripcionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputDescripcion(event.target.value);
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const insertProduct = async () => {
        const idEnterprise = localStorage.getItem('idEnterprise');
        if (!inputPrecio || !inputUnidades || !inputNombre || !inputDescripcion || !imgRef.current?.files?.length) {
            toast.error('Por favor completa todos los campos.');
            return;
        }
        setLoading(true);

        const formData = new FormData();
        formData.append('name', inputNombre);
        formData.append('description', inputDescripcion);
        formData.append('price', inputPrecio.toString());
        formData.append('unidades', inputUnidades.toString());
        formData.append('fabricante', idEnterprise?.toString()!);
        formData.append('date', new Date().toISOString());
        formData.append('category', selectedType);

        if (imgRef.current?.files?.length) {
            formData.append('image', imgRef.current.files[0] as File);
        }

        try {
            const response = await fetch(`http://localhost:8000/product/insertProduct`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                toast.success('Producto agregado con éxito');
                setTimeout(() => closeModal(), 1200);
            } else {
                toast.error('Error al agregar el producto. Por favor, inténtalo de nuevo más tarde.');
            }
        } catch (error) {
            toast.error('Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div ref={ref} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100vw',
            background: 'rgba(0,0,0,0.10)',
            zIndex: 9999
        }}>
            <div style={{
                background: 'rgba(255,255,255,0.99)',
                borderRadius: 20,
                boxShadow: '0 8px 32px rgba(44, 62, 80, 0.18), 0 2px 12px #90caf9',
                padding: '40px 32px 32px 32px',
                width: '100%',
                maxWidth: 540,
                minHeight: 220, 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                fontFamily: 'Segoe UI, Arial, sans-serif'
            }}>
                <button
                    aria-label="Cerrar"
                    onClick={closeModal}
                    style={{
                        position: 'absolute',
                        top: 14,
                        right: 18,
                        background: 'none',
                        border: 'none',
                        fontSize: 28,
                        color: '#1976d2',
                        cursor: 'pointer',
                        transition: 'color 0.2s',
                        fontWeight: 700,
                        lineHeight: 1
                    }}
                    onMouseOver={e => (e.currentTarget.style.color = '#0d47a1')}
                    onMouseOut={e => (e.currentTarget.style.color = '#1976d2')}
                >&times;</button>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5em' }}>
                    <Image src={imgLogo} alt="Logo" width={60} height={60} style={{ borderRadius: 12, boxShadow: '0 2px 8px #90caf9' }} />
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginLeft: 16, color: '#1976d2', letterSpacing: 1 }}>Añadir Producto</h3>
                </div>
                <form
                    style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}
                    onSubmit={e => { e.preventDefault(); insertProduct(); }}
                    autoComplete="off"
                >
                    <label style={labelStyle}>Tipo</label>
                    <select
                        style={inputStyle}
                        onChange={handleTypeChange}
                        value={selectedType}
                        required
                        onBlur={() => handleBlur('tipo')}
                    >
                        {productType.map((content, index) => (
                            <option key={index} value={content.value}>
                                {content.value}
                            </option>
                        ))}
                    </select>

                    <label style={labelStyle}>Nombre</label>
                    <input
                        type='text'
                        style={{
                            ...inputStyle,
                            borderColor: touched.nombre && !inputNombre ? '#e53935' : inputStyle.borderColor
                        }}
                        value={inputNombre}
                        onChange={handleNombreChange}
                        onBlur={() => handleBlur('nombre')}
                        placeholder="Nombre del producto"
                        required
                        autoFocus
                    />
                    {touched.nombre && !inputNombre && <span style={errorStyle}>El nombre es obligatorio</span>}

                    <label style={labelStyle}>Descripción</label>
                    <input
                        type='text'
                        style={{
                            ...inputStyle,
                            borderColor: touched.descripcion && !inputDescripcion ? '#e53935' : inputStyle.borderColor
                        }}
                        value={inputDescripcion}
                        onChange={handleDescripcionChange}
                        onBlur={() => handleBlur('descripcion')}
                        placeholder="Descripción"
                        required
                    />
                    {touched.descripcion && !inputDescripcion && <span style={errorStyle}>La descripción es obligatoria</span>}

                    <label style={labelStyle}>Precio (€)</label>
                    <input
                        type='number'
                        style={{
                            ...inputStyle,
                            borderColor: touched.precio && (!inputPrecio || inputPrecio < 0) ? '#e53935' : inputStyle.borderColor
                        }}
                        value={inputPrecio || ''}
                        onChange={handlePrecioChange}
                        onBlur={() => handleBlur('precio')}
                        placeholder="Precio"
                        min={0}
                        required
                    />
                    {touched.precio && (!inputPrecio || inputPrecio < 0) && <span style={errorStyle}>Precio válido requerido</span>}

                    <label style={labelStyle}>Unidades</label>
                    <input
                        type='number'
                        style={{
                            ...inputStyle,
                            borderColor: touched.unidades && (!inputUnidades || inputUnidades < 1) ? '#e53935' : inputStyle.borderColor
                        }}
                        value={inputUnidades || ''}
                        onChange={handleUnidadesChange}
                        onBlur={() => handleBlur('unidades')}
                        placeholder="Unidades"
                        min={1}
                        required
                    />
                    {touched.unidades && (!inputUnidades || inputUnidades < 1) && <span style={errorStyle}>Debe ser al menos 1 unidad</span>}

                    <label style={labelStyle}>Imagen</label>
                    <input
                        type='file'
                        accept='image/*'
                        ref={imgRef}
                        onChange={handleImage}
                        style={inputStyle}
                        required
                        onBlur={() => handleBlur('imagen')}
                    />
                    {touched.imagen && !(imgRef.current?.files?.length) && <span style={errorStyle}>Imagen obligatoria</span>}

                    <button
                        type="submit"
                        style={{
                            background: loading
                                ? 'linear-gradient(90deg, #90caf9 60%, #64b5f6 100%)'
                                : 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)',
                            color: 'white',
                            fontWeight: 700,
                            borderRadius: 8,
                            padding: '13px 0',
                            fontSize: 17,
                            marginTop: 18,
                            border: 'none',
                            boxShadow: '0 2px 8px #90caf9',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'background 0.2s, box-shadow 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 10
                        }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={22} color="inherit" /> : 'Añadir Producto'}
                    </button>
                </form>
                <ToastContainer position="bottom-right" autoClose={4000} />
            </div>
        </div>
    );
});
ProductModal.displayName = "ProductModal";
export default ProductModal;

