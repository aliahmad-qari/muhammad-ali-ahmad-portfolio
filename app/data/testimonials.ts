export type Testimonial = {
  quote: string
  author: string
  title: string
  company: string
  rating: number
  image?: string
}

export const testimonials: Testimonial[] = [
  {
    quote: "Muhammad delivered our LMS on time and exceeded expectations. Professional, communicative, and technically brilliant. Highly recommended.",
    author: "Sarah Chen",
    title: "Learning Director",
    company: "SOL Business Consultant",
    rating: 5,
  },
  {
    quote: "Exceptional developer. Built our entire SaaS platform from scratch. Best investment we made in our tech stack.",
    author: "Ahmad Khan",
    title: "Founder & CEO",
    company: "TechStartup Inc.",
    rating: 5,
  },
  {
    quote: "Professional, communicative, and solution-focused. Handled our project with precision and delivered well beyond our initial expectations.",
    author: "James Wilson",
    title: "CTO",
    company: "FinTech Solutions",
    rating: 5,
  },
  {
    quote: "Built our memorial platform with thoughtfulness and care. The attention to detail and user experience design was outstanding.",
    author: "Emily Rodriguez",
    title: "Founder",
    company: "Palm & Grace Memorials",
    rating: 5,
  },
  {
    quote: "Reliable, responsive, and technically excellent. Transformed our business with a custom application that scales beautifully.",
    author: "David Thompson",
    title: "Operations Manager",
    company: "VED Affiliate Pvt. Limited",
    rating: 5,
  },
]
