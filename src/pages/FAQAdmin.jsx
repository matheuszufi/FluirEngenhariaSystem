import { useState, useEffect } from 'react'
import { ref, onValue, push, update, remove } from 'firebase/database'
import { rtdb } from '../firebase'
import DashboardLayout from '../components/DashboardLayout'
import './FAQAdmin.css'

const SEED_FAQS = [
  {
    question: 'Qual é o diferencial da Fluir Engenharia?',
    answer: 'A Fluir trabalha com um processo de briefing detalhado, aprovações e alinhamentos minuciosos entre todas as disciplinas e com a construtora. O objetivo é evitar retrabalho — para nós e para você.\n\nUsamos BIM desde o início como ferramenta de projeto, nisso significa que incompatibilidades entre hidrossanitário, gás, incêndio e piscina aparecem no modelo antes da obra começar.\n\nGarantimos projetos mais claros, menos surpresas durante a execução e melhor controle de custo e cronograma.',
  },
  {
    question: 'Como vocês usam BIM e qual é o valor para meu projeto?',
    answer: 'Em BIM, cada tubulação, acessório e equipamento ocupa espaço real com dimensão e posicionamento precisos, são elementos com informações. Isso nos permite detectar e evitar as incompatibilidades.\n\nPara você como construtor, isso significa agilidade na fase de projetos e facilidade na execução. Para o usuário final, sistemas dimensionados corretamente e com melhores soluções de engenharia.',
  },
  {
    question: 'E se surgir um problema durante a execução?',
    answer: 'Nossa equipe técnica permanece à disposição durante a execução. Se surgir qualquer questão relacionada ao projeto ou necessidade de orientação, nossa equipe avalia a situação e orienta a melhor solução.\n\nO objetivo é garantir que o projeto seja executado conforme previsto e que os sistemas funcionem sem nenhum problema.',
  },
  {
    question: 'Como é feito o orçamento e qual é o prazo?',
    answer: 'O orçamento depende diretamente do tamanho do empreendimento, número de pavimentos e complexidade das disciplinas.\n\nA Fluir trabalha com prazos internos para cada fase do projeto, que dependem diretamente do fornecimento dos documentos iniciais pela construtora, sendo que os entregáveis e prazos poderão ser ajustados conforme negociação contratual e o cronograma (BEP) do contratante.\n\nPara definir prazo e escopo específicos para sua obra, marcaremos uma conversa inicial para alinharmos suas necessidades com o cronograma de entrega.',
  },
  {
    question: 'Em quais regiões do Brasil atuam?',
    answer: 'A Fluir desenvolve projetos para empreendimentos em todo o Brasil.\n\nOperamos de forma remota com entrega de projetos em nuvem. Nosso processo inclui briefing detalhado e reuniões online para alinhar todos os detalhes técnicos e comerciais, garantindo suporte contínuo às construtoras durante todo o desenvolvimento do projeto.\n\nCom exceção do projeto de prevenção e combate a incêndio, que atendemos em Paraná, Santa Catarina e São Paulo. Essa limitação permite que nossa equipe técnica tenha domínio das normas estaduais, municipais e requisitos específicos de aprovação nessas regiões.',
  },
  {
    question: 'Como faço para contratar a Fluir?',
    answer: 'Entre em contato conosco por e-mail (contato@fluirengenhariainstalacoes.com.br) ou telefone (43) 99997-0284 ou (43) 98437-4546.\n\nEnvie as informações básicas do seu projeto, disciplinas necessárias e arquivos disponíveis (planta arquitetônica, quadro de áreas, especificações técnicas, etc.).\n\nMarcaremos uma conversa para alinhar suas necessidades e elaboraremos uma proposta formal com escopo, prazo e investimento específicos para seu empreendimento.',
  },
]

const emptyForm = { question: '', answer: '' }

export default function FAQAdmin() {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState(emptyForm)
  const [adding, setAdding] = useState(false)
  const [addForm, setAddForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [seeding, setSeeding] = useState(false)

  useEffect(() => {
    const unsub = onValue(ref(rtdb, 'faqs'), (snap) => {
      if (snap.exists()) {
        const items = Object.entries(snap.val())
          .map(([id, v]) => ({ id, ...v }))
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        setFaqs(items)
      } else {
        setFaqs([])
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const handleSeedFaqs = async () => {
    if (faqs.length > 0 && !window.confirm('Já existem perguntas cadastradas. Deseja adicionar as perguntas padrão mesmo assim?')) return
    setSeeding(true)
    for (let i = 0; i < SEED_FAQS.length; i++) {
      await push(ref(rtdb, 'faqs'), { ...SEED_FAQS[i], order: faqs.length + i })
    }
    setSeeding(false)
  }

  /* ── EDIT ── */
  const startEdit = (item) => {
    setEditingId(item.id)
    setEditForm({ question: item.question, answer: item.answer })
    setAdding(false)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm(emptyForm)
  }

  const saveEdit = async (id) => {
    if (!editForm.question.trim() || !editForm.answer.trim()) return
    setSaving(true)
    await update(ref(rtdb, `faqs/${id}`), {
      question: editForm.question.trim(),
      answer: editForm.answer.trim(),
    })
    setEditingId(null)
    setSaving(false)
  }

  /* ── DELETE ── */
  const deleteItem = async (id) => {
    if (!window.confirm('Remover esta pergunta frequente?')) return
    await remove(ref(rtdb, `faqs/${id}`))
  }

  /* ── ADD ── */
  const startAdd = () => {
    setAdding(true)
    setAddForm(emptyForm)
    setEditingId(null)
  }

  const cancelAdd = () => {
    setAdding(false)
    setAddForm(emptyForm)
  }

  const saveAdd = async () => {
    if (!addForm.question.trim() || !addForm.answer.trim()) return
    setSaving(true)
    await push(ref(rtdb, 'faqs'), {
      question: addForm.question.trim(),
      answer: addForm.answer.trim(),
      order: faqs.length,
    })
    setAdding(false)
    setAddForm(emptyForm)
    setSaving(false)
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="dash__header faqadmin__header">
        <div>
          <h1 className="dash__header-title">Perguntas Frequentes</h1>
          <p className="dash__header-sub">
            Gerencie as perguntas exibidas no site. {!loading && <strong>{faqs.length} pergunta(s)</strong>}
          </p>
        </div>
        {!adding && (
          <div className="faqadmin__header-actions">
            <button
              className="faqadmin__seed-btn"
              onClick={handleSeedFaqs}
              disabled={seeding}
              title="Insere as 6 perguntas padrão no banco de dados"
            >
              {seeding ? (
                <span className="faqadmin__spinner faqadmin__spinner--sm" />
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              )}
              {seeding ? 'Carregando…' : 'Carregar perguntas padrão'}
            </button>
            <button className="faqadmin__add-btn" onClick={startAdd}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Adicionar pergunta
            </button>
          </div>
        )}
      </header>

      {loading ? (
        <div className="faqadmin__loading">
          <span className="faqadmin__spinner" />
          <p>Carregando perguntas…</p>
        </div>
      ) : (
        <div className="faqadmin__list">

          {/* ADD FORM */}
          {adding && (
            <div className="faqadmin__card faqadmin__card--new">
              <div className="faqadmin__card-badge">Nova pergunta</div>
              <div className="faqadmin__form">
                <div className="faqadmin__field">
                  <label>Pergunta</label>
                  <input
                    type="text"
                    placeholder="Digite a pergunta…"
                    value={addForm.question}
                    onChange={(e) => setAddForm({ ...addForm, question: e.target.value })}
                    autoFocus
                  />
                </div>
                <div className="faqadmin__field">
                  <label>Resposta <span>(separe parágrafos com uma linha em branco)</span></label>
                  <textarea
                    rows={6}
                    placeholder="Digite a resposta…"
                    value={addForm.answer}
                    onChange={(e) => setAddForm({ ...addForm, answer: e.target.value })}
                  />
                </div>
                <div className="faqadmin__form-actions">
                  <button className="faqadmin__btn faqadmin__btn--save" onClick={saveAdd} disabled={saving}>
                    {saving ? <span className="faqadmin__spinner faqadmin__spinner--sm" /> : 'Salvar'}
                  </button>
                  <button className="faqadmin__btn faqadmin__btn--cancel" onClick={cancelAdd}>Cancelar</button>
                </div>
              </div>
            </div>
          )}

          {/* FAQ LIST */}
          {faqs.length === 0 && !adding && (
            <div className="faqadmin__empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <p>Nenhuma pergunta cadastrada ainda.</p>
              <button
                className="faqadmin__seed-btn faqadmin__seed-btn--lg"
                onClick={handleSeedFaqs}
                disabled={seeding}
              >
                {seeding ? (
                  <><span className="faqadmin__spinner faqadmin__spinner--sm" /> Carregando…</>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                    Carregar as 6 perguntas padrão
                  </>
                )}
              </button>
            </div>
          )}

          {faqs.map((item, index) => (
            <div key={item.id} className={`faqadmin__card${editingId === item.id ? ' faqadmin__card--editing' : ''}`}>
              {editingId === item.id ? (
                /* ── EDIT MODE ── */
                <div className="faqadmin__form">
                  <div className="faqadmin__field">
                    <label>Pergunta</label>
                    <input
                      type="text"
                      value={editForm.question}
                      onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                      autoFocus
                    />
                  </div>
                  <div className="faqadmin__field">
                    <label>Resposta <span>(separe parágrafos com uma linha em branco)</span></label>
                    <textarea
                      rows={7}
                      value={editForm.answer}
                      onChange={(e) => setEditForm({ ...editForm, answer: e.target.value })}
                    />
                  </div>
                  <div className="faqadmin__form-actions">
                    <button className="faqadmin__btn faqadmin__btn--save" onClick={() => saveEdit(item.id)} disabled={saving}>
                      {saving ? <span className="faqadmin__spinner faqadmin__spinner--sm" /> : 'Salvar alterações'}
                    </button>
                    <button className="faqadmin__btn faqadmin__btn--cancel" onClick={cancelEdit}>Cancelar</button>
                  </div>
                </div>
              ) : (
                /* ── DISPLAY MODE ── */
                <>
                  <div className="faqadmin__card-top">
                    <span className="faqadmin__card-num">{index + 1}</span>
                    <div className="faqadmin__card-content">
                      <p className="faqadmin__card-question">{item.question}</p>
                      <p className="faqadmin__card-preview">
                        {item.answer.split('\n\n')[0].slice(0, 120)}{item.answer.length > 120 ? '…' : ''}
                      </p>
                    </div>
                    <div className="faqadmin__card-actions">
                      <button
                        className="faqadmin__icon-btn faqadmin__icon-btn--edit"
                        onClick={() => startEdit(item)}
                        title="Editar"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Editar
                      </button>
                      <button
                        className="faqadmin__icon-btn faqadmin__icon-btn--delete"
                        onClick={() => deleteItem(item.id)}
                        title="Remover"
                      >
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
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
