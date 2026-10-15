function ProjectList({ projects }) {
  return (
    <div className="project-list">
      {projects.map((project) => (
        <article key={project.slug} className="project">
          <img src={project.images[0]} alt="" />
          <div className="project-text">
            <h2>
              {project.title} {project.year}
            </h2>
            <p>{project.description}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

export default ProjectList
