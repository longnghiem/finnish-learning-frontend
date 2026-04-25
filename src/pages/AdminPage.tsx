import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth.ts'
import { useCards, useDeleteCard, useTopics } from '../hooks'
import { CardModal } from '../components/CardModal.tsx'
import { ConfirmModal } from '../components/ConfirmModal.tsx'
import { useTheme } from '../theme/index.tsx'
import { useLang } from '../lang/index.tsx'
import type { CardResponse } from '../types'

export function AdminPage() {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const { th } = useTheme()
  const { L } = useLang()

  useEffect(() => {
    if (!isLoggedIn) navigate('/login', { replace: true })
  }, [isLoggedIn, navigate])

  const { data: topics } = useTopics()
  const { data: cards, isLoading, isError } = useCards()
  const deleteCard = useDeleteCard()

  const [filterTopic, setFilterTopic] = useState<'all' | string>('all')
  const [modalState, setModalState] = useState<{ mode: 'create' | 'edit'; topicId: number; card?: CardResponse } | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<CardResponse | null>(null)

  const topicMap = useMemo(() => {
    const map: Record<number, string> = {}
    topics?.forEach(t => { map[t.id] = t.name })
    return map
  }, [topics])

  const displayed = useMemo(() => {
    if (!cards) return []
    if (filterTopic === 'all') return cards
    return cards.filter(c => c.topicId === Number(filterTopic))
  }, [cards, filterTopic])

  const defaultTopicId = filterTopic !== 'all' ? Number(filterTopic) : (topics?.[0]?.id ?? 1)

  const thCell: React.CSSProperties = {
    padding: '10px 16px', fontSize: '0.75rem', fontWeight: 700, color: th.textMuted,
    textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left',
    borderBottom: `1px solid ${th.border}`, background: th.surfaceAlt,
  }
  const tdCell: React.CSSProperties = {
    padding: '13px 16px', fontSize: '0.875rem', color: th.text,
    borderBottom: `1px solid ${th.border}`, verticalAlign: 'middle',
  }

  return (
    <div className="page-enter" style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px 64px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '14px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: th.text, margin: 0 }}>
          {L.manageCards}
        </h1>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={filterTopic}
            onChange={e => setFilterTopic(e.target.value)}
            style={{
              borderRadius: '8px', border: `1px solid ${th.borderInput}`,
              background: th.surface, color: th.text,
              padding: '8px 12px', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', cursor: 'pointer',
            }}
          >
            <option value="all">{L.allTopicsFilter}</option>
            {topics?.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <button
            onClick={() => setModalState({ mode: 'create', topicId: defaultTopicId })}
            style={{ borderRadius: '8px', background: th.green, color: 'white', padding: '8px 18px', fontSize: '0.875rem', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 150ms' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = th.greenHover }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = th.green }}
          >
            + {L.createCard}
          </button>
        </div>
      </div>

      <div style={{ background: th.surface, borderRadius: '16px', border: `1px solid ${th.border}`, overflow: 'hidden', boxShadow: th.cardShadow }}>
        {isLoading ? (
          <div style={{ padding: '64px', textAlign: 'center', color: th.textMuted, fontSize: '0.9rem', fontWeight: 600 }}>
            Loading…
          </div>
        ) : isError ? (
          <div style={{ padding: '64px', textAlign: 'center', color: th.red, fontSize: '0.9rem', fontWeight: 600 }}>
            Failed to load cards.
          </div>
        ) : displayed.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center', color: th.textMuted, fontSize: '0.9rem', fontWeight: 600 }}>
            {L.noCardsYet}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thCell}>Finnish</th>
                  <th style={thCell}>English</th>
                  <th style={{ ...thCell, minWidth: '220px' }}>Example sentence</th>
                  <th style={{ ...thCell, minWidth: '140px' }}>Topic</th>
                  <th style={{ ...thCell, width: '120px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayed.map((c, i) => (
                  <tr key={c.id} style={{ background: i % 2 === 1 ? th.surfaceAlt : 'transparent' }}>
                    <td style={{ ...tdCell, fontWeight: 700, color: th.accent }}>{c.name}</td>
                    <td style={tdCell}>{c.translation}</td>
                    <td style={{ ...tdCell, fontStyle: 'italic', color: th.textSub, lineHeight: 1.5, maxWidth: '260px' }}>{c.exampleSentence}</td>
                    <td style={{ ...tdCell, fontSize: '0.78rem', color: th.textMuted, fontWeight: 600 }}>{topicMap[c.topicId] ?? `Topic ${c.topicId}`}</td>
                    <td style={{ ...tdCell, textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => setModalState({ mode: 'edit', topicId: c.topicId, card: c })}
                          style={{ borderRadius: '6px', background: '#eab308', color: 'white', padding: '5px 12px', fontSize: '0.78rem', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                        >
                          {L.edit}
                        </button>
                        <button
                          onClick={() => setDeleteTarget(c)}
                          style={{ borderRadius: '6px', background: th.red, color: 'white', padding: '5px 12px', fontSize: '0.78rem', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                        >
                          {L.delete}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <p style={{ marginTop: '12px', fontSize: '0.78rem', color: th.textMuted, fontWeight: 500 }}>
        {displayed.length} card{displayed.length !== 1 ? 's' : ''}
      </p>

      {modalState && (
        <CardModal
          mode={modalState.mode}
          topicId={modalState.topicId}
          card={modalState.card}
          onClose={() => setModalState(null)}
        />
      )}
      {deleteTarget && (
        <ConfirmModal
          message={L.deleteConfirmMsg}
          onConfirm={() => {
            deleteCard.mutate(deleteTarget.id, {
              onSuccess: () => setDeleteTarget(null),
            })
          }}
          onCancel={() => setDeleteTarget(null)}
          isLoading={deleteCard.isPending}
        />
      )}
    </div>
  )
}
