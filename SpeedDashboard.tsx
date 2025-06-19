interface SpeedDashboardProps {
  speed: number;
  tripDistance: number;
  tripTime: number;
  eta?: string;
}

export function SpeedDashboard({ speed, tripDistance, tripTime, eta }: SpeedDashboardProps) {
  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="absolute top-48 right-4 bg-black bg-opacity-80 backdrop-blur-sm rounded-2xl p-4 z-20">
      <div className="text-center mb-4">
        <div className="text-4xl font-bold text-white mb-1">
          {Math.round(speed)}
        </div>
        <div className="text-sm text-gray-300">km/h</div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Distance:</span>
          <span className="text-white font-medium">
            {tripDistance.toFixed(1)} km
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Time:</span>
          <span className="text-white font-medium">
            {formatTime(tripTime)}
          </span>
        </div>
        {eta && (
          <div className="flex justify-between">
            <span className="text-gray-400">ETA:</span>
            <span className="text-white font-medium">{eta}</span>
          </div>
        )}
      </div>
    </div>
  );
}
