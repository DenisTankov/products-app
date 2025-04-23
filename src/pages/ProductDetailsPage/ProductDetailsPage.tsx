import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";
import { fetchProducts, Product, Status } from "../../features/products/productsSlice";
import cls from "./ProductDetailsPage.module.scss";
import { Loader } from "../../components/Loader/Loader";

export const ProductDetailsPage = () => {
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();
   const dispatch = useDispatch<AppDispatch>();

   const { items, status } = useSelector((state: RootState) => state.products);
   const product: Product | undefined = items.find((p) => p.id === Number(id));

   useEffect(() => {
      if (status === Status.Idle && !items.length) {
         dispatch(fetchProducts());
      }
   }, [status, items.length, dispatch]);

   if (status === Status.Loading || !product) {
      return <Loader />;
   }

   if (!product) {
      return <p>Товар не найден.</p>;
   }

   return (
      <div className={cls.details}>
         <button onClick={() => navigate("/")} className={cls.backBtn}>
            ← На главную
         </button>
         <div className={cls.card}>
            <div className={cls.image} style={{ backgroundImage: `url(${product.thumbnail})` }} />
            <div className={cls.info}>
               <h1 className={cls.title}>{product.title}</h1>
               <p>{product.description}</p>
            </div>
         </div>
      </div>
   );
};

export default ProductDetailsPage;
