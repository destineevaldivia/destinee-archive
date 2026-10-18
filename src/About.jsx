import { useEffect, useState } from 'react'

const links = [
  { label: 'Instagram', href: 'https://www.instagram.com/dustyknees_/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/destinee-valdivia/' },
  { label: 'Are.na', href: 'https://www.are.na/destinee-valdivia' },
]
const email = 'destvaldivia@gmail.com'

function About() {
  const [copied, setCopied] = useState(false)

  // Show "Copied" for 2 seconds, then the email again
  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  function copyEmail() {
    navigator.clipboard.writeText(email).then(() => setCopied(true))
  }

  return (
    <div className="about">
      <p>
        Lorem ipsum velvet morning, the archive hums in quiet frames. Paper
        moths drift between the stills, folding light into small songs.
        Somewhere a shutter blinks and keeps the afternoon. Thread and ink
        argue softly over the shape of a sleeve. Every image here waits to be
        told again.
      </p>

      <div className="contacts">
        {links.map((link) => (
          <a
            key={link.label}
            className="contact"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="dot" />
            <span className="contact-label">{link.label}</span>
          </a>
        ))}
        <button type="button" className="contact" onClick={copyEmail}>
          <span className="dot" />
          <span className="contact-label">{copied ? 'Copied' : email}</span>
        </button>
      </div>

      {/* Reserved for a future animation */}
      <div className="about-animation" />
    </div>
  )
}

export default About
