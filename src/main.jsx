import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router';
import './index.css'
import router from './router'
import { ThemeProvider } from './contexts/ThemeContext';



createRoot(document.getElementById('root')).render(

    <ThemeProvider>
        <RouterProvider router={router} />
    </ThemeProvider>
)
