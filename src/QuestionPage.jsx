import { useRef, useState } from 'react'

const TAUNTS = [
  'Nope, try again 😏',
  'Too slow!',
  "Can't catch me 🏃",
  'Missed!',
  'Wrong button 😜',
  'Just press Yes 👉',
]

const MARGIN = 12

export default function QuestionPage({ step, total, emoji, text, onYes }) {
  const yesRef = useRef(null)
  const noRef = useRef(null)
  const [pos, setPos] = useState(null) // null = sits next to Yes until first dodge
  const [dodges, setDodges] = useState(0)

  // Jump the No button to a random spot on screen, away from the Yes button.
  const dodge = () => {
    const no = noRef.current.getBoundingClientRect()
    const yes = yesRef.current.getBoundingClientRect()
    const maxX = window.innerWidth - no.width - MARGIN
    const maxY = window.innerHeight - no.height - MARGIN

    let x = MARGIN
    let y = MARGIN
    for (let i = 0; i < 20; i++) {
      x = MARGIN + Math.random() * Math.max(0, maxX - MARGIN)
      y = MARGIN + Math.random() * Math.max(0, maxY - MARGIN)
      const overlapsYes =
        x < yes.right + 16 &&
        x + no.width > yes.left - 16 &&
        y < yes.bottom + 16 &&
        y + no.height > yes.top - 16
      if (!overlapsYes) break
    }
    setPos({ x, y })
    setDodges((d) => d + 1)
  }

  // Fires before a click on both mouse and touch, so the button is gone before it can be clicked.
  const block = (e) => {
    e.preventDefault()
    dodge()
  }

  const noStyle = pos
    ? { position: 'fixed', left: pos.x, top: pos.y, zIndex: 10 }
    : undefined

  return (
    <main className="page">
      <div className="card">
        <div className="progress">
          Question {step} of {total}
        </div>
        <div className="emoji">{emoji}</div>
        <h1>{text}</h1>

        <div className="buttons">
          <button
            ref={yesRef}
            className="btn yes"
            onClick={onYes}
            style={{ transform: `scale(${Math.min(1 + dodges * 0.06, 1.5)})` }}
          >
            Yes 💚
          </button>
          <button
            ref={noRef}
            className="btn no"
            style={noStyle}
            onPointerEnter={dodge}
            onPointerDown={block}
            onTouchStart={block}
            onMouseDown={block}
            onFocus={dodge}
            onClick={block}
          >
            No
          </button>
        </div>

        <p className="taunt">{dodges > 0 ? TAUNTS[(dodges - 1) % TAUNTS.length] : ' '}</p>
      </div>
    </main>
  )
}
