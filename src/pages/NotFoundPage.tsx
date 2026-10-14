import { Link } from 'react-router-dom'
export default function NotFoundPage() {
  return <section className="container not-found"><p className="eyebrow">404 / WRONG TURN</p><h1>This path doesn't lead anywhere.</h1><p>Let's get you back to the collection.</p><Link className="button button-dark" to="/">Back to the collection</Link></section>
}