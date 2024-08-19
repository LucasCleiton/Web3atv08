import '@coreui/coreui/dist/css/coreui.min.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from "../cadastro/cadastro.module.css";
import { CContainer, CRow, CCol, CFormInput, CForm, CButton, CAlert } from '@coreui/react';
import Imagem from "../../public/imagem.png";

// Import Firebase auth functions
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

function Cadastro() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        senha: '',
    });

    const [alert, setAlert] = useState({
        visible: false,
        message: '',
        color: '',
    });

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
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;
            setAlert({
                visible: true,
                message: 'Usuário cadastrado com sucesso!',
                color: 'success',
            });
            setFormData({ name: '', email: '', senha: '' }); // Limpar os campos do formulário
        } catch (error) {
            setAlert({
                visible: true,
                message: `Erro ao cadastrar usuário: ${error.message}`,
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
                        <h1>Cadastro de Usuário</h1>
                        <CFormInput
                            className={style.CFormInput}
                            placeholder="Nome"
                            aria-label="nome"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <CFormInput
                            className={style.CFormInput}
                            placeholder="Email"
                            aria-label="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <CFormInput
                            className={style.CFormInput}
                            placeholder="Senha"
                            aria-label="senha"
                            name="senha"
                            type="password"
                            value={formData.senha}
                            onChange={handleChange}
                        />

                        <CButton className={style.CButton} color="primary" type="submit">Cadastrar</CButton>
                        <Link to="/" style={{ width: '100%' }}>
                            <CButton className={style.CButton} color="primary" type="">Voltar</CButton>
                        </Link>
                    </CForm>
                </CCol>
            </CRow>
        </CContainer>
    );
}

export default Cadastro;
