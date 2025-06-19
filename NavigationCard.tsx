import { ArrowRight, ArrowLeft, ArrowUp, RotateCw } from "lucide-react";

interface NavigationCardProps {
  instruction: string;
  distance: string;
  eta: string;
  maneuver?: string;
}

export function NavigationCard({ instruction, distance, eta, maneuver }: NavigationCardProps) {
  const getManeuverIcon = (maneuver?: string) => {
    switch (maneuver?.toLowerCase()) {
      case 'left':
        return <ArrowLeft className="text-white w-8 h-8" />;
      case 'right':
        return <ArrowRight className="text-white w-8 h-8" />;
      case 'straight':
        return <ArrowUp className="text-white w-8 h-8" />;
      case 'uturn':
        return <RotateCw className="text-white w-8 h-8" />;
      default:
        return <ArrowRight className="text-white w-8 h-8" />;
    }
  };

  const distanceValue = distance.split(' ')[0];
  const distanceUnit = distance.split(' ')[1] || 'meters';

  return (
    <div className="absolute top-20 left-4 right-4 bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 z-20">
      <div className="flex items-center space-x-4">
        <div className="bg-blue-600 rounded-full p-3 flex-shrink-0">
          {getManeuverIcon(maneuver)}
        </div>
        <div className="flex-1">
          <div className="text-gray-900 text-xl font-bold mb-1">
            {instruction}
          </div>
          <div className="text-gray-600 text-lg font-medium">
            in {distance} • {eta}
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">
            {distanceValue}
          </div>
          <div className="text-sm text-gray-600">
            {distanceUnit}
          </div>
        </div>
      </div>
    </div>
  );
}
