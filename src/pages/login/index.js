import React, { useState } from 'react';
import { CContainer, CRow, CCol, CFormInput, CForm, CButton, CAlert } from '@coreui/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from "../login/login.module.css";
import Imagem from "../../public/imagem.png";
import '@coreui/coreui/dist/css/coreui.min.css';

function Login() {
    const [formData, setFormData] = useState({
        login: '',
        senha: '',
    });

    const [alert, setAlert] = useState({
        visible: false,
        message: '',
        color: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:3000/users', {
                params: {
                    email: formData.login,
                    senha: formData.senha,
                }
            });

            if (response.data.length > 0) {
                // Usuário autenticado com sucesso
                navigate('/Contatos');
            } else {
                // Usuário ou senha incorretos
                setAlert({
                    visible: true,
                    message: 'Usuário ou senha incorretos!',
                    color: 'danger',
                });
            }
        } catch (error) {
            setAlert({
                visible: true,
                message: 'Erro ao tentar autenticar o usuário!',
                color: 'danger',
            });
            console.error('Erro ao autenticar usuário:', error);
        }
    };

    return (
        <CContainer fluid className={style.CContainer}>
            <CRow>
                <CCol xs="12" md="6" className={style.CRowimg}>
                    <img src={Imagem} alt="img" />
                </CCol>

                <CCol xs="12" md="6" className={style.CRowlogin}>
                    {alert.visible && (
                        <CAlert color={alert.color}>
                            {alert.message}
                        </CAlert>
                    )}
                    <CForm className={style.CForm} onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <CFormInput
                            className={style.CFormInput}
                            placeholder="Login"
                            aria-label="login"
                            name="login"
                            value={formData.login}
                            onChange={handleChange}
                        />
                        <CFormInput
                            className={style.CFormInput}
                            type="password"
                            placeholder="Senha"
                            aria-label="senha"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                        />
                        <CButton color="primary" type="submit" className={style.CButton}>Acessar</CButton>
                        <Link to="/Cadastro" style={{ width: '100%' }}>
                            <CButton color="primary" type="button" className={style.CButton}>Cadastre-se</CButton>
                        </Link>
                    </CForm>
                </CCol>
            </CRow>
        </CContainer>
    );
}

export default Login;
