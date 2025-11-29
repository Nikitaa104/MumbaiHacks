import { useState } from "react";
import { MapPin, Navigation2, Maximize2 } from "lucide-react";
import { motion } from "motion/react";

interface SimpleMapProps {
  center: [number, number];
  zoom?: number;
  location?: string;
  className?: string;
}

export function SimpleMap({ center, zoom = 13, location, className = "" }: SimpleMapProps) {
  const [mapType, setMapType] = useState<"roadmap" | "satellite">("roadmap");
  
  const lat = center[0];
  const lng = center[1];
  
  // Create Google Maps static image URL
  const getMapUrl = () => {
    const mapTypeParam = mapType === "satellite" ? "satellite" : "roadmap";
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=800x400&maptype=${mapTypeParam}&markers=color:green%7C${lat},${lng}&style=feature:all|element:labels|visibility:on&style=feature:all|element:geometry|saturation:-100&style=feature:water|element:geometry|color:0x1F1F1F&style=feature:road|element:geometry|color:0x2D2D2D&key=YOUR_API_KEY`;
  };

  // Fallback to OpenStreetMap
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.02},${lat - 0.02},${lng + 0.02},${lat + 0.02}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Map Container */}
      <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-[#1F1F1F]">
        {/* OpenStreetMap iframe */}
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={osmUrl}
          className="w-full h-full"
          style={{ filter: "invert(1) hue-rotate(180deg) brightness(0.95) contrast(0.9)" }}
        />
        
        {/* Overlay with animated marker */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative"
          >
            {/* Pulsing circle */}
            <motion.div
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 -m-10 bg-[#00E676] rounded-full"
            />
            {/* Main marker */}
            <div className="relative bg-gradient-to-br from-[#00E676] to-[#00C853] p-3 rounded-full shadow-2xl shadow-[#00E676]/50">
              <MapPin className="w-8 h-8 text-[#000000]" fill="#000000" />
            </div>
          </motion.div>
        </div>

        {/* Controls Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-auto z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMapType(mapType === "roadmap" ? "satellite" : "roadmap")}
            className="p-2 bg-[#121212] border border-[#1F1F1F] rounded-lg hover:border-[#00E676]/50 transition-all shadow-lg"
            title="Toggle Map Type"
          >
            <Navigation2 className="w-5 h-5 text-[#00E676]" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`, '_blank')}
            className="p-2 bg-[#121212] border border-[#1F1F1F] rounded-lg hover:border-[#00E676]/50 transition-all shadow-lg"
            title="View Full Map"
          >
            <Maximize2 className="w-5 h-5 text-[#00E676]" />
          </motion.button>
        </div>

        {/* Location Label Overlay */}
        {location && (
          <div className="absolute bottom-4 left-4 right-4 pointer-events-auto z-10">
            <div className="bg-[#121212]/90 backdrop-blur-sm border border-[#1F1F1F] rounded-lg p-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00E676] flex-shrink-0" />
                <p className="text-sm text-[#F2F2F2] truncate">{location}</p>
              </div>
              <p className="text-xs text-[#A3A3A3] mt-1">
                {lat.toFixed(6)}°, {lng.toFixed(6)}°
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
