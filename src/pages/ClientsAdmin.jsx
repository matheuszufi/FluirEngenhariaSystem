import { useState, useEffect } from 'react'
import { ref, onValue, push, update, remove } from 'firebase/database'
import { rtdb } from '../firebase'
import DashboardLayout from '../components/DashboardLayout'
import './ClientsAdmin.css'

const SEED_CLIENTS = [
  'LEX', 'PECCON', 'HENDEL', 'MANTRI', 'LJETS INC.',
  'ROGGA', 'RTX', 'PRIMINHA', 'URBAN EDGE', 'MUMUJU',
  'MANDALI', 'CONSTRU NEVES', 'WHITE', 'DANCON', 'JS',
]

const emptyForm = { name: '', logoUrl: '' }

function toDirectUrl(raw) {
  if (!raw) return raw
  const match = raw.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (match) return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`
  return raw
}

function LogoUrlField({ value, onChange }) {
  const [error, setError] = useState(false)
  return (
    <div className="faqadmin__field">
      <label>URL da logo <span className="ca__optional">(opcional)</span></label>
      <input
        type="url"
        placeholder="Cole o link do Google Drive ou qualquer URL de imagem…"
        value={value}
        onChange={(e) => { setError(false); onChange(toDirectUrl(e.target.value)) }}
      />
      <span className="pa__url-hint">
        Google Drive: Compartilhar → <strong>Qualquer pessoa com o link</strong> → cole aqui
      </span>
      {value && !error && (
        <div className="ca__logo-preview">
          <img src={value} alt="preview" onError={() => setError(true)} onLoad={() => setError(false)} />
        </div>
      )}
      {value && error && (
        <p className="pa__url-error">Imagem não carregou. Verifique as permissões de compartilhamento.</p>
      )}
    </div>
  )
}

export default function ClientsAdmin() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState(emptyForm)
  const [adding, setAdding] = useState(false)
  const [addForm, setAddForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [seeding, setSeeding] = useState(false)

  useEffect(() => {
    const unsub = onValue(ref(rtdb, 'clients'), (snap) => {
      if (snap.exists()) {
        const items = Object.entries(snap.val())
          .map(([id, v]) => ({ id, ...v }))
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        setClients(items)
      } else {
        setClients([])
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  /* ── SEED ── */
  const handleSeed = async () => {
    if (clients.length > 0 && !window.confirm('Já existem parceiros. Deseja adicionar os padrão mesmo assim?')) return
    setSeeding(true)
    for (let i = 0; i < SEED_CLIENTS.length; i++) {
      await push(ref(rtdb, 'clients'), { name: SEED_CLIENTS[i], logoUrl: '', order: clients.length + i })
    }
    setSeeding(false)
  }

  /* ── ADD ── */
  const startAdd = () => { setAdding(true); setAddForm(emptyForm); setEditingId(null) }
  const cancelAdd = () => { setAdding(false); setAddForm(emptyForm) }
  const saveAdd = async () => {
    if (!addForm.name.trim()) return
    setSaving(true)
    await push(ref(rtdb, 'clients'), { name: addForm.name.trim(), logoUrl: addForm.logoUrl, order: clients.length })
    cancelAdd()
    setSaving(false)
  }

  /* ── EDIT ── */
  const startEdit = (item) => { setEditingId(item.id); setEditForm({ name: item.name, logoUrl: item.logoUrl ?? '' }); setAdding(false) }
  const cancelEdit = () => { setEditingId(null); setEditForm(emptyForm) }
  const saveEdit = async (id) => {
    if (!editForm.name.trim()) return
    setSaving(true)
    await update(ref(rtdb, `clients/${id}`), { name: editForm.name.trim(), logoUrl: editForm.logoUrl })
    cancelEdit()
    setSaving(false)
  }

  /* ── DELETE ── */
  const deleteItem = async (item) => {
    if (!window.confirm(`Remover "${item.name}"?`)) return
    await remove(ref(rtdb, `clients/${item.id}`))
  }

  return (
    <DashboardLayout>
      <header className="dash__header faqadmin__header">
        <div>
          <h1 className="dash__header-title">Parceiros</h1>
          <p className="dash__header-sub">
            Gerencie os clientes exibidos no site.{!loading && <> <strong>{clients.length} parceiro(s)</strong></>}
          </p>
        </div>
        {!adding && (
          <div className="faqadmin__header-actions">
            <button className="faqadmin__seed-btn" onClick={handleSeed} disabled={seeding}>
              {seeding
                ? <span className="faqadmin__spinner faqadmin__spinner--sm" />
                : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                  </svg>
              }
              {seeding ? 'Carregando…' : 'Carregar parceiros padrão'}
            </button>
            <button className="faqadmin__add-btn" onClick={startAdd}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Adicionar parceiro
            </button>
          </div>
        )}
      </header>

      {loading ? (
        <div className="faqadmin__loading">
          <span className="faqadmin__spinner" /><p>Carregando parceiros…</p>
        </div>
      ) : (
        <div className="ca__content">

          {/* ADD FORM */}
          {adding && (
            <div className="faqadmin__card faqadmin__card--new">
              <div className="faqadmin__card-badge">Novo parceiro</div>
              <div className="faqadmin__form ca__form-grid">
                <div className="faqadmin__field">
                  <label>Nome da empresa *</label>
                  <input type="text" placeholder="Ex: PECCON" value={addForm.name} autoFocus
                    onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} />
                </div>
                <LogoUrlField value={addForm.logoUrl} onChange={(url) => setAddForm({ ...addForm, logoUrl: url })} />
                <div className="faqadmin__form-actions ca__form-actions">
                  <button className="faqadmin__btn faqadmin__btn--save" onClick={saveAdd} disabled={saving}>
                    {saving ? <span className="faqadmin__spinner faqadmin__spinner--sm" /> : 'Salvar'}
                  </button>
                  <button className="faqadmin__btn faqadmin__btn--cancel" onClick={cancelAdd}>Cancelar</button>
                </div>
              </div>
            </div>
          )}

          {/* EMPTY STATE */}
          {clients.length === 0 && !adding && (
            <div className="faqadmin__empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
              </svg>
              <p>Nenhum parceiro cadastrado ainda.</p>
              <button className="faqadmin__seed-btn faqadmin__seed-btn--lg" onClick={handleSeed} disabled={seeding}>
                {seeding ? <><span className="faqadmin__spinner faqadmin__spinner--sm" /> Carregando…</> : <>Carregar os 15 parceiros padrão</>}
              </button>
            </div>
          )}

          {/* GRID */}
          <div className="ca__grid">
            {clients.map((item) => (
              editingId === item.id ? (
                <div key={item.id} className="faqadmin__card faqadmin__card--editing ca__edit-card">
                  <div className="faqadmin__form ca__form-grid">
                    <div className="faqadmin__field">
                      <label>Nome da empresa *</label>
                      <input type="text" value={editForm.name} autoFocus
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                    </div>
                    <LogoUrlField value={editForm.logoUrl} onChange={(url) => setEditForm({ ...editForm, logoUrl: url })} />
                    <div className="faqadmin__form-actions ca__form-actions">
                      <button className="faqadmin__btn faqadmin__btn--save" onClick={() => saveEdit(item.id)} disabled={saving}>
                        {saving ? <span className="faqadmin__spinner faqadmin__spinner--sm" /> : 'Salvar alterações'}
                      </button>
                      <button className="faqadmin__btn faqadmin__btn--cancel" onClick={cancelEdit}>Cancelar</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={item.id} className="ca__card">
                  <div className="ca__card-logo">
                    {item.logoUrl
                      ? <img src={item.logoUrl} alt={item.name} />
                      : <span>{item.name}</span>
                    }
                  </div>
                  <p className="ca__card-name">{item.name}</p>
                  <div className="ca__card-actions">
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
        </div>
      )}
    </DashboardLayout>
  )
}
