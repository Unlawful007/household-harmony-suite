import { Cloud, Sun, CloudRain, Train, Users, Plus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CommuteWidget } from "./CommuteWidget";
import { GroceryMealPlanner } from "./GroceryMealPlanner";
import { FamilyPhotoWidget } from "./FamilyPhotoWidget";

// Sample data
const weatherData = {
  location: "Eindhoven",
  temperature: 18,
  feelsLike: 17,
  condition: "overcast clouds",
  high: 18,
  low: 16,
  precipitation: 0,
  icon: "cloudy"
};

const trainDepartures = [
  {
    id: "1",
    route: "Eindhoven → Maastricht",
    platform: "Platform 1 • IC",
    time: "14:15",
    status: "On time",
    statusType: "on-time" as const
  },
  {
    id: "2", 
    route: "Eindhoven → Tilburg",
    platform: "Platform 2 • IC",
    time: "14:28",
    status: "+3 min",
    statusType: "delayed" as const
  },
  {
    id: "3",
    route: "Tilburg → Eindhoven", 
    platform: "Platform 1 • IC",
    time: "14:42",
    status: "On time",
    statusType: "on-time" as const
  },
  {
    id: "4",
    route: "Eindhoven → Maastricht",
    platform: "Platform 1 • IC", 
    time: "15:15",
    status: "On time",
    statusType: "on-time" as const
  }
];

const presenceData = [
  { name: "AJ", initials: "AJ", color: "member-orange", isHome: true },
  { name: "TJ", initials: "TJ", color: "member-blue", isHome: true }
];

const tasks = [
  { id: "1", title: "Grocery", completed: false, assignee: "AJ" },
  { id: "2", title: "Pick up dry cleaning", completed: true, assignee: "TJ" },
  { id: "3", title: "Schedule vet appointment", completed: false, assignee: "AJ" }
];

export const Sidebar = () => {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="w-8 h-8 text-weather-sunny" />;
      case "rainy":
        return <CloudRain className="w-8 h-8 text-weather-rainy" />;
      default:
        return <Cloud className="w-8 h-8 text-weather-cloudy" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Weather Widget */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-lg font-semibold flex items-center text-high-contrast">
          Weather — {weatherData.location}
        </h3>
        
        <div className="flex items-center space-x-4">
          {getWeatherIcon(weatherData.icon)}
          <div>
            <div className="text-3xl font-bold text-high-contrast">{weatherData.temperature}°</div>
            <div className="text-sm text-readable">{weatherData.condition}</div>
            <div className="text-sm text-readable">Feels like {weatherData.feelsLike}°</div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-readable">
          <span>High: {weatherData.high}° • Low: {weatherData.low}°</span>
          <span>Precipitation: {weatherData.precipitation}%</span>
        </div>
      </div>

      {/* Commute Widget */}
      <CommuteWidget />

      {/* Transit Widget */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-lg font-semibold flex items-center text-high-contrast">
          <Train className="w-5 h-5 mr-2" />
          Next Available Trains
        </h3>
        
        <div className="space-y-3">
          {trainDepartures.map((departure) => (
            <div key={departure.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex-1">
                <div className="font-medium text-sm text-high-contrast">{departure.route}</div>
                <div className="text-xs text-readable">{departure.platform}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-high-contrast">{departure.time}</div>
                <Badge 
                  variant={departure.statusType === "on-time" ? "default" : "secondary"}
                  className="text-xs font-medium"
                >
                  {departure.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grocery & Meal Planner Widget */}
      <GroceryMealPlanner />

      {/* Presence Widget */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-lg font-semibold flex items-center text-high-contrast">
          <Users className="w-5 h-5 mr-2" />
          Who's home
        </h3>
        
        <div className="flex space-x-3">
          {presenceData.map((person) => (
            <div key={person.initials} className="flex items-center space-x-2">
              <div 
                className={`member-dot member-dot-${person.color.split('-')[1]} ${
                  person.isHome ? 'ring-2 ring-primary ring-offset-2' : 'opacity-50'
                }`}
                title={`${person.name} - ${person.isHome ? 'Home' : 'Away'}`}
              />
              <span className="text-sm font-semibold text-high-contrast">{person.initials}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks Widget */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-high-contrast">Tasks</h3>
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-3 p-2 rounded hover:bg-muted/30">
              <CheckCircle2 
                className={`w-4 h-4 ${task.completed ? 'text-primary' : 'text-muted-foreground'}`}
              />
              <span className={`flex-1 text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-high-contrast'}`}>
                {task.title}
              </span>
              <span className="text-xs text-readable">{task.assignee}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Family Photo Widget */}
      <FamilyPhotoWidget />
    </div>
  );
};