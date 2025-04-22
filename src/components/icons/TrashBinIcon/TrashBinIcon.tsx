import TrashBin from "../../../assets/svg/trash-bin.svg";

interface TrashBinIconProps {
   className?: string;
}

export const TrashBinIcon = ({ className = "" }: TrashBinIconProps) => (
   <img
      src={TrashBin}
      alt="delete"
      className={className}
      style={{ width: "24px", height: "24px", transition: "transform 0.2s ease" }}
   />
);
