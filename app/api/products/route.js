import { connectDB } from "../../../lib/db"
import Product from "../../../models/Product"

// GET all products
export async function GET() {
  try {
    await connectDB()

    const products = await Product.find()

    return Response.json(products, { status: 200 })
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch products", error: error.message },
      { status: 500 }
    )
  }
}

// POST new product
export async function POST(request) {
  try {
    await connectDB()

    const body = await request.json()

    const product = await Product.create({
      name: body.name,
      price: body.price,
      image: body.image,
      description: body.description,
    })

    return Response.json(product, { status: 201 })
  } catch (error) {
    return Response.json(
      { message: "Failed to create product", error: error.message },
      { status: 500 }
    )
  }
}