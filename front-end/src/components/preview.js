import { useContext, useEffect, useState } from "react"
import orderContext from "@/context/orderContext"


export default function Preview() {

  const { orderData } = useContext(orderContext)
  const [total, setTotal] = useState()

  useEffect(() => {
    setTotal(orderData.reduce((sum, element) => sum + (element.price * element.amount), 0))
  },[])

  return (
    <div className="W-full flex-col flex border-2 p-4 border-slate-400 my-7 rounded-lg">
      <div className="flex text-sm text-slate-400 justify-between w-full">
        {orderData.map(element => (
          <div className="w-full flex justify-between flex-col gap-4">
            <div className="flex w-[80%] text-sm text-slate-400 justify-between font-light">
              <span>{element?.amount}x&nbsp;{element?.dishName}</span>
              <span>R${element.price/100}</span>
            </div>
            <div className="flex flex-col  gap-3 border-t-2 border-slate-400 py-3 border-dashed">
              <span className="font-thin">Total do pedido:</span>
              <span className="text-3xl text-black">R$&nbsp;{(element?.price * element.amount)/100}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}