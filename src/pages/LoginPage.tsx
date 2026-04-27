import {useAuth} from '../auth/useAuth.ts'
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {useLang} from '../lang'

const inputClasses = 'w-full rounded-lg border border-border-input bg-surface text-text-primary px-3.5 py-2.5 text-sm' +
  ' font-[inherit] outline-none transition-[border-color,box-shadow] duration-150 focus:border-accent focus:ring-2 focus:ring-accent/20'

const labelClasses = 'block text-[0.78rem] font-bold text-text-sub mb-[5px] tracking-[0.3px] uppercase'

export function LoginPage() {
  const { isLoggedIn, login } = useAuth()
  const navigate = useNavigate()
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

  return (
    <div className="page-enter flex items-center justify-center px-4 py-20 min-h-[calc(100vh-56px)]">
      <div className="bg-surface rounded-[20px] p-9 w-full max-w-95 shadow-card-hover border border-border">
        <h1 className="m-0 mb-7 text-[1.4rem] font-extrabold text-text-primary text-center">
          {L.login}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4.5">
          <div>
            <label className={labelClasses}>{L.username}</label>
            <input
              type="text"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(null) }}
              className={inputClasses}
              placeholder={L.username}
              autoComplete="username"
            />
          </div>
          <div>
            <label className={labelClasses}>{L.password}</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(null) }}
              className={inputClasses}
              placeholder={L.password}
              autoComplete="current-password"
            />
          </div>
          {error && (
            <div className="bg-error-bg rounded-lg px-3 py-2.25 text-[0.8rem] text-red">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="mt-1 rounded-lg bg-amber text-nav-btn-text px-4.5 py-2.75 text-[0.9rem] font-extrabold border-none
             cursor-pointer font-[inherit] w-full transition-colors duration-150 hover:bg-amber-hover"
          >
            {L.login}
          </button>
        </form>
      </div>
    </div>
  )
}