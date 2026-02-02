import { useState, useEffect } from "react";
import { categories, type Category, type Dish } from "@/data";
import { SpinningWheel } from "@/components/SpinningWheel";
import { DishList } from "@/components/DishList";
import { AddDishForm } from "@/components/AddDishForm";
import { PrizeTable } from "@/components/PrizeTable";
import { cn } from "@/lib/utils";

interface CustomDish extends Dish {
  isCustom: true;
}

interface Prize {
  id: string;
  dish: Dish;
  timestamp: number;
}

export default function Index() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0].id);
  const [customDishes, setCustomDishes] = useState<CustomDish[]>([]);
  const [wheelDishes, setWheelDishes] = useState<Dish[]>([]);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelCreated, setWheelCreated] = useState(false);

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId)!;

  const handleAddDish = (dish: CustomDish) => {
    setCustomDishes([...customDishes, dish]);
  };

  const handleCreateWheel = (customDishes: CustomDish[]) => {
    // Combine data file dishes with custom dishes
    const allDishes = [...selectedCategory.dishes, ...customDishes];
    setWheelDishes(allDishes);
    setWheelCreated(true);
    setPrizes([]); // Reset prizes when creating new wheel
  };

  const handleWin = (dish: Dish) => {
    const prize: Prize = {
      id: `${Date.now()}-${Math.random()}`,
      dish,
      timestamp: Date.now(),
    };
    setPrizes([...prizes, prize]);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setWheelCreated(false);
    setWheelDishes([]);
    setCustomDishes([]);
    setPrizes([]);
  };

  const handleClearPrizes = () => {
    setPrizes([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-2">
            🍜 Giúp bạn chọn món ăn ngẫu nhiên
          </h1>
          <p className="text-center text-muted-foreground text-sm md:text-base">
            Không biết ăn gì? Để vòng quay may mắn giúp bạn quyết định!
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={cn(
                  "px-6 py-4 font-semibold text-sm md:text-base transition-all whitespace-nowrap",
                  selectedCategoryId === category.id
                    ? "tab-active"
                    : "tab-inactive"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Wheel and Form */}
          <div className="lg:col-span-2 space-y-8 order-1">
            {/* Category Title */}
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {selectedCategory.title}
              </h2>
            </div>

            {/* Spinning Wheel */}
            <div className="bg-card rounded-lg border border-border p-6 shadow-lg">
              <SpinningWheel
                dishes={wheelDishes}
                onWin={handleWin}
                isSpinning={isSpinning}
                onSpinStart={() => setIsSpinning(true)}
                onSpinEnd={() => setIsSpinning(false)}
              />
            </div>
          </div>

          {/* Right Column - Add Form and Prizes (appears after wheel on mobile, but before dish list) */}
          <div className="space-y-6 order-2 lg:order-3">
            {/* Add Dish Form */}
            <AddDishForm
              onAddDish={handleAddDish}
              onCreateWheel={handleCreateWheel}
              customDishes={customDishes}
            />

            {/* Prize Table */}
            <PrizeTable prizes={prizes} onClearPrizes={handleClearPrizes} />
          </div>

          {/* Dish List - appears last on mobile */}
          <div className="lg:col-span-2 order-3 lg:order-2">
            <div className="bg-card rounded-lg border border-border p-6 shadow-lg">
              <DishList
                dishes={selectedCategory.dishes}
                title="Danh sách các món trong mục này"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border mt-12 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Được thiết kế với ❤️ để giúp bạn chọn món ăn ngon ngay hôm nay</p>
        </div>
      </div>
    </div>
  );
}
