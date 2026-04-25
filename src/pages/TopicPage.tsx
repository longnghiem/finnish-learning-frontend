import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth.ts'
import { useCards, useDeleteCard, useTopics } from '../hooks'
import { useEffect, useState } from 'react'
import type { SearchType } from '../types'
import { ProgressDots } from '../components/ProgressDots.tsx'
import { SearchBar } from '../components/SearchBar.tsx'
import { Flashcard } from '../components/Flashcard.tsx'
import { CardModal } from '../components/CardModal.tsx'
import { ConfirmModal } from '../components/ConfirmModal.tsx'
import { useTheme } from '../theme/index.tsx'
import { useLang } from '../lang/index.tsx'

export function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>()
  const numericTopicId = Number(topicId)
  const navigate = useNavigate()

  const { isLoggedIn } = useAuth()
  const { th } = useTheme()
  const { L } = useLang()
  const { data: topics } = useTopics()
  const topicName = topics?.find(t => t.id === numericTopicId)?.name ?? `Topic ${topicId}`

  const [searchType, setSearchType] = useState<SearchType>('VERB')
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const { data: cards, isLoading, isError } = useCards(
    numericTopicId,
    debouncedSearchTerm ? searchType : undefined,
    debouncedSearchTerm || undefined,
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [prevCards, setPrevCards] = useState(cards)

  if (prevCards !== cards) {
    setPrevCards(cards)
    setCurrentIndex(0)
  }

  const currentCard = cards?.[currentIndex]
  const total = cards?.length ?? 0
  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < total - 1

  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const deleteCard = useDeleteCard()

  const navBtn = (disabled: boolean): React.CSSProperties => ({
    borderRadius: '8px',
    background: disabled ? 'transparent' : th.surfaceAlt,
    color: disabled ? th.textMuted : th.text,
    padding: '8px 18px', fontSize: '0.875rem', fontWeight: 600,
    border: `1px solid ${disabled ? 'transparent' : th.border}`,
    cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
    opacity: disabled ? 0.35 : 1, transition: 'background 150ms',
  })

  const flashcardArea = isLoading ? (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
      <p style={{ fontSize: '1.1rem', color: th.textMuted }}>Loading cards…</p>
    </div>
  ) : isError ? (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
      <p style={{ fontSize: '1.1rem', color: th.red }}>Failed to load cards.</p>
    </div>
  ) : total === 0 ? (
    <div style={{ textAlign: 'center', padding: '72px 0', color: th.textMuted, fontSize: '1rem', fontWeight: 600 }}>
      {L.noCardsFound}
    </div>
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
      {currentCard && <Flashcard key={currentCard.id} card={currentCard} />}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button style={navBtn(!canGoPrev)} disabled={!canGoPrev} onClick={() => setCurrentIndex(i => i - 1)}>
          {L.prev}
        </button>
        <span style={{ fontSize: '0.8rem', color: th.textMuted, fontWeight: 600, minWidth: '52px', textAlign: 'center' }}>
          {L.cardOf(currentIndex + 1, total)}
        </span>
        <button style={navBtn(!canGoNext)} disabled={!canGoNext} onClick={() => setCurrentIndex(i => i + 1)}>
          {L.next}
        </button>
      </div>
      <ProgressDots total={total} current={currentIndex} />
    </div>
  )

  return (
    <div className="page-enter" style={{ maxWidth: '680px', margin: '0 auto', padding: '40px 24px 64px' }}>
      <button
        onClick={() => navigate('/')}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: th.textMuted, fontSize: '0.875rem', fontFamily: 'inherit', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '4px', padding: 0, fontWeight: 600 }}
      >
        {L.allTopics}
      </button>

      <h1 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 800, color: th.text, marginBottom: '28px' }}>
        {topicName}
      </h1>

      <div style={{ marginBottom: '28px' }}>
        <SearchBar
          searchType={searchType}
          searchTerm={searchTerm}
          onSearchTypeChange={t => { setSearchType(t); setSearchTerm('') }}
          onSearchTermChange={setSearchTerm}
        />
      </div>

      {flashcardArea}

      {isLoggedIn && (
        <div style={{ marginTop: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setModalMode('create')}
            style={{ borderRadius: '8px', background: th.green, color: 'white', padding: '9px 20px', fontSize: '0.85rem', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 150ms' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = th.greenHover }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = th.green }}
          >
            {L.createCard}
          </button>
          {currentCard && (
            <>
              <button
                type="button"
                onClick={() => setModalMode('edit')}
                style={{ borderRadius: '8px', background: '#eab308', color: 'white', padding: '9px 20px', fontSize: '0.85rem', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 150ms' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#ca8a04' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#eab308' }}
              >
                {L.edit}
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                style={{ borderRadius: '8px', background: th.red, color: 'white', padding: '9px 20px', fontSize: '0.85rem', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 150ms' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = th.redHover }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = th.red }}
              >
                {L.delete}
              </button>
            </>
          )}
        </div>
      )}

      {modalMode && (
        <CardModal
          mode={modalMode}
          topicId={numericTopicId}
          card={modalMode === 'edit' ? currentCard : undefined}
          onClose={() => setModalMode(null)}
        />
      )}

      {showDeleteConfirm && currentCard && (
        <ConfirmModal
          message={L.deleteConfirmMsg}
          onConfirm={() => {
            deleteCard.mutate(currentCard.id, {
              onSuccess: () => {
                setShowDeleteConfirm(false)
                setCurrentIndex(prev => Math.max(0, prev - 1))
              },
            })
          }}
          onCancel={() => setShowDeleteConfirm(false)}
          isLoading={deleteCard.isPending}
        />
      )}
    </div>
  )
}
