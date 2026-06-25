"use client"

import { useState, useEffect } from "react"

export default function AdminPage() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
  const res = await fetch("/api/products")
  const data = await res.json()
  setProducts(data)
}

useEffect(() => {
  fetchProducts()
}, [])

  const addProduct = async (e) => {
    e.preventDefault()

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price: Number(price),
        image,
        description,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      alert("Product added!")
      fetchProducts()
      setName("")
      setPrice("")
      setImage("")
      setDescription("")
    } else {
      alert(data.message)
    }
  }

  const deleteProduct = async (id) => {
  const confirmed = confirm("Delete this product?")

  if (!confirmed) return

  await fetch(`/api/products/${id}`, {
    method: "DELETE",
  })

  fetchProducts()
}

  return (
    
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <form onSubmit={addProduct} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Add Product
        </button>
      </form>
      <div className="mt-10">
  <h2 className="text-2xl font-bold mb-4">
    Products
  </h2>

  {products.map((product) => (
    <div
      key={product._id}
      className="border p-4 rounded mb-3 flex justify-between items-center"
    >
      <div>
        <p className="font-semibold">
          {product.name}
        </p>

        <p className="text-gray-500">
          ${product.price}
        </p>
      </div>
      <button
  onClick={() => deleteProduct(product._id)}
  className="bg-red-500 text-white px-4 py-2 rounded"
>
  Delete
</button>
    </div>
  ))}
</div>
    </div>
  )
}