import { useState } from 'react'
import type { TopicResponse } from '../types'
import { Link } from 'react-router-dom'
import { topicImages } from '../assets/topics'
import { useTheme } from '../theme/index.tsx'

interface TopicCardProps {
  topic: TopicResponse
}

export function TopicCard({ topic }: TopicCardProps) {
  const { th } = useTheme()
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={`/topics/${topic.id}`}
      style={{
        display: 'block', textDecoration: 'none',
        background: th.surface, border: `1px solid ${th.border}`,
        borderRadius: '16px', overflow: 'hidden', cursor: 'pointer',
        boxShadow: hovered ? th.cardShadowHover : th.cardShadow,
        transform: hovered ? 'scale(1.025) translateY(-2px)' : 'scale(1)',
        transition: 'box-shadow 200ms ease, transform 200ms ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
        <img
          src={topicImages[topic.id]}
          alt={topic.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 350ms ease',
          }}
        />
      </div>
      <div style={{ padding: '14px 18px 16px' }}>
        <p style={{ fontSize: '1.05rem', fontWeight: 700, color: th.text, margin: 0, textWrap: 'pretty' } as React.CSSProperties}>
          {topic.name}
        </p>
      </div>
    </Link>
  )
}
