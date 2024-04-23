'use client'
import Login from "@/Component/Login/Login";
import { CarritoProvider } from "@/Context/Context";

export default function MyApp({}) {
  return (
    <CarritoProvider>
      <Login/>
    </CarritoProvider>
  );
}
