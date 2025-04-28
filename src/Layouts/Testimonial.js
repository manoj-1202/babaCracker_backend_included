import { motion } from "framer-motion";

const Testimonial = () => {
  // Animation variants for staggered cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const testimonials = [
    {
      name: "Sri Ram",
      review:
        "Best quality crackers at affordable prices ,I have been buying from Baba Crackers for 5 years now ,they never disappoint with their fantastic variety and service",
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=SaraPatel",
    },
    {
      name: "Manohar",
      review:
        "Baba Crackers made our Diwali truly magical Their fireworks are colorful, safe, and absolutely thrilling, Thank you for lighting up our celebrations beautifully",
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=RajeshMehta",
    },
    {
      name: "Priya",
      review:
        "The Diwali decorations I bought from here were stunning and received many compliments from my guests. Thank you for making my Diwali special!",
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=PriyaSingh",
    },
    {
      name: "Sankar",
      review:
       "We loved the dazzling sky shots and beautiful flower pots, Our kids enjoyed every moment, all thanks to BabaCrackers",
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=AmitShah",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div>
        {/* Heading and Subheading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Testimonials
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Read what our customers have to say about their Diwali experience
            with us.
          </p>
        </div>

        {/* Testimonial Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-gray-100 p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={`${testimonial.name}'s avatar`}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {testimonial.review}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonial;
