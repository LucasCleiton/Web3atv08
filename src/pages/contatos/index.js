import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@coreui/coreui/dist/css/coreui.min.css';
import { CIcon } from '@coreui/icons-react';
import { cilUser, cilPlus } from '@coreui/icons';
import { Link } from 'react-router-dom';
import style from "../cadastroContatos/cadastroContatos.module.css";
import {
    CContainer, CRow, CCol, CButton,
    CTable, CTableHead, CTableRow,
    CTableHeaderCell, CTableDataCell, CTableBody,
    CAvatar
} from '@coreui/react';
import Imagem from "../../public/imagem.png";

function Contatos() {
    const [contatos, setContatos] = useState([]);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        // Obtém os contatos e o userId do usuário atual
        axios.get('http://localhost:3000/users')
            .then(response => {
                const allContacts = response.data.reduce((acc, user) => {
                    if (user.contatos) {
                        acc.push(...user.contatos.map(contato => ({ ...contato, userId: user.id })));
                    }
                    return acc;
                }, []);
                setContatos(allContacts);
                if (response.data.length > 0) {
                    // Define um userId padrão, ou você pode escolher um userId específico
                    setUserId(response.data[0].id);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar os contatos:', error);
            });
    }, []);

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
                                    <Link to={`/cadastroContato/${userId}`}>
                                        <CButton color="primary">
                                            <CIcon icon={cilPlus} size="xl" />
                                        </CButton>
                                    </Link>
                                </CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>

                        <CTableBody>
                            {contatos.map(contato => (
                                <CTableRow key={contato.id}>
                                    <CTableDataCell><CAvatar color="primary" textColor="white">CON</CAvatar></CTableDataCell>
                                    <CTableDataCell>{contato.nome}</CTableDataCell>
                                    <CTableDataCell>
                                        <Link to={`/editarContato/${contato.userId}/${contato.id}`}>
                                            Editar
                                        </Link>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </CCol>
            </CRow>
        </CContainer>
    );
}

export default Contatos;
