import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/notfound"

function App() {

  return (
    <>
       <>
  
    {/* <Header/> */}
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    {/* <Footer/> */}
    </>




    </>
  )
}

export default App
