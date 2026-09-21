import { useState } from 'react'
import NamePage from './NamePage.jsx'
import QuestionPage from './QuestionPage.jsx'

// {name} is replaced with the player's name.
const QUESTIONS = [
  { emoji: '👋', text: 'Hey {name}! ትወጂኛለሽ ፣ አቶጂኝም?' },
  { emoji: '🍕', text: '{name}, እሩም እንያዝ ፣ አንያዝ?' },
  { emoji: '😎', text: 'በኮንዶም ይሁን ፣ በመላጣዉ?' },
  { emoji: '🎉', text: 'ትሰጪኛለሽ ፣ አሰጪኝም?' },
  { emoji: '💖', text: 'እንደግመዋለ፣ አንደግመዉም?' },
]

export default function App() {
  // page 0 = name, pages 1-5 = questions, page 6 = finale
  const [page, setPage] = useState(0)
  const [name, setName] = useState('')

  const next = () => setPage((p) => p + 1)

  if (page === 0) {
    return (
      <NamePage
        onSubmit={(n) => {
          setName(n)
          next()
        }}
      />
    )
  }

  if (page <= QUESTIONS.length) {
    const q = QUESTIONS[page - 1]
    return (
      <QuestionPage
        key={page}
        step={page}
        total={QUESTIONS.length}
        emoji={q.emoji}
        text={q.text.replaceAll('{name}', name)}
        onYes={next}
      />
    )
  }

  return (
    <main className="page">
      <div className="card">
        <div className="emoji">🥳</div>
        <h1>Yay, {name}!</h1>
        <p>You said yes to everything. Knew you would!</p>
        <button className="btn yes" onClick={() => setPage(0)}>
          Play again
        </button>
      </div>
    </main>
  )
}
