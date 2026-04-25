import { useTopics } from '../hooks'
import { TopicCard } from '../components/TopicCard.tsx'
import { useTheme } from '../theme/index.tsx'
import { useLang } from '../lang/index.tsx'

export function LandingPage() {
  const { data: topics, isLoading, isError } = useTopics()
  const { th } = useTheme()
  const { L } = useLang()

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
        <p style={{ fontSize: '1.1rem', color: th.textMuted }}>Loading topics…</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
        <p style={{ fontSize: '1.1rem', color: th.red }}>Failed to load topics.</p>
      </div>
    )
  }

  return (
    <div className="page-enter" style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 64px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '1.75rem', fontWeight: 800, color: th.text, marginBottom: '8px' }}>
        {L.chooseATopic}
      </h1>
      {topics && (
        <p style={{ textAlign: 'center', color: th.textMuted, fontSize: '0.9rem', marginBottom: '40px', fontWeight: 500 }}>
          {topics.length} topics
        </p>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
        {topics?.map(topic => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  )
}
