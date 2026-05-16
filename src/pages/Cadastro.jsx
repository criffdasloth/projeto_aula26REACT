import { useState } from 'react'
import styles from './Cadastro.module.css'

const initialForm = { nome: '', cpf: '', telefone: '', rg: '', endereco: '' }

function formatCpf(value) {
  value = value.replace(/\D/g, '').slice(0, 11)
  return value
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

function formatTelefone(value) {
  value = value.replace(/\D/g, '').slice(0, 11)
  if (value.length <= 10) {
    return value.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2')
  }
  return value.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2')
}

function formatRg(value) {
  value = value.replace(/\D/g, '').slice(0, 9)
  return value
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1})$/, '$1-$2')
}

function isValid(form) {
  return (
    form.nome.trim() &&
    form.cpf.length === 14 &&
    form.telefone.length >= 13 &&
    form.rg.length >= 9 &&
    form.endereco.trim()
  )
}

export default function Cadastro() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    let formatted = value
    if (name === 'cpf') formatted = formatCpf(value)
    if (name === 'telefone') formatted = formatTelefone(value)
    if (name === 'rg') formatted = formatRg(value)
    setForm(prev => ({ ...prev, [name]: formatted }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    if (!isValid(form)) return

    console.log('Dados cadastrados:', form)
    setSuccess(true)
    setTimeout(() => {
      setForm(initialForm)
      setSubmitted(false)
      setSuccess(false)
    }, 3000)
  }

  function fieldClass(valid) {
    return `${styles.field} ${submitted && !valid ? styles.fieldError : ''}`
  }

  return (
    <section className={styles.cadastro}>

      <div className={styles.cadastroHeader}>
        <h1 className={styles.cadastroTitle}>Cadastro</h1>
        <p className={styles.cadastroDesc}>Preencha todos os campos abaixo para efetuar o cadastro.</p>
      </div>

      {success && (
        <div className={`${styles.alert} ${styles.alertSuccess}`}>
          ✓ Cadastro realizado com sucesso!
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>

        {/* Nome */}
        <div className={fieldClass(form.nome.trim())}>
          <label className={styles.label} htmlFor="nome">Nome completo</label>
          <input
            className={styles.input}
            id="nome"
            name="nome"
            type="text"
            value={form.nome}
            onChange={handleChange}
            placeholder="Ex: João da Silva"
            autoComplete="name"
          />
          {submitted && !form.nome.trim() && (
            <span className={styles.errorMsg}>Nome é obrigatório.</span>
          )}
        </div>

        {/* CPF */}
        <div className={fieldClass(form.cpf.length === 14)}>
          <label className={styles.label} htmlFor="cpf">CPF</label>
          <input
            className={styles.input}
            id="cpf"
            name="cpf"
            type="text"
            value={form.cpf}
            onChange={handleChange}
            placeholder="000.000.000-00"
            maxLength={14}
            autoComplete="off"
          />
          {submitted && form.cpf.length < 14 && (
            <span className={styles.errorMsg}>CPF inválido ou incompleto.</span>
          )}
        </div>

        {/* RG */}
        <div className={fieldClass(form.rg.length >= 9)}>
          <label className={styles.label} htmlFor="rg">RG</label>
          <input
            className={styles.input}
            id="rg"
            name="rg"
            type="text"
            value={form.rg}
            onChange={handleChange}
            placeholder="00.000.000-0"
            maxLength={12}
            autoComplete="off"
          />
          {submitted && form.rg.length < 9 && (
            <span className={styles.errorMsg}>RG inválido ou incompleto.</span>
          )}
        </div>

        {/* Telefone */}
        <div className={fieldClass(form.telefone.length >= 13)}>
          <label className={styles.label} htmlFor="telefone">Telefone</label>
          <input
            className={styles.input}
            id="telefone"
            name="telefone"
            type="text"
            value={form.telefone}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
            maxLength={15}
            autoComplete="tel"
          />
          {submitted && form.telefone.length < 13 && (
            <span className={styles.errorMsg}>Telefone inválido ou incompleto.</span>
          )}
        </div>

        {/* Endereço */}
        <div className={fieldClass(form.endereco.trim())}>
          <label className={styles.label} htmlFor="endereco">Endereço</label>
          <input
            className={styles.input}
            id="endereco"
            name="endereco"
            type="text"
            value={form.endereco}
            onChange={handleChange}
            placeholder="Rua, número, bairro, cidade – UF"
            autoComplete="street-address"
          />
          {submitted && !form.endereco.trim() && (
            <span className={styles.errorMsg}>Endereço é obrigatório.</span>
          )}
        </div>

        <div className={styles.formFooter}>
          <button className={styles.btnSubmit} type="submit">
            Cadastrar
          </button>
        </div>

      </form>
    </section>
  )
}