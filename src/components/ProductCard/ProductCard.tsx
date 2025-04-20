import { HeartIcon } from "../../components/HeartIcon/HeartIcon";
import { TrashBinIcon } from "../../components/TrashBinIcon/TrashBinIcon";

import cls from "./ProductCard.module.scss";
import { AppDispatch } from "../../app/store";
import { toggleFavorite, deleteProduct } from "../../features/products/productsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Product } from "../../features/products/productsSlice";

interface ProductCardProps {
   product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
   const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();

   return (
      <div
         key={product.id}
         className={cls.productCard}
         onClick={() => navigate(`/products/${product.id}`)}
      >
         {/* <img src={product.thumbnail} alt={product.title} /> */}
         <div className={cls.image} style={{ backgroundImage: `url(${product.thumbnail})` }} />
         <h2 className={cls.title}>{product.title} </h2>
         <p className={cls.truncate}>{product.description}</p>
         <div className={cls.productActions}>
            <span
               onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleFavorite(product.id));
               }}
            >
               <HeartIcon filled={product.isFavorite} className={cls.like} />
            </span>
            <span
               className={cls.delete}
               onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteProduct(product.id));
               }}
            >
               <TrashBinIcon className={cls.delete} />
            </span>
         </div>
      </div>
   );
};
