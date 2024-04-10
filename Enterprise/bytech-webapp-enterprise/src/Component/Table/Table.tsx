'use client'

import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function Table() {
    const [dataWorkers, setDataWorkers] = useState([]);
    const [workerInfo, setWorkerInfo] = useState<any[]>([]); // Inicializado con un tipo más genérico

    const getIdWorkers = async () => {
        try {
            const idEnterprise = localStorage.getItem('idEnterprise');
            const enterpriseResponse = await fetch(`http://localhost:8000/enterprise/${idEnterprise}`);
            if (!enterpriseResponse.ok) {
                throw new Error('Failed to fetch enterprise data');
            }

            const enterpriseData = await enterpriseResponse.json();
            setDataWorkers(enterpriseData.workers);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getInfoUser = async () => {
        const infoArray = [];
        for (const workerId of dataWorkers) {
            try {
                const response = await fetch(`http://localhost:8000/user/${workerId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData = await response.json();
                infoArray.push(userData);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        setWorkerInfo(infoArray);
    };

    const deleteWorker = async (index:number) => {
        try {
            const idEnterprise = localStorage.getItem('idEnterprise');
            const response = await fetch(`http://localhost:8000/enterprise/${idEnterprise}/deleteWorker/${index}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                const updatedWorkerInfo = [...workerInfo];
                updatedWorkerInfo.splice(index, 1);
                setWorkerInfo(updatedWorkerInfo);
            } else {
                console.error('Failed to delete worker:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting worker:', error);
        }
    }
    

    useEffect(() => {
        getIdWorkers();
        if (dataWorkers.length > 0) {
            getInfoUser();
        }
    }, [dataWorkers]);


    return (
        <div style={{ overflowX: 'auto', width: "100%", height: '72vh' }}>
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                height: '72vh',
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
                    {workerInfo.map((worker, index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                            <td style={{ padding: '12px', textAlign: 'left' }}>{worker.firstName}</td>
                            <td style={{ padding: '12px', textAlign: 'left' }}>{worker.lastName}</td>
                            <td style={{ padding: '12px', textAlign: 'left' }}>{worker.email}</td>
                            <td style={{ padding: '12px', textAlign: 'left' }}>{worker.rol}</td>
                            <td><button onClick={() => deleteWorker(index)}><FaTrash /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}
