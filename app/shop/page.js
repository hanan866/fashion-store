'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductGrid from '@/components/ProductGrid'

export default function ShopPage() {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [filterCategory, setFilterCategory] = useState('all')
  const [priceRange, setPriceRange] = useState(500)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    const savedWishlist = localStorage.getItem('wishlist')
    const savedDarkMode = localStorage.getItem('darkMode')
    
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode))
  }, [])

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
      setCart(updatedCart)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }]
      setCart(updatedCart)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    }
  }

  const toggleWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      const updatedWishlist = wishlist.filter(item => item.id !== product.id)
      setWishlist(updatedWishlist)
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
    } else {
      const updatedWishlist = [...wishlist, product]
      setWishlist(updatedWishlist)
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
    }
  }

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', JSON.stringify(newMode))
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const allProducts = [
    { id: 1, name: 'Classic Wool Coat', category: 'Outerwear', price: 299, image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400&h=500&fit=crop', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 2, name: 'Cashmere Sweater', category: 'Knitwear', price: 189, image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=500&fit=crop', sizes: ['S', 'M', 'L'] },
    { id: 3, name: 'Leather Jacket', category: 'Outerwear', price: 399, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop', sizes: ['M', 'L', 'XL'] },
    { id: 4, name: 'Silk Blouse', category: 'Tops', price: 129, image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=400&h=500&fit=crop', sizes: ['XS', 'S', 'M', 'L'] },
    { id: 5, name: 'Slim Fit Jeans', category: 'Denim', price: 89, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop', sizes: ['28', '30', '32', '34', '36'] },
    { id: 6, name: 'White T-Shirt', category: 'Basics', price: 29, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 7, name: 'Wool Blazer', category: 'Formal', price: 249, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=500&fit=crop', sizes: ['S', 'M', 'L'] },
    { id: 8, name: 'Leather Boots', category: 'Footwear', price: 199, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop', sizes: ['7', '8', '9', '10', '11'] },
    { id: 9, name: 'Summer Dress', category: 'Dresses', price: 79, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop', sizes: ['XS', 'S', 'M', 'L'] },
    { id: 10, name: 'Cotton Trousers', category: 'Bottoms', price: 69, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop', sizes: ['S', 'M', 'L', 'XL'] },
  ]

  const filteredProducts = allProducts.filter(product => {
    if (filterCategory !== 'all' && product.category !== filterCategory) return false
    if (product.price > priceRange) return false
    return true
  })

  const categories = ['all', 'Outerwear', 'Knitwear', 'Tops', 'Denim', 'Basics', 'Formal', 'Footwear', 'Dresses', 'Bottoms']

  return (
    <>
      <Navbar cartCount={cart.length} wishlistCount={wishlist.length} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">Shop All</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-64 space-y-6">
              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Categories</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={filterCategory === cat}
                        onChange={() => setFilterCategory(cat)}
                        className="text-black"
                      />
                      <span className="text-gray-600 dark:text-gray-400 capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>$0</span>
                  <span>${priceRange}</span>
                  <span>$500</span>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <p className="mb-4 text-gray-600 dark:text-gray-400">{filteredProducts.length} products found</p>
              <ProductGrid
                products={filteredProducts}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                wishlist={wishlist}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}