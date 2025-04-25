import { motion } from "framer-motion";
import happy from "../assets/happy.png";
import retail from "../assets/retail.png";
import godown from "../assets/godown.png";
import transport from "../assets/transport.png";
import store from "../assets/store.jpg";
import trans from "../assets/trans.jpg";
import godo from "../assets/godo.jpg";


const Success = () => {
  return (
    <>
      {/* Our Reason For Success */}
      <div className="relative max-w-7xl mx-auto text-white py-12 px-4 md:px-10 text-center mt-10 overflow-hidden bg-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <div>
            <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold mb-2 text-black">
              Our Reason For Success
            </h1>
            <h2 className="text-xl sm:text-4xl md:text-3xl font-bold mb-4 text-black">
              Having 30+ years of experience in Fireworks Industry
            </h2>
            <p className="text-sm md:text-base max-w-3xl mx-auto mb-10 text-black">
              Let's take the first step together and help you build your presence.
              We are here every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                logo: happy,
                title: "10,000+ Happy Customers",
                desc: "We are privileged to serve more than 10,000 customers during the festival seasons.",
              },
              {
                logo: retail,
                title: "Retail @ Wholesale Price",
                desc: "We have showrooms in Sivakasi and own the largest godown, transporting crackers all over India.",
              },
              {
                logo: godown,
                title: "Largest Godown",
                desc: "We own the largest godown in Sivakasi, capable of storing tons of fireworks throughout the year.",
              },
              {
                logo: transport,
                title: "No #1 Transporter",
                desc: "We are the major transporter for Maharashtra, Madhya Pradesh, Delhi, Karnataka, Andhra, and Tamil Nadu.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white text-gray-800 p-6 rounded-xl shadow-md text-left"
              >
                <img
                  src={item.logo}
                  alt={item.title}
                  className="w-16 h-16 mb-4"
                />
                <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-7xl mx-auto bg-white text-black py-5 px-4 md:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl font-medium max-w-5xl mx-auto mb-12"
        >
          <div>
            <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold mb-2 text-black">
              Why Choose Us?
            </h1>
            <p className="text-sm md:text-base max-w-3xl mx-auto mb-10 text-black">
              Discover the Excellence Behind Our Festive Experience
            </p>
          </div>
          <span className="font-semibold">BaBa CRACKERS</span> can sell you the
          best quality crackers at cheap prices because our large storage
          facility enables us to buy quality crackers at competitive rates, and
          our transport fleet helps us deliver them affordably.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-lg bg-white text-left"
          >
            <img
              src={godo}
              alt="Storage Facility"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 text-gray-800">
              <h3 className="text-lg font-semibold mb-2">Our Storage Facility</h3>
              <p className="text-sm text-gray-700">
                We own one of the largest storage facilities in Sivakasi, with a
                capacity of more than 10,00,000 Kgs of fireworks.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-lg bg-white text-left"
          >
            <img
              src={trans}
              alt="Transport Fleets"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 text-gray-800">
              <h3 className="text-lg font-semibold mb-2">Our Transport Fleets</h3>
              <p className="text-sm text-gray-700">
                We have our own and partnered fleets transporting crackers all
                over India.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-lg bg-white text-left"
          >
            <img
              src={store} 
              alt="Showroom"
              className="w-full h-56 object-cover"
            />
            <div className="p-4 text-gray-800">
              <h3 className="text-lg font-semibold mb-2">Our Showroom</h3>
              <p className="text-sm text-gray-700">
                You can directly buy from our Showroom in Sivakasi (2 more coming soon).
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Success;
