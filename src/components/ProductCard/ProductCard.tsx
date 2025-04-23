import { HeartIcon } from "../icons/HeartIcon/HeartIcon";
import { TrashBinIcon } from "../icons/TrashBinIcon/TrashBinIcon";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../features/products/productsSlice";
import cls from "./ProductCard.module.scss";

interface ProductCardProps {
   product: Product;
   onToggleFavorite: (id: number) => void;
   onDelete: (id: number) => void;
}

const ProductCard = ({ product, onToggleFavorite, onDelete }: ProductCardProps) => {
   const navigate = useNavigate();

   return (
      <div
         key={product.id}
         className={cls.productCard}
         onClick={() => navigate(`/products/${product.id}`)}
      >
         <div className={cls.image} style={{ backgroundImage: `url(${product.thumbnail})` }} />
         <h2 className={cls.title}>{product.title} </h2>
         <p className={cls.truncate}>{product.description}</p>
         <div className={cls.productActions}>
            <span
               onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(product.id);
               }}
            >
               <HeartIcon filled={product.isFavorite} className={cls.like} />
            </span>
            <span
               className={cls.delete}
               onClick={(e) => {
                  e.stopPropagation();
                  onDelete(product.id);
               }}
            >
               <TrashBinIcon className={cls.delete} />
            </span>
         </div>
      </div>
   );
};

export default memo(ProductCard);
