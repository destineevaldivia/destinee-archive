import { useEffect, useState } from 'react'

const SHOW_MS = 2500
const FADE_MS = 500

function Splash({ onDone }) {
  const [leaving, setLeaving] = useState(false)

  // Show the title, then start fading out; a key press skips ahead
  useEffect(() => {
    const leave = () => setLeaving(true)
    const timer = setTimeout(leave, SHOW_MS)
    window.addEventListener('keydown', leave)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', leave)
    }
  }, [])

  // Once the fade finishes, hand over to the site
  useEffect(() => {
    if (!leaving) return
    const timer = setTimeout(onDone, FADE_MS)
    return () => clearTimeout(timer)
  }, [leaving, onDone])

  return (
    <div
      className={leaving ? 'splash leaving' : 'splash'}
      onClick={() => setLeaving(true)}
    >
      <h1>Destinee Archive</h1>
    </div>
  )
}

export default Splash
