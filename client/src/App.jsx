import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage";
import { UserContextProvider } from "./UserContext";
import Layout from "./Layout";
import axios from "axios";
import RegisterPage from './pages/RegisterPage.jsx';
import AccountPage from "./pages/AccountPage.jsx";

axios.defaults.baseURL ='http://localhost:4000';
// axios.defaults.withCredentials = true;
// axios('http://localhost:4000/login', {
//   method: 'GET',
//   withCredentials: true
// }).then(res => {
//      console.log(res);
//    }).catch(err => {
//      console.log(err.response);
//    })
// -- This thing is giving me a CORS error

function App() {
  return (
    // <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Route>
      </Routes>
    // </UserContextProvider>
  )
}

export default App
