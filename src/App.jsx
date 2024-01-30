import {createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from "react-router-dom"
import "./App.css"

// pages
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import NotFound from "./Pages/NotFound"
import ForgetPassword from "./Pages/ForgetPassword"

// toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// root-layout
// import RootLayout from "./Layouts/RootLayout"

const router = createBrowserRouter(
  createRoutesFromElements(
    // <Route path="/" element={<RootLayout/>}>
    //   <Route index  element={<SignIn/>} />
    //   <Route path = "signup" element={<SignUp/>}></Route>
    //   <Route path="*" element={<NotFound/>} />
    // </Route>
    <>
    <Route path="/" element={<SignIn/>} />
      <Route path = "signup" element={<SignUp/>}/>
      <Route path="forgetPassword" element={<ForgetPassword/>} />
      <Route path="*" element={<NotFound/>} />
    </>
  )
)

function App(){
  return (
    <>
  <RouterProvider router={router}/>
  <ToastContainer />

    </>
 
  )
}

export default App
