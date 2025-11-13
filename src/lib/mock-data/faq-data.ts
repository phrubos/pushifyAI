export interface FAQItem {
  id: string
  category: string
  question: string
  answer: string
}

export const faqData: FAQItem[] = [
  // Getting Started
  {
    id: "faq_001",
    category: "Getting Started",
    question: "How does Plushify work?",
    answer:
      "Plushify uses advanced AI technology to transform your photos into adorable plushie designs. Simply upload a photo, choose your preferred style (cute, realistic, or cartoon), and our AI will generate a unique plushie version in seconds. You can then download your creation or save it to your gallery.",
  },
  {
    id: "faq_002",
    category: "Getting Started",
    question: "What image formats are supported?",
    answer:
      "Plushify supports the most common image formats including JPG, JPEG, and PNG files. For best results, we recommend using high-quality images with good lighting and clear visibility of the subject. Maximum file size is 10MB per image.",
  },
  {
    id: "faq_003",
    category: "Getting Started",
    question: "Can I use photos of pets?",
    answer:
      "Absolutely! Plushify works great with photos of pets, especially dogs and cats. Many users create plushie versions of their furry friends. For best results, use photos where your pet is clearly visible and well-lit.",
  },
  {
    id: "faq_004",
    category: "Getting Started",
    question: "What makes a good source photo?",
    answer:
      "The best source photos have good lighting, clear focus, and a visible subject facing the camera. Avoid blurry images, heavily filtered photos, or images with complex backgrounds. Close-up shots or portraits typically work best for creating plushies.",
  },

  // Credits & Pricing
  {
    id: "faq_005",
    category: "Credits & Pricing",
    question: "How many credits does one generation cost?",
    answer:
      "Each plushie generation costs 1 credit, regardless of the style or size you choose. This simple pricing model makes it easy to track your usage. You can purchase credits through our flexible pricing plans.",
  },
  {
    id: "faq_006",
    category: "Credits & Pricing",
    question: "Do credits expire?",
    answer:
      "No, your credits never expire! Once you purchase credits, they remain in your account until you use them. You can use them at your own pace without worrying about expiration dates.",
  },
  {
    id: "faq_007",
    category: "Credits & Pricing",
    question: "Can I change my plan?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll immediately receive the credits from your new plan. When downgrading, the change will take effect at the end of your current billing cycle. Any unused credits carry over.",
  },
  {
    id: "faq_008",
    category: "Credits & Pricing",
    question: "What happens to unused credits?",
    answer:
      "Unused credits remain in your account indefinitely and never expire. If you cancel your subscription, you can still use any remaining credits. Credits are also refundable within 30 days of purchase if unused.",
  },

  // Technical
  {
    id: "faq_009",
    category: "Technical",
    question: "How long does generation take?",
    answer:
      "Most plushie generations are completed within 3-5 seconds. Processing time may vary slightly depending on server load and image complexity, but we strive to provide results as quickly as possible.",
  },
  {
    id: "faq_010",
    category: "Technical",
    question: "What image quality do I get?",
    answer:
      "All generated plushies are produced in HD quality (1024x1024 pixels) suitable for printing and sharing. You can download full-resolution images without watermarks. Pro and Elite members get access to even higher resolution options.",
  },
  {
    id: "faq_011",
    category: "Technical",
    question: "Can I regenerate with different styles?",
    answer:
      "Yes! You can upload the same photo multiple times and try different styles. Each generation costs 1 credit, so you can experiment with cute, realistic, and cartoon styles to find your favorite.",
  },
  {
    id: "faq_012",
    category: "Technical",
    question: "Are there usage limits?",
    answer:
      "The only limit is your available credits. You can generate as many plushies as you want, as long as you have credits in your account. There are no daily or monthly limits beyond your credit balance.",
  },

  // Account & Privacy
  {
    id: "faq_013",
    category: "Account & Privacy",
    question: "Is my data secure?",
    answer:
      "Yes, we take security seriously. All uploaded images are encrypted in transit and at rest. We use industry-standard security practices to protect your data. You can delete your images at any time from your gallery.",
  },
  {
    id: "faq_014",
    category: "Account & Privacy",
    question: "Who owns the generated images?",
    answer:
      "You own all the plushie images you generate! You have full commercial rights to use, share, print, or sell your generated plushies. Plushify does not claim any ownership of your creations.",
  },
  {
    id: "faq_015",
    category: "Account & Privacy",
    question: "Do you store my photos?",
    answer:
      "We store your original uploaded photos and generated plushies in your secure gallery so you can access them anytime. You have full control and can delete any image whenever you want. Images are never shared or used for any purpose other than your plushie generation.",
  },
]
