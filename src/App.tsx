import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { ProductsPage } from "./pages/ProductsPage/ProductsPage";
import "./styles/App.scss";
// import { ProductDetailsPage } from "./pages/ProductDetailsPage";

function App() {
   return (
      <div className="app">
         <Router>
            <Header />
            <div className="content-page">
               <Routes>
                  <Route path="/" element={<Navigate to="/products" />} />
                  <Route path="/products" element={<ProductsPage />} />
                  {/* <Route path="/products/:id" element={<ProductDetailsPage />} /> */}
               </Routes>
            </div>
         </Router>
      </div>
   );
}

export default App;
