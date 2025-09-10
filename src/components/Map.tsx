import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Crosshair, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-74.006, 40.7128], // NYC default
      zoom: 12,
      pitch: 0,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add geolocate control
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    });

    map.current.addControl(geolocate, 'top-right');

    // Add click handler for issue reporting
    map.current.on('click', (e) => {
      const coordinates = e.lngLat;
      
      // Create a popup for issue reporting
      const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(coordinates)
        .setHTML(`
          <div class="p-4 min-w-[200px]">
            <h3 class="font-semibold text-civic-navy mb-2">Report Issue Here</h3>
            <p class="text-sm text-muted-foreground mb-3">Lat: ${coordinates.lat.toFixed(6)}<br/>Lng: ${coordinates.lng.toFixed(6)}</p>
            <button class="w-full bg-civic-gradient text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-smooth">
              Create Report
            </button>
          </div>
        `)
        .addTo(map.current!);
    });

    // Mock issue markers
    const mockIssues = [
      { id: 1, coords: [-74.006, 40.7128], type: 'pothole', status: 'pending' },
      { id: 2, coords: [-74.008, 40.7148], type: 'streetlight', status: 'in_progress' },
      { id: 3, coords: [-74.004, 40.7108], type: 'waste', status: 'resolved' },
    ];

    mockIssues.forEach(issue => {
      const marker = new mapboxgl.Marker({
        color: issue.status === 'resolved' ? '#10b981' : issue.status === 'in_progress' ? '#3b82f6' : '#f59e0b'
      })
        .setLngLat(issue.coords as [number, number])
        .addTo(map.current!);
    });
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      initializeMap(mapboxToken);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [position.coords.longitude, position.coords.latitude];
          setCurrentLocation(coords);
          if (map.current) {
            map.current.flyTo({ center: coords, zoom: 15 });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="relative w-full h-full">
      {showTokenInput ? (
        <div className="absolute inset-0 z-50 bg-background/95 backdrop-blur flex items-center justify-center p-6">
          <Card className="w-full max-w-md shadow-card">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="mx-auto w-12 h-12 bg-civic-gradient rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-civic-navy mb-2">Mapbox Setup Required</h3>
                <p className="text-sm text-muted-foreground">
                  Enter your Mapbox public token to enable the interactive map
                </p>
              </div>
              
              <div className="space-y-4">
                <Input
                  type="password"
                  placeholder="pk.eyJ1Ijoi..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="font-mono text-sm"
                />
                <Button 
                  onClick={handleTokenSubmit} 
                  className="w-full bg-civic-gradient hover:opacity-90"
                  disabled={!mapboxToken.trim()}
                >
                  Initialize Map
                </Button>
              </div>

              <div className="mt-4 p-3 bg-civic-light rounded-lg">
                <p className="text-xs text-civic-navy">
                  Get your free token at{' '}
                  <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-civic-blue underline">
                    mapbox.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}

      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-map" />
      
      {/* Map Controls Overlay */}
      <div className="absolute bottom-4 left-4 space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={getCurrentLocation}
          className="bg-background/95 backdrop-blur shadow-card"
        >
          <Crosshair className="w-4 h-4 mr-2" />
          My Location
        </Button>
      </div>

      {/* Legend */}
      <Card className="absolute bottom-4 right-4 bg-background/95 backdrop-blur shadow-card">
        <CardContent className="p-4 space-y-2">
          <h4 className="text-sm font-semibold text-civic-navy">Issue Status</h4>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-status-pending"></div>
            <span className="text-xs text-muted-foreground">Pending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-status-progress"></div>
            <span className="text-xs text-muted-foreground">In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-status-resolved"></div>
            <span className="text-xs text-muted-foreground">Resolved</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Map;