import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth.ts'
import { useTheme } from '../theme/index.tsx'
import { useLang } from '../lang/index.tsx'

export function Navbar() {
  const { isLoggedIn, logout } = useAuth()
  const { th, dark, toggleDark } = useTheme()
  const { lang, L, toggleLang } = useLang()
  const navigate = useNavigate()
  const location = useLocation()

  const isAdmin = location.pathname === '/admin'

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const pillBtn = (active: boolean): React.CSSProperties => ({
    borderRadius: '8px',
    background: active ? 'rgba(255,189,89,0.22)' : 'rgba(255,255,255,0.08)',
    color: th.navText,
    padding: '7px 16px',
    fontSize: '0.8rem',
    fontWeight: 700,
    border: `1px solid ${active ? th.amber : 'rgba(255,255,255,0.12)'}`,
    cursor: 'pointer',
    transition: 'background 150ms, border-color 150ms',
    fontFamily: 'inherit',
  })

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: th.navBg, padding: '14px 28px',
      boxShadow: '0 2px 12px rgb(0 0 0/.2)',
      position: 'sticky', top: 0, zIndex: 20,
    }}>
      <Link to="/" style={{
        fontSize: '1.2rem', fontWeight: 800, color: th.navText,
        textDecoration: 'none', letterSpacing: '-0.3px',
      }}>
        {L.appName}
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Language toggle */}
        <button onClick={toggleLang} style={pillBtn(false)} title="Toggle language">
          {lang === 'en' ? '🇫🇮 Suomi' : '🇬🇧 English'}
        </button>

        {/* Dark mode toggle */}
        <button onClick={toggleDark} style={pillBtn(false)} title="Toggle dark mode">
          {dark ? '☀️' : '🌙'}
        </button>

        {/* Admin link */}
        {isLoggedIn && (
          <Link to="/admin" style={{ ...pillBtn(isAdmin), textDecoration: 'none', display: 'inline-block' }}>
            {L.admin}
          </Link>
        )}

        {/* Login / Logout */}
        {isLoggedIn ? (
          <button onClick={handleLogout} style={{
            borderRadius: '8px', background: th.red, color: 'white',
            padding: '7px 16px', fontSize: '0.8rem', fontWeight: 700,
            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            transition: 'background 150ms',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = th.redHover }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = th.red }}
          >
            {L.logout}
          </button>
        ) : (
          <Link to="/login" style={{
            borderRadius: '8px', background: th.amber, color: '#2f3d56',
            padding: '7px 16px', fontSize: '0.8rem', fontWeight: 700,
            textDecoration: 'none', display: 'inline-block',
            transition: 'background 150ms',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = th.amberHover }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = th.amber }}
          >
            {L.login}
          </Link>
        )}
      </div>
    </nav>
  )
}
