import { ArrowLeft, ArrowRight, Check, Minus, Plus, ShieldCheck, Star, Truck } from 'lucide-react'
import { useState, type CSSProperties } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../CartContext'
import ProductCard from '../components/ProductCard'
import { findProduct, products } from '../data/products'
import { formatPrice } from '../lib/format'

export default function ProductPage() {
  const { productId } = useParams()
  const product = findProduct(productId ?? '')
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(product?.variants.find((variant) => variant.stock > 0)?.value ?? '')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const navigate = useNavigate()
  if (!product) return <div className="container not-found"><p className="eyebrow">A WRONG TURN</p><h1>We couldn't find that piece.</h1><Link className="button button-dark" to="/">Back to the collection</Link></div>
  const variant = product.variants.find((item) => item.value === selectedVariant)
  const stock = variant?.stock ?? 0
  const related = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 3)
  function handleAdd() {
    if (!product || !variant || stock <= 0) return
    addItem(product, variant.value, Math.min(quantity, stock)); setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }
  return <>
    <div className="container breadcrumb"><Link to="/"><ArrowLeft size={14} /> Back to shop</Link><span>/</span><span>{product.category}</span><span>/</span><span>{product.name}</span></div>
    <section className="container product-detail"><div className="product-gallery"><div className="product-main-image"><img src={product.images[selectedImage] ?? product.image} alt={product.name} /></div><div className="product-thumbnails">{product.images.map((image, index) => <button key={`${image}-${index}`} className={selectedImage === index ? 'thumbnail active' : 'thumbnail'} onClick={() => setSelectedImage(index)} aria-label={`View product image ${index + 1}`}><img src={image} alt="" /></button>)}</div></div>
      <div className="product-information"><p className="eyebrow">{product.category.toUpperCase()} / EVERYDAY SERIES</p><h1>{product.name}</h1><div className="detail-rating"><Star size={15} fill="currentColor" /><strong>{product.rating}</strong><span>({product.reviews} reviews)</span></div>
        <div className="detail-price"><strong>{formatPrice(product.price)}</strong>{product.compareAtPrice && <del>{formatPrice(product.compareAtPrice)}</del>}{product.compareAtPrice && <span className="sale-note">You save {formatPrice(product.compareAtPrice - product.price)}</span>}</div>
        <p className="detail-description">{product.description}</p>
        <div className="variant-heading"><span>Color</span><strong>{selectedVariant || 'Choose a color'}</strong></div><div className="swatches">{product.variants.map((item) => <button key={item.value} className={`swatch ${selectedVariant === item.value ? 'selected' : ''} ${item.stock === 0 ? 'sold-out' : ''}`} style={{ '--swatch-color': item.color } as CSSProperties} onClick={() => { setSelectedVariant(item.value); setQuantity(1); setAdded(false) }} aria-label={`${item.value}${item.stock === 0 ? ', sold out' : ''}`} aria-pressed={selectedVariant === item.value}><span />{selectedVariant === item.value && <Check size={13} />}</button>)}</div>
        <div className="stock-note">{stock > 0 ? <><span className="stock-dot" /> In stock — ready to go</> : <span className="sold-out-text">This color is currently sold out.</span>}</div>
        <div className="purchase-row"><div className="quantity-control quantity-large"><button aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}><Minus size={15} /></button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity(Math.min(Math.max(stock, 1), quantity + 1))} disabled={quantity >= stock}><Plus size={15} /></button></div><button className="button button-dark add-button" disabled={stock <= 0} onClick={handleAdd}>{added ? <><Check size={17} /> Added to bag</> : <>Add to bag — {formatPrice(product.price * quantity)}</>}</button></div>
        {added && <p className="inline-success"><Check size={14} /> Added to your bag. <button className="text-button" onClick={() => navigate('/cart')}>View bag</button></p>}
        <div className="product-promises"><div><Truck size={18} /><span><strong>Free US shipping</strong><small>On orders over $75</small></span></div><div><ShieldCheck size={18} /><span><strong>Easy 30-day returns</strong><small>Demo store policy</small></span></div></div>
        <div className="product-details-list"><h3>Good to know</h3>{product.details.map((detail) => <p key={detail}><Check size={15} /> {detail}</p>)}</div>
      </div></section>
    {related.length > 0 && <section className="container related-section"><div className="section-heading"><div><p className="eyebrow">KEEP EXPLORING</p><h2>Pairs well <em>with.</em></h2></div><Link className="text-link" to="/#shop">View all <ArrowRight size={16} /></Link></div><div className="product-grid related-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}
  </>
}