import {useState} from 'react'
import type {CardResponse} from '../types'
import {getImageUrl} from '../api'
import {useLang} from '../lang'

interface FlashcardProps {
  card: CardResponse
}

const overlayClasses = 'absolute bottom-0 left-0 right-0 bg-flash-overlay-bg backdrop-blur-[6px] px-5 pt-3.5 pb-[18px] ' +
  'flex flex-col items-center gap-[5px]'

export function Flashcard({ card }: FlashcardProps) {
  const { L } = useLang()
  const [flipped, setFlipped] = useState(false)
  const [prevCardId, setPrevCardId] = useState(card.id)

  if (prevCardId !== card.id) {
    setPrevCardId(card.id)
    setFlipped(false)
  }

  const imageUrl = getImageUrl(card.imageUrl)

  return (
    <div
      className="flashcard-scene w-full max-w-[300px] h-[460px] mx-auto"
      onClick={() => setFlipped(f => !f)}
    >
      <div className={`flashcard-inner${flipped ? ' flipped' : ''}`}>
        {/* Front */}
        <div className="flashcard-face border border-border bg-surface-alt shadow-flash">
          <img
            src={imageUrl}
            alt={card.translation}
            className="w-full h-full object-cover object-top block"
          />
          <div className={overlayClasses}>
            <p className="text-[1.35rem] font-extrabold text-flash-front-text text-center m-0 leading-[1.3] [text-shadow:0_1px_2px_rgba(255,255,255,0.3)]">
              {card.translation}
            </p>
            <p className="text-[0.68rem] text-flash-front-hint m-0 tracking-[0.6px] font-semibold uppercase">
              {L.tapToFlip}
            </p>
          </div>
        </div>

        {/* Back */}
        <div className="flashcard-face back border-2 border-accent bg-surface-alt shadow-flash">
          <img
            src={imageUrl}
            alt={card.name}
            className="w-full h-full object-cover object-top block"
          />
          <div className={overlayClasses}>
            <p className="text-[1.55rem] font-extrabold text-flash-back-title text-center m-0 leading-[1.2]">
              {card.name}
            </p>
            <p className="text-[0.82rem] italic text-flash-back-text text-center m-0 leading-[1.65]">
              {card.exampleSentence}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}