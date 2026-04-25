import { useTheme } from '../theme/index.tsx'

interface ProgressDotsProps {
  total: number
  current: number
}

export function ProgressDots({ total, current }: ProgressDotsProps) {
  const { th } = useTheme()
  const capped = Math.min(total, 12)

  return (
    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
      {Array.from({ length: capped }, (_, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block', width: '8px', height: '8px', borderRadius: '9999px',
            background: i === current ? th.accent : th.border,
            transform: i === current ? 'scale(1.4)' : 'scale(1)',
            transition: 'background 200ms, transform 200ms',
          }}
        />
      ))}
    </div>
  )
}
