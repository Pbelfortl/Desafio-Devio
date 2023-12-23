import { useState } from "react"
import orderContext from "@/context/orderContext"
import { useContext } from "react"
import { useRouter } from "next/router"

export function CartReview({ product, display, setDisplay }) {

  const [amount, setAmount] = useState(1)
  const { orderData, setOrderData } = useContext(orderContext)
  const [observation, setObservation] = useState()
  const router = useRouter()

  return (
    <div className={`${display ? "flex flex-col" : "hidden"} z-10 fixed w-full h-full top-0 left-0 bg-slate-300/[0.6] justify-center items-center`}>
      <div className="bg-white rounded-xl relative p-10 w-2/5 h-2/4 gap-6 flex flex-col justify-between">
        <button className="absolute top-8 right-8" onClick={() => setDisplay(false)}>X</button>
        <h1>Revise seu pedido!</h1>
        <div className="bg-slate-50 w-full flex gap-3">
          <img src={product?.imgUrl} className="w-[25%] object-contain shadow-lg" />
          <div className="flex flex-col">
            <h5>{product?.name}</h5>
            <p>{product?.ingredients}</p>
            <div className="flex gap-2 border-y-2 border-lime-700 w-fit rounded-full justify-center items-center">
              <button className="bg-lime-700 text-white rounded-full h-6 w-6 flex justify-center items-center" onClick={() => { (amount > 1) && setAmount((prevState) => prevState - 1) }}>-</button>
              <div>{amount}</div>
              <button className="bg-lime-700 text-white rounded-full h-6 w-6 flex justify-center items-center" onClick={() => setAmount((prevState) => prevState + 1)}>+</button>
            </div>
            <div>R$ {(product?.price * amount) / 100}</div>
          </div>
        </div>
        <div className="flex gap-5">
          <button 
            className="border-2 border-lime-800 p-3 rounded-lg text-lime-800"
            onClick={() => {
            setAmount(1)
            setDisplay(false)
          }}>Cancelar</button>
          <button 
            className="px-3 rounded-lg bg-lime-800 text-white"
            onClick={() => {
            setOrderData([...orderData, { dishId: product.id, dishName: product.name, price: product.price, amount: amount }])
            setAmount(1)
            setDisplay(false)
          }}>Adicionar ao pedido</button>
        </div>
      </div>
    </div>
  )
}