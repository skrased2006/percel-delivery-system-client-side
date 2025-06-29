import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Awlad Hossin",
    role: "Senior Product Designer",
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
  },
  {
    name: "Rasel Ahamed",
    role: "CTO",
    text: "Highly recommend! This product helped me fix my posture while working long hours at my desk.",
  },
  {
    name: "Nasir Uddin",
    role: "CEO",
    text: "Excellent quality and very comfortable to wear throughout the entire day.",
  },
  {
    name: "Sarah Jahan",
    role: "Marketing Manager",
    text: "I've seen a significant improvement in my posture. Love it!",
  },
  {
    name: "Mehedi Hasan",
    role: "Software Engineer",
    text: "I was skeptical at first, but it really does work. Great buy!",
  },
  {
    name: "Jannatul Ferdous",
    role: "UX Designer",
    text: "Not only functional but stylish too. Perfect for daily use.",
  },
  {
    name: "Asif Rahman",
    role: "Entrepreneur",
    text: "Fantastic support and customer service. I’m very satisfied.",
  },
  {
    name: "Tania Akter",
    role: "Student",
    text: "Easy to use, affordable, and it actually helps. My back feels great.",
  },
  {
    name: "Rafiul Islam",
    role: "Photographer",
    text: "Good build quality and very lightweight. Happy with the purchase.",
  },
  {
    name: "Farzana Yasmin",
    role: "Fitness Coach",
    text: "Perfect addition to my daily routine for maintaining posture and reducing back strain.",
  },
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="w-full max-w-4xl mx-auto text-center py-20 px-4">
      <h2 className="text-4xl font-bold mb-4 text-gray-800">What our customers are sayings</h2>
      <p className="text-gray-500 mb-12 max-w-xl mx-auto">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
      </p>

      <div className="relative bg-white shadow-lg rounded-xl px-8 py-6 min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-gray-700 text-lg leading-relaxed mb-6">"{testimonials[index].text}"</p>
            <div className="font-semibold text-gray-900">{testimonials[index].name}</div>
            <div className="text-sm text-gray-500">{testimonials[index].role}</div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${i === index ? "bg-green-500" : "bg-gray-300"}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-2">
          <button
            onClick={prevSlide}
            className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 hover:bg-gray-400"
          >
            ‹
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          <button
            onClick={nextSlide}
            className="w-8 h-8 rounded-full bg-green-500 text-white hover:bg-green-600"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
