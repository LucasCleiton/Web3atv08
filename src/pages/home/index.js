import React, { useEffect, useState } from 'react';
import '@coreui/coreui/dist/css/coreui.min.css';
import { CIcon } from '@coreui/icons-react';
import { cilUser, cilXCircle } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import style from "../home/home.module.css";
import {
    CContainer, CRow, CCol, CButton,
    CTable, CTableHead, CTableRow,
    CTableHeaderCell, CTableDataCell, CTableBody,
    CAvatar
} from '@coreui/react';
import Imagem from "../../public/imagem.png";


import { auth } from '../firebase';
import { signOut } from "firebase/auth";

function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser({
                uid: currentUser.uid,
                email: currentUser.email,
                name: currentUser.displayName || "Usuário:" // Se o nome não estiver disponível, exibe um texto padrão
            });
        }
    }, []);

    // Função para deslogar o usuário
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log('Usuário deslogado com sucesso');
                navigate('/'); // Navega de volta para a página inicial ou de login
            })
            .catch((error) => {
                console.error('Erro ao deslogar:', error);
            });
    };

    return (
        <CContainer fluid className={style.CContainer}>
            <CRow>
                <CCol xs="12" md="6" className={style.CRowimg}>
                    <img src={Imagem} alt="img" />
                </CCol>

                <CCol xs="12" md="6" className={style.CRowlogin}>
                    <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">
                                    <CIcon icon={cilUser} size="xl" />
                                </CTableHeaderCell>
                                <CTableHeaderCell scope="col">User</CTableHeaderCell>
                                <CTableHeaderCell scope="col">
                                    <CButton color="primary" onClick={handleLogout}>
                                        <CIcon icon={cilXCircle} size="xl" />
                                    </CButton>
                                </CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>

                        <CTableBody>
                            {user && (
                                <CTableRow key={user.uid}>
                                    <CTableDataCell>
                                        <CAvatar color="primary" textColor="white">
                                            {user.name ? user.name[0] : 'U'}
                                        </CAvatar>
                                    </CTableDataCell>
                                    <CTableDataCell>{user.name}</CTableDataCell>
                                    <CTableDataCell>{user.email}</CTableDataCell>
                                </CTableRow>
                            )}
                        </CTableBody>
                    </CTable>
                </CCol>
            </CRow>
        </CContainer>
    );
}

export default Home;
