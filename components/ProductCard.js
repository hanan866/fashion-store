import { Heart } from 'lucide-react'

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">

      {/* 🖼️ IMAGE */}
      <div className="relative cursor-pointer">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />

        {/* 🔥 HOVER OVERLAY */}
        <div
          onClick={() => onAddToCart(product)}
          className="absolute inset-0 bg-black/50 flex items-center justify-center 
                     opacity-0 group-hover:opacity-100 transition cursor-pointer"
        >
          <span className="text-white text-lg font-semibold">
            Add to Cart
          </span>
        </div>

        {/* ❤️ Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleWishlist(product)
          }}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-600'
            }`}
          />
        </button>
      </div>

      {/* 📄 INFO */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {product.name}
        </h3>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {product.category}
        </p>

        <p className="mt-2 font-bold text-gray-900 dark:text-white">
          ${product.price}
        </p>
      </div>
    </div>
  )
}