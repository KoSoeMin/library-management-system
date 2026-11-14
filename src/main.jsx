import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthContextProvider } from './contexts/AuthContext';
import Router from './router/index.jsx'
import router from './router'


createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
        <ThemeProvider>
            <Router/>
        </ThemeProvider>
    </AuthContextProvider>
)
