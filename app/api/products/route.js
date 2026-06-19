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