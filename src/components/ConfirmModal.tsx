import { useEffect } from 'react'
import { useTheme } from '../theme/index.tsx'
import { useLang } from '../lang/index.tsx'

interface ConfirmModalProps {
  message: string
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export function ConfirmModal({ message, onConfirm, onCancel, isLoading = false }: ConfirmModalProps) {
  const { th } = useTheme()
  const { L } = useLang()

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel() }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [onCancel])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      onClick={onCancel}
      style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: th.overlay, backdropFilter: 'blur(2px)' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="modal-enter"
        style={{ background: th.surface, borderRadius: '16px', padding: '28px', maxWidth: '380px', width: '100%', margin: '0 16px', boxShadow: th.modalShadow, border: `1px solid ${th.border}` }}
      >
        <p style={{ color: th.text, marginBottom: '24px', lineHeight: 1.7, fontSize: '0.95rem' }}>
          {message}
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            style={{ borderRadius: '8px', background: th.surfaceAlt, color: th.textSub, padding: '9px 18px', fontSize: '0.875rem', fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'inherit', opacity: isLoading ? 0.5 : 1 }}
          >
            {L.cancel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            style={{ borderRadius: '8px', background: th.red, color: 'white', padding: '9px 18px', fontSize: '0.875rem', fontWeight: 700, border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: isLoading ? 0.5 : 1 }}
          >
            {isLoading ? 'Deleting…' : L.delete}
          </button>
        </div>
      </div>
    </div>
  )
}
