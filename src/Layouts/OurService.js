
import { Truck, Clock, Play } from "lucide-react";
import { motion } from "framer-motion";

const OurService = () => {
  // Animation variants for staggered service items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 bg-gray-100 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-3xl lg:text-5xl font-bold text-gray-900 font-[Poppins]">
            Our Services
          </h2>
          <div className="w-20 h-1 bg-amber-400 mx-auto mt-2 rounded-full"></div>
        </motion.div>

        {/* Service Items and Video Section */}
        <div className="flex flex-col lg:flex-row justify-center gap-8 sm:gap-12">
          {/* Service Items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-lg">
              {/* Quick Delivery */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-amber-400 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Truck className="text-blue-900 w-8 h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Quick Delivery
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Fast delivery within 24 hours
                </p>
                <div className="w-10 h-1 bg-amber-400 mt-3 rounded-full"></div>
              </motion.div>

              {/* 24/7 Help Center */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-amber-400 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="text-blue-900 w-8 h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  24/7 Help Center
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Support anytime, anywhere
                </p>
                <div className="w-10 h-1 bg-amber-400 mt-3 rounded-full"></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex items-center justify-center px-4"
          >
            <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-lg group">
              <video
                src="/video.mp4"
                className="w-full aspect-video object-cover"
                autoPlay
                muted
                loop
                controls
                aria-label="Service overview video"
              />
              {/* Play button overlay on hover */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Play className="text-white w-12 h-12" />
              </div>
             
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OurService;