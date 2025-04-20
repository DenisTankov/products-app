import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { SkeletonCard } from "../../components/SkeletonCard/SkeletonCard";
import { fetchProducts } from "../../features/products/productsSlice";
import cls from "./ProductsPage.module.scss";

export const ProductsPage = () => {
   const dispatch = useDispatch<AppDispatch>();

   const { items, filter, status } = useSelector((state: RootState) => state.products);

   useEffect(() => {
      if (status === "idle") {
         dispatch(fetchProducts());
      }
   }, [status, dispatch]);

   const filteredItems = filter === "favorites" ? items.filter((item) => item.isFavorite) : items;

   return (
      <div className={cls.productsPage}>
         <div className={cls.productGrid}>
            {status === "loading"
               ? Array.from({ length: 9 }).map((_, index) => (
                    <SkeletonCard key={index} className={cls.productCard} />
                 ))
               : filteredItems.map((product) => <ProductCard key={product.id} product={product} />)}
         </div>
      </div>
   );
};
