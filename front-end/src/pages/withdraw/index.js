import Container from "@/components/container";
import TopBar from "@/components/menu";
import api from "@/services/api";
import { useEffect, useState } from "react";


export default function Withdraw() {

  const [orders, setOrders] = useState()
  const [activePage, setActivePage] = useState()

  useEffect(() => {
    loadOrders()
    setActivePage("retirada")
  }, [])

  function loadOrders() {
    api.get("/orders")
      .then((ans) => {
        setOrders(ans.data)
      })
      .catch(ans => {
        console.log(ans.data)
      })
  }

  return (
    <Container activePage={activePage}>
      <div className="flex w-[50%] h-full text-3xl">
        <div className="w-[50%] text-lime-800 border-r-2 p-3 gap-4 flex flex-col">
          <h1 className="mb-5 text-xl">Preparando:</h1>
          <ul>
            {orders &&
              orders.map(element => (
                (!element.ready) &&
                <li>{element.clientName}</li>
              ))
            }
          </ul>
        </div>
        <div className="w-[50%] text-lime-800 border-l-2 p-3 gap-4 flex flex-col">
          <h1 className="mb-5 text-xl">Pronto:</h1>
          <ul>
            {orders &&
              orders.map(element => (
                (element.ready) &&
                <li>{element.clientName}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </Container>
  )
}