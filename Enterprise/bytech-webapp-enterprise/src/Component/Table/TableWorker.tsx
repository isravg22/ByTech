'use client'

import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface TableWorkerProps {
    refreshKey: number;
}

export default function TableWorker({ refreshKey }: TableWorkerProps) {
    const [dataWorkers, setDataWorkers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const idEnterprise = typeof window !== 'undefined' ? localStorage.getItem('idEnterprise') : null;

    const getWorkers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/user/enterprise/${idEnterprise}`);
            if (response.ok) {
                const data = await response.json();
                setDataWorkers(data);
            } else {
                toast.error('Error al obtener los trabajadores');
            }
        } catch (error) {
            toast.error('Error de conexión al obtener los trabajadores');
        } finally {
            setLoading(false);
        }
    };

    const deleteWorker = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8000/user/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setDataWorkers(prev => prev.filter(worker => worker.id !== id));
                toast.success('Trabajador eliminado correctamente');
            } else {
                toast.error('No se pudo eliminar el trabajador');
            }
        } catch (error) {
            toast.error('Error de conexión al eliminar el trabajador');
        }
    };

    useEffect(() => {
        getWorkers();
    }, [refreshKey]);

    return (
        <div style={{
            overflowX: 'auto',
            width: "100%",
            minHeight: '300px',
            background: 'rgba(255,255,255,0.97)',
            borderRadius: 12,
            boxShadow: '0 2px 8px #90caf9',
            marginTop: 12,
            marginBottom: 12,
            padding: '12px 0'
        }}>
            <ToastContainer position="bottom-right" autoClose={4000} />
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '16px',
                background: 'transparent'
            }}>
                <thead>
                    <tr>
                        <th style={thStyle}>Nombre</th>
                        <th style={thStyle}>Apellido</th>
                        <th style={thStyle}>Correo</th>
                        <th style={thStyle}>Rol</th>
                        <th style={thStyle}></th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={5} style={{ textAlign: 'center', padding: '24px', color: '#1976d2', fontWeight: 600 }}>
                                Cargando trabajadores...
                            </td>
                        </tr>
                    ) : dataWorkers.length === 0 ? (
                        <tr>
                            <td colSpan={5} style={{ textAlign: 'center', padding: '24px', color: '#1976d2', fontWeight: 600 }}>
                                No hay trabajadores registrados.
                            </td>
                        </tr>
                    ) : (
                        dataWorkers.map((worker, index) => (
                            <tr key={worker.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                                <td style={tdStyle}>{worker.firstName}</td>
                                <td style={tdStyle}>{worker.lastName}</td>
                                <td style={tdStyle}>{worker.email}</td>
                                <td style={tdStyle}>{worker.rol}</td>
                                <td style={tdStyle}>
                                    {worker.rol !== 'boss' && (
                                        <button
                                            onClick={() => deleteWorker(worker.id)}
                                            style={deleteBtnStyle}
                                            title="Eliminar trabajador"
                                        >
                                            <FaTrash />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

const thStyle: React.CSSProperties = {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 700,
    color: '#1976d2',
    fontSize: '1rem',
    borderBottom: '2px solid #e3f0ff'
};

const tdStyle: React.CSSProperties = {
    padding: '12px',
    textAlign: 'left',
    fontSize: '1rem',
    color: '#1a237e'
};

const deleteBtnStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, #e53935 60%, #ffb3b3 100%)',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    padding: '6px 10px',
    cursor: 'pointer',
    fontSize: 16,
    boxShadow: '0 1px 4px #ffcdd2',
    transition: 'background 0.2s'
};
