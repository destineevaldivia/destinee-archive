import { useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router'
import ProjectList from './ProjectList'
import ProjectPage from './ProjectPage'
import projects from './projects'

function App() {
  const { pathname } = useLocation()

  // Start each new page at the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

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
