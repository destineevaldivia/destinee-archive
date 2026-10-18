import { useState } from 'react'

function ProjectCarousel({ images }) {
  const [index, setIndex] = useState(0)

  if (images.length === 1) {
    return <img src={images[0]} alt="" />
  }

  return (
    <div>
      <div className="carousel-dots" aria-hidden="true">
        {images.map((image, i) => (
          <span key={i} className={i === index ? 'dot active' : 'dot'} />
        ))}
      </div>
      <button
        type="button"
        className="carousel-button"
        aria-label="Next image"
        onClick={() => setIndex((index + 1) % images.length)}
      >
        <img src={images[index]} alt="" />
      </button>
    </div>
  )
}

export default ProjectCarousel
