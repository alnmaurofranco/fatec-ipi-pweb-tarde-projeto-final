import React, { createContext, useEffect, useState } from "react";

import api from "../services/api";
import history from '../history';
import swal from "sweetalert";

const Context = createContext();

function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        }

        setLoading(false);
    }, [])

    async function handleLogin(email, password) {
        // const { data: { token } } = await api.post('/auth/login', { email, password });
        // localStorage.setItem('token', JSON.stringify(token));
        // api.defaults.headers.Authorization = `Bearer ${token}`;
        // setAuthenticated(true);
        // history.push('/dashboard');
        try {
            const response = await api.post('/auth/login', { email, password });
            console.log(response)
            const token = response.data.token;
            localStorage.setItem('token', JSON.stringify(token));
            api.defaults.headers.Authorization = `Bearer ${token}`;
            setAuthenticated(true);
            history.push('/dashboard');
        } catch (error) {
            if (error.response) {
                swal("Ocorreu um erro!", error.response.data.message, "error");
            }
        }
    }

    function handleLogout() {
        setAuthenticated(false);
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = undefined;
        history.push('/login');
    }

    return (
        <Context.Provider value={{ loading, authenticated, handleLogin, handleLogout }}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider };