import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export function Welcome() {
    return (
        <div className="page">
            <div className="container">
                <div className="header">IT 02-3</div>

                <p className="welcome">Welcome, User: {localStorage.getItem("username")} !</p>
            </div>
        </div>
    );
}