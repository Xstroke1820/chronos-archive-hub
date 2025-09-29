import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Event {
  id: number;
  title: string;
  date: string;
  image: string;
  status: string;
  description: string;
  gallery: string[];
}

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

const EventCard = ({ event, onClick }: EventCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      className="cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="card-tech overflow-hidden group">
        <div className="relative">
          <div className="aspect-video overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          
          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <Badge 
              variant={event.status === "completed" ? "secondary" : "default"}
              className={`${
                event.status === "completed" 
                  ? "bg-success/20 text-success border-success/30" 
                  : "bg-warning/20 text-warning border-warning/30"
              } backdrop-blur-sm`}
            >
              {event.status === "completed" ? "Completed" : "Upcoming"}
            </Badge>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <motion.div 
          className="p-6"
          animate={{ height: isHovered ? "auto" : "140px" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <Calendar size={16} className="mr-2" />
            {formatDate(event.date)}
          </div>
          
          <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-muted-foreground text-sm leading-relaxed">
              {event.description.substring(0, 120)}...
            </p>
            
            <div className="mt-4 flex items-center text-primary text-sm font-medium">
              <Clock size={16} className="mr-2" />
              Click to view gallery
            </div>
          </motion.div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default EventCard;