import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Header>
        <Nav />
      </Header>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
