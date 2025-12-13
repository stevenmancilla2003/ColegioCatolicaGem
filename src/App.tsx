import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

import Header from "./componentes/Header";
import Footer from "./componentes/Footer";

function App() {

  return (
    <BrowserRouter>
      <Header />

      <div className="pt-[90px]">
        <AppRoutes />
      </div>

      <Footer />
    </BrowserRouter>
  )
}

export default App
