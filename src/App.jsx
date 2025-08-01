import { BrowserRouter,Route,Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CreatePet from "./pages/CreatePet";
import AllPets from "./pages/AllPets";
import EditPet from "./pages/EditPet";
import PetDetails from "./pages/PetDetails";


const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/create-pet" element={<CreatePet/>}/>
          <Route path="/pet-squad" element={<AllPets/>}/>
          <Route path="/edit/:id" element={<EditPet />} />
          <Route path="/details/:id" element={<PetDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
