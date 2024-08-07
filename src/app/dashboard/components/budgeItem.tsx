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
    <section
      className={cn(
        `flex border border-primary-background rounded-md p-1 mb-1`,
        type == "Receita" ? "bg-green-200" : "bg-red-200"
      )}
    >
      <div className="flex w-4/5 justify-start space-x-4">
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
    </section>
  );
}
