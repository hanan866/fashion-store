import { connectDB } from "../../../../lib/db"
import Product from "../../../../models/Product"

export async function GET(request, { params }) {
  try {
    await connectDB()

    const { id } = await params
const product = await Product.findById(id)

    if (!product) {
      return Response.json(
        { message: "Product not found" },
        { status: 404 }
      )
    }

    return Response.json(product)
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch product", error: error.message },
      { status: 500 }
    )
  }
}
export async function DELETE(request, { params }) {
  try {
    await connectDB()

    const { id } = await params

    await Product.findByIdAndDelete(id)

    return Response.json({
      message: "Product deleted"
    })
  } catch (error) {
    return Response.json(
      {
        message: "Failed to delete product",
        error: error.message
      },
      { status: 500 }
    )
  }
}