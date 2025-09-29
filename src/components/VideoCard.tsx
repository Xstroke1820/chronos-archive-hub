import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  url: string;
}

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const handleClick = () => {
    window.open(video.url, '_blank');
  };

  return (
    <motion.div
      className="cursor-pointer"
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="card-tech overflow-hidden group">
        <div className="relative">
          <div className="aspect-video overflow-hidden">
            <img 
              src={video.thumbnail} 
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
            <motion.div
              className="bg-primary/90 backdrop-blur-sm rounded-full p-4 group-hover:bg-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Play size={32} className="text-primary-foreground ml-1" fill="currentColor" />
            </motion.div>
          </div>

          {/* External Link Icon */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-background/80 backdrop-blur-sm rounded-full p-2">
              <ExternalLink size={16} className="text-foreground" />
            </div>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          
          <div className="mt-3 flex items-center text-primary text-sm font-medium">
            <Play size={16} className="mr-2" />
            Watch on YouTube
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default VideoCard;