import { Truck, Clock } from "lucide-react";
import blast from "../assets/blast.gif";
import { motion } from "framer-motion";

const OurService = () => {
  return (
    <div className="relative bg-black text-white py-12 px-4 overflow-hidden">
      <img
        src={blast}
        alt="Fireworks Animation"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-25 pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="text-center mb-10 lg:ml-[20px]"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-2">
            Our Services
          </h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto rounded-sm"></div>
        </motion.div>

        {/* Service Items */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center lg:ml-[15%]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 px-2 sm:px-4">
            {/* Quick Delivery */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-yellow-400 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-4">
                <Truck className="text-blue-900 w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <h3 className="text-lg sm:text-xl font-medium">Quick Delivery</h3>
              <div className="w-10 h-1 bg-yellow-400 mt-1 rounded-sm"></div>
            </div>

            {/* 24/7 Help Center */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-yellow-400 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-4">
                <Clock className="text-blue-900 w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <h3 className="text-lg sm:text-xl font-medium">
                24/7 Help Center
              </h3>
              <div className="w-10 h-1 bg-yellow-400 mt-1 rounded-sm"></div>
            </div>
          </div>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.3 }}
          viewport={{ once: true }}
          className="min-h-[20vh] flex items-center justify-center px-4 mt-10"
        >
          <div className="w-full max-w-5xl rounded-lg overflow-hidden shadow-lg">
            <video
              src="/video.mp4"
              className="w-full max-h-[500px] object-cover"
              autoPlay
              muted
              loop
              controls
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OurService;
