function App() {

  return (
    <>
       <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<Login/>}/>
      <Route path="/contact" element={<Register/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    <Footer/>
    </>




    </>
  )
}

export default App
