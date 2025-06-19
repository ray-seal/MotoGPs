import { Plus, Minus, LocateFixed } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRecenter: () => void;
}

export function MapControls({ onZoomIn, onZoomOut, onRecenter }: MapControlsProps) {
  return (
    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-3 z-20">
      <Button
        size="lg"
        variant="secondary"
        className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-xl p-4 shadow-lg"
        onClick={onZoomIn}
      >
        <Plus className="text-gray-800 w-6 h-6" />
      </Button>
      
      <Button
        size="lg"
        variant="secondary"
        className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-xl p-4 shadow-lg"
        onClick={onZoomOut}
      >
        <Minus className="text-gray-800 w-6 h-6" />
      </Button>
      
      <Button
        size="lg"
        className="bg-blue-600 hover:bg-blue-700 rounded-xl p-4 shadow-lg"
        onClick={onRecenter}
      >
        <LocateFixed className="text-white w-6 h-6" />
      </Button>
    </div>
  );
}
