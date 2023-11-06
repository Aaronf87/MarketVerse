import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import NotFound from "./pages/notfound"

function App() {

  return (
    <>
       <>
  
    {/* <Header/> */}
    <Routes>
      <Header/>
      <Route path="/" element={<Home/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    <Footer/>
    </>




    </>
  )
}

export default App
