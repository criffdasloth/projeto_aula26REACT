import { Link } from 'react-router-dom'
import styles from './Home.module.css'

export default function Home() {
  return (
    <section className={styles.home}>

      <div className={styles.homeHeader}>
        <p className={styles.homeLabel}>Sistema de cadastro</p>
        <h1 className={styles.homeTitle}>Bem-vindo</h1>
        <p className={styles.homeDesc}>
          Gerencie cadastros de forma simples e rápida.<br />
          Preencha o formulário com seus dados pessoais.
        </p>
        <Link to="/cadastro" className={styles.btnPrimary}>
          Ir para Cadastro →
        </Link>
      </div>

      <div className={styles.homeCards}>
        <div className={styles.card}>
          <span className={styles.cardIcon}>◎</span>
          <h3>Simples</h3>
          <p>Formulário direto com apenas os campos essenciais.</p>
        </div>
        <div className={styles.card}>
          <span className={styles.cardIcon}>◈</span>
          <h3>Rápido</h3>
          <p>Navegação sem recarregar a página usando React Router.</p>
        </div>
        <div className={styles.card}>
          <span className={styles.cardIcon}>◉</span>
          <h3>Organizado</h3>
          <p>Componentes separados para cada página da aplicação.</p>
        </div>
      </div>

    </section>
  )
}