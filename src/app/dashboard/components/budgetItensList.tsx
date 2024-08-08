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
    <div className="border border-primary-subtitle rounded-sm w-full p-10">
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
