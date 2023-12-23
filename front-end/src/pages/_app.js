import { OrderProvider } from "@/context/orderContext";


export default function App ({Component}) {

  return(
    <OrderProvider>
      <Component />
    </OrderProvider>
  )
}