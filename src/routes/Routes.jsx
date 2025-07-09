import { Route, Routes } from "react-router-dom";
import Cronometro from "../pages/Cronometro/Cronometro";
import CronometrosLineas from "../pages/CronometrosLineas/CronometrosLineas";

const MyRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Cronometro/>}/>
                <Route path="/cronometro-por-lineas" element={<CronometrosLineas/>}/>
            </Routes>
        </>
    )
}

export default MyRoutes