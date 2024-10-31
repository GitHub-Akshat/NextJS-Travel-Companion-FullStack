import frim from "../../public/images.jpeg";
import Image from 'next/image';
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src={frim}
        alt="Background"
        fill 
        className="z-0 object-cover" 
        priority
      />

      {/* Main Content Section */}
      <div className="absolute inset-0 flex items-center justify-start p-20 z-10">
        <div className="max-w-lg backdrop-blur-md bg-white bg-opacity-20 p-8 rounded-xl text-white">
          <h1 className="text-5xl font-bold mb-1">TRAVEL COMPANION</h1>
          <h2 className="text-2xl mb-2 text-neutral-200">Discover the Serenity</h2>
          <p className="mb-8">
            Escape the hustle and dive into a world of breathtaking landscapes and unforgettable journeys where every path leads to a new adventure, every view inspires awe, and each destination brings you closer to nature. Experience travel like never before, tailored just for the wanderer in you.
          </p>
          <div className="flex space-x-4">
            <Link href="/signup" className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow hover:bg-gray-200 transition">
              Sign Up
            </Link>
            <Link href="/login" className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}