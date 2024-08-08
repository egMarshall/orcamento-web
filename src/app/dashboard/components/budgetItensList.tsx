import BudgetItem from "./budgeItem";
import { BudgetItemProps } from "../page";

interface BudgetItemListProps {
  items: BudgetItemProps[];
  removeBudgetItem: (item: BudgetItemProps) => void;
  editBudgetItem: (item: BudgetItemProps) => void;
}

export default function BudgetItemsList({
  items,
  removeBudgetItem,
  editBudgetItem,
}: BudgetItemListProps) {
  return (
    <div className="bg-white border border-transparent rounded-lg w-full p-10 shadow-lg">
      <div className="flex w-4/5 justify-start space-x-4 ml-9 py-2 font-bold">
        <div className="w-1/3">
          <h1>Nome</h1>
        </div>
        <div className="w-1/3">
          <h1>Valor</h1>
        </div>
        <div className="w-1/3">
          <h1>Data</h1>
        </div>
      </div>
      {items.map((item) => (
        <BudgetItem
          key={item.id}
          {...item}
          removeItem={() => removeBudgetItem(item)}
          editItem={() => editBudgetItem(item)}
        />
      ))}
    </div>
  );
}
