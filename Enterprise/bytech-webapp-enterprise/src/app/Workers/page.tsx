'use client'
import { useState, useEffect } from "react";
import Table from "@/Component/Table/Table";
import NavBar from "@/Component/NavBar/Navbar";
import Footer from "@/Component/Footer/Footer";
import WorkerModal from "@/Component/Modal/WorkerModal";
import { Button, Modal } from "@mui/material";

export default function Workers() {
    const [nameEnterprise, setNameEnterprise] = useState<string>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchEnterpriseData = async () => {
        try {
            const idUser = localStorage.getItem('idUser');

            const userResponse = await fetch(`http://localhost:8000/user/${idUser}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (userResponse.ok) {
                const data = await userResponse.json();
                const enterpriseResponse = await fetch(`http://localhost:8000/enterprise/${data.enterprise}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                if (enterpriseResponse.ok) {
                    const dataEnterprise = await enterpriseResponse.json();
                    setNameEnterprise(dataEnterprise.nombre);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchEnterpriseData();
    }, []);

    return (
        <div>
            <NavBar />
            <div style={{
                backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '70%',
                padding: '1.5rem', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', margin: '0 auto', marginTop: '5rem'
            }}>
                <h1 style={{ marginBottom: '1rem', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', }}>{nameEnterprise}</h1>


                <Button onClick={openModal} style={{ alignSelf: 'flex-end' }}>Añadir Trabajador</Button>
                <Table />
                <Modal
                    open={isModalOpen}
                    onClose={closeModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <WorkerModal closeModal={closeModal} />
                </Modal>
            </div>
            <Footer />
        </div>


    );
}