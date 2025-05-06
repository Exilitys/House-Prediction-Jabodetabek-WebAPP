import { Icon } from "lucide-react";
import { houses } from "@lucide/lab";
import Link from "next/link";
import { Button } from "../button";

export default function HeroSection() {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-24 py-20 bg-white">
      {/* Left Side - Text */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          Predict House Price Easily
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          We help you find the price of your house based on various features
          such as, land size, house size, bathroom, bedroom, carports, location,
          and many more.
        </p>
        <Button
          className="bg-teal-500 text-white font-semibold px-6 py-3 rounded hover:bg-teal-600 transition hover:cursor-pointer"
          size={"lg"}
        >
          <Link href="/prediction">GET STARTED →</Link>
        </Button>
      </div>

      {/* Right Side - Big House Icon */}
      <div className="w-full lg:w-1/2 flex justify-center items-center mb-10 lg:mb-0">
        <Icon iconNode={houses} color="#00BFA5" size={300} />
      </div>
    </section>
  );
}
