function App() {
  return (
    <>
      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/archive">Project Archive</a>
          <a href="/about">About</a>
        </nav>
        <h1>Destinee Archive</h1>
      </header>

      <main></main>

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
