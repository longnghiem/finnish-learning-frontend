import type { SearchType } from '../types'
import { useTheme } from '../theme/index.tsx'
import { useLang } from '../lang/index.tsx'

interface SearchBarProps {
  searchType: SearchType
  searchTerm: string
  onSearchTypeChange: (type: SearchType) => void
  onSearchTermChange: (term: string) => void
}

export function SearchBar({ searchType, searchTerm, onSearchTypeChange, onSearchTermChange }: SearchBarProps) {
  const { th } = useTheme()
  const { L } = useLang()

  const activeBtn: React.CSSProperties = {
    borderRadius: '8px', background: th.amber, color: '#2f3d56',
    padding: '7px 16px', fontSize: '0.8rem', fontWeight: 700,
    border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 150ms',
  }
  const inactiveBtn: React.CSSProperties = {
    ...activeBtn, background: th.surfaceAlt, color: th.textSub,
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
        <button
          type="button"
          style={searchType === 'VERB' ? activeBtn : inactiveBtn}
          onClick={() => onSearchTypeChange('VERB')}
        >
          {L.word}
        </button>
        <button
          type="button"
          style={searchType === 'SENTENCE' ? activeBtn : inactiveBtn}
          onClick={() => onSearchTypeChange('SENTENCE')}
        >
          {L.sentence}
        </button>
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={e => onSearchTermChange(e.target.value)}
        placeholder={searchType === 'VERB' ? L.searchByWord : L.searchBySentence}
        style={{
          flex: 1, borderRadius: '8px', border: `1px solid ${th.borderInput}`,
          background: th.surface, color: th.text,
          padding: '8px 14px', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none',
          transition: 'border-color 150ms, box-shadow 150ms',
        }}
        onFocus={e => { e.target.style.borderColor = th.accent; e.target.style.boxShadow = `0 0 0 2px ${th.accent}33` }}
        onBlur={e => { e.target.style.borderColor = th.borderInput; e.target.style.boxShadow = 'none' }}
      />
    </div>
  )
}
