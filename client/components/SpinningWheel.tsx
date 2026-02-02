import React, { useRef, useState, useEffect } from "react";
import { Dish } from "@/data";
import { cn } from "@/lib/utils";

interface WheelDish extends Dish {
  angle: number;
  angleSize: number;
}

interface SpinningWheelProps {
  dishes: Dish[];
  onWin: (dish: Dish) => void;
  isSpinning: boolean;
  onSpinStart: () => void;
  onSpinEnd: () => void;
}

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E2",
  "#F8B88B",
  "#ABEBC6",
  "#F9E79F",
  "#D7BDE2",
];

export const SpinningWheel: React.FC<SpinningWheelProps> = ({
  dishes,
  onWin,
  isSpinning,
  onSpinStart,
  onSpinEnd,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [wheelDishes, setWheelDishes] = useState<WheelDish[]>([]);
  const [winningIndex, setWinningIndex] = useState<number | null>(null);
  const [highlightPulse, setHighlightPulse] = useState(0);

  // Shuffle dishes and assign angles based on preference
  useEffect(() => {
    if (dishes.length === 0) return;

    // Shuffle array using Fisher-Yates
    const shuffled = [...dishes].sort(() => Math.random() - 0.5);

    // Calculate total preference sum (for weight calculation)
    const totalPreference = shuffled.reduce((sum, dish) => sum + dish.preference, 0);

    // Assign angles based on preference
    let currentAngle = 0;
    const newWheelDishes: WheelDish[] = shuffled.map((dish) => {
      const angleSize = (dish.preference / totalPreference) * 360;
      const wheelDish: WheelDish = {
        ...dish,
        angle: currentAngle,
        angleSize,
      };
      currentAngle += angleSize;
      return wheelDish;
    });

    setWheelDishes(newWheelDishes);
  }, [dishes]);

  // Animation for highlight pulse
  useEffect(() => {
    if (winningIndex === null) return;

    const startTime = Date.now();
    const duration = 5000; // 5 seconds

    const animatePulse = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        setHighlightPulse((elapsed / duration) * 2 * Math.PI);
        requestAnimationFrame(animatePulse);
      } else {
        setWinningIndex(null);
        onSpinEnd();
      }
    };

    animatePulse();
  }, [winningIndex, onSpinEnd]);

  // Draw the wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || wheelDishes.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 10;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw wheel segments
    wheelDishes.forEach((dish, index) => {
      const startAngle = (dish.angle - 90) * (Math.PI / 180);
      const endAngle = (dish.angle + dish.angleSize - 90) * (Math.PI / 180);

      // Draw segment
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fillStyle = COLORS[index % COLORS.length];
      ctx.fill();

      // Draw border
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw highlight for winning segment
      if (winningIndex === index) {
        const highlightAlpha = 0.3 + 0.3 * Math.sin(highlightPulse);
        ctx.strokeStyle = `rgba(255, 215, 0, ${highlightAlpha})`;
        ctx.lineWidth = 8;
        ctx.stroke();

        // Draw double border for extra visibility
        ctx.strokeStyle = "rgba(255, 215, 0, 0.8)";
        ctx.lineWidth = 4;
        ctx.stroke();
      }

      // Draw text
      const textAngle = (dish.angle + dish.angleSize / 2 - 90) * (Math.PI / 180);
      const textX = centerX + (radius * 0.65) * Math.cos(textAngle);
      const textY = centerY + (radius * 0.65) * Math.sin(textAngle);

      ctx.save();
      ctx.translate(textX, textY);
      ctx.rotate(textAngle + Math.PI / 2);

      ctx.fillStyle = "#000";
      ctx.font = "bold 13px 'Plus Jakarta Sans'";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Wrap text
      const words = dish.name.split(" ");
      const lineHeight = 15;
      const startY = -(words.length - 1) * (lineHeight / 2);

      words.forEach((word, i) => {
        ctx.fillText(word, 0, startY + i * lineHeight);
      });

      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw center text
    ctx.fillStyle = "#333";
    ctx.font = "bold 14px 'Plus Jakarta Sans'";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SPIN", centerX, centerY + 2);
  }, [wheelDishes, winningIndex, highlightPulse]);

  const spin = async () => {
    if (isSpinning || wheelDishes.length === 0) return;

    onSpinStart();

    // Random rotations between 5-8 full spins
    const extraRotations = Math.floor(Math.random() * 4) + 5; // 5-8 full rotations
    const randomAngle = Math.random() * 360; // 0-360 random end position
    const totalRotation = extraRotations * 360 + randomAngle;

    // Animate the spin
    const startRotation = rotation;
    const duration = 4000; // 4 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const newRotation = startRotation + totalRotation * easeProgress;

      setRotation(newRotation % 360);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete - determine winner
        // The pointer is fixed at the top (angle 0 visually)
        // When the wheel rotates clockwise by `finalRotation` degrees,
        // the pointer now points to the segment that was originally at angle (360 - finalRotation)
        const finalRotation = (newRotation % 360 + 360) % 360; // Ensure positive
        const pointerAngle = (360 - finalRotation + 360) % 360; // Angle the pointer is pointing at
        
        let winnerIndex = 0;

        // Find which segment contains the pointer angle
        wheelDishes.forEach((dish, index) => {
          const segmentStart = dish.angle;
          const segmentEnd = dish.angle + dish.angleSize;

          // Check if the pointer angle falls within this segment
          if (pointerAngle >= segmentStart && pointerAngle < segmentEnd) {
            winnerIndex = index;
          }
        });

        setWinningIndex(winnerIndex);
        onWin(wheelDishes[winnerIndex]);
      }
    };

    animate();
  };

  if (wheelDishes.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 text-muted-foreground">
        Thêm các món ăn để tạo vòng quay
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-full max-w-sm aspect-square">
        {/* Pointer Arrow - POINTING DOWNWARD */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex justify-center pt-1">
          <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-lg">
            {/* Outer glow */}
            <circle cx="20" cy="20" r="18" fill="rgba(255, 165, 0, 0.1)" />
            {/* Arrow pointer - POINTING DOWN INTO THE WHEEL */}
            <path
              d="M 20 38 L 12 22 L 20 26 L 28 22 Z"
              fill="#FFA500"
              stroke="#FF8C00"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Center circle */}
            <circle cx="20" cy="20" r="6" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
          </svg>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? "none" : "transform 0.1s ease-out",
          }}
          className={cn("w-full h-full")}
        />

        {/* Spin Button */}
        <button
          onClick={spin}
          disabled={isSpinning}
          className={cn(
            "spin-button",
            isSpinning
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {isSpinning ? "..." : "SPIN"}
        </button>
      </div>

      {wheelDishes.length > 0 && (
        <div className="text-sm text-muted-foreground text-center">
          Có {wheelDishes.length} món để chọn
        </div>
      )}
    </div>
  );
};
