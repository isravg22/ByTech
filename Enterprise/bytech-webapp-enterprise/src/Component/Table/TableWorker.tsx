'use client'

import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function TableWorker() {
    const [dataWorkers, setDataWorkers] = useState<any[]>([]);
    const idEnterprise=localStorage.getItem('idEnterprise');
    

    const getWorkers = async () => {
        const response= await fetch(`http://localhost:8000/user/enterprise/${idEnterprise}`)
        if(response.ok){
            const data= await response.json();

            setDataWorkers(data);
        }
    };

    const deleteWorker = async (id:number) => {
        try {
            const response = await fetch(`http://localhost:8000/user/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                const updateWorkers=dataWorkers.filter(worker=>worker.id!=id);
                setDataWorkers(updateWorkers);
            } else {
                console.error('Failed to delete worker:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting worker:', error);
        }
    }
    
    useEffect(() => {
        getWorkers();
    }, [dataWorkers]);
    
    return (
        <div style={{ overflowX: 'auto', width: "100%", height: '65vh' }}>
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                height: '65vh',
                fontSize: '16px',
            }}>
                <thead>
                    <tr>
                        <th style={{ backgroundColor: '#f2f2f2', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Nombre</th>
                        <th style={{ backgroundColor: '#f2f2f2', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Apellido</th>
                        <th style={{ backgroundColor: '#f2f2f2', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Correo</th>
                        <th style={{ backgroundColor: '#f2f2f2', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Rol</th>
                        <th style={{ backgroundColor: '#f2f2f2', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {dataWorkers.map((worker, index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                            <td style={{ padding: '12px', textAlign: 'left' }}>{worker.firstName}</td>
                            <td style={{ padding: '12px', textAlign: 'left' }}>{worker.lastName}</td>
                            <td style={{ padding: '12px', textAlign: 'left' }}>{worker.email}</td>
                            <td style={{ padding: '12px', textAlign: 'left' }}>{worker.rol}</td>
                            {
                                worker.rol!='boss'?<td><button onClick={() => deleteWorker(worker.id)}><FaTrash /></button></td>:<td></td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}
