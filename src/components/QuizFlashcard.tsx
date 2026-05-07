import type {QuizCard} from "../api/quiz.ts";
import {
  backCardWrapperClasses, cardExampleClasses, cardImgClasses, cardNameClasses,
  cardOverlayClasses,
  cardTranslationClasses, cardWrapperClasses,
  flipPromptClasses,
  frontCardWrapperClasses,
  newBadgeClasses
} from "../styles.ts";
import {useLang} from "../lang";
import {getImageUrl} from "../api";

interface QuizFlashcardProps {
  card: QuizCard
  flipped: boolean
  onFlip: () => void
}

/**
 * Quiz-mode flashcard.
 *
 * Front: image + English translation + "What's the Finnish word?" prompt.
 * Back:  image + Finnish word + example sentence.
 *
 * The parent owns `flipped` so it can drive the quiz flow (grade buttons appear only after flip;
 * flip resets when advancing to the next card).
 * Reuses the `.flashcard-*` classes defined in `src/index.css` so the 3D animation matches the existing
 * `Flashcard` component exactly.
 *
 * A small "New" badge is rendered in the top-right when `card.isNew` is true —
 * this is the user's first encounter with the card.
 */
export function QuizFlashcard({ card, flipped, onFlip }: QuizFlashcardProps) {
  const { L } = useLang()
  const imageUrl = getImageUrl(card.imageUrl)

  return (
    <div
      className={`${cardWrapperClasses} relative`}
      onClick={onFlip}
    >
      {card.isNew && (
        <span className={newBadgeClasses}>
          {L.newCard}
        </span>
      )}
      <div className={`flashcard-inner${flipped ? ' flipped' : ''}`}>
        {/* Front — English translation + prompt */}
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
            <p className="text-[0.78rem] font-semibold text-flash-front-text text-center m-0 mt-1">
              {L.whatsTheFinnishWord}
            </p>
            <p className={flipPromptClasses}>
              {L.tapToFlip}
            </p>
          </div>
        </div>

        {/* Back — Finnish word + example sentence */}
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