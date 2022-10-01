import { Route, Routes } from "react-router-dom";
import CadastrarUser from "./cadastrar/CadastrarUser";
import InfoUser from "./info/user/InfoUser";
import Lista from "./listar/Lista";

export default function Rotas(){
    return(
        <Routes>
            <Route path="*" element={<Lista/>} />

            <Route path="/cadastrar-user" element={<CadastrarUser/>}/>

            <Route path="/info-user" element={<InfoUser/>}/>
        </Routes>
    )
}