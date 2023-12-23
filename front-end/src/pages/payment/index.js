import TopBar from "@/components/menu"
import orderContext from "@/context/orderContext"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import api from "@/services/api"
import Finish from "@/components/finishOrder"
import Container from "@/components/container"
import uniqid from 'uniqid'

export default function Payment() {

  const [clientName, setClientName] = useState()
  const [cash, setCash] = useState()
  const [totalAmount, setTotalAmount] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState()
  const { orderData, setOrderData } = useContext(orderContext)
  const [display, setDisplay] = useState(false)
  const [clientCode, setClientCode] = useState()
  const router = useRouter()


  useEffect(() => {
    setTotalAmount(orderData.reduce((sum, element) => sum + (element.price * element.amount), 0))
    setClientCode(uniqid.time().toLocaleUpperCase())
  }, [])

  function confirmOrder (event) {
    event.preventDefault()
    api.post("/orders", {clientCode: clientCode, clientName: clientName, dishes: orderData})
    .then((ans) => {setDisplay(true)})
    .catch(() => alert("Não foi possível finalizar a compra!"))
  }

  return (
    <Container>
    <Finish display={display} setDisplay={setDisplay}/>
    <form className=" flex w-full h-full justify-center gap-11" onSubmit={event => confirmOrder(event)}>
      <div className="flex flex-col">
        <h2 className="text-3xl">Pagamento</h2>
        <h5 className="my-3">Resumo da compra</h5>
        <div className="border-2 border-gray-300 p-3 gap-5 my-4 rounded-lg text-slate-500 text-lg">
          {orderData.map(element => (
            <div className="flex justify-between my-3">
              <div>{element.amount}x {element.dishName}</div>
              <div>R$ {element.price/100}</div>
            </div>
          ))}
          <div className="border-t-2 border-slate-400 flex flex-col gap-3 py-3">
            <p>Total do pedido:</p>
            <span className="text-black text-3xl">R$ {totalAmount/100}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <div>
            <h3>Nome do cliente</h3>
            <input className="outline-none bg-slate-200 w-56 h-10 p-2 rounded-md" required onChange={(e) => setClientName(e.target.value)}/>
          </div>
          <div>
            <h3>Código</h3>
            <div className="bg-slate-200 h-10 p-2 rounded-md">{clientCode}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3  mt-8">
        <h3>Selecione a forma de pagamento!</h3>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between rounded-xl p-4 border-2 border-gray-300">
            <p>Débito</p>
            <input type="radio" name="method" defaultChecked value="debito" onClick={() => setPaymentMethod("card")}/>
          </div>
          <div className="flex justify-between rounded-xl p-4 border-2 border-gray-300">
            <p>Crédito</p>
            <input type="radio" name="method" value="credito" onClick={() => setPaymentMethod("card")}/>
          </div>
          <div className="flex justify-between rounded-xl p-4 border-2 border-gray-300">
            <p>Dinheiro</p>
            <input value="dinheiro" name="method" type="radio" onClick={() => setPaymentMethod("dinheiro")} />
          </div>
          {(paymentMethod === "dinheiro") ?
            <div className="flex gap-5 max-w-full">
              <div>
                <p>Valor entregue</p>
              <input className="outline-none bg-slate-200 h-10 p-2 rounded-md" type="number" required onChange={e => setCash(e.target.value)} />
              </div>
              <div>
                <p>Troco</p>
                <p className="outline-none bg-slate-200 h-10 w-16 p-2 rounded-md">{(cash*100 >= totalAmount) ? (cash*100-totalAmount)/100 : 0}</p>
              </div>
            </div>
              :
            <div className="flex gap-5 max-w-full">
              <div>
                <p>Número do cartão</p>
                <input className="outline-none bg-slate-200 h-10 p-2 rounded-md" required type="number"/>
              </div>
              <div>
                <p>Código</p>
                <input className="outline-none bg-slate-200 w-16 h-10 p-2 rounded-md" required type="number" />
              </div>
            </div>
          }
        </div>
        <div className="flex gap-5 justify-end py-5">
          <button className="text-green-800 border-2 border-green-800 p-2 rounded-lg" type="reset" onClick={() => router.push("/")}>Cancelar</button>
          <button className="text-white border-2 bg-green-800 p-2 rounded-lg" type="submit">Finalizar pedido</button>
        </div>
      </div>
    </form>
    </Container>
  )
}