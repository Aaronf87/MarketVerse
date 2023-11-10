import { ApolloProvider } from "@apollo/client";
import client from "./utils/apollo.js";

import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Nav from "./components/Nav";
import MainContext from "./components/UI/MainContent.jsx";
import Footer from "./components/Footer";
import SingUp from "./pages/SignUp.jsx";

function App() {
  return (
    <ApolloProvider client={client}>
      <Header>
        <Nav />
      </Header>
      <MainContext>
        <Outlet />
      </MainContext>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
