import { BrowserRouter,Route,Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CreatePet from "./pages/CreatePet";


const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/create-pet" element={<CreatePet/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
