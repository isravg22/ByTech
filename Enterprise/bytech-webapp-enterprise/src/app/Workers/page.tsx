'use client'
import { useState, useEffect } from "react";
import TableWorker from "@/Component/Table/TableWorker";
import NavBar from "@/Component/NavBar/Navbar";
import Footer from "@/Component/Footer/Footer";
import WorkerModal from "@/Component/Modal/WorkerModal";
import { Button, Modal } from "@mui/material";

export default function Workers() {
    const [nameEnterprise, setNameEnterprise] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleWorkerAdded = () => {
        setRefreshKey(prev => prev + 1);
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchEnterpriseData = async () => {
            try {
                const idUser = localStorage.getItem('idUser');
                const userResponse = await fetch(`http://localhost:8000/user/${idUser}`);
                if (userResponse.ok) {
                    const data = await userResponse.json();
                    const enterpriseResponse = await fetch(`http://localhost:8000/enterprise/${data.enterprise}`);
                    if (enterpriseResponse.ok) {
                        const dataEnterprise = await enterpriseResponse.json();
                        setNameEnterprise(dataEnterprise.nombre);
                    }
                }
            } catch (error) {
                setNameEnterprise('');
            }
        };
        fetchEnterpriseData();
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(120deg, #f5faff 0%, #e3f0ff 100%)',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <NavBar />
            <div style={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '32px 12px 24px 12px'
            }}>
                <div style={{
                    background: 'rgba(255,255,255,0.97)',
                    borderRadius: 18,
                    boxShadow: '0 4px 24px rgba(44, 62, 80, 0.10), 0 1.5px 8px #90caf9',
                    padding: '36px 24px 24px 24px',
                    margin: '40px 0 0 0',
                    width: '100%',
                    maxWidth: 1100,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <h1 style={{
                        marginBottom: '1.5rem',
                        textAlign: 'center',
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: '#1a237e',
                        letterSpacing: '1px'
                    }}>
                        {nameEnterprise ? `Trabajadores de ${nameEnterprise}` : 'Trabajadores'}
                    </h1>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                        <Button
                            variant="contained"
                            style={{
                                background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)',
                                color: 'white',
                                fontWeight: 600,
                                borderRadius: 8,
                                boxShadow: '0 2px 8px #90caf9'
                            }}
                            onClick={openModal}
                        >
                            Añadir Trabajador
                        </Button>
                    </div>
                    <TableWorker refreshKey={refreshKey} />
                    <Modal
                        open={isModalOpen}
                        onClose={closeModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <WorkerModal closeModal={handleWorkerAdded} />
                    </Modal>
                </div>
            </div>
            <Footer />
        </div>
    );
}