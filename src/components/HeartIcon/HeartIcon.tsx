import Heart from "../../assets/icons/heart.svg";
import HeartFill from "../../assets/icons/heart-fill.svg";

interface HeartIconProps {
   filled?: boolean;
   className?: string;
}

export const HeartIcon = ({ filled = false, className = "" }: HeartIconProps) => (
   <img
      src={filled ? HeartFill : Heart}
      alt="like"
      className={className}
      style={{ width: "24px", height: "24px", transition: "transform 0.2s ease" }}
   />
);
