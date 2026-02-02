import React from "react";
import { Dish } from "@/data";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface DishListProps {
  dishes: Dish[];
  title: string;
}

export const DishList: React.FC<DishListProps> = ({ dishes, title }) => {
  const getPreferenceColor = (preference: number) => {
    if (preference <= 3) return "bg-red-100 text-red-800";
    if (preference <= 5) return "bg-yellow-100 text-yellow-800";
    if (preference <= 7) return "bg-blue-100 text-blue-800";
    return "bg-green-100 text-green-800";
  };

  const getPreferenceBg = (preference: number) => {
    if (preference <= 3) return "from-red-50 to-red-100/50";
    if (preference <= 5) return "from-yellow-50 to-yellow-100/50";
    if (preference <= 7) return "from-blue-50 to-blue-100/50";
    return "from-green-50 to-green-100/50";
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className={cn(
                "p-3 rounded-lg border border-border bg-gradient-to-br transition-all hover:shadow-md",
                getPreferenceBg(dish.preference)
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">
                    {dish.name}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                    {dish.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  <span className={cn("text-xs font-bold px-2 py-1 rounded", getPreferenceColor(dish.preference))}>
                    {dish.preference}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {dishes.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Không có món ăn nào trong danh sách
        </div>
      )}
    </div>
  );
};
