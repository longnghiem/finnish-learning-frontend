import {useState} from 'react'
import type {CardResponse} from '../types'
import {getImageUrl} from '../api'
import {useLang} from '../lang'
import {
  backCardWrapperClasses, cardExampleClasses, cardImgClasses, cardNameClasses,
  cardOverlayClasses,
  cardTranslationClasses, cardWrapperClasses,
  flipPromptClasses,
  frontCardWrapperClasses
} from "../styles.ts";

interface FlashcardProps {
  card: CardResponse
}

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
      className={cardWrapperClasses}
      onClick={() => setFlipped(f => !f)}
    >
      <div className={`flashcard-inner${flipped ? ' flipped' : ''}`}>
        {/* Front */}
        <div className={frontCardWrapperClasses}>
          <img
            src={imageUrl}
            alt={card.translation}
            className={cardImgClasses}
          />
          <div className={cardOverlayClasses}>
            <p className={cardTranslationClasses}>
              {card.translation}
            </p>
            <p className={flipPromptClasses}>
              {L.tapToFlip}
            </p>
          </div>
        </div>

        {/* Back */}
        <div className={backCardWrapperClasses}>
          <img
            src={imageUrl}
            alt={card.name}
            className={cardImgClasses}
          />
          <div className={cardOverlayClasses}>
            <p className={cardNameClasses}>
              {card.name}
            </p>
            <p className={cardExampleClasses}>
              {card.exampleSentence}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}