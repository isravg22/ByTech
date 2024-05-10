import React, { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import imgLogo from '@/app/img/logo.png';
import productType from '@/Maps/ProductType';

interface ProductModalProps {
    closeModal: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ closeModal }) => {
    const [selectedType, setSelectedType] = useState<string>();
    const imgRef = useRef<HTMLInputElement>(null);
    const [inputPrecio, setInputPrecio] = useState<number>();
    const [inputUnidades, setInputUnidades] = useState<number>();
    const [inputNombre, setInputNombre] = useState<string>();
    const [inputDescripcion, setInputDescripcion] = useState<string>();

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value);
    }

    const handleImage = () => {
        const img = imgRef.current?.files?.[0];
        if (img) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const imageDataUrl = event.target?.result;
                console.log('ImageSrc: ', imageDataUrl);
            };
            reader.readAsDataURL(img);
        }
    }

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

    const insertProduct = async (type: any) => {
        const idEnterprise = localStorage.getItem('idEnterprise');
        if (!inputPrecio || !inputUnidades || !inputNombre || !inputDescripcion || !imgRef.current?.files) {
            toast.error('Por favor completa todos los campos.');
            return;
        }
    
        const formData = new FormData();
        formData.append('name', inputNombre);
        formData.append('description', inputDescripcion);
        formData.append('price', inputPrecio.toString());
        formData.append('unidades', inputUnidades.toString());
        formData.append('fabricante', idEnterprise?.toString()!);
        formData.append('date', new Date().toISOString());
        formData.append('category', type);
    
        if (imgRef.current?.files?.length) {
            formData.append('image', imgRef.current.files[0] as File);
        }
    
        try {
            const response = await fetch(`http://localhost:8000/product/insertProduct`, {
                method: 'POST',
                body: formData 
            });
    
            if (response.ok) {
                console.log('Producto agregado con éxito');
                closeModal();
            } else {
                toast.error('Error al agregar el producto. Por favor, inténtalo de nuevo más tarde.');
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            toast.error('Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.');
        }
    };
    
    


    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: 'auto', width: '100%' }}>
            <div style={{ backgroundColor: 'white', padding: '1em', borderRadius: '10px', marginTop: '5%', display: 'flex', flexDirection: 'column', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '500px' }}>
                <span className="close" onClick={closeModal} style={{ cursor: 'pointer', alignSelf: 'flex-end', fontSize: '20px', marginTop: '-10px' }}>&times;</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5em' }}>
                    <Image src={imgLogo} alt="Logo" width="65" height="65" />
                    <h3 style={{ fontSize: '25px', fontWeight: 'bold', marginLeft: '10px' }}>Añadir Producto</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    {
                        ['Tipo', 'Nombre', 'Descripción', 'Precio', 'Unidades', 'Imagen'].map((label, index) => {
                            return (
                                <div key={index} style={{ marginBottom: '10px' }}>
                                    <label style={{ marginBottom: '5px', fontSize: '16px' }}>{label}</label>
                                    {label === 'Tipo' ? (
                                        <select style={{ padding: '5px', fontSize: '16px', borderRadius: '5px', width: '100%' }} onChange={handleTypeChange} value={selectedType}>
                                            {productType.map((content, index) => (
                                                <option key={index} value={content.value}>
                                                    {content.value}
                                                </option>
                                            ))}
                                        </select>
                                    ) : label === 'Imagen' ? (
                                        <input type={'file'} accept={'image/*'} ref={imgRef} onChange={handleImage} />
                                    ) : label === 'Precio' || label === 'Unidades' ? (
                                        <input type='number' style={{ padding: '5px', fontSize: '16px', borderRadius: '5px', width: '100%' }} onChange={label === 'Precio' ? handlePrecioChange : handleUnidadesChange} />
                                    ) : label === 'Nombre' || label === 'Descripción' ? (
                                        <input type='text' style={{ padding: '5px', fontSize: '16px', borderRadius: '5px', width: '100%' }} onChange={label === 'Nombre' ? handleNombreChange : handleDescripcionChange} />
                                    ) : null}
                                </div>
                            )
                        })
                    }
                    <button style={{ backgroundColor: '#00a2ff', padding: '0.5em 1em', borderRadius: '5px', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '18px', marginTop: '10px', cursor: 'pointer' }} onClick={() => insertProduct(selectedType)}>
                        Añadir Producto
                    </button>
                </div>
            </div>
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
}

export default ProductModal;