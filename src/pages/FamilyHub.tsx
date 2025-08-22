import { useState } from "react";
import { Settings, Sun, Moon, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/family-hub/Calendar";
import { Sidebar } from "@/components/family-hub/Sidebar";
import { SettingsModal } from "@/components/family-hub/SettingsModal";

type ViewMode = "day" | "week" | "month" | "agenda";

const FamilyHub = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("day");
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric", 
    month: "long",
    day: "numeric"
  });

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen gradient-main">
        {/* Header */}
        <header className="h-16 glass-sidebar flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <CalendarIcon className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Family Hub</h1>
          </div>
          
          <div className="flex items-center space-x-2 text-foreground">
            <span className="text-lg font-medium">{currentDate}</span>
            <span className="text-lg font-medium">{currentTime}</span>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Mode Toggles */}
            <div className="flex items-center space-x-1 glass-card px-2 py-1">
              {(["day", "week", "month", "agenda"] as ViewMode[]).map((mode) => (
                <Button
                  key={mode}
                  variant={viewMode === mode ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode(mode)}
                  className="capitalize"
                >
                  {mode}
                </Button>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="text-foreground"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* Settings Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(true)}
              className="text-foreground"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Sidebar */}
          <div className="w-80 glass-sidebar p-6 overflow-y-auto">
            <Sidebar />
          </div>

          {/* Calendar Area */}
          <div className="flex-1 p-6">
            <div className="glass-card h-full p-6">
              <Calendar viewMode={viewMode} />
            </div>
          </div>
        </div>

        {/* Settings Modal */}
        <SettingsModal 
          isOpen={showSettings} 
          onClose={() => setShowSettings(false)} 
        />
      </div>
    </div>
  );
};

export default FamilyHub;