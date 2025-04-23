import { memo } from "react";
import cls from "./SkeletonCard.module.scss";

interface Props {
   className?: string;
}

const SkeletonCard = ({ className = "" }: Props) => {
   return (
      <div className={`${cls.skeletonCard} ${className}`}>
         <div className={cls.image}></div>
         <div className={cls.description}></div>
         <div className={cls.productActions}></div>
      </div>
   );
};

export default memo(SkeletonCard);
