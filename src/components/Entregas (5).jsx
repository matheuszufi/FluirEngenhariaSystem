import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ref, onValue } from 'firebase/database'
import { rtdb } from '../firebase'

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
                  src={`${img.imageUrl}${
                    img.imageUrl.includes('?') ? '&' : '?'
                  }autoplay=1`}
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
                  src={`${selectedImage.imageUrl}${
                    selectedImage.imageUrl.includes('?') ? '&' : '?'
                  }autoplay=1`}
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
