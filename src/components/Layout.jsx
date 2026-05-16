import { NavLink, Outlet } from 'react-router-dom'
import styles from './Layout.module.css'

export default function Layout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.logo}>Projeto em React - AULA 25 </span>
          <nav className={styles.nav}>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/cadastro"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              Cadastro
            </NavLink>
          </nav>
        </div>
      </header>

      <main className={styles.content}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <span>© Aplicações WEB - 2025</span>
      </footer>
    </div>
  )
}