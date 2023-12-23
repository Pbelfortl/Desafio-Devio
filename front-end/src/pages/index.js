"use client"
import TopBar from "@/components/menu"
import api from "@/services/api"
import { useState, useEffect, useContext } from "react"
import './globals.css'
import { CartReview } from "@/components/cart"
import Container from "@/components/container"
import orderContext from "@/context/orderContext"
import { useRouter } from "next/router"
import Preview from "@/components/preview"

export default function Home() {

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filter, setFilter] = useState()
  const [category, setCategory] = useState([])
  const [displayCart, setDisplayCart] = useState(false)
  const [pickedProduct, setPickedProduct] = useState()
  const [activePage, setActivePage] = useState()
  const { orderData, setOrderData } = useContext(orderContext)

  const router = useRouter()

  useEffect(() => {
    loadProducts()
    setActivePage("pedidos")
    setOrderData([])
  }, [])

  function loadProducts() {
    api.get("/products")
      .then((ans) => {
        console.log(ans)
        setProducts(ans.data)
        setFilteredProducts(ans.data)
      })
      .catch(ans => {
        console.log(ans.data)
      })
  }

  return (
    <Container activePage={activePage}>
      <CartReview product={pickedProduct} display={displayCart} setDisplay={setDisplayCart} />
      <div className="w-[50%]">
        <div className="flex flex-col justify-start items-start">
          <h1>Seja bem-vindo!</h1>
          <input className="outline-none bg-slate-100 w-80 h-12 p-2 rounded-md" onChange={(e) => setFilter(e.target.value)} placeholder="O que você porcura?" />
        </div>
        <div className="flex flex-col">
          <h3>Categorias</h3>
          <p className="text-slate-500">navegue por categoria</p>
          <div className="flex justify-between text-xs">
            <div onClick={() => category !== "main" ? (setCategory("main"),setFilteredProducts(products.filter(element => element.category === "main"))) : (setFilteredProducts(products), setCategory())} className="shadow-md rounded-md relative w-28 h-32 flex justify-center items-center cursor-pointer">
              <img src="https://s2.glbimg.com/3Q9x2c8dWyetlqFutMZ8kmlarWo=/e.glbimg.com/og/ed/f/original/2022/05/27/tentador-carne.jpg" />
              <p className="absolute bottom-3">Lanche</p>
            </div>
            <div onClick={() => category !== "garnish" ? (setCategory("garnish"),setFilteredProducts(products.filter(element => element.category === "garnish"))) : (setFilteredProducts(products), setCategory())} className="shadow-md relative w-28 h-32 flex justify-center items-center cursor-pointer">
              <img src="https://cdn.awsli.com.br/2500x2500/1802/1802445/produto/2092821035b63f61a6e.jpg" />
              <p className="absolute bottom-3">Acompanhamento</p>
            </div>
            <div onClick={() => category !== "drink" ? (setCategory("drink"),setFilteredProducts(products.filter(element => element.category === "drink"))) : (setFilteredProducts(products), setCategory())} className="shadow-md relative w-28 h-32 flex justify-center items-center cursor-pointer">
              <img src="https://revistadegusta.com/wp-content/uploads/2023/06/7c0c428cbe1e4cc5bcbd3ba9768975d7ypMK0GwWcTw51Gp0-0-scaled-e1687272857320.jpg" />
              <p className="absolute bottom-3">Bebidas</p>
            </div>
            <div onClick={() => category !== "dessert" ? (setCategory("dessert"),setFilteredProducts(products.filter(element => element.category === "dessert"))) : (setFilteredProducts(products), setCategory())} className="shadow-md relative w-28 h-32 flex justify-center items-center cursor-pointer">
              <img src="https://damayconfeitaria.com/uploads/imagens/torta-especial-de-natal-239-926.jpg" />
              <p className="absolute bottom-3">Sobremesas</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h3>Produtos</h3>
          <p className="text-slate-500">Selecione um produto para adicionar ao seu pedido</p>
          <div className="flex min-h-[11rem] justify-between">
            {(filter) ?
              filteredProducts.map(element => (
                (element.name.toLowerCase().includes(filter.toLowerCase())) &&
                <div key={element.id} className={`shadow-md relative w-36 p-2 h-40 flex flex-col items-center border-red-800 border-2 rounded-md m-2 text-xs cursor-pointer`}
                  onClick={() => {
                    setPickedProduct(element)
                    setDisplayCart(true)
                  }}
                >
                  <img className="w-[80%] object-contain" src={element.imgUrl} />
                  <div className="absolute bottom-1 w-full px-1">
                    <h5>{element.name}</h5>
                    <p className="text-[12px] w-full max-h-4 overflow-clip text-slate-400">{element.ingredients}</p>
                    <p>R${element.price / 100}</p>
                  </div>
                </div>
              )) :
                filteredProducts.map(element => (
                <div key={element.id} className={`shadow-md relative w-36 p-2 h-40 flex flex-col items-center border-red-800 border-2 rounded-md m-2 text-xs cursor-pointer`}
                  onClick={() => {
                    setPickedProduct(element)
                    setDisplayCart(true)
                  }}
                >
                  <img className="w-[80%] object-contain" src={element.imgUrl} />
                  <div className="absolute bottom-1 w-full px-1">
                    <h5>{element.name}</h5>
                    <p className="text-[12px] w-full max-h-4 overflow-clip text-slate-400">{element.ingredients}</p>
                    <p>R${element.price / 100}</p>
                  </div>
                </div>
              ))
              }
          </div>
        </div>
        {orderData.length > 0 && <Preview/>}
        <div className="flex my-3 gap-3 w-full justify-end text-white">
            <button className="text-slate-300 border-2 border-slate-300 p-3 rounded-lg"
              onClick={() => setOrderData([])}
            >Cancelar</button>
            <button
              className={`${orderData.length > 0 ? "bg-lime-800" : "bg-slate-300 pointer-events-none"} px-3 rounded-lg`}
              onClick={() => router.push("/payment")}>Finalizar pedido</button>
          </div>
      </div>
    </Container>
  )
}
