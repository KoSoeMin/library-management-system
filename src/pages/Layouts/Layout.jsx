import { createRef, useMemo } from 'react'
import { Outlet, useLocation} from 'react-router'
import Navbar from '../../components/Navbar'
import { SwitchTransition, CSSTransition } from "react-transition-group";
import useTheme from '../../hooks/useTheme'
import './style.css';

export default function Layout() {

  const location = useLocation();
  const nodeRef = useMemo(() => createRef(), [location.pathname]);
  const { theme } = useTheme();

  return (
    <div className={`app-shell theme-${theme}`} data-theme={theme}>
        <Navbar/>

        <SwitchTransition>
          <CSSTransition timeout={200} classNames='fade' key={location.pathname} nodeRef={nodeRef}>
            <div ref={nodeRef} className="max-w-6xl mx-auto p-3">
                {/* Dynamin router changes content */}
                <Outlet/>
            </div>
          </CSSTransition>
        </SwitchTransition>
    
    </div>
  )
}
