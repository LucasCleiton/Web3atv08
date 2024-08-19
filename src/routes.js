import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/index";
import Cadastro from "./pages/cadastro/index";
import Home from "./pages/home/index";

//import CadastroContato from "./pages/cadastroContatos/index";
//import EditarContato from "./pages/editarContato/index";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/home" element={<Home />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
