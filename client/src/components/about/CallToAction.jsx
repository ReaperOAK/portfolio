import SectionWrapper from "./SectionWrapper";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <SectionWrapper className="text-center">
      <h2 className="text-3xl font-bold mb-4">Let’s Build Something Together</h2>
      <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/projects" className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400">
          See My Work
        </Link>
        <Link to="/contact" className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform focus:outline-none focus:ring-2 focus:ring-purple-400">
          Get in Touch
        </Link>
      </div>
    </SectionWrapper>
  );
}
