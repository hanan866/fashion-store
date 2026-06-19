import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    price: Number,
    image: String,
    sizes: [String],
  },
  { timestamps: true }
)

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema)