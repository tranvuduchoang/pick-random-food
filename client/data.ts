export interface Dish {
  id: string;
  name: string;
  description: string;
  preference: number; // 1-10
}

export interface Category {
  id: string;
  name: string;
  title: string;
  dishes: Dish[];
}

export const categories: Category[] = [
  {
    id: "main",
    name: "Món ăn chính",
    title: "Bữa cơm hôm nay của bạn sẽ là gì? 🍚",
    dishes: [
      {
        id: "main-1",
        name: "Cơm tấm",
        description: "Cơm tấm sườn nướng thơm lừng",
        preference: 8,
      },
      {
        id: "main-2",
        name: "Bún chả",
        description: "Bún chả Hà Nội với thịt nướng",
        preference: 9,
      },
      {
        id: "main-3",
        name: "Phở",
        description: "Phở bò hoặc gà nấu lâu",
        preference: 7,
      },
      {
        id: "main-4",
        name: "Cơm chiên dương châu",
        description: "Cơm chiên với trứng, tôm, thịt",
        preference: 8,
      },
      {
        id: "main-5",
        name: "Bánh mì",
        description: "Bánh mì thịt nướng giòn crust",
        preference: 6,
      },
      {
        id: "main-6",
        name: "Miến nướng",
        description: "Miến xào thơm với thịt gà",
        preference: 5,
      },
      {
        id: "main-7",
        name: "Cơm cà ri gà",
        description: "Cơm với cà ri gà thơm mùi",
        preference: 7,
      },
      {
        id: "main-8",
        name: "Hủ tiếu",
        description: "Hủ tiếu nước với sụn, heo",
        preference: 6,
      },
      {
        id: "main-9",
        name: "Bún thang",
        description: "Bún thang nóng với mật ong",
        preference: 7,
      },
      {
        id: "main-10",
        name: "Mỳ vàng sốt",
        description: "Mỳ vàng nấu với sốt dậu phộng",
        preference: 8,
      },
    ],
  },
  {
    id: "dessert",
    name: "Món tráng miệng",
    title: "Chút ngọt ngào để kết thúc bữa ăn! 🍮",
    dishes: [
      {
        id: "dessert-1",
        name: "Chè đậu xanh",
        description: "Chè đậu xanh nóng hoặc lạnh",
        preference: 7,
      },
      {
        id: "dessert-2",
        name: "Bánh flan",
        description: "Bánh flan trứng mịn như lụa",
        preference: 8,
      },
      {
        id: "dessert-3",
        name: "Kem tươi",
        description: "Kem tươi vani hoặc socola",
        preference: 9,
      },
      {
        id: "dessert-4",
        name: "Chè ba màu",
        description: "Chè ba màu với dừa và sữa",
        preference: 8,
      },
      {
        id: "dessert-5",
        name: "Bánh cam",
        description: "Bánh cam tráng miệng cổ truyền",
        preference: 6,
      },
      {
        id: "dessert-6",
        name: "Sâm banh",
        description: "Sâm banh hành gừng ngon",
        preference: 5,
      },
      {
        id: "dessert-7",
        name: "Chè hạt sen",
        description: "Chè hạt sen thanh mát",
        preference: 6,
      },
      {
        id: "dessert-8",
        name: "Bánh tét",
        description: "Bánh tét dừa và đậu xanh",
        preference: 5,
      },
      {
        id: "dessert-9",
        name: "Ốc quế",
        description: "Ốc quế caramel giòn tan",
        preference: 8,
      },
      {
        id: "dessert-10",
        name: "Chuối nướng",
        description: "Chuối nướng nước tương dừa",
        preference: 7,
      },
    ],
  },
  {
    id: "snack",
    name: "Món ăn vặt",
    title: "Cái gì đó nhẹ nhàng để ăn vặt? 🥒",
    dishes: [
      {
        id: "snack-1",
        name: "Nem chua",
        description: "Nem chua cay cay, vị ngon",
        preference: 7,
      },
      {
        id: "snack-2",
        name: "Chả cua",
        description: "Chả cua thơm ngon, bổ dưỡng",
        preference: 6,
      },
      {
        id: "snack-3",
        name: "Bánh tráng nướng muối",
        description: "Bánh tráng nướng giòn crust",
        preference: 8,
      },
      {
        id: "snack-4",
        name: "Gỏi cuốn tươi",
        description: "Gỏi cuốn tươi với tôm, thịt",
        preference: 8,
      },
      {
        id: "snack-5",
        name: "Quả trứng cút nấu",
        description: "Quả trứng cút nướng kinh tế",
        preference: 5,
      },
      {
        id: "snack-6",
        name: "Bánh nếp cay",
        description: "Bánh nếp nhân thịt cay cay",
        preference: 6,
      },
      {
        id: "snack-7",
        name: "Mực xào sá tế",
        description: "Mực xào sá tế kinh điển",
        preference: 7,
      },
      {
        id: "snack-8",
        name: "Cánh gà chiên",
        description: "Cánh gà chiên giòn lâu",
        preference: 9,
      },
      {
        id: "snack-9",
        name: "Tôm chiên nước mắm",
        description: "Tôm chiên nước mắm chua ngọt",
        preference: 8,
      },
      {
        id: "snack-10",
        name: "Nấm nướng muối",
        description: "Nấm nướng rơm muối ớt",
        preference: 5,
      },
    ],
  },
];
