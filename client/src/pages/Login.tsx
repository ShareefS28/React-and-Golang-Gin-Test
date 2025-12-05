import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axios";

export function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("/login", { username: user, password: password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      navigate("/welcome");
    } catch(err: any) {
      alert("Login failed: " + err.response?.data?.error);
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="header">IT 02-1</div>

        <div className="login-box">
          <div className="form-group">
            <label>User</label>
            <input type="text" onChange={(e) => setUser(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button className="login-btn" onClick={handleLogin}>
            ลงชื่อเข้าใช้งาน
          </button>

          <Link to="/register" className="register-link">
            สมัครสมาชิก
          </Link>
        </div>
      </div>
    </div>
  );
}