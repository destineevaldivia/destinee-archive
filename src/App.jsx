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
  // Project pages live under Home, so Home stays marked there too
  const onHome = pathname === '/' || pathname.startsWith('/projects/')
  const onAbout = pathname === '/about'

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
          <Link
            to="/"
            className={onHome ? 'active' : undefined}
            aria-current={onHome ? 'page' : undefined}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={onAbout ? 'active' : undefined}
            aria-current={onAbout ? 'page' : undefined}
          >
            About
          </Link>
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
