import { motion } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Magazine {
  id: number;
  title: string;
  image: string;
  url: string;
}

interface MagazineCardProps {
  magazine: Magazine;
}

const MagazineCard = ({ magazine }: MagazineCardProps) => {
  const handleClick = () => {
    window.open(magazine.url, '_blank');
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
          <div className="aspect-[3/4] overflow-hidden">
            <img 
              src={magazine.image} 
              alt={magazine.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center text-primary text-sm font-medium">
                <BookOpen size={16} className="mr-2" />
                Read Magazine
              </div>
            </div>
          </div>

          {/* External Link Icon */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-background/80 backdrop-blur-sm rounded-full p-2">
              <ExternalLink size={16} className="text-foreground" />
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
            {magazine.title}
          </h3>
          
          <div className="flex items-center text-muted-foreground text-sm">
            <BookOpen size={16} className="mr-2" />
            Digital Publication
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default MagazineCard;