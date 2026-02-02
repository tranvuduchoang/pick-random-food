import React, { useState } from "react";
import { Dish } from "@/data";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomDish extends Dish {
  isCustom: true;
}

interface AddDishFormProps {
  onAddDish: (dish: CustomDish) => void;
  onCreateWheel: (customDishes: CustomDish[]) => void;
  customDishes: CustomDish[];
}

export const AddDishForm: React.FC<AddDishFormProps> = ({
  onAddDish,
  onCreateWheel,
  customDishes,
}) => {
  const [dishName, setDishName] = useState("");
  const [preference, setPreference] = useState(5);

  const handleAddDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishName.trim()) return;

    const newDish: CustomDish = {
      id: `custom-${Date.now()}`,
      name: dishName,
      description: "Tự thêm",
      preference: preference,
      isCustom: true,
    };

    onAddDish(newDish);
    setDishName("");
    setPreference(5);
  };

  const handleRemoveCustomDish = (id: string) => {
    // This will be handled in the parent component
    // For now, we just need a way to show which dishes are custom
  };

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-4">
      <h4 className="font-semibold text-foreground">Thêm món ăn vào vòng quay</h4>

      <form onSubmit={handleAddDish} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Tên món ăn
          </label>
          <input
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            placeholder="Nhập tên món ăn..."
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">
              Độ yêu thích
            </label>
            <span className="text-sm font-bold text-primary">{preference}/10</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={preference}
            onChange={(e) => setPreference(parseInt(e.target.value))}
            className="w-full h-2 bg-input rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Không thích</span>
            <span>Bình thường</span>
            <span>Yêu thích</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={!dishName.trim()}
          className={cn(
            "w-full px-3 py-2 rounded-md font-medium transition-all flex items-center justify-center gap-2",
            dishName.trim()
              ? "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          <Plus className="w-4 h-4" />
          Thêm món
        </button>
      </form>

      {customDishes.length > 0 && (
        <div className="border-t border-border pt-3">
          <p className="text-sm font-medium text-foreground mb-2">
            Các món tự thêm ({customDishes.length})
          </p>
          <div className="space-y-2">
            {customDishes.map((dish) => (
              <div
                key={dish.id}
                className="flex items-center justify-between p-2 rounded bg-background border border-border text-sm"
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">{dish.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Yêu thích: {dish.preference}/10
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => onCreateWheel(customDishes)}
        className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-md font-semibold hover:bg-secondary/90 transition-all"
      >
        Tạo vòng quay
      </button>
    </div>
  );
};
