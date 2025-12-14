import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

import Header from "./componentes/Header";
import Footer from "./componentes/Footer";

import ScrollToTop from "./componentes/ScrollToTop";

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />

      <div className="pt-[90px]">
        <AppRoutes />
      </div>

      <Footer />
    </BrowserRouter>
  )
}

export default App
