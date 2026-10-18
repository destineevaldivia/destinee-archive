import { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router'
import About from './About'
import ProjectList from './ProjectList'
import ProjectPage from './ProjectPage'
import Splash from './Splash'
import projects from './projects'

function App() {
  const { pathname } = useLocation()
  // Only a visit that starts on the home page gets the splash
  const [showSplash, setShowSplash] = useState(pathname === '/')

  // Start each new page at the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  if (showSplash) {
    return <Splash onDone={() => setShowSplash(false)} />
  }

  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
        <h1>Destinee Archive</h1>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<ProjectList projects={projects} />} />
          <Route
            path="/projects/:slug"
            element={<ProjectPage projects={projects} />}
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <footer>
        <button
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </button>
      </footer>
    </>
  )
}

export default App
