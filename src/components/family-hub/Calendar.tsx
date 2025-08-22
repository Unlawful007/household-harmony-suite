import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  owner: {
    name: string;
    color: string;
    initials: string;
  };
  description?: string;
}

type ViewMode = "day" | "week" | "month" | "agenda";

interface CalendarProps {
  viewMode: ViewMode;
}

// Sample events data
const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Team Meeting",
    start: "2025-08-22T09:00:00",
    end: "2025-08-22T10:00:00",
    owner: { name: "AJ", color: "member-orange", initials: "AJ" }
  },
  {
    id: "2", 
    title: "Doctor Appointment",
    start: "2025-08-22T14:30:00",
    end: "2025-08-22T15:30:00",
    owner: { name: "TJ", color: "member-blue", initials: "TJ" }
  },
  {
    id: "3",
    title: "Grocery Shopping",
    start: "2025-08-22T16:00:00",
    end: "2025-08-22T17:00:00",
    owner: { name: "AJ", color: "member-orange", initials: "AJ" }
  }
];

export const Calendar = ({ viewMode }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    switch (viewMode) {
      case "day":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
        break;
      case "week":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
        break;
      case "month":
        newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
        break;
    }
    setCurrentDate(newDate);
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {currentDate.toLocaleDateString("en-US", { 
              weekday: "long", 
              month: "long", 
              day: "numeric" 
            })}
          </h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={() => navigateDate("prev")}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => navigateDate("next")}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="relative">
          {/* Time slots */}
          <div className="space-y-1 max-h-[600px] overflow-y-auto">
            {hours.map((hour) => (
              <div key={hour} className="flex items-center border-b border-muted py-4 relative">
                <div className="w-16 text-sm text-muted-foreground font-medium">
                  {hour.toString().padStart(2, "0")}:00
                </div>
                <div className="flex-1 ml-4 min-h-[48px] relative">
                  {/* Render events for this hour */}
                  {sampleEvents
                    .filter(event => {
                      const eventHour = new Date(event.start).getHours();
                      const eventDate = new Date(event.start).toDateString();
                      return eventHour === hour && eventDate === currentDate.toDateString();
                    })
                    .map(event => (
                      <div
                        key={event.id}
                        className={`absolute left-0 right-4 glass-card p-3 border-l-4 border-${event.owner.color}`}
                        style={{ borderLeftColor: `hsl(var(--${event.owner.color}))` }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatTime(event.start)} - {formatTime(event.end)}
                            </p>
                          </div>
                          <div 
                            className={`member-dot member-dot-${event.owner.color.split('-')[1]}`}
                            title={event.owner.name}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAgendaView = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Agenda</h2>
        </div>
        
        <div className="space-y-3">
          {sampleEvents.map((event) => (
            <div key={event.id} className="glass-card p-4 flex items-center space-x-4">
              <div 
                className={`member-dot member-dot-${event.owner.color.split('-')[1]}`}
                title={event.owner.name}
              />
              <div className="flex-1">
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {formatDate(event.start)} • {formatTime(event.start)} - {formatTime(event.end)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPlaceholderView = (view: string) => (
    <div className="flex items-center justify-center h-64">
      <p className="text-muted-foreground text-lg">
        {view.charAt(0).toUpperCase() + view.slice(1)} view coming soon
      </p>
    </div>
  );

  return (
    <div className="h-full">
      {viewMode === "day" && renderDayView()}
      {viewMode === "agenda" && renderAgendaView()}
      {(viewMode === "week" || viewMode === "month") && renderPlaceholderView(viewMode)}
    </div>
  );
};