import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Allapp from "./Allapp"
import LoginForm from "./pages/auth/LoginForm"
import React from "react"
import Product from "./pages/products/Product"
import Oneproduct from "./pages/SingpleProductpage/Oneproduct"
import Cart from "./pages/Cart/CartPage"

const routes = createBrowserRouter([
  {path :"/" , element : <Allapp/>},
  {path :"/auth" , element : <LoginForm/>},
  {path :"/product" , element : <Product/>},
  {path :"/product/:id" , element : <Oneproduct/> },
  {path :"/cart" , element : <Cart/> }
]
)

function App() {


  return (
    <>
       <RouterProvider router={routes} />
    </>
  )
}

export default App
