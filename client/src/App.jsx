import { ApolloProvider } from "@apollo/client";
import client from "./utils/apollo.js";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
        <Outlet />
      <Footer />
    </ApolloProvider>
  );
}

export default App;
