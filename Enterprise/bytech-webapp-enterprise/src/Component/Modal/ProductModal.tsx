import React, { useState, useRef, useEffect } from 'react';
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
    const imgRef = useRef(null);
    const [imagenData, setImagenData] = useState<string>();
    const [inputPrecio, setInputPrecio] = useState<number>();
    const [inputUnidades, setInputUnidades] = useState<number>();
    const [inputNombre, setInputNombre] = useState<string>();
    const [inputDescripcion, setInputDescripcion] = useState<string>();

    const handleTypeChange = (event: any) => {
        setSelectedType(event.target.value);
    }

    const handleImage = () => {
        const img = imgRef.current?.files[0];
        const fileName = img.name;
        if (img) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const imageDataUrl = event.target?.result;
                console.log('ImageSrc: ', imageDataUrl);
                setImagenData(imageDataUrl as string);
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
        let field,value;
        if (!inputPrecio || !inputUnidades || !inputNombre || !inputDescripcion || !imagenData) {
            console.log('precio',inputPrecio);
            console.log('unida',inputUnidades);
            console.log('nombnre',inputNombre);
            console.log('desc',inputDescripcion);
            console.log(imagenData);
            toast.error('Por favor completa todos los campos.');
            return;
        }
        if (type === 'Ordenador') {
            field='ordenador';
            value='insertOrdenador';
        } else if (type === "Componente") {
            field="componente";
            value='insertComponente';
        } else if (type === 'Gaming') {
            field='gaming';
            value='insertGaming';
        } else {
            field='smartphone';
            value='insertSmartphone';
        }

        console.log('field',field);
        console.log('value',value);
        try {
            const response = await fetch(`http://localhost:8000/${field}/${value}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre: inputNombre, descripcion: inputDescripcion, precio: inputPrecio, unidades: inputUnidades, fabricante: idEnterprise, image: imagenData })
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
    useEffect(() => {
    },[selectedType]);
    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: 'auto' }}>
            <div style={{ backgroundColor: 'white', padding: '1em', borderRadius: '10px', marginTop: '5%', display: 'flex', flexDirection: 'column', width: '30%' }}>
                <span className="close" onClick={closeModal} style={{ cursor: 'pointer' }}>&times;</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5em' }}>
                    <Image src={imgLogo} alt="Logo" width="65" height="65" />
                    <h3 style={{ fontSize: '25px', fontWeight: 'bold' }}>Añadir Producto</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {
                        ['Tipo', 'Nombre', 'Descripcion', 'Precio', 'Unidades', 'Imagen'].map((label, index) => {
                            return (
                                <div key={index}>

                                    <label>{label}</label>
                                    {label === 'Tipo' ? (
                                        <select onChange={handleTypeChange} value={selectedType}>
                                            {productType.map((content, index) => (
                                                <option key={index} value={content.value}>
                                                    {content.value}
                                                </option>
                                            ))}
                                        </select>
                                    ) : label === 'Imagen' ? (
                                        <input type={'file'} accept={'image/*'} ref={imgRef} onChange={handleImage} />
                                    ) : label === 'Precio' ? (
                                        <input type='number' onChange={handlePrecioChange} />
                                    ) : label === 'Unidades' ? (
                                        <input type='number' onChange={handleUnidadesChange} />
                                    ) : label === 'Nombre' ? (
                                        <input type='text' onChange={handleNombreChange} />
                                    ) : label === 'Descripcion' ? (
                                        <input type='text' onChange={handleDescripcionChange} />
                                    ) : null}


                                </div>
                            )
                        })

                    }

                    <p>{selectedType}</p>
                    <button style={{ backgroundColor: '#00a2ff', padding: '0.3em 0', borderRadius: '3px', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '16px', marginTop: '3%' }} onClick={() => insertProduct(selectedType)}>
                        Añadir Producto
                    </button>
                </div>
            </div>
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
}

export default ProductModal;
