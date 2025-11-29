import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface WorldMapProps {
  location: string;
  className?: string;
}

// Location coordinates mapping (longitude, latitude)
const locationCoordinates: { [key: string]: [number, number] } = {
  "San Francisco, CA": [-122.4194, 37.7749],
  "New York, NY": [-74.006, 40.7128],
  "London, UK": [-0.1276, 51.5074],
  "Tokyo, Japan": [139.6917, 35.6895],
  "Sydney, Australia": [151.2093, -33.8688],
  "Paris, France": [2.3522, 48.8566],
  "Berlin, Germany": [13.405, 52.52],
  "Mumbai, India": [72.8777, 19.076],
  "Toronto, Canada": [-79.3832, 43.6532],
  "Singapore": [103.8198, 1.3521],
};

export function WorldMap({ location, className = "" }: WorldMapProps) {
  const [coordinates, setCoordinates] = useState<[number, number]>([-122.4194, 37.7749]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Find matching coordinates or use default
    const matchedCoords = Object.entries(locationCoordinates).find(([key]) =>
      location.toLowerCase().includes(key.toLowerCase())
    );

    if (matchedCoords) {
      setCoordinates(matchedCoords[1]);
    } else {
      // Try to extract city name and find partial match
      const cityMatch = Object.entries(locationCoordinates).find(([key]) => {
        const locationParts = location.toLowerCase().split(",");
        return locationParts.some((part) => key.toLowerCase().includes(part.trim()));
      });
      if (cityMatch) {
        setCoordinates(cityMatch[1]);
      }
    }

    setIsLoaded(true);
  }, [location]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={`relative ${className}`}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,124,240,0.1),transparent_50%)]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(75, 201, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(75, 201, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Map Container */}
      <div className="relative rounded-2xl overflow-hidden border border-[#4BC9FF]/30 bg-gradient-to-br from-[#010102] via-[#090979]/20 to-[#0C0F19] backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 140,
              center: [0, 20],
            }}
            style={{
              width: "100%",
              height: "auto",
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#0C0F19"
                    stroke="#4BC9FF"
                    strokeWidth={0.5}
                    style={{
                      default: {
                        fill: "#0C0F19",
                        stroke: "#4BC9FF",
                        strokeWidth: 0.5,
                        opacity: 0.8,
                        outline: "none",
                      },
                      hover: {
                        fill: "#090979",
                        stroke: "#007CF0",
                        strokeWidth: 0.8,
                        opacity: 1,
                        outline: "none",
                        transition: "all 250ms",
                      },
                      pressed: {
                        fill: "#090979",
                        stroke: "#007CF0",
                        strokeWidth: 0.8,
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* User Location Marker */}
            <Marker coordinates={coordinates}>
              {/* Pulsing Glow Effect */}
              <motion.circle
                cx={0}
                cy={0}
                r={12}
                fill="#007CF0"
                opacity={0.3}
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Secondary Pulse */}
              <motion.circle
                cx={0}
                cy={0}
                r={8}
                fill="#4BC9FF"
                opacity={0.4}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />

              {/* Main Marker */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              >
                {/* Outer Ring */}
                <circle cx={0} cy={0} r={6} fill="#007CF0" opacity={0.6} />

                {/* Inner Dot */}
                <circle cx={0} cy={0} r={3} fill="#6DFFB8" />

                {/* Animated Ring */}
                <motion.circle
                  cx={0}
                  cy={0}
                  r={6}
                  fill="none"
                  stroke="#FF1B9B"
                  strokeWidth={1.5}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.8, 0, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              </motion.g>

              {/* Location Pin Icon */}
              <motion.path
                d="M0,-10 L0,-20 M-2,-18 L0,-20 L2,-18"
                stroke="#FF1B9B"
                strokeWidth={1.5}
                strokeLinecap="round"
                fill="none"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              />
            </Marker>
          </ComposableMap>
        </motion.div>

        {/* Location Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-gradient-to-r from-[#007CF0]/90 to-[#FF1B9B]/90 backdrop-blur-md border border-[#4BC9FF]/40 shadow-lg shadow-[#007CF0]/30"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-2 h-2 rounded-full bg-[#6DFFB8]"
            />
            <span className="text-sm text-[#EAF6FF]">{location}</span>
          </div>
        </motion.div>

        {/* Coordinates Display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="absolute top-4 right-4 px-4 py-2 rounded-lg bg-[#0C0F19]/80 backdrop-blur-sm border border-[#4BC9FF]/30"
        >
          <div className="text-xs text-[#8B9BB8]">
            <div className="flex items-center gap-2">
              <span className="text-[#4BC9FF]">Lat:</span>
              <span className="text-[#EAF6FF]">{coordinates[1].toFixed(4)}°</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[#4BC9FF]">Lon:</span>
              <span className="text-[#EAF6FF]">{coordinates[0].toFixed(4)}°</span>
            </div>
          </div>
        </motion.div>

        {/* Grid Overlay Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#010102]/60 via-transparent to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}
