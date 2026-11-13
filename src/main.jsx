import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router';
import './index.css'
import router from './router'
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthContextProvider } from './contexts/AuthContext';


createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    </AuthContextProvider>
)
