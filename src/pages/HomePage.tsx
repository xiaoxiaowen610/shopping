import { ArrowDownRight, ArrowRight, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { categories, products } from '../data/products'

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('featured')
  const [mobileSortOpen, setMobileSortOpen] = useState(false)
  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const result = products.filter((product) => {
      const matchesQuery = !normalized || `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(normalized)
      return matchesQuery && (category === 'All' || product.category === category)
    })
    if (sort === 'price-low') result.sort((a, b) => a.price - b.price)
    if (sort === 'price-high') result.sort((a, b) => b.price - a.price)
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating)
    if (sort === 'featured') result.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    return result
  }, [query, category, sort])
  function updateQuery(value: string) {
    setQuery(value)
    const next = new URLSearchParams(searchParams)
    if (value.trim()) next.set('q', value.trim())
    else next.delete('q')
    setSearchParams(next, { replace: true })
  }
  function clearFilters() { updateQuery(''); setCategory('All') }

  return <>
    <section className="hero"><img className="hero-image" src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=90" alt="Mountain landscape in soft morning light" /><div className="hero-overlay" />
      <div className="container hero-content"><p className="eyebrow light-eyebrow">MADE FOR THE IN-BETWEEN</p><h1>Go a little<br /><em>further.</em></h1><p>Thoughtful travel essentials for the everyday explorer.</p><a className="button button-light" href="#shop">Explore the collection <ArrowDownRight size={17} /></a><span className="hero-index">01 / EVERYDAY EXPLORATION</span></div>
    </section>
    <section className="intro-strip container" id="story"><p>Less, but better.</p><p>Considered pieces. Everyday utility. More room for the good stuff.</p><span>DESIGNED TO GO WITH YOU <ArrowRight size={15} /></span></section>
    <section className="shop-section container" id="shop"><div className="section-heading"><div><p className="eyebrow">THE COLLECTION</p><h2>Find your <em>everyday.</em></h2></div><p className="section-note">Useful things, made to move with you.</p></div>
      <div className="shop-toolbar"><div className="category-tabs" aria-label="Filter by category">{categories.map((item) => <button key={item} className={category === item ? 'category-tab active' : 'category-tab'} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <div className="shop-controls"><label className="search-field"><span className="sr-only">Search products</span><input value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Find something..." /></label>
          <button className="filter-mobile-button" onClick={() => setMobileSortOpen(!mobileSortOpen)}><SlidersHorizontal size={16} /> Sort</button><label className={`sort-select ${mobileSortOpen ? 'sort-select-open' : ''}`}><span className="sr-only">Sort products</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></label>
        </div>
      </div>
      <div className="results-line"><span>{visibleProducts.length} thoughtfully chosen pieces</span>{(query || category !== 'All') && <button className="text-button" onClick={clearFilters}>Clear filters</button>}</div>
      {visibleProducts.length > 0 ? <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-results"><p className="eyebrow">NOT FOUND</p><h3>No pieces found just yet.</h3><p>Try a different search or clear your filters.</p><button className="button button-dark" onClick={clearFilters}>View all products</button></div>}
    </section>
    <section className="closing-banner"><div className="container closing-inner"><p className="eyebrow light-eyebrow">TAKE THE SCENIC ROUTE</p><h2>Good things happen<br />when you <em>get out there.</em></h2><a className="text-link light-link" href="#shop">Shop everyday essentials <ArrowRight size={17} /></a></div></section>
  </>
}