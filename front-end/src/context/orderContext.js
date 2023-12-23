import { createContext, useState } from "react";


const orderContext = createContext()
export default orderContext

export function OrderProvider ({children}) {

  const [orderData, setOrderData] = useState([])

  return(
    <orderContext.Provider value={{orderData, setOrderData}}>
      {children}
    </orderContext.Provider>
  )
}