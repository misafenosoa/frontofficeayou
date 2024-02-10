import { BrowserRouter, Route, Routes } from "react-router-dom";
import Accueil from "./gate/Accueil";
import Login from "./gate/Login";
import Register from "./gate/Register";
import ListFav from "./gate/ListFav";
import ListHistory from "./gate/ListHistory";




function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route>

          <Route path="/" element={<Accueil/>}/>

          <Route path="/login" element={<Login/>} />

          <Route path="/register" element={<Register/>} />

          <Route path="/fav" element={<ListFav/>} />

          <Route path="/history" element={<ListHistory/>}/>
          {/* <Route path="/elements" element={<ManageInformation/>} />

          <Route path="/createModel" element={<CreateCarModel/>} />

          <Route path="/statistics" element = {<Statistics/>} />

          <Route path="/validation" element = {<ValidationAnnonce/>} />

          <Route path="/deconnection" element = {<Deconnection/>} /> */}
          
        </Route>        

      </Routes>

    </BrowserRouter>  

  );
}

export default App;
