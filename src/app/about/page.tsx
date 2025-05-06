import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import Navbar from "@/components/ui/navbar";

export default function About() {
  const testimonials = [
    {
      quote:
        "Train and create the model, create app and implement the model in the app.",
      name: "Jonathan Carlo",
      designation: "University Student at Binus University",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: "Help in developing model and designing the application",
      name: "Clariant Benedictus Tan",
      designation: "University Student at Binus University",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: "Help in developing model and designing the application",
      name: "Bren Alden",
      designation: "University Student at Binus University",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="flex mx-auto justify-center items-center flex-col gap-4 h-screen">
        <h1 className="text-3xl font-bold mt-20">About Us</h1>
        <p className="w-1/3">
          We are a small group of university student, aiming to help people in
          Jabodetabek predict their house prices by building a simple
          application
        </p>
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </>
  );
}
