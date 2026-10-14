import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../CartContext'

export default function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const { itemCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate(`/?q=${encodeURIComponent(query.trim())}#shop`)
    setSearchOpen(false); setMenuOpen(false)
  }
  return <>
    <div className="announcement">Complimentary US shipping on orders over $75</div>
    <header className="site-header"><div className="container header-inner">
      <button className="icon-button mobile-menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      <Link className="wordmark" to="/" aria-label="NOMAD home">NOMAD<span>.</span></Link>
      <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`}>
        <a href="/#shop" onClick={() => setMenuOpen(false)}>Shop all</a><a href="/#shop" onClick={() => setMenuOpen(false)}>Bags</a><a href="/#shop" onClick={() => setMenuOpen(false)}>Accessories</a><a href="/#story" onClick={() => setMenuOpen(false)}>Our story</a>
      </nav>
      <div className="header-actions"><button className="icon-button" aria-label="Search products" onClick={() => setSearchOpen(!searchOpen)}><Search size={20} /></button>
        <button className="icon-button cart-trigger" aria-label={`Open cart, ${itemCount} items`} onClick={onOpenCart}><ShoppingBag size={20} /><span className="cart-count">{itemCount}</span></button>
      </div>
    </div>
    {searchOpen && <form className="header-search container" onSubmit={submitSearch}><Search size={18} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search travel essentials..." aria-label="Search products" /><button className="text-button" type="submit">Search</button><button className="icon-button" type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}><X size={18} /></button></form>}
    </header>
  </>
}