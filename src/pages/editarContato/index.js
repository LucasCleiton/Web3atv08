import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@coreui/coreui/dist/css/coreui.min.css';
import style from "../editarContato/editarContatos.module.css";
import { CContainer, CRow, CCol, CFormInput, CForm, CButton } from '@coreui/react';
import Imagem from "../../public/imagem.png";

function EditarContato() {
    const { userId, contatoId } = useParams();
    const navigate = useNavigate();
    const [contato, setContato] = useState({
        nome: '',
        email: '',
        telefone: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${userId}`)
            .then(response => {
                const user = response.data;
                const contato = user.contatos.find(c => c.id.toString() === contatoId);
                if (contato) {
                    setContato(contato);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o contato:', error);
            });
    }, [userId, contatoId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContato(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:3000/users/${userId}`)
            .then(response => {
                const user = response.data;
                const contatosAtualizados = user.contatos.map(c =>
                    c.id.toString() === contatoId ? { ...c, ...contato } : c
                );
                return axios.put(`http://localhost:3000/users/${userId}`, { ...user, contatos: contatosAtualizados });
            })
            .then(() => {
                navigate('/contatos');
            })
            .catch(error => {
                console.error('Erro ao atualizar o contato:', error);
            });
    };

    const handleDelete = () => {
        axios.get(`http://localhost:3000/users/${userId}`)
            .then(response => {
                const user = response.data;
                const contatosAtualizados = user.contatos.filter(c => c.id.toString() !== contatoId);
                return axios.put(`http://localhost:3000/users/${userId}`, { ...user, contatos: contatosAtualizados });
            })
            .then(() => {
                navigate('/contatos');
            })
            .catch(error => {
                console.error('Erro ao deletar o contato:', error);
            });
    };

    return (
        <CContainer fluid className={style.CContainer}>
            <CRow>
                <CCol xs="12" md="6" className={style.CRowimg}>
                    <img src={Imagem} alt="img" />
                </CCol>
                <CCol xs="12" md="6" className={style.CRowlogin}>
                    <CForm className={style.CForm} onSubmit={handleSubmit}>
                        <h1>Editar Contato</h1>
                        <CFormInput
                            className={style.CFormInput}
                            placeholder="Nome"
                            name="nome"
                            value={contato.nome}
                            onChange={handleChange}
                        />
                        <CFormInput
                            className={style.CFormInput}
                            placeholder="Email"
                            name="email"
                            value={contato.email}
                            onChange={handleChange}
                        />
                        <CFormInput
                            className={style.CFormInput}
                            placeholder="Telefone"
                            name="telefone"
                            value={contato.telefone}
                            onChange={handleChange}
                        />
                        <CButton className={style.CButton} color="info" type="submit">Salvar</CButton>
                        <CButton className={style.CButton} color="danger" type="button" onClick={handleDelete}>Excluir</CButton>
                    </CForm>
                </CCol>
            </CRow>
        </CContainer>
    );
}

export default EditarContato;
