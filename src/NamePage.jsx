import { useState } from 'react'

export default function NamePage({ onSubmit }) {
  const [value, setValue] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) onSubmit(trimmed)
  }

  return (
    <main className="page">
      <form className="card" onSubmit={submit}>
        <div className="emoji">🎮</div>
        <h1>Welcome!</h1>
        <p>What's your name?</p>
        <input
          className="input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your name"
          maxLength={30}
          autoFocus
        />
        <button className="btn yes" type="submit" disabled={!value.trim()}>
          Start
        </button>
      </form>
    </main>
  )
}
