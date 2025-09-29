import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Filter, Play, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EventCard from "@/components/EventCard";
import VideoCard from "@/components/VideoCard";
import MagazineCard from "@/components/MagazineCard";
import EventModal from "@/components/EventModal";
import event1Image from "@/assets/event-1.jpg";
import event2Image from "@/assets/event-2.jpg";
import magazineCoverImage from "@/assets/magazine-cover.jpg";

// Sample data
const events = [
  {
    id: 1,
    title: "AI & Future Tech Summit",
    date: "2024-03-15",
    image: event1Image,
    status: "completed",
    description: "A comprehensive summit exploring the cutting-edge developments in artificial intelligence and emerging technologies. Industry leaders shared insights on machine learning, neural networks, and the future of human-AI collaboration.",
    gallery: [event1Image, event2Image]
  },
  {
    id: 2,
    title: "Robotics Workshop 2024",
    date: "2024-04-20",
    image: event2Image,
    status: "upcoming",
    description: "Hands-on workshop covering advanced robotics concepts, including autonomous navigation, sensor integration, and real-world applications in various industries.",
    gallery: [event2Image, event1Image]
  },
  {
    id: 3,
    title: "Cybersecurity Symposium",
    date: "2024-02-10",
    image: event1Image,
    status: "completed",
    description: "Deep dive into modern cybersecurity challenges and solutions, featuring demonstrations of ethical hacking techniques and defensive strategies.",
    gallery: [event1Image]
  }
];

const videos = [
  {
    id: 1,
    title: "AI Revolution: What's Next?",
    thumbnail: event1Image,
    url: "https://youtube.com/watch?v=example1"
  },
  {
    id: 2,
    title: "Building Autonomous Robots",
    thumbnail: event2Image, 
    url: "https://youtube.com/watch?v=example2"
  }
];

const magazines = [
  {
    id: 1,
    title: "Tech Futures Quarterly",
    image: magazineCoverImage,
    url: "https://example.com/magazine"
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("events");
  const [eventFilter, setEventFilter] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = events.filter(event => {
    if (eventFilter === "all") return true;
    if (eventFilter === "past") return event.status === "completed";
    if (eventFilter === "upcoming") return event.status === "upcoming";
    return true;
  });

  const tabs = [
    { id: "events", label: "Events", icon: Calendar },
    { id: "videos", label: "Videos", icon: Play },
    { id: "magazine", label: "Magazine", icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/30 bg-card/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Committee Events
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our cutting-edge events, educational content, and publications
            </p>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-center mb-8">
          <div className="card-tech p-2 flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 transition-all duration-300 ${
                    activeTab === tab.id 
                      ? "bg-primary text-primary-foreground glow-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Events Tab */}
            {activeTab === "events" && (
              <div>
                {/* Filter Controls */}
                <div className="flex justify-center mb-8">
                  <div className="card-tech p-2 flex space-x-2">
                    {["all", "past", "upcoming"].map((filter) => (
                      <Button
                        key={filter}
                        variant={eventFilter === filter ? "secondary" : "ghost"}
                        onClick={() => setEventFilter(filter)}
                        className={`capitalize px-4 py-2 ${
                          eventFilter === filter 
                            ? "bg-secondary text-secondary-foreground glow-secondary" 
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Filter size={16} className="mr-2" />
                        {filter}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Events Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <EventCard 
                        event={event} 
                        onClick={() => setSelectedEvent(event)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Videos Tab */}
            {activeTab === "videos" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <VideoCard video={video} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Magazine Tab */}
            {activeTab === "magazine" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {magazines.map((magazine, index) => (
                  <motion.div
                    key={magazine.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <MagazineCard magazine={magazine} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Event Modal */}
      <EventModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    </div>
  );
};

export default Index;