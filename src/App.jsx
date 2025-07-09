import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Cronometro from "./pages/Cronometro/Cronometro";
import MyRoutes from "./routes/Routes";

const App = () => {
  return (
    <BrowserRouter>
      {/* <Navbar/> */}
      <MyRoutes/>
    </BrowserRouter>
  )
}

export default App