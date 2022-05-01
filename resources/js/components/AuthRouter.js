import { Route, Router, Routes } from "react-router-dom";
import Admin from "./Pages/Admin";
import Welcome from "./Pages/Welcome";

function AuthRouter() {
    return (
        <Routes>
            <Route path="/" element={<Admin />} />
        </Routes>
    )
}

export default AuthRouter;
