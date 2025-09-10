import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Crosshair } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [position.coords.longitude, position.coords.latitude];
          setCurrentLocation(coords);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const mockIssues = [
    { id: 1, coords: [40.7128, -74.006], type: 'pothole', status: 'pending', title: 'Large Pothole' },
    { id: 2, coords: [40.7148, -74.008], type: 'streetlight', status: 'in_progress', title: 'Broken Light' },
    { id: 3, coords: [40.7108, -74.004], type: 'waste', status: 'resolved', title: 'Illegal Dumping' },
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-civic-light to-white rounded-lg">
      {/* Simple Map Placeholder with Issues */}
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-teal-50 relative">
          {/* Mock street layout */}
          <div className="absolute top-1/4 left-0 right-0 h-2 bg-gray-300"></div>
          <div className="absolute top-2/4 left-0 right-0 h-2 bg-gray-300"></div>
          <div className="absolute top-3/4 left-0 right-0 h-2 bg-gray-300"></div>
          <div className="absolute top-0 bottom-0 left-1/4 w-2 bg-gray-300"></div>
          <div className="absolute top-0 bottom-0 left-2/4 w-2 bg-gray-300"></div>
          <div className="absolute top-0 bottom-0 left-3/4 w-2 bg-gray-300"></div>
          
          {/* Issue Markers */}
          {mockIssues.map(issue => (
            <div 
              key={issue.id} 
              className={`absolute w-4 h-4 rounded-full border-2 border-white cursor-pointer transform -translate-x-2 -translate-y-2 ${
                issue.status === 'resolved' ? 'bg-status-resolved' : 
                issue.status === 'in_progress' ? 'bg-status-progress' : 
                'bg-status-pending'
              }`}
              style={{
                left: `${30 + issue.id * 20}%`,
                top: `${25 + issue.id * 15}%`,
              }}
              title={issue.title}
            />
          ))}
          
          {/* Current Location */}
          {currentLocation && (
            <div 
              className="absolute w-3 h-3 bg-civic-blue rounded-full border-2 border-white animate-pulse"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
              title="Your Location"
            />
          )}

          {/* Click to Report Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Card className="bg-white/90 backdrop-blur-sm shadow-card">
              <CardContent className="p-6 text-center">
                <MapPin className="w-12 h-12 text-civic-blue mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-civic-navy mb-2">Click to Report Issue</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Tap anywhere on the map to report an issue at that location
                </p>
                <Button className="bg-civic-gradient hover:opacity-90" asChild>
                  <Link to="/report">
                    <MapPin className="w-4 h-4 mr-2" />
                    Report Issue
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Map Controls Overlay */}
      <div className="absolute bottom-4 left-4 space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={getCurrentLocation}
          className="bg-background/95 backdrop-blur shadow-card"
        >
          <Crosshair className="w-4 h-4 mr-2" />
          Get Location
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