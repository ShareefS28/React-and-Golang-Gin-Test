import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export function Register() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password !== confirm) {
            alert("Passwords do not match");
            return;
        }

        try {
            await axios.post("/register", { username: user, password: password})
            alert("Registered successfully!");
            navigate("/")
        } catch (err: any) {
            alert("Register failed: " + err.response?.data?.error);
        }
    }

    return (
     <div className="page">
        <div className="container">
            <div className="header">IT 02-2</div>

            <div className="login-box">
            <div className="form-group">
                <label>User</label>
                <input type="text" onChange={(e) => setUser(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" onChange={(e) => setConfirm(e.target.value)} />
            </div>

            <button className="login-btn" onClick={handleRegister}>
                สมัครสมาชิก
            </button>
            </div>
        </div>
        </div>
    );
}