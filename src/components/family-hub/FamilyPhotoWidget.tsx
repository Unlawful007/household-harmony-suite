import { Camera, Heart, RotateCcw, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface FamilyPhoto {
  id: string;
  url: string;
  caption: string;
  date: string;
  location?: string;
}

// Sample family photos - in real app these would come from Google Photos/iCloud
const samplePhotos: FamilyPhoto[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1511895426328-dc8714efa8d6?w=400&h=300&fit=crop",
    caption: "Family vacation in Amsterdam",
    date: "2025-08-15",
    location: "Amsterdam, Netherlands"
  },
  {
    id: "2", 
    url: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&h=300&fit=crop",
    caption: "Sunday brunch together",
    date: "2025-08-18",
    location: "Home"
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1607349913338-552e64541489?w=400&h=300&fit=crop", 
    caption: "Hiking in the countryside",
    date: "2025-08-12",
    location: "Veluwe National Park"
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    caption: "Evening at the park",
    date: "2025-08-10",
    location: "Genneper Parken"
  }
];

export const FamilyPhotoWidget = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-advance photos every 8 seconds
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % samplePhotos.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentPhoto = samplePhotos[currentPhotoIndex];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % samplePhotos.length);
  };

  const toggleSlideshow = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center text-high-contrast">
          <Camera className="w-5 h-5 mr-2" />
          Family Memories
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSlideshow}
            className="h-8 w-8"
          >
            {isPlaying ? <RotateCcw className="w-4 h-4" /> : <RotateCcw className="w-4 h-4 opacity-50" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Maximize className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Photo Display */}
      <div className="relative group cursor-pointer" onClick={nextPhoto}>
        <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted/30">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.caption}
            className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            loading="lazy"
          />
          
          {/* Overlay with photo info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <p className="font-medium text-sm mb-1">{currentPhoto.caption}</p>
              <div className="flex items-center justify-between text-xs opacity-90">
                <span>{formatDate(currentPhoto.date)}</span>
                {currentPhoto.location && (
                  <span className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {currentPhoto.location}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Photo dots indicator */}
        <div className="flex items-center justify-center space-x-2 mt-3">
          {samplePhotos.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentPhotoIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentPhotoIndex 
                  ? 'bg-primary scale-125' 
                  : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-xs text-muted-foreground">
          {currentPhotoIndex + 1} of {samplePhotos.length}
        </div>
        <Button variant="ghost" size="sm" className="h-8 px-3">
          <Heart className="w-4 h-4 mr-1" />
          <span className="text-xs">Favorites</span>
        </Button>
      </div>
    </div>
  );
};

// Missing MapPin import fix
import { MapPin } from "lucide-react";