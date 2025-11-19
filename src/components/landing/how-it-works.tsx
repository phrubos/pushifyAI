"use client";

import { motion } from "motion/react";
import { Upload, Sparkles, Heart } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Upload Your Photo",
    description: "Choose any photo of a person, pet, or object you want to transform.",
    icon: Upload,
  },
  {
    id: 2,
    title: "AI Magic Happens",
    description: "Our advanced algorithms analyze the image and generate a plushie design.",
    icon: Sparkles,
  },
  {
    id: 3,
    title: "Download & Share",
    description: "Get your adorable creation and share it with the world!",
    icon: Heart,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground text-lg">Transforming your photos is as easy as 1-2-3</p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Connector Line (Desktop) */}
        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 border-t-2 border-dashed border-primary/30 -z-10" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative flex flex-col items-center text-center bg-background p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 border-4 border-background relative z-10">
                <step.icon className="w-10 h-10 text-primary" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm border-4 border-background">
                  {step.id}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
