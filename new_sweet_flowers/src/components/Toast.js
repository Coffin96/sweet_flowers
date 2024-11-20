import React, { useState, useEffect } from 'react';
import '../styles/Toast.scss';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return isVisible ? (
        <div className={`toast ${type}`}>
            <p>{message}</p>
            <button onClick={() => setIsVisible(false)}>×</button>
        </div>
    ) : null;
};

export default Toast;
