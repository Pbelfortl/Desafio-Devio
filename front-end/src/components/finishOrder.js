import Image from "next/image";
import { useRouter } from "next/router";
import FinishImage from "@/assets/finish.png"


export default function Finish({ display, setDisplay }) {

  const router = useRouter()

  if (!display) return

  return (
    <div className="fixed flex flex-col w-full h-full bg-slate-300/[0.6] justify-center items-center">
      <div className="bg-white relative p-6 rounded-xl items-center justify-center flex flex-col">
        <button className="absolute top-4 right-4" onClick={() => router.push("/")}>X</button>
        <Image src={FinishImage} width={500} height={400}></Image>
        <h2 className="text-3xl">Pedido finalizado com sucesso!</h2>
        <h5 className="text-slate-500 text-lg">Seu pedido foi encaminhado para a cozinha.</h5>
      </div>
    </div>
  )
}