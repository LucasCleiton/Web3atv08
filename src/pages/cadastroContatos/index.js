import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '@coreui/coreui/dist/css/coreui.min.css';
import style from "../cadastroContatos/cadastroContatos.module.css";
import { CContainer, CRow, CCol, CFormInput, CForm, CButton, CAlert } from '@coreui/react';
import Imagem from "../../public/imagem.png";

function CadastroContato() {
    const { userId } = useParams(); // Obtém o userId dos parâmetros da URL
    const navigate = useNavigate(); // Função para navegação
    const [contato, setContato] = useState({
        nome: '',
        email: '',
        telefone: ''
    });
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

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
                const novoContato = {
                    id: Date.now(), // Gera um ID único para o novo contato
                    ...contato
                };
                // Atualiza a lista de contatos do usuário
                const contatosAtualizados = user.contatos ? [...user.contatos, novoContato] : [novoContato];
                return axios.put(`http://localhost:3000/users/${userId}`, { ...user, contatos: contatosAtualizados });
            })
            .then(() => {
                setMessage('Contato cadastrado com sucesso!');
                setSuccess(true);
                setTimeout(() => navigate('/contatos'), 2000); // Redireciona após 2 segundos
            })
            .catch(error => {
                setMessage('Erro ao cadastrar o contato.');
                setSuccess(false);
                console.error('Erro ao cadastrar o contato:', error);
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
                        <h1>Cadastro de Contato</h1>
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
                        <CButton className={style.CButton} color="primary" type="submit">Salvar</CButton>

                        {message && (
                            <CAlert color={success ? 'success' : 'danger'} className="mt-3">
                                {message}
                            </CAlert>
                        )}
                    </CForm>
                </CCol>
            </CRow>
        </CContainer>
    );
}

export default CadastroContato;
