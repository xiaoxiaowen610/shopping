import { ArrowUpRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { formatPrice } from '../lib/format'

export default function ProductCard({ product }: { product: Product }) {
  return <article className="product-card">
    <Link className="product-image-wrap" to={`/products/${product.id}`}><img src={product.image} alt={product.name} loading="lazy" />
      {product.badge && <span className="product-badge">{product.badge}</span>}<span className="product-quick-view"><ArrowUpRight size={18} /></span>
    </Link>
    <div className="product-card-meta"><div><Link className="product-name" to={`/products/${product.id}`}>{product.name}</Link><p className="product-category">{product.category}</p></div>
      <div className="product-price"><strong>{formatPrice(product.price)}</strong>{product.compareAtPrice && <del>{formatPrice(product.compareAtPrice)}</del>}</div>
    </div>
    <div className="product-rating"><Star size={13} fill="currentColor" /><span>{product.rating}</span><span className="muted">({product.reviews})</span></div>
  </article>
}