import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import CreateProductPage from "./pages/CreateProductPage/CreateProductPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage/ProductDetailsPage";
import { ProductsPage } from "./pages/ProductsPage/ProductsPage";
import "./styles/App.scss";

function App() {
   return (
      <div className="app">
         <Router basename="/products-app">
            <Header />
            <div className="content-page">
               <Routes>
                  <Route path="/" element={<Navigate to="/products" />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ProductDetailsPage />} />
                  <Route path="/create-product" element={<CreateProductPage />} />
               </Routes>
            </div>
         </Router>
      </div>
   );
}

export default App;
