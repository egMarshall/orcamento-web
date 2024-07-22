import { cn } from "@/utils/utils"
import deleteIcon from "../../../../public/assets/icons/delete.svg";
import editIcon from "../../../../public/assets/icons/edit.svg";
import Image from "next/image";

export interface budgetItemProps {
  name: string,
  value: number,
  date: string,
  type: string,
  editItem: () => void,
  removeItem: () => void
}

export default function budgetItem ({name, value, date, type, editItem, removeItem} : budgetItemProps) {
  return (
    <section className={cn(`flex border border-primary-background rounded-md p-1`,type == "Venda" ? "bg-green-200" : "bg-red-200")}>
      <div className="flex w-4/5 justify-start space-x-4">
        <div className="w-1/3"><h1>{name}</h1></div>
        <div className="w-1/3"><h1>R$ {value}</h1></div>
        <div className="w-1/3"><h1>{date}</h1></div>
      </div>
      <div className="flex w-1/5 justify-around">
        <button onClick={editItem}>
          <Image src={editIcon} alt="Editar" width={20}/>
        </button>
        <button onClick={removeItem}>
        <Image src={deleteIcon} alt="Deletar" width={20}/>
        </button>
      </div>
    </section>
  )
}