import { useState, useEffect } from 'react'
import { ref, onValue, push, update, remove } from 'firebase/database'
import { rtdb } from '../firebase'
import DashboardLayout from '../components/DashboardLayout'
import './HeroAdmin.css'

const emptyForm = { imageUrl: '', label: '' }

function toDirectUrl(raw) {
  if (!raw) return raw
  const match = raw.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (match) return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`
  return raw
}

function ImageForm({ form, setForm, onSave, onCancel, label, saving }) {
  const [imgError, setImgError] = useState(false)
  return (
    <div className="faqadmin__form">
      <div className="ha__form-grid">
        <div className="faqadmin__field ha__url-field">
          <label>URL da imagem *</label>
          <input
            type="url"
            placeholder="Cole o link do Google Drive…"
            value={form.imageUrl}
            onChange={(e) => { setImgError(false); setForm({ ...form, imageUrl: toDirectUrl(e.target.value) }) }}
            autoFocus
          />
          <span className="pa__url-hint">
            Google Drive: Compartilhar → <strong>Qualquer pessoa com o link</strong> → cole aqui
          </span>
          {form.imageUrl && !imgError && (
            <div className="ha__img-preview">
              <img src={form.imageUrl} alt="preview"
                onError={() => setImgError(true)} onLoad={() => setImgError(false)} />
            </div>
          )}
          {form.imageUrl && imgError && (
            <p className="pa__url-error">Imagem não carregou. Verifique as permissões de compartilhamento.</p>
          )}
        </div>
        <div className="faqadmin__field">
          <label>Legenda <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.25)', textTransform: 'none', letterSpacing: 0, fontSize: '0.7rem' }}>(opcional)</span></label>
          <input
            type="text"
            placeholder="Ex: Projeto Hidrossanitário Torre A"
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
          />
          <span className="pa__url-hint">Texto exibido ao passar o mouse sobre a imagem</span>
        </div>
      </div>
      <div className="faqadmin__form-actions">
        <button className="faqadmin__btn faqadmin__btn--save" onClick={onSave} disabled={saving}>
          {saving ? <span className="faqadmin__spinner faqadmin__spinner--sm" /> : label}
        </button>
        <button className="faqadmin__btn faqadmin__btn--cancel" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  )
}

export default function EntregasAdmin() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState(emptyForm)
  const [adding, setAdding] = useState(false)
  const [addForm, setAddForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const unsub = onValue(ref(rtdb, 'entregas'), (snap) => {
      if (snap.exists()) {
        const data = Object.entries(snap.val())
          .map(([id, v]) => ({ id, ...v }))
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        setItems(data)
      } else {
        setItems([])
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  /* ── REORDER ── */
  const moveUp = async (index) => {
    if (index === 0) return
    const a = items[index], b = items[index - 1]
    await update(ref(rtdb, `entregas/${a.id}`), { order: b.order ?? index - 1 })
    await update(ref(rtdb, `entregas/${b.id}`), { order: a.order ?? index })
  }

  const moveDown = async (index) => {
    if (index === items.length - 1) return
    const a = items[index], b = items[index + 1]
    await update(ref(rtdb, `entregas/${a.id}`), { order: b.order ?? index + 1 })
    await update(ref(rtdb, `entregas/${b.id}`), { order: a.order ?? index })
  }

  /* ── ADD ── */
  const startAdd = () => { setAdding(true); setAddForm(emptyForm); setEditingId(null) }
  const cancelAdd = () => { setAdding(false); setAddForm(emptyForm) }
  const saveAdd = async () => {
    if (!addForm.imageUrl.trim()) return
    setSaving(true)
    await push(ref(rtdb, 'entregas'), {
      imageUrl: addForm.imageUrl.trim(),
      label: addForm.label.trim(),
      order: items.length,
    })
    cancelAdd()
    setSaving(false)
  }

  /* ── EDIT ── */
  const startEdit = (item) => {
    setEditingId(item.id)
    setEditForm({ imageUrl: item.imageUrl, label: item.label ?? '' })
    setAdding(false)
  }
  const cancelEdit = () => { setEditingId(null); setEditForm(emptyForm) }
  const saveEdit = async (id) => {
    if (!editForm.imageUrl.trim()) return
    setSaving(true)
    await update(ref(rtdb, `entregas/${id}`), {
      imageUrl: editForm.imageUrl.trim(),
      label: editForm.label.trim(),
    })
    cancelEdit()
    setSaving(false)
  }

  /* ── DELETE ── */
  const deleteItem = async (item) => {
    if (!window.confirm('Remover esta imagem?')) return
    await remove(ref(rtdb, `entregas/${item.id}`))
  }

  return (
    <DashboardLayout>
      <header className="dash__header faqadmin__header">
        <div>
          <h1 className="dash__header-title">Nossas Entregas</h1>
          <p className="dash__header-sub">
            Gerencie as imagens exibidas na galeria do site.
            {!loading && <> <strong>{items.length} imagem(ns)</strong></>}
          </p>
        </div>
        {!adding && (
          <button className="faqadmin__add-btn" onClick={startAdd}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Adicionar imagem
          </button>
        )}
      </header>

      {loading ? (
        <div className="faqadmin__loading">
          <span className="faqadmin__spinner" /><p>Carregando…</p>
        </div>
      ) : (
        <div className="faqadmin__list">

          {adding && (
            <div className="faqadmin__card faqadmin__card--new">
              <div className="faqadmin__card-badge">Nova imagem</div>
              <ImageForm form={addForm} setForm={setAddForm} onSave={saveAdd} onCancel={cancelAdd} label="Salvar imagem" saving={saving} />
            </div>
          )}

          {items.length === 0 && !adding && (
            <div className="faqadmin__empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <p>Nenhuma imagem cadastrada. A seção ficará oculta no site até ter ao menos uma imagem.</p>
            </div>
          )}

          {items.map((item, index) => (
            editingId === item.id ? (
              <div key={item.id} className="faqadmin__card faqadmin__card--editing">
                <ImageForm form={editForm} setForm={setEditForm} onSave={() => saveEdit(item.id)} onCancel={cancelEdit} label="Salvar alterações" saving={saving} />
              </div>
            ) : (
              <div key={item.id} className="ha__card">
                <div className="ha__card-thumb">
                  <img src={item.imageUrl} alt={item.label || `Imagem ${index + 1}`} loading="lazy"
                    onError={(e) => { e.target.style.display = 'none' }} />
                  <span className="ha__card-num">{index + 1}</span>
                </div>
                <div className="ha__card-info">
                  <p className="ha__card-url">{item.imageUrl}</p>
                  {item.label
                    ? <span className="ha__card-duration" style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                        📝 {item.label}
                      </span>
                    : <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)' }}>Sem legenda</span>
                  }
                </div>
                <div className="ha__card-actions">
                  <div className="ha__reorder">
                    <button onClick={() => moveUp(index)} disabled={index === 0} title="Mover para cima">↑</button>
                    <button onClick={() => moveDown(index)} disabled={index === items.length - 1} title="Mover para baixo">↓</button>
                  </div>
                  <button className="faqadmin__icon-btn faqadmin__icon-btn--edit" onClick={() => startEdit(item)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Editar
                  </button>
                  <button className="faqadmin__icon-btn faqadmin__icon-btn--delete" onClick={() => deleteItem(item)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                    </svg>
                    Remover
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
