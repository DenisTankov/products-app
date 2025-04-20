import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { setFilter } from "../../features/products/productsSlice";
import cls from "./Header.module.scss";

export const Header = () => {
   const dispatch = useDispatch<AppDispatch>();
   const filter = useSelector((state: RootState) => state.products.filter);

   return (
      <header className={cls.header}>
         <h1>Список продуктов</h1>
         <div className={cls.filterButtons}>
            <button
               className={filter === "all" ? cls.active : ""}
               onClick={() => dispatch(setFilter("all"))}
            >
               Все
            </button>
            <button
               className={filter === "favorites" ? cls.active : ""}
               onClick={() => dispatch(setFilter("favorites"))}
            >
               Избранные
            </button>
         </div>
      </header>
   );
};
