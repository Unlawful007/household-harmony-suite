import { MapPin, Clock, Navigation, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CommuteData {
  id: string;
  destination: string;
  address: string;
  eta: string;
  duration: string;
  trafficStatus: "light" | "moderate" | "heavy";
  distance: string;
}

const commuteData: CommuteData[] = [
  {
    id: "1",
    destination: "Work",
    address: "Amsterdam Office",
    eta: "8:45 AM",
    duration: "23 min",
    trafficStatus: "light",
    distance: "18.5 km"
  },
  {
    id: "2", 
    destination: "School",
    address: "International School",
    eta: "8:20 AM",
    duration: "12 min",
    trafficStatus: "moderate",
    distance: "8.2 km"
  },
  {
    id: "3",
    destination: "Grocery Store",
    address: "Albert Heijn Center",
    eta: "Now",
    duration: "8 min",
    trafficStatus: "light",
    distance: "4.1 km"
  }
];

export const CommuteWidget = () => {
  const getTrafficColor = (status: CommuteData["trafficStatus"]) => {
    switch (status) {
      case "light": return "transit-on-time";
      case "moderate": return "transit-delayed"; 
      case "heavy": return "transit-cancelled";
    }
  };

  const getTrafficLabel = (status: CommuteData["trafficStatus"]) => {
    switch (status) {
      case "light": return "Light traffic";
      case "moderate": return "Moderate traffic";
      case "heavy": return "Heavy traffic";
    }
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="text-lg font-semibold flex items-center text-high-contrast">
        <Navigation className="w-5 h-5 mr-2" />
        Commute & ETA
      </h3>
      
      <div className="space-y-3">
        {commuteData.map((route) => (
          <div key={route.id} className="p-3 rounded-lg bg-muted/30 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <div>
                  <div className="font-medium text-high-contrast">{route.destination}</div>
                  <div className="text-xs text-muted-foreground">{route.address}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-primary">{route.eta}</div>
                <div className="text-xs text-muted-foreground flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {route.duration}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Badge 
                variant="secondary"
                className={`text-xs bg-${getTrafficColor(route.trafficStatus)}/20 text-${getTrafficColor(route.trafficStatus)} border-0`}
              >
                <Car className="w-3 h-3 mr-1" />
                {getTrafficLabel(route.trafficStatus)}
              </Badge>
              <span className="text-xs text-muted-foreground">{route.distance}</span>
            </div>
          </div>
        ))}
      </div>
      
      <Button variant="outline" size="sm" className="w-full">
        <MapPin className="w-4 h-4 mr-2" />
        View Routes
      </Button>
    </div>
  );
};