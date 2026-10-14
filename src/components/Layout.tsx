import { useState, type ReactNode } from 'react'
import Header from './Header'
import CartDrawer from './CartDrawer'

export default function Layout({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false)
  return <>
    <Header onOpenCart={() => setCartOpen(true)} />
    <main>{children}</main>
    <footer className="site-footer"><div className="container footer-inner">
      <a className="wordmark footer-wordmark" href="/">NOMAD<span>.</span></a>
      <p>Thoughtful essentials for wherever life takes you.</p>
      <span>© {new Date().getFullYear()} NOMAD Supply Co.</span>
    </div></footer>
    <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
  </>
}