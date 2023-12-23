import { useRouter } from "next/router"
import { useState } from "react"


export default function TopBar({ activePage, setActivePage }) {

  const router = useRouter()

  return (
    <div className="flex w-full h-11 bg-green-800 justify-between text-white px-3 items-center">
      <div className="flex gap-3 items-center text-lg">
        <svg
          viewBox="0 0 512 512"
          fill="currentColor"
          height="1em"
          width="1em"
        >
          <path d="M61.1 224C45 224 32 211 32 194.9c0-1.9.2-3.7.6-5.6C37.9 168.3 78.8 32 256 32s218.1 136.3 223.4 157.3c.5 1.9.6 3.7.6 5.6 0 16.1-13 29.1-29.1 29.1H61.1zm82.9-96c0-8.8-7.2-16-16-16s-16 7.2-16 16 7.2 16 16 16 16-7.2 16-16zm240 16c8.8 0 16-7.2 16-16s-7.2-16-16-16-16 7.2-16 16 7.2 16 16 16zM272 96c0-8.8-7.2-16-16-16s-16 7.2-16 16 7.2 16 16 16 16-7.2 16-16zM16 304c0-26.5 21.5-48 48-48h384c26.5 0 48 21.5 48 48s-21.5 48-48 48H64c-26.5 0-48-21.5-48-48zm16 96c0-8.8 7.2-16 16-16h416c8.8 0 16 7.2 16 16v16c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64v-16z" />
        </svg>
        <p>
          fastfood
        </p>
      </div>
      <div className="flex gap-3">
        <div className={`${(activePage == "pedidos") && "bg-green-900"} rounded-lg p-2 text-slate-50 cursor-pointer`}
          onClick={() => {
            router.push("/")
          }}>Pedidos
        </div>
        <div className={`${(activePage == "cozinha") && "bg-green-900"} rounded-lg p-2 text-slate-50 cursor-pointer`}
          onClick={() => {
            router.push("/kitchen")
          }}>Cozinha
        </div>
        <div className={`${(activePage == "retirada") && "bg-green-900"} rounded-lg p-2 text-slate-50 cursor-pointer`}
          onClick={() => {
            router.push("/withdraw")
          }}>Retirada
        </div>
      </div>
    </div>
  )
}