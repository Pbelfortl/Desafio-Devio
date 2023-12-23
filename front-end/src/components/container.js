import { useState } from "react";
import TopBar from "./menu";


export default function Container({ children, activePage, setActivePage }) {

  return (
    <>
      <TopBar activePage={activePage} setActivePage={setActivePage} />
      <div className="absolute w-full gap-7 flex flex-col justify-center items-center py-11">
        {children}
      </div>
    </>
  )
}