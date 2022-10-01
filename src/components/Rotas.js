import { Route, Routes } from "react-router-dom";
import CadastrarUser from "./cadastrar/CadastrarUser";
import Lista from "./Lista";

export default function Rotas(){
    return(
        <Routes>
            <Route path="*" element={<Lista/>} />

            <Route path="/cadastrar-user" element={<CadastrarUser/>}/>
        </Routes>
    )
}