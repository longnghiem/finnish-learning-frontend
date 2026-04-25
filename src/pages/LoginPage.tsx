import { useAuth } from '../auth/useAuth.ts'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTheme } from '../theme/index.tsx'
import { useLang } from '../lang/index.tsx'

export function LoginPage() {
  const { isLoggedIn, login } = useAuth()
  const navigate = useNavigate()
  const { th } = useTheme()
  const { L } = useLang()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isLoggedIn) navigate('/', { replace: true })
  }, [isLoggedIn, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!username.trim() || !password.trim()) { setError(L.enterCreds); return }
    const success = login(username, password)
    if (!success) setError('Invalid username or password.')
  }

  const inp: React.CSSProperties = {
    width: '100%', borderRadius: '8px', border: `1px solid ${th.borderInput}`,
    background: th.surface, color: th.text,
    padding: '10px 14px', fontSize: '0.875rem', fontFamily: 'inherit',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 150ms, box-shadow 150ms',
  }
  const lbl: React.CSSProperties = {
    display: 'block', fontSize: '0.78rem', fontWeight: 700, color: th.textSub,
    marginBottom: '5px', letterSpacing: '0.3px', textTransform: 'uppercase',
  }
  const focFn = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = th.accent
    e.target.style.boxShadow = `0 0 0 2px ${th.accent}33`
  }
  const blrFn = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = th.borderInput
    e.target.style.boxShadow = 'none'
  }

  return (
    <div className="page-enter" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 16px', minHeight: 'calc(100vh - 56px)' }}>
      <div style={{ background: th.surface, borderRadius: '20px', padding: '36px', width: '100%', maxWidth: '380px', boxShadow: th.cardShadowHover, border: `1px solid ${th.border}` }}>
        <h1 style={{ margin: '0 0 28px', fontSize: '1.4rem', fontWeight: 800, color: th.text, textAlign: 'center' }}>
          {L.login}
        </h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={lbl}>{L.username}</label>
            <input
              type="text"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(null) }}
              style={inp}
              placeholder={L.username}
              autoComplete="username"
              onFocus={focFn}
              onBlur={blrFn}
            />
          </div>
          <div>
            <label style={lbl}>{L.password}</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(null) }}
              style={inp}
              placeholder={L.password}
              autoComplete="current-password"
              onFocus={focFn}
              onBlur={blrFn}
            />
          </div>
          {error && (
            <div style={{ background: '#fef2f2', borderRadius: '8px', padding: '9px 12px', fontSize: '0.8rem', color: '#ef4444' }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            style={{ marginTop: '4px', borderRadius: '8px', background: th.amber, color: '#2f3d56', padding: '11px 18px', fontSize: '0.9rem', fontWeight: 800, border: 'none', cursor: 'pointer', fontFamily: 'inherit', width: '100%', transition: 'background 150ms' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = th.amberHover }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = th.amber }}
          >
            {L.login}
          </button>
        </form>
      </div>
    </div>
  )
}
