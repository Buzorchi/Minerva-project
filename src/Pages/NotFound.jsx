import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div>
      <h2>Page not found</h2>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat error quas quibusdam eum iusto quos ut dignissimos, temporibus adipisci unde minima reprehenderit repellendus officia aperiam laborum. Dolor temporibus numquam saepe.</p>
    <p>Go to the <Link to= "/">Homepage</Link>.</p>
    </div>
  )
}

export default NotFound
