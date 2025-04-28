import { useEffect } from "react";
import { Mail, Phone, Contact } from "lucide-react";
import { motion } from "framer-motion";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen px-4 py-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:px-10">
        {/* Left - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-2xl md:text-3xl font-bold mb-4 text-center lg:text-left">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
            We’d love to hear from you! Whether you have a question, feedback,
            or just want to say hello, feel free to reach out to us.
          </p>

          <div className="flex items-start gap-4 mb-4">
            <Mail className="text-purple-800 w-6 h-6 mt-1 shrink-0" />
            <p className="text-sm sm:text-base text-gray-700">
            jais1829@gmail.com
            </p>
          </div>

          <div className="flex items-start gap-4 mb-4">
            <Phone className="text-purple-800 w-6 h-6 mt-1 shrink-0" />
            <p className="text-sm sm:text-base text-gray-700">
            Contact Number : 9445280054 <br/>
            Whatsapp Number : 9444813377
            </p>
          </div>

          <div className="flex items-start gap-4">
            <Contact className="text-purple-800 w-6 h-6 mt-1 shrink-0" />
            <p className="text-sm sm:text-base text-gray-700">
            2/258-4 Alangulm to Sivakasi Main Road,
            
              <br />
              Kallamanayakarpatti -626131
            </p>
          </div>
        </motion.div>

        {/* Right - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.3, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-2xl md:text-3xl font-bold mb-6 text-center lg:text-left">
            Contact Us
          </h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 text-sm sm:text-base">
                  First name
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded border border-gray-300 text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-sm sm:text-base">
                  Last name
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded border border-gray-300 text-sm sm:text-base"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-sm sm:text-base">
                Phone number
              </label>
              <input
                type="text"
                className="w-full p-3 rounded border border-gray-300 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-sm sm:text-base">
                Subject
              </label>
              <input
                type="text"
                className="w-full p-3 rounded border border-gray-300 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-sm sm:text-base">
                Message
              </label>
              <textarea
                rows="5"
                className="w-full p-3 rounded border border-gray-300 text-sm sm:text-base"
                placeholder="Message"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition text-sm sm:text-base"
            >
              Submit
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
