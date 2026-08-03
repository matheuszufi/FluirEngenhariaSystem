import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ref, onValue } from 'firebase/database'
import { rtdb } from '../firebase'

function buildVideoSrc(url) {
  if (!url) return url

  // YouTube: precisa do parâmetro playlist=ID (igual ao vídeo) para o loop funcionar
  const ytMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/)
  if (ytMatch) {
    const id = ytMatch[1]
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0&playsinline=1`
  }

  // Google Drive: sem suporte nativo a loop, mantém autoplay
  return `${url}${url.includes('?') ? '&' : '?'}autoplay=1`
}

export default function Entregas() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const unsub = onValue(ref(rtdb, 'entregas'), (snap) => {
      if (snap.exists()) {
        const items = Object.entries(snap.val())
          .map(([id, v]) => ({ id, ...v }))
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

        setImages(items)
      } else {
        setImages([])
      }

      setLoading(false)
    })

    return () => unsub()
  }, [])

  if (loading || images.length === 0) return null

  return (
    <>
      <section className="entregas">
        <div className="container">
          {/* <p className="section-tag">Resultados</p> */}
          <h2 className="section-title">Nossas entregas</h2>
        </div>

        <div className="entregas__gallery">
          {images.map((img) => (
            <div
              className="entregas__item"
              key={img.id}
              onClick={() => setSelectedImage(img)}
            >
              {img.type === 'video' ? (
                <iframe
                  src={buildVideoSrc(img.imageUrl)}
                  title={img.label || 'Vídeo'}
                  className="entregas__video"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              ) : (
                // Funciona tanto para imagens quanto para gifs (a tag <img>
                // reproduz o gif normalmente quando a URL aponta para o
                // arquivo direto, e não para uma miniatura estática).
                <img
                  src={img.imageUrl}
                  alt={img.label || 'Entrega'}
                  loading="lazy"
                />
              )}

              {img.label && img.type !== 'video' && (
                <div className="entregas__item-overlay">
                  <span>{img.label}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="container entregas__cta">
          <a
            href="/"
            className="btn btn--primary"
            onClick={(e) => {
              e.preventDefault()
              document
                .getElementById('contato')
                ?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            SOLICITAR PROPOSTA
          </a>
        </div>
      </section>

      {selectedImage &&
        createPortal(
          <div
            className="entregas__modal"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="entregas__modal-close"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>

            {selectedImage.type === 'video' ? (
              <div
                className="entregas__modal-video"
                onClick={(e) => e.stopPropagation()}
              >
                <iframe
                  src={buildVideoSrc(selectedImage.imageUrl)}
                  title={selectedImage.label || 'Vídeo'}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            ) : (
              // Cobre tanto imagens quanto gifs — o gif continua
              // animado dentro do modal, igual no card da galeria.
              <img
                className="entregas__modal-image"
                src={selectedImage.imageUrl}
                alt={selectedImage.label || 'Entrega'}
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>,
          document.body
        )}
    </>
  )
}
