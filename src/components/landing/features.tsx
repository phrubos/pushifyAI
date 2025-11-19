"use client";

import { motion } from "motion/react";
import { Sparkles, Zap, Download, Share2, Wand2, Gift } from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "Instant Transformation",
    description: "Our advanced AI processes your photos in seconds, delivering high-quality plushie designs instantly.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: Sparkles,
    title: "High Quality Detail",
    description: "Every texture, stitch, and detail is generated with precision to look like a real, huggable toy.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Gift,
    title: "Perfect for Gifting",
    description: "Create unique, personalized designs that make for the most thoughtful and surprising gifts.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    icon: Zap,
    title: "Easy to Use",
    description: "No design skills needed. Just upload a photo and let our magic algorithm handle the rest.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Download,
    title: "High-Res Downloads",
    description: "Get high-resolution images suitable for printing, sharing on social media, or merchandise.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: Share2,
    title: "Social Ready",
    description: "Optimized formats for Instagram, TikTok, and other platforms to share your cute creations.",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Plushify?</h2>
          <p className="text-muted-foreground text-lg">
            We combine state-of-the-art AI with adorable aesthetics to give you the best creative experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group p-8 rounded-2xl bg-background border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
