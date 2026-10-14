import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../CartContext'
import { findProduct } from '../data/products'
import { formatPrice } from '../lib/format'

export default function CartPage() {
  const { lines, itemCount, subtotal, setQuantity, removeItem } = useCart()
  return <section className="container cart-page"><div className="cart-page-heading"><p className="eyebrow">YOUR SELECTION</p><h1>Your bag <em>({itemCount})</em></h1></div>
    {lines.length === 0 ? <div className="cart-empty"><ShoppingBag size={42} strokeWidth={1.2} /><h2>Your next adventure starts here.</h2><p>Your bag is currently empty. Find a few useful things for the road ahead.</p><Link className="button button-dark" to="/#shop">Explore the collection <ArrowRight size={17} /></Link></div> : <div className="cart-layout"><div className="cart-table"><div className="cart-table-heading"><span>ITEM</span><span>QUANTITY</span><span>TOTAL</span></div>
      {lines.map((line) => { const product = findProduct(line.productId); if (!product) return null; const stock = product.variants.find((item) => item.value === line.variant)?.stock ?? 0; return <div className="cart-page-line" key={`${line.productId}-${line.variant}`}>
        <Link className="cart-line-image cart-page-image" to={`/products/${product.id}`}><img src={product.image} alt={product.name} /></Link><div className="cart-page-product"><Link className="cart-line-name" to={`/products/${product.id}`}>{product.name}</Link><p className="muted small">Color: {line.variant}</p><p className="cart-unit-price">{formatPrice(product.price)}</p><button className="text-button remove-button desktop-hidden" onClick={() => removeItem(line.productId, line.variant)}>Remove</button></div>
        <div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => setQuantity(line.productId, line.variant, line.quantity - 1)}><Minus size={13} /></button><span>{line.quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity(line.productId, line.variant, line.quantity + 1)} disabled={line.quantity >= stock}><Plus size={13} /></button></div><div className="cart-total-cell"><strong>{formatPrice(product.price * line.quantity)}</strong><button className="icon-button remove-icon" aria-label={`Remove ${product.name}`} onClick={() => removeItem(line.productId, line.variant)}><Trash2 size={16} /></button></div>
      </div> })}
      <Link className="continue-shopping" to="/#shop"><ArrowLeft size={15} /> Continue shopping</Link></div>
      <aside className="order-summary"><p className="eyebrow">ORDER SUMMARY</p><div className="summary-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div className="summary-row muted"><span>Shipping</span><span>Calculated later</span></div><div className="summary-row muted"><span>Taxes</span><span>Calculated later</span></div><div className="summary-total"><span>Estimated total</span><strong>{formatPrice(subtotal)}</strong></div><button className="button button-dark button-full" onClick={() => window.alert('This is a frontend portfolio demo. Checkout is intentionally not connected.')}>Continue to checkout <ArrowRight size={17} /></button><p className="summary-disclaimer">Demo only — no payment will be collected.</p></aside></div>}
  </section>
}