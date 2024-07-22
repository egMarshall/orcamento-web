import BudgetItem from "./budgeItem";
import { BudgetItemProps } from "../page";

interface BudgetItemListProps {
  items: BudgetItemProps[];
  removeBudgetItem: (itemId: number) => void;
  editBudgetItem: (itemId: number) => void;
}

export default function BudgetItemsList({items, removeBudgetItem, editBudgetItem}: BudgetItemListProps) {

  return (
    <div className="border border-primary-subtitle rounded-sm w-full p-10">
      {items.map((item) => <BudgetItem key={item.id} {...item} 
      removeItem={() => removeBudgetItem(item.id)}
      editItem={() => editBudgetItem(item.id)}
      />)}
    </div>
  );
}