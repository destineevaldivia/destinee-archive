import { Link, useParams } from 'react-router'

function ProjectPage({ projects }) {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="project-page">
        <p>Project not found</p>
        <Link to="/">Back to home</Link>
      </div>
    )
  }

  return (
    <article className="project-page">
      <h2>
        {project.title} {project.year}
      </h2>
      <p>{project.description}</p>
      {project.images.map((image, i) => (
        <img key={i} src={image} alt="" />
      ))}
    </article>
  )
}

export default ProjectPage
