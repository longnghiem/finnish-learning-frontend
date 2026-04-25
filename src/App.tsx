import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthProvider.tsx'
import { ThemeProvider, useTheme } from './theme/index.tsx'
import { LangProvider } from './lang/index.tsx'
import { Navbar } from './components/Navbar.tsx'
import { LandingPage } from './pages/LandingPage.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { TopicPage } from './pages/TopicPage.tsx'
import { AdminPage } from './pages/AdminPage.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: 1 },
  },
})

function AppInner() {
  const { th } = useTheme()
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: th.bg, color: th.text, transition: 'background 300ms ease, color 300ms ease' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/topics/:topicId" element={<TopicPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <AppInner />
            </AuthProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </LangProvider>
    </ThemeProvider>
  )
}
