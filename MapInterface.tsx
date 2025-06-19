import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapInterfaceProps {
  location: { latitude: number; longitude: number } | null;
  zoom: number;
  route?: any;
  isLoading: boolean;
  error: string | null;
}

export function MapInterface({ location, zoom, route, isLoading, error }: MapInterfaceProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentLocationMarkerRef = useRef<L.Marker | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize map
    const map = L.map(containerRef.current, {
      center: [37.7749, -122.4194], // Default to San Francisco
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    mapRef.current = map;
    routeLayerRef.current = L.layerGroup().addTo(map);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update current location
  useEffect(() => {
    if (!mapRef.current || !location) return;

    const { latitude, longitude } = location;

    // Remove existing current location marker
    if (currentLocationMarkerRef.current) {
      mapRef.current.removeLayer(currentLocationMarkerRef.current);
    }

    // Create custom current location marker
    const currentLocationIcon = L.divIcon({
      className: 'current-location-marker',
      html: '<div class="bg-blue-500 border-4 border-white rounded-full w-6 h-6 shadow-lg animate-pulse"></div>',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    // Add current location marker
    currentLocationMarkerRef.current = L.marker([latitude, longitude], {
      icon: currentLocationIcon
    }).addTo(mapRef.current);

    // Center map on current location
    mapRef.current.setView([latitude, longitude], zoom);
  }, [location, zoom]);

  // Update route display
  useEffect(() => {
    if (!mapRef.current || !routeLayerRef.current) return;

    // Clear existing route
    routeLayerRef.current.clearLayers();

    if (route && route.features && route.features[0]) {
      const coordinates = route.features[0].geometry.coordinates;
      
      // Convert coordinates to Leaflet format [lat, lng]
      const latlngs = coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);
      
      // Add route polyline
      const routeLine = L.polyline(latlngs, {
        color: '#059669',
        weight: 6,
        opacity: 0.9,
      }).addTo(routeLayerRef.current);

      // Fit map to route bounds
      mapRef.current.fitBounds(routeLine.getBounds(), {
        padding: [50, 50]
      });
    }
  }, [route]);

  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading GPS...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl text-center px-4">
          <div className="mb-2">GPS Error</div>
          <div className="text-sm text-gray-400">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0"
      style={{ height: '100vh', width: '100vw' }}
    />
  );
}
