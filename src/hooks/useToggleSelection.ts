import { useCallback } from "react";

export default function useToggleSelection<ItemType>(
  selectedItems: ItemType[],
  onChange: (items: ItemType[]) => void,
) {
  const toggleItem = useCallback(
    (item: ItemType) => {
      const isSelected = selectedItems.includes(item);

      onChange(
        isSelected
          ? selectedItems.filter((selected) => selected !== item)
          : [...selectedItems, item],
      );
    },
    [selectedItems, onChange],
  );

  return { toggleItem };
}
