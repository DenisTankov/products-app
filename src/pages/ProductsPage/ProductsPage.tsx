import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import ProductCard from "../../components/ProductCard/ProductCard";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";
import {
   fetchProducts,
   Status,
   FilterType,
   toggleFavorite,
   deleteProduct,
} from "../../features/products/productsSlice";
import cls from "./ProductsPage.module.scss";

export const ProductsPage = () => {
   const dispatch = useDispatch<AppDispatch>();

   const { items, filter, status } = useSelector((state: RootState) => state.products);

   const [searchTerm, setSearchTerm] = useState<string>("");
   const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
   }, []);

   useEffect(() => {
      if (status === Status.Idle) {
         dispatch(fetchProducts());
      }
   }, [status, dispatch]);

   const filteredProducts = useMemo(() => {
      let list = filter === FilterType.Favorites ? items.filter((item) => item.isFavorite) : items;

      const term = searchTerm.trim().toLowerCase();
      if (term) {
         list = list.filter((item) => item.title.toLowerCase().includes(term));
      }
      return list;
   }, [items, filter, searchTerm]);

   const handleToggleFavorite = useCallback(
      (id: number) => {
         dispatch(toggleFavorite(id));
      },
      [dispatch]
   );

   const handleDelete = useCallback(
      (id: number) => {
         dispatch(deleteProduct(id));
      },
      [dispatch]
   );

   return (
      <div className={cls.productsPage}>
         <input
            type="text"
            className={cls.searchInput}
            placeholder="Поиск товаров..."
            value={searchTerm}
            onChange={handleSearchChange}
         />
         <div className={cls.productFlex}>
            {status === Status.Loading
               ? Array.from({ length: 9 }).map((_, index) => (
                    <SkeletonCard key={index} className={cls.productCard} />
                 ))
               : filteredProducts.map((product) => (
                    <ProductCard
                       key={product.id}
                       product={product}
                       onToggleFavorite={handleToggleFavorite}
                       onDelete={handleDelete}
                    />
                 ))}
         </div>
      </div>
   );
};

export default memo(ProductsPage);
