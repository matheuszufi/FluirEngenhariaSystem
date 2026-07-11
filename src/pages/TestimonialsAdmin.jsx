import { useState, useEffect } from 'react'
import { ref, onValue, push, update, remove } from 'firebase/database'
import { rtdb } from '../firebase'
import DashboardLayout from '../components/DashboardLayout'
import './TestimonialsAdmin.css'

const SEED_TESTIMONIALS = [
  {
    name: 'Iago Pegnan',
    company: 'MORFINS ENGENHARIA',
    role: 'Diretor de Projetos',
    text: 'A Fluir é um grande parceiro técnico e comercial da MORFINS. Em todas as obras de grande porte, sempre indicamos a Fluir para os nossos clientes. Diferentes múltiplos trabalhos em execução dos dias. A Fluir nos enquadrou muito bem no desenvolvimento deste projeto!',
    stars: 5,
  },
  {
    name: 'Carlos Andrade',
    company: 'URBAN EDGE',
    role: 'Engenheiro Responsável',
    text: 'Trabalhar com a Fluir Engenharia foi uma experiência excepcional. A qualidade dos projetos BIM entregues superou nossas expectativas, com soluções eficientes que geraram grande economia na execução da obra.',
    stars: 5,
  },
  {
    name: 'Fernanda Lima',
    company: 'PECCON',
    role: 'Gestora de Projetos',
    text: 'A equipe da Fluir demonstra um nível técnico impressionante. Os projetos hidráulicos entregues foram detalhados, bem compatibilizados e dentro do prazo acordado. Recomendo fortemente!',
    stars: 5,
  },
]

const emptyForm = { name: '', company: '', role: '', text: '', stars: 5 }

const getInitials = (name) => {
  const parts = name.trim().split(' ').filter(Boolean)
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase()
}

function StarSelector({ value, onChange }) {
  return (
    <div className="ta__stars-select">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          className={`ta__star-btn${s <= value ? ' ta__star-btn--active' : ''}`}
          onClick={() => onChange(s)}
        >
          ★
        </button>
      ))}
    </div>
  )
}

function TestimonialForm({ form, setForm, onSave, onCancel, label, saving }) {
  return (
    <div className="faqadmin__form">
      <div className="ta__form-grid">
        <div className="faqadmin__field">
          <label>Nome *</label>
          <input
            type="text"
            placeholder="Nome do cliente"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            autoFocus
          />
        </div>
        <div className="faqadmin__field">
          <label>Empresa</label>
          <input
            type="text"
            placeholder="Nome da empresa"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </div>
        <div className="faqadmin__field">
          <label>Cargo</label>
          <input
            type="text"
            placeholder="Cargo / função"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
        </div>
        <div className="faqadmin__field">
          <label>Avaliação</label>
          <StarSelector value={form.stars} onChange={(v) => setForm({ ...form, stars: v })} />
        </div>
      </div>
      <div className="faqadmin__field">
        <label>Depoimento *</label>
        <textarea
          rows={4}
          placeholder="Texto do depoimento…"
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
        />
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

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState(emptyForm)
  const [adding, setAdding] = useState(false)
  const [addForm, setAddForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [seeding, setSeeding] = useState(false)

  useEffect(() => {
    const unsub = onValue(ref(rtdb, 'testimonials'), (snap) => {
      if (snap.exists()) {
        const data = Object.entries(snap.val())
          .map(([id, v]) => ({ id, ...v }))
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        setTestimonials(data)
      } else {
        setTestimonials([])
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  /* ── SEED ── */
  const handleSeed = async () => {
    if (testimonials.length > 0 && !window.confirm('Já existem depoimentos. Deseja adicionar os padrão mesmo assim?')) return
    setSeeding(true)
    for (let i = 0; i < SEED_TESTIMONIALS.length; i++) {
      const t = SEED_TESTIMONIALS[i]
      await push(ref(rtdb, 'testimonials'), {
        ...t,
        avatar: getInitials(t.name),
        order: testimonials.length + i,
      })
    }
    setSeeding(false)
  }

  /* ── EDIT ── */
  const startEdit = (item) => {
    setEditingId(item.id)
    setEditForm({ name: item.name, company: item.company ?? '', role: item.role ?? '', text: item.text, stars: item.stars ?? 5 })
    setAdding(false)
  }
  const cancelEdit = () => { setEditingId(null); setEditForm(emptyForm) }
  const saveEdit = async (id) => {
    if (!editForm.name.trim() || !editForm.text.trim()) return
    setSaving(true)
    await update(ref(rtdb, `testimonials/${id}`), {
      ...editForm,
      name: editForm.name.trim(),
      company: editForm.company.trim(),
      role: editForm.role.trim(),
      text: editForm.text.trim(),
      avatar: getInitials(editForm.name),
    })
    setEditingId(null)
    setSaving(false)
  }

  /* ── DELETE ── */
  const deleteItem = async (id) => {
    if (!window.confirm('Remover este depoimento?')) return
    await remove(ref(rtdb, `testimonials/${id}`))
  }

  /* ── ADD ── */
  const startAdd = () => { setAdding(true); setAddForm(emptyForm); setEditingId(null) }
  const cancelAdd = () => { setAdding(false); setAddForm(emptyForm) }
  const saveAdd = async () => {
    if (!addForm.name.trim() || !addForm.text.trim()) return
    setSaving(true)
    await push(ref(rtdb, 'testimonials'), {
      ...addForm,
      name: addForm.name.trim(),
      company: addForm.company.trim(),
      role: addForm.role.trim(),
      text: addForm.text.trim(),
      avatar: getInitials(addForm.name),
      order: testimonials.length,
    })
    setAdding(false)
    setAddForm(emptyForm)
    setSaving(false)
  }

  return (
    <DashboardLayout>
      <header className="dash__header faqadmin__header">
        <div>
          <h1 className="dash__header-title">Depoimentos</h1>
          <p className="dash__header-sub">
            Gerencie os depoimentos exibidos no site.{!loading && <> <strong>{testimonials.length} depoimento(s)</strong></>}
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
              {seeding ? 'Carregando…' : 'Carregar depoimentos padrão'}
            </button>
            <button className="faqadmin__add-btn" onClick={startAdd}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Adicionar depoimento
            </button>
          </div>
        )}
      </header>

      {loading ? (
        <div className="faqadmin__loading">
          <span className="faqadmin__spinner" />
          <p>Carregando depoimentos…</p>
        </div>
      ) : (
        <div className="faqadmin__list">

          {/* ADD FORM */}
          {adding && (
            <div className="faqadmin__card faqadmin__card--new">
              <div className="faqadmin__card-badge">Novo depoimento</div>
              <TestimonialForm
                form={addForm} setForm={setAddForm}
                onSave={saveAdd} onCancel={cancelAdd}
                label="Salvar" saving={saving}
              />
            </div>
          )}

          {/* EMPTY STATE */}
          {testimonials.length === 0 && !adding && (
            <div className="faqadmin__empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
              <p>Nenhum depoimento cadastrado ainda.</p>
              <button className="faqadmin__seed-btn faqadmin__seed-btn--lg" onClick={handleSeed} disabled={seeding}>
                {seeding ? (
                  <><span className="faqadmin__spinner faqadmin__spinner--sm" /> Carregando…</>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                    </svg>
                    Carregar os 3 depoimentos padrão
                  </>
                )}
              </button>
            </div>
          )}

          {/* LIST */}
          {testimonials.map((item) => (
            <div key={item.id} className={`faqadmin__card${editingId === item.id ? ' faqadmin__card--editing' : ''}`}>
              {editingId === item.id ? (
                <TestimonialForm
                  form={editForm} setForm={setEditForm}
                  onSave={() => saveEdit(item.id)} onCancel={cancelEdit}
                  label="Salvar alterações" saving={saving}
                />
              ) : (
                <div className="faqadmin__card-top">
                  <div className="ta__avatar">{item.avatar}</div>
                  <div className="faqadmin__card-content">
                    <p className="faqadmin__card-question">{item.name}</p>
                    <span className="ta__meta">
                      {item.company}{item.role ? ` · ${item.role}` : ''}
                    </span>
                    <div className="ta__stars-display">
                      {Array.from({ length: item.stars ?? 5 }).map((_, i) => <span key={i}>★</span>)}
                    </div>
                    <p className="faqadmin__card-preview">
                      "{item.text?.slice(0, 130)}{(item.text?.length ?? 0) > 130 ? '…' : ''}"
                    </p>
                  </div>
                  <div className="faqadmin__card-actions">
                    <button className="faqadmin__icon-btn faqadmin__icon-btn--edit" onClick={() => startEdit(item)} title="Editar">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                      Editar
                    </button>
                    <button className="faqadmin__icon-btn faqadmin__icon-btn--delete" onClick={() => deleteItem(item.id)} title="Remover">
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
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
