import { useState, useEffect } from 'react'
import type { CardResponse } from '../types'
import { getImageUrl } from '../api'
import { useTheme } from '../theme/index.tsx'
import { useLang } from '../lang/index.tsx'

interface FlashcardProps {
  card: CardResponse
}

export function Flashcard({ card }: FlashcardProps) {
  const { th } = useTheme()
  const { L } = useLang()
  const [flipped, setFlipped] = useState(false)

  useEffect(() => { setFlipped(false) }, [card.id])

  const imageUrl = getImageUrl(card.imageUrl)

  const overlayBox: React.CSSProperties = {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    background: 'rgba(180,180,180,0.52)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    padding: '14px 20px 18px',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: '5px',
  }

  return (
    <div
      className="flashcard-scene"
      style={{ width: '100%', maxWidth: '300px', height: '460px', margin: '0 auto' }}
      onClick={() => setFlipped(f => !f)}
    >
      <div className={`flashcard-inner${flipped ? ' flipped' : ''}`}>
        {/* Front */}
        <div
          className="flashcard-face"
          style={{ border: `1px solid ${th.border}`, background: th.surfaceAlt, boxShadow: th.flashShadow }}
        >
          <img
            src={imageUrl}
            alt={card.translation}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
          <div style={overlayBox}>
            <p style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1a2636', textAlign: 'center', margin: 0, lineHeight: 1.3, textShadow: '0 1px 2px rgba(255,255,255,0.3)' }}>
              {card.translation}
            </p>
            <p style={{ fontSize: '0.68rem', color: '#3a4a5a', margin: 0, letterSpacing: '0.6px', fontWeight: 600, textTransform: 'uppercase' }}>
              {L.tapToFlip}
            </p>
          </div>
        </div>

        {/* Back */}
        <div
          className="flashcard-face back"
          style={{ border: `2px solid ${th.accent}`, background: th.surfaceAlt, boxShadow: th.flashShadow }}
        >
          <img
            src={imageUrl}
            alt={card.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
          <div style={overlayBox}>
            <p style={{ fontSize: '1.55rem', fontWeight: 800, color: '#2f3d56', textAlign: 'center', margin: 0, lineHeight: 1.2 }}>
              {card.name}
            </p>
            <p style={{ fontSize: '0.82rem', fontStyle: 'italic', color: '#2a3a4a', textAlign: 'center', margin: 0, lineHeight: 1.65 }}>
              {card.exampleSentence}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
