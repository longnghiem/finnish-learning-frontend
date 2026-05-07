export const inputClasses = 'w-full rounded-lg border border-border-input bg-surface text-text-primary px-3.5 py-2.5 text-sm' +
  ' font-[inherit] outline-none transition-[border-color,box-shadow] duration-150 focus:border-accent focus:ring-2 focus:ring-accent/20'

export const labelClasses = 'block text-[0.78rem] font-bold text-text-sub mb-[5px] tracking-[0.3px] uppercase'

export const submitButtonClasses = 'mt-1 rounded-lg bg-amber text-nav-btn-text px-4.5 py-2.75 text-[0.9rem] font-extrabold ' +
  'border-none cursor-pointer font-[inherit] w-full transition-colors duration-150 hover:bg-amber-hover disabled:opacity-60 disabled:cursor-not-allowed'

// Flash cards
export const cardWrapperClasses = 'flashcard-scene w-full max-w-75 h-115 mx-auto'
export const frontCardWrapperClasses = 'flashcard-face border border-border bg-surface-alt shadow-flash'
export const backCardWrapperClasses = 'flashcard-face back border-2 border-accent bg-surface-alt shadow-flash'
export const cardOverlayClasses = 'absolute bottom-0 left-0 right-0 bg-flash-overlay-bg backdrop-blur-[6px] px-5 pt-3.5 pb-[18px] ' +
  'flex flex-col items-center gap-[5px]'
export const newBadgeClasses = 'absolute top-2 right-2 z-10 rounded-full bg-accent text-white px-2.5 py-0.5 text-[0.65rem] ' +
  'font-bold uppercase tracking-[0.5px] shadow-card'
export const cardTranslationClasses = 'text-[1.35rem] font-extrabold text-flash-front-text text-center m-0 leading-[1.3] ' +
  '[text-shadow:0_1px_2px_rgba(255,255,255,0.3)]'
export const flipPromptClasses = 'text-[0.68rem] text-flash-front-hint m-0 tracking-[0.6px] font-semibold uppercase'
export const cardImgClasses = 'w-full h-full object-cover object-top block'
export const cardNameClasses = 'text-[1.55rem] font-extrabold text-flash-back-title text-center m-0 leading-[1.2]'
export const cardExampleClasses = 'text-[0.82rem] italic text-flash-back-text text-center m-0 leading-[1.65]'