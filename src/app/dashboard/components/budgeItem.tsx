import { cn } from "@/utils/utils";
import deleteIcon from "../../../../public/assets/icons/delete.svg";
import editIcon from "../../../../public/assets/icons/edit.svg";
import Image from "next/image";
import dayjs from "dayjs";

export interface budgetItemProps {
  name: string;
  value: number;
  date: Date;
  type: string;
  editItem: () => void;
  removeItem: () => void;
}

export default function budgetItem({
  name,
  value,
  date,
  type,
  editItem,
  removeItem,
}: budgetItemProps) {
  return (
    <div
      className={cn(`flex border border-gray-100 rounded-md mb-2 shadow-md`)}
    >
      <div
        className={cn(
          `"flex border shadow-md w-5 h-full"`,
          type == "Receita" ? "bg-green-200" : "bg-red-200"
        )}
      ></div>
      <div className="flex w-4/5 justify-start space-x-4 ml-5 p-2">
        <div className="w-1/3">
          <h1>{name}</h1>
        </div>
        <div className="w-1/3">
          <h1>R$ {value}</h1>
        </div>
        <div className="w-1/3">
          <h1>{dayjs(date).format("DD/MM/YYYY")}</h1>
        </div>
      </div>
      <div className="flex w-1/5 justify-end mr-5">
        <button onClick={editItem} className="mr-2">
          <Image src={editIcon} alt="Editar" width={20} />
        </button>
        <button onClick={removeItem}>
          <Image src={deleteIcon} alt="Deletar" width={20} />
        </button>
      </div>
    </div>
  );
}
