import ProductCard from './ProductCard'

export default function ProductGrid({
  products = [],
  onAddToCart,
  onToggleWishlist,
  wishlist = []
}) {
  // 🧠 If no products
  if (!products.length) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        No products found
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isWishlisted={wishlist.some(item => item.id === product.id)}
        />
      ))}
    </div>
  )
}