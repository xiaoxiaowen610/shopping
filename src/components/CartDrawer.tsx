import { ArrowRight, Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../CartContext'
import { findProduct } from '../data/products'
import { formatPrice } from '../lib/format'

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lines, itemCount, subtotal, setQuantity, removeItem } = useCart()
  if (!open) return null
  return <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div className="drawer-header"><div><p className="eyebrow">YOUR SELECTION</p><h2>Your bag <span>({itemCount})</span></h2></div><button className="icon-button" aria-label="Close cart" onClick={onClose}><X size={21} /></button></div>
      {lines.length === 0 ? <div className="drawer-empty"><ShoppingBag size={34} strokeWidth={1.3} /><h3>Your bag is taking a break.</h3><p>Find something useful for your next adventure.</p><button className="button button-dark" onClick={onClose}>Continue shopping</button></div> : <>
        <div className="drawer-items">{lines.map((line) => { const product = findProduct(line.productId); if (!product) return null; return <div className="cart-line" key={`${line.productId}-${line.variant}`}>
          <Link to={`/products/${product.id}`} onClick={onClose} className="cart-line-image"><img src={product.image} alt={product.name} /></Link>
          <div className="cart-line-info"><div className="cart-line-top"><div><Link to={`/products/${product.id}`} onClick={onClose} className="cart-line-name">{product.name}</Link><p className="muted small">{line.variant}</p></div><strong>{formatPrice(product.price * line.quantity)}</strong></div>
            <div className="cart-line-bottom"><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => setQuantity(line.productId, line.variant, line.quantity - 1)}><Minus size={13} /></button><span>{line.quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity(line.productId, line.variant, line.quantity + 1)} disabled={line.quantity >= (product.variants.find((variant) => variant.value === line.variant)?.stock ?? 0)}><Plus size={13} /></button></div><button className="text-button remove-button" onClick={() => removeItem(line.productId, line.variant)}>Remove</button></div>
          </div></div> })}</div>
        <div className="drawer-summary"><div className="summary-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><p>Shipping and taxes are not included in this demo.</p><Link className="button button-dark button-full" to="/cart" onClick={onClose}>View bag <ArrowRight size={17} /></Link><button className="continue-link" onClick={onClose}>Continue shopping</button></div>
      </>}
    </aside>
  </div>
}