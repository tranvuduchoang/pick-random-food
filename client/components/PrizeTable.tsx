import React from "react";
import { Dish } from "@/data";
import { Trash2 } from "lucide-react";

interface Prize {
  id: string;
  dish: Dish;
  timestamp: number;
}

interface PrizeTableProps {
  prizes: Prize[];
  onClearPrizes: () => void;
}

export const PrizeTable: React.FC<PrizeTableProps> = ({ prizes, onClearPrizes }) => {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          🎁 Trúng thưởng ({prizes.length})
        </h3>
        {prizes.length > 0 && (
          <button
            onClick={onClearPrizes}
            className="text-sm px-3 py-1 rounded bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Xóa
          </button>
        )}
      </div>

      {prizes.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Chưa có kết quả. Quay vòng tìm hiểu những món ăn may mắn!
        </div>
      ) : (
        <div className="space-y-2">
          {prizes.map((prize, index) => (
            <div
              key={prize.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-primary/20 bg-primary/5"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">{prize.dish.name}</p>
                <p className="text-sm text-muted-foreground">
                  {prize.dish.description}
                </p>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-xs text-muted-foreground">
                  Yêu thích: {prize.dish.preference}/10
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
