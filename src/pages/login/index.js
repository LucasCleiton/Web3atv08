import React, { useState } from 'react';
import { CContainer, CRow, CCol, CFormInput, CForm, CButton, CAlert } from '@coreui/react';
import { Link, useNavigate } from 'react-router-dom';
import style from "../login/login.module.css";
import Imagem from "../../public/imagem.png";
import '@coreui/coreui/dist/css/coreui.min.css';
// Import Firebase auth functions
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const [formData, setFormData] = useState({
        email: '',
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
        const { email, senha } = formData;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;
            setAlert({
                visible: true,
                message: 'Login realizado com sucesso!',
                color: 'success',
            });
            navigate('/home');
        } catch (error) {
            setAlert({
                visible: true,
                message: `Login invalido`,
                color: 'danger',
            });
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
                            name="email"
                            value={formData.email}
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
