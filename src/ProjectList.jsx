import { Link } from 'react-router'
import ProjectCarousel from './ProjectCarousel'

function ProjectList({ projects }) {
  return (
    <div className="project-list">
      {projects.map((project) => (
        <article key={project.slug} className="project">
          <ProjectCarousel images={project.images} />
          <div className="project-text">
            <h2>
              <Link to={`/projects/${project.slug}`}>
                {project.title} {project.year}
                <span className="title-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </h2>
            <p>{project.description}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

export default ProjectList
