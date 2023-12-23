import { useEffect, useState } from "react"
import api from "@/services/api"
import Container from "@/components/container"


export default function Kitchen() {

  const [orders, setOrders] = useState()
  const [activePage, setActivePage] = useState()

  useEffect(() => {
    loadOrders()
    setActivePage("cozinha")
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

  function finishOrder(clientCode) {
    api.put(`/orders/${clientCode}`)
      .then(ans => loadOrders())
      .catch(ans => console.log(ans))
  }

  function clearOrder (clientCode) {
    api.delete(`/orders/${clientCode}`)
      .then(ans => loadOrders())
      .catch((ans) => console.log(ans))
  }

  return (
    <Container activePage={activePage}>
      <div className="flex w-[50%] h-full">
        <div className="w-[50%] text-lime-800 border-r-2 p-3 gap-4 flex flex-col">
          <h1 className="mb-5 text-xl">Preparando</h1>
          {orders &&
            orders.map((element) => (
              (!element.ready) &&
              <div key={element.clientCode} className="flex border-slate-200 border-2 justify-between items-center p-3 rounded-md">
                <div className="max-w-[70%]">
                  <div className="flex justify-between">
                    <span>
                      {element.clientCode}
                    </span>
                    &nbsp;-&nbsp;
                    <span>
                      {element.clientName}
                    </span>
                  </div>
                  {element.dishes.map((product) => (
                    <div key={product.dishId} className="flex text-sm text-slate-400">
                      <p>{product.amount}x &nbsp;</p>
                      <p>{product.dishName}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-1 text-2xl">
                  <svg className="cursor-pointer text-lime-600  bg-lime-100"
                    onClick={() => finishOrder(element.clientCode)}
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                  >
                    <path d="M433.1 657.7a31.8 31.8 0 0051.7 0l210.6-292c3.8-5.3 0-12.7-6.5-12.7H642c-10.2 0-19.9 4.9-25.9 13.3L459 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H315c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8z" />
                    <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" />
                  </svg>
                  <svg className="cursor-pointer text-red-600 bg-red-100"
                    onClick={() => clearOrder(element.clientCode)}
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                  >
                    <path d="M354 671h58.9c4.7 0 9.2-2.1 12.3-5.7L512 561.8l86.8 103.5c3 3.6 7.5 5.7 12.3 5.7H670c6.8 0 10.5-7.9 6.1-13.1L553.8 512l122.4-145.9c4.4-5.2.7-13.1-6.1-13.1h-58.9c-4.7 0-9.2 2.1-12.3 5.7L512 462.2l-86.8-103.5c-3-3.6-7.5-5.7-12.3-5.7H354c-6.8 0-10.5 7.9-6.1 13.1L470.2 512 347.9 657.9A7.95 7.95 0 00354 671z" />
                    <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" />
                  </svg>
                </div>
              </div>
            ))
          }
        </div>
        <div className="w-[50%] text-lime-800 border-l-2 p-3 gap-4 flex flex-col">
          <h1 className="mb-5 text-xl">Pronto</h1>
          {orders &&
            orders.map((element) => (
              (element.ready) &&
              <div key={element.clientCode} className="flex border-slate-200 border-2 justify-between items-center p-3 rounded-md">
                <div className="max-w-[70%]">
                  <div className="flex justify-between">
                    <span>
                      {element.clientCode}
                    </span>
                    &nbsp;-&nbsp;
                    <span>
                      {element.clientName}
                    </span>
                  </div>
                  {element.dishes.map((product) => (
                    <div key={product.dishId} className="flex text-sm text-slate-400">
                      <p>{product.amount}x &nbsp;</p>
                      <p>{product.dishName}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-1 text-2xl">
                  <svg className="cursor-pointer text-red-600 bg-red-100"
                    onClick={() => clearOrder(element.clientCode)}
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                  >
                    <path d="M354 671h58.9c4.7 0 9.2-2.1 12.3-5.7L512 561.8l86.8 103.5c3 3.6 7.5 5.7 12.3 5.7H670c6.8 0 10.5-7.9 6.1-13.1L553.8 512l122.4-145.9c4.4-5.2.7-13.1-6.1-13.1h-58.9c-4.7 0-9.2 2.1-12.3 5.7L512 462.2l-86.8-103.5c-3-3.6-7.5-5.7-12.3-5.7H354c-6.8 0-10.5 7.9-6.1 13.1L470.2 512 347.9 657.9A7.95 7.95 0 00354 671z" />
                    <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" />
                  </svg>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </Container>
  )
}