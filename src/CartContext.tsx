import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import { products, type Product } from './data/products'

export type CartLine = { productId: string; variant: string; quantity: number }
type Action =
  | { type: 'add'; product: Product; variant: string; quantity: number }
  | { type: 'setQuantity'; productId: string; variant: string; quantity: number }
  | { type: 'remove'; productId: string; variant: string }
  | { type: 'restore'; lines: CartLine[] }
type CartValue = {
  lines: CartLine[]; itemCount: number; subtotal: number
  addItem: (product: Product, variant: string, quantity?: number) => void
  setQuantity: (productId: string, variant: string, quantity: number) => void
  removeItem: (productId: string, variant: string) => void
}
const STORAGE_KEY = 'nomad-demo-cart-v1'
const Context = createContext<CartValue | null>(null)

function stockFor(productId: string, variantName: string) {
  return products.find((product) => product.id === productId)?.variants.find((variant) => variant.value === variantName)?.stock ?? 0
}
function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case 'add': {
      const stock = stockFor(action.product.id, action.variant)
      if (stock < 1) return state
      const found = state.find((line) => line.productId === action.product.id && line.variant === action.variant)
      if (found) return state.map((line) => line.productId === action.product.id && line.variant === action.variant
        ? { ...line, quantity: Math.min(stock, line.quantity + action.quantity) } : line)
      return [...state, { productId: action.product.id, variant: action.variant, quantity: Math.min(stock, action.quantity) }]
    }
    case 'setQuantity': {
      if (action.quantity <= 0) return state.filter((line) => !(line.productId === action.productId && line.variant === action.variant))
      const stock = stockFor(action.productId, action.variant)
      return state.map((line) => line.productId === action.productId && line.variant === action.variant
        ? { ...line, quantity: Math.min(stock, Math.floor(action.quantity)) } : line)
    }
    case 'remove': return state.filter((line) => !(line.productId === action.productId && line.variant === action.variant))
    case 'restore': return action.lines.flatMap((line) => {
      const stock = stockFor(line.productId, line.variant)
      if (stock < 1 || !Number.isFinite(line.quantity) || line.quantity < 1) return []
      return [{ ...line, quantity: Math.min(stock, Math.floor(line.quantity)) }]
    })
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, [])
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed: unknown = JSON.parse(raw)
        if (Array.isArray(parsed)) dispatch({ type: 'restore', lines: parsed as CartLine[] })
      }
    } catch { localStorage.removeItem(STORAGE_KEY) }
  }, [])
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(lines)) } catch { /* memory state still works */ }
  }, [lines])
  const addItem = useCallback((product: Product, variant: string, quantity = 1) => dispatch({ type: 'add', product, variant, quantity }), [])
  const setQuantity = useCallback((productId: string, variant: string, quantity: number) => dispatch({ type: 'setQuantity', productId, variant, quantity }), [])
  const removeItem = useCallback((productId: string, variant: string) => dispatch({ type: 'remove', productId, variant }), [])
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0)
  const subtotal = lines.reduce((sum, line) => sum + (products.find((product) => product.id === line.productId)?.price ?? 0) * line.quantity, 0)
  const value = useMemo(() => ({ lines, itemCount, subtotal, addItem, setQuantity, removeItem }), [lines, itemCount, subtotal, addItem, setQuantity, removeItem])
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export function useCart() {
  const value = useContext(Context)
  if (!value) throw new Error('useCart must be used inside CartProvider')
  return value
}
