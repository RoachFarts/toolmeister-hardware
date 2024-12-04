'use client'
import { twMerge } from "tailwind-merge"
import { ProductData } from "../../type"
import { useDispatch } from "react-redux"
import { addToCart } from "@/redux/toolmeisterSlice"
import toast from "react-hot-toast"

interface Props {
    item:ProductData,
    className?:string
}

const AddToCartButton = ({item, className}:Props) => {
  const dispatch = useDispatch()
  const handleAddToCart = () => {
    dispatch(addToCart(item))
    toast.success(`${item.title.substring(0, 12)} added to cart`)
  }
  return <button onClick={handleAddToCart}
  className={twMerge("bg-accent text-white w-full py-2 border border-px border-accent hover:bg-darkOrange hoverEffect font-semibold tracking-wide flex items-center justify-center gap-1", className)}>
  Add to cart</button>
}

export default AddToCartButton