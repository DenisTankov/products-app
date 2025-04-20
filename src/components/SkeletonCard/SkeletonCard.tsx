import cls from "./SkeletonCard.module.scss";

interface Props {
   className?: string;
}

export const SkeletonCard = ({ className = "" }: Props) => {
   return (
      <div className={`${cls.skeletonCard} ${className}`}>
         <div className={cls.image}></div>
         <div className={cls.description}></div>
         <div className={cls.productActions}></div>
      </div>
   );
};
