import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../Pages/login/loginPage";
import Register from "../Pages/registration/registrationPage";
import HomePage from "../Pages/home/homePage";
import Error from "../Pages/error/errorPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} errorElement={<Error />} />
        <Route
          path="/register"
          element={<Register />}
          errorElement={<Error />}
        />
        <Route
          path="/home"
          element={<HomePage />}
          errorElement={<Error />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
/*  <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} errorElement={<Error/>}/>
          <Route path="/home" element={<Home />} errorElement={<Error/>}>
            <Route path="/home/products" element={<Products />} />
            <Route path="/home/crud" element={<Crud />} />
          </Route>
          
        </Routes>
      </BrowserRouter>*/
