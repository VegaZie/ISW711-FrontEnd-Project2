import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../Pages/login/loginPage";
import Register from "../Pages/registration/registrationPage";
import HomePage from "../Pages/home/homePage";
import EmailVerificationPage from "../Pages/emailVerification/emailVerification";
import TwoStepVerificationPage from "../Pages/twoStepVerification/twoStepVerification";
import EditProfilePage from "../Pages/editProfile/editProfile";
import Error from "../Pages/error/errorPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} errorElement={<Error />} />
        <Route
          path="/verification"
          element={<TwoStepVerificationPage />}
          errorElement={<Error />}
        />
        <Route
          path="/register"
          element={<Register />}
          errorElement={<Error />}
        />
        <Route
          path="/email"
          element={<EmailVerificationPage />}
          errorElement={<Error />}
        />
        <Route
          path="/home"
          element={<HomePage />}
          errorElement={<Error />}
        ></Route>
         <Route
          path="/profile"
          element={<EditProfilePage />}
          errorElement={<Error />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
