import { useState, useEffect } from 'react'
import { ref as dbRef, onValue, push, update, remove } from 'firebase/database'
import { rtdb } from '../firebase'
import DashboardLayout from '../components/DashboardLayout'
import './PortfolioAdmin.css'

/** Converte link de compartilhamento do Google Drive para URL de imagem direta */
function toDirectUrl(raw) {
  if (!raw) return raw
  const match = raw.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (match) return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`
  return raw
}

function ImageUrlField({ value, onChange }) {
  const [error, setError] = useState(false)
  return (
    <div className="faqadmin__field">
      <label>URL da imagem</label>
      <input
        type="url"
        placeholder="Cole o link do Google Drive ou qualquer URL de imagem…"
        value={value}
        onChange={(e) => { setError(false); onChange(toDirectUrl(e.target.value)) }}
      />
      <span className="pa__url-hint">
        Google Drive: Compartilhar → <strong>Qualquer pessoa com o link</strong> → copie e cole aqui
      </span>
      {value && !error && (
        <div className="pa__preview" style={{ marginTop: 10 }}>
          <img src={value} alt="preview" onError={() => setError(true)} onLoad={() => setError(false)} />
        </div>
      )}
      {value && error && (
        <p className="pa__url-error">Imagem não carregou. Verifique se o arquivo está público no Google Drive.</p>
      )}
    </div>
  )
}

const SEED_PROJECTS = [
  { name: 'Vilas Alameda', client: 'LJETS INC.', tag: 'Residencial', imageUrl: '' },
  { name: 'Conjunto RG',   client: 'DANCON',     tag: 'Residencial', imageUrl: '' },
  { name: 'GR Peccon',     client: 'PECCON',      tag: 'Comercial',   imageUrl: '' },
]

const TAGS = ['Residencial', 'Comercial', 'Industrial', 'Misto', 'Outro']
const emptyForm = { name: '', client: '', tag: 'Residencial', imageUrl: '' }



function ProjectForm({ form, setForm, onSave, onCancel, label, saving }) {
  return (
    <div className="faqadmin__form">
      <div className="pa__form-grid">
        <div className="pa__fields">
          <div className="faqadmin__field">
            <label>Nome do projeto *</label>
            <input type="text" placeholder="Ex: Vilas Alameda" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} autoFocus />
          </div>
          <div className="faqadmin__field">
            <label>Cliente / Construtora</label>
            <input type="text" placeholder="Ex: PECCON" value={form.client}
              onChange={(e) => setForm({ ...form, client: e.target.value })} />
          </div>
          <div className="faqadmin__field">
            <label>Categoria</label>
            <select value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })}
              className="pa__select">
              {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <ImageUrlField
          value={form.imageUrl}
          onChange={(url) => setForm({ ...form, imageUrl: url })}
        />
      </div>
      <div className="faqadmin__form-actions">
        <button className="faqadmin__btn faqadmin__btn--save" onClick={onSave} disabled={saving}>
          {saving
            ? <><span className="faqadmin__spinner faqadmin__spinner--sm" /> Enviando…</>
            : label}
        </button>
        <button className="faqadmin__btn faqadmin__btn--cancel" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  )
}

export default function PortfolioAdmin() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState(emptyForm)
  const [adding, setAdding] = useState(false)
  const [addForm, setAddForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [seeding, setSeeding] = useState(false)

  useEffect(() => {
    const unsub = onValue(dbRef(rtdb, 'portfolio'), (snap) => {
      if (snap.exists()) {
        const items = Object.entries(snap.val())
          .map(([id, v]) => ({ id, ...v }))
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        setProjects(items)
      } else {
        setProjects([])
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  /* ── SEED ── */
  const handleSeed = async () => {
    if (projects.length > 0 && !window.confirm('Já existem projetos. Deseja adicionar os padrão mesmo assim?')) return
    setSeeding(true)
    for (let i = 0; i < SEED_PROJECTS.length; i++) {
      await push(dbRef(rtdb, 'portfolio'), { ...SEED_PROJECTS[i], order: projects.length + i })
    }
    setSeeding(false)
  }

  /* ── ADD ── */
  const startAdd = () => { setAdding(true); setAddForm(emptyForm); setEditingId(null) }
  const cancelAdd = () => { setAdding(false); setAddForm(emptyForm) }
  const saveAdd = async () => {
    if (!addForm.name.trim()) return
    setSaving(true)
    await push(dbRef(rtdb, 'portfolio'), {
      name: addForm.name.trim(),
      client: addForm.client.trim(),
      tag: addForm.tag,
      imageUrl: addForm.imageUrl,
      order: projects.length,
    })
    cancelAdd()
    setSaving(false)
  }

  /* ── EDIT ── */
  const startEdit = (item) => {
    setEditingId(item.id)
    setEditForm({ name: item.name, client: item.client ?? '', tag: item.tag ?? 'Residencial', imageUrl: item.imageUrl ?? '' })
    setAdding(false)
  }
  const cancelEdit = () => { setEditingId(null); setEditForm(emptyForm) }
  const saveEdit = async (id) => {
    if (!editForm.name.trim()) return
    setSaving(true)
    await update(dbRef(rtdb, `portfolio/${id}`), {
      name: editForm.name.trim(),
      client: editForm.client.trim(),
      tag: editForm.tag,
      imageUrl: editForm.imageUrl,
    })
    cancelEdit()
    setSaving(false)
  }

  /* ── DELETE ── */
  const deleteItem = async (item) => {
    if (!window.confirm(`Remover o projeto "${item.name}"?`)) return
    await remove(dbRef(rtdb, `portfolio/${item.id}`))
  }

  return (
    <DashboardLayout>
      <header className="dash__header faqadmin__header">
        <div>
          <h1 className="dash__header-title">Portfólio</h1>
          <p className="dash__header-sub">
            Gerencie os projetos exibidos no site.{!loading && <> <strong>{projects.length} projeto(s)</strong></>}
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
              {seeding ? 'Carregando…' : 'Carregar projetos padrão'}
            </button>
            <button className="faqadmin__add-btn" onClick={startAdd}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Adicionar projeto
            </button>
          </div>
        )}
      </header>

      {loading ? (
        <div className="faqadmin__loading">
          <span className="faqadmin__spinner" />
          <p>Carregando projetos…</p>
        </div>
      ) : (
        <div className="pa__grid">

          {/* ADD FORM */}
          {adding && (
            <div className="faqadmin__card faqadmin__card--new pa__card-form">
              <div className="faqadmin__card-badge">Novo projeto</div>
              <ProjectForm form={addForm} setForm={setAddForm} onSave={saveAdd} onCancel={cancelAdd} label="Salvar projeto" saving={saving} />
            </div>
          )}

          {/* EMPTY STATE */}
          {projects.length === 0 && !adding && (
            <div className="faqadmin__empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <p>Nenhum projeto cadastrado ainda.</p>
              <button className="faqadmin__seed-btn faqadmin__seed-btn--lg" onClick={handleSeed} disabled={seeding}>
                {seeding ? (
                  <><span className="faqadmin__spinner faqadmin__spinner--sm" /> Carregando…</>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                    </svg>
                    Carregar os 3 projetos padrão
                  </>
                )}
              </button>
            </div>
          )}

          {/* PROJECT CARDS */}
          {projects.map((item) => (
            editingId === item.id ? (
              <div key={item.id} className="faqadmin__card faqadmin__card--editing pa__card-form">
              <ProjectForm form={editForm} setForm={setEditForm} onSave={() => saveEdit(item.id)} onCancel={cancelEdit} label="Salvar alterações" saving={saving} />
              </div>
            ) : (
              <div key={item.id} className="pa__card">
                <div className="pa__card-img">
                  {item.imageUrl
                    ? <img src={item.imageUrl} alt={item.name} loading="lazy" />
                    : <div className="pa__card-no-img">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
                          <rect x="3" y="3" width="18" height="18" rx="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                        <span>Sem imagem</span>
                      </div>
                  }
                  {item.tag && <span className="pa__card-tag">{item.tag}</span>}
                </div>
                <div className="pa__card-body">
                  <div className="pa__card-info">
                    <p className="pa__card-name">{item.name}</p>
                    <p className="pa__card-client">{item.client}</p>
                  </div>
                  <div className="faqadmin__card-actions">
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
              </div>
            )
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
