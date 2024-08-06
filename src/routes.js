import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/index";
import Cadastro from "./pages/cadastro/index";
import CadastroContato from "./pages/cadastroContatos/index";
import Contatos from "./pages/contatos/index";
import EditarContato from "./pages/editarContato/index";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/cadastroContato" element={<CadastroContato />} />
                <Route path="/contatos" element={<Contatos />} />
                <Route path="/editarContato/:userId/:contatoId" element={<EditarContato />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
