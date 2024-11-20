import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../styles/Login.scss';

const Login = ({ setIsAuthenticated, showToast }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/login', { username, password });
            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);
            showToast('Ви успішно увійшли в систему', 'success');
            history.push('/admin');
        } catch (error) {
            showToast('Помилка входу. Перевірте ваші дані.', 'error');
        }
    };

    return (
        <div className="login-container">
            <h2>Вхід</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ім'я користувача"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Увійти</button>
            </form>
        </div>
    );
};

export default Login;
