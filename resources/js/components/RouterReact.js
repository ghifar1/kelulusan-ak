import { Route, Router, Routes } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import Login from "./Pages/Login";
import Welcome from "./Pages/Welcome";

function RouterReact() {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/logins" element={<Login />} />
            <Route path="/dashboard/*" element={<AuthRouter />} />
        </Routes>
    )
}

export default RouterReact;
