import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";
import { FilterType, setFilter } from "../../features/products/productsSlice";
import cls from "./Header.module.scss";

export const Header = () => {
   const dispatch = useDispatch<AppDispatch>();
   const filter = useSelector((state: RootState) => state.products.filter);
   const navigate = useNavigate();

   const handleSetFilter = (type: FilterType) => {
      dispatch(setFilter(type));
      navigate("/");
   };

   return (
      <header className={cls.header}>
         <h1 className={cls.title}>Список продуктов</h1>
         <Link to="/create-product">
            <button className={cls.createBtn} onClick={() => handleSetFilter(FilterType.None)}>
               Создать
            </button>
         </Link>
         <div className={cls.filterButtons}>
            <button
               className={filter === "all" ? cls.active : ""}
               onClick={() => handleSetFilter(FilterType.All)}
            >
               Все
            </button>
            <button
               className={filter === "favorites" ? cls.active : ""}
               onClick={() => handleSetFilter(FilterType.Favorites)}
            >
               Избранные
            </button>
         </div>
      </header>
   );
};
