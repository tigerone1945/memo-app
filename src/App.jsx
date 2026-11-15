import { useEffect, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'memo-app:memos'
const CATEGORIES = ['仕事', '個人', 'アイデア']

function loadMemos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw).map((memo) => ({ category: CATEGORIES[0], ...memo }))
  } catch {
    return []
  }
}

function App() {
  const [memos, setMemos] = useState(loadMemos)
  const [text, setText] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [filterCategory, setFilterCategory] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')
  const [editingCategory, setEditingCategory] = useState(CATEGORIES[0])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos))
  }, [memos])

  const addMemo = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return

    setMemos((prev) => [
      { id: crypto.randomUUID(), text: trimmed, category, createdAt: Date.now() },
      ...prev,
    ])
    setText('')
  }

  const deleteMemo = (id) => {
    setMemos((prev) => prev.filter((memo) => memo.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setEditingText('')
    }
  }

  const startEditing = (memo) => {
    setEditingId(memo.id)
    setEditingText(memo.text)
    setEditingCategory(memo.category)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingText('')
  }

  const saveEditing = (e) => {
    e.preventDefault()
    const trimmed = editingText.trim()
    if (!trimmed) return

    setMemos((prev) =>
      prev.map((memo) =>
        memo.id === editingId
          ? { ...memo, text: trimmed, category: editingCategory }
          : memo,
      ),
    )
    setEditingId(null)
    setEditingText('')
  }

  const filteredMemos =
    filterCategory === 'all'
      ? memos
      : memos.filter((memo) => memo.category === filterCategory)

  return (
    <main className="app">
      <h1>メモ</h1>

      <form className="memo-form" onSubmit={addMemo}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="メモを入力..."
          rows={3}
        />
        <select
          className="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="カテゴリー"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button type="submit">追加</button>
      </form>

      <div className="category-filter">
        <button
          type="button"
          className={filterCategory === 'all' ? 'active' : ''}
          onClick={() => setFilterCategory('all')}
        >
          すべて
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className={filterCategory === c ? 'active' : ''}
            onClick={() => setFilterCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="memo-list">
        {filteredMemos.map((memo) =>
          memo.id === editingId ? (
            <li key={memo.id} className="memo-item">
              <form className="memo-edit-form" onSubmit={saveEditing}>
                <textarea
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  rows={3}
                  autoFocus
                />
                <select
                  className="category-select"
                  value={editingCategory}
                  onChange={(e) => setEditingCategory(e.target.value)}
                  aria-label="カテゴリー"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <div className="memo-meta">
                  <time>{new Date(memo.createdAt).toLocaleString('ja-JP')}</time>
                  <div className="memo-actions">
                    <button type="submit">保存</button>
                    <button type="button" onClick={cancelEditing}>
                      キャンセル
                    </button>
                  </div>
                </div>
              </form>
            </li>
          ) : (
            <li key={memo.id} className="memo-item">
              <span className="category-tag" data-category={memo.category}>
                {memo.category}
              </span>
              <p>{memo.text}</p>
              <div className="memo-meta">
                <time>{new Date(memo.createdAt).toLocaleString('ja-JP')}</time>
                <div className="memo-actions">
                  <button type="button" onClick={() => startEditing(memo)}>
                    編集
                  </button>
                  <button type="button" onClick={() => deleteMemo(memo.id)}>
                    削除
                  </button>
                </div>
              </div>
            </li>
          ),
        )}
      </ul>

      {memos.length === 0 && <p className="empty">メモはまだありません</p>}
      {memos.length > 0 && filteredMemos.length === 0 && (
        <p className="empty">このカテゴリーのメモはありません</p>
      )}
    </main>
  )
}

export default App
