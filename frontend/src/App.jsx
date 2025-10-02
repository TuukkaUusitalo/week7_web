import { BrowserRouter, Routes, Route, } from "react-router-dom";

// pages & components
import Home from "./pages/HomePage";
import AddProductPage from "./pages/AddProductPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import RequireAuth from "../RequireAuth";
import { AuthProvider } from "../AuthContext";

const App = () => {

    return (
      <div className="App">
        <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/add-product"
                element={
                  <RequireAuth>
                    <AddProductPage />
                  </RequireAuth>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </AuthProvider>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;
