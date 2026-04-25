"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Menu, X, ShoppingBag, ArrowRight, Leaf, Heart, Star, ChevronDown } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Tulsi Green Tea",
    tagline: "Sacred basil meets green tea",
    price: 299,
    image: "🌿",
    color: "#6B8F6A",
    description: "Premium tulsi leaves blended with organic green tea. Perfect for morning wellness.",
    benefits: ["Immunity Boost", "Stress Relief", "Anti-inflammatory"],
    rating: 4.9,
    reviews: 247,
  },
  {
    id: 2,
    name: "Masala Chai Adaptogen",
    tagline: "Ancient spice, modern boost",
    price: 349,
    image: "☕",
    color: "#C4904A",
    description: "Traditional masala chai with ashwagandha and rhodiola. Spicy, warming, energizing.",
    benefits: ["Energy", "Focus", "Relaxation"],
    rating: 4.8,
    reviews: 183,
  },
  {
    id: 3,
    name: "Turmeric Golden Milk",
    tagline: "Golden elixir, pure glow",
    price: 279,
    image: "🥛",
    color: "#E5BC7F",
    description: "Haldi doodh reimagined with black pepper and ginger. Anti-inflammatory powerhouse.",
    benefits: ["Glow", "Joint Health", "Digestion"],
    rating: 4.9,
    reviews: 312,
  },
  {
    id: 4,
    name: "Moringa Mint Refresh",
    tagline: "Nature's multivitamin",
    price: 259,
    image: "🍃",
    color: "#6FDAA9",
    description: "Moringa leaves with fresh peppermint. Detoxifying and refreshing.",
    benefits: ["Detox", "Energy", "Vitamins"],
    rating: 4.7,
    reviews: 156,
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Yoga Instructor",
    image: "🧘‍♀️",
    text: "The Tulsi Green Tea has become my morning ritual. Pure magic in a cup!",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Fitness Coach",
    image: "💪",
    text: "As someone who needs energy without jitters, this Masala Chai Adaptogen is perfect.",
    rating: 5,
  },
  {
    name: "Anjali Reddy",
    role: "Content Creator",
    image: "📱",
    text: "My skin has never glowed better. The Turmeric Golden Milk is my secret weapon!",
    rating: 5,
  },
  {
    name: "Karan Mehta",
    role: "Tech YouTuber",
    image: "🎬",
    text: "Finally a product that matches the quality of Indian heritage. My audience loves it!",
    rating: 5,
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Shop", "Our Story", "Benefits", "Reviews", "Contact"];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="lg:hidden p-2 -ml-2 rounded-full hover:bg-accent/50 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </motion.button>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-xl lg:text-2xl font-semibold tracking-tight"
        >
          xmattani
        </motion.div>

        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-2 -mr-2 rounded-full hover:bg-accent/50 transition-colors relative"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              2
            </span>
          </motion.button>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-background z-50 p-6 lg:hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-semibold">xmattani</span>
                <button onClick={() => setIsOpen(false)} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="space-y-4">
                {navLinks.map((item, i) => (
                  <motion.a
                    key={item}
                    href="#"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="block text-lg py-2 border-b border-border/50"
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>
              <div className="mt-8 pt-8 border-t">
                <p className="text-sm text-muted-foreground">Follow us</p>
                <div className="flex gap-4 mt-4">
                  <a href="#" className="text-2xl hover:scale-110 transition-transform">📸</a>
                  <a href="#" className="text-2xl hover:scale-110 transition-transform">▶️</a>
                  <a href="#" className="text-2xl hover:scale-110 transition-transform">𝕏</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="min-h-screen lg:min-h-[90vh] pt-20 lg:pt-24 pb-8 px-4 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-transparent to-transparent" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
       
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh]">
          <div className="order-2 lg:order-1">
            <AnimatedSection>
              <motion.div
                variants={fadeIn}
                className="mb-8"
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium mb-6"
                >
                  <Leaf className="w-4 h-4 text-primary" />
                  100% Organic · Cruelty-Free
                </motion.span>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight mb-6 tracking-tight">
                  Ancient wisdom,
                  <br />
                  <span className="text-primary">modern wellness</span>
                </h1>
                
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
                  Handcrafted herbal drinks inspired by Indian Ayurveda. 
                  Made for content creators who care about what they put in their body.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex"
                  >
                    <button className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-base">
                      Explore Collection
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 border-2 border-border px-8 py-4 rounded-full font-semibold text-base hover:border-primary/50 transition-colors"
                  >
                    Watch Our Story
                  </motion.button>
                </div>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection>
              <motion.div
                variants={fadeIn}
                className="flex justify-center lg:justify-start gap-8 lg:gap-12"
              >
                {[
                  { icon: "🌿", label: "Natural" },
                  { icon: "✨", label: "Pure" },
                  { icon: "💚", label: "Healthy" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl lg:text-4xl mb-2">{item.icon}</div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative"
            >
              <div className="w-64 h-64 lg:w-96 lg:h-96 mx-auto bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-3xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-9xl lg:text-[12rem]">🌸</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
      </motion.div>
    </section>
  );
}

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative bg-card rounded-3xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 h-full">
        <div className="flex justify-between items-start mb-4">
          <motion.span
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="text-6xl lg:text-7xl"
          >
            {product.image}
          </motion.span>
          <button className="p-2 rounded-full hover:bg-accent transition-colors">
            <Heart className="w-5 h-5 text-muted-foreground hover:text-primary" />
          </button>
        </div>

        <div className="mb-3">
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-primary text-primary"
                    : "text-muted"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>

        <h3 className="text-xl lg:text-2xl font-semibold mb-1">{product.name}</h3>
        <p className="text-sm lg:text-base text-muted-foreground mb-4">{product.tagline}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {product.benefits.map((benefit) => (
            <span
              key={benefit}
              className="px-3 py-1 bg-accent/50 rounded-full text-xs lg:text-sm font-medium"
            >
              {benefit}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl lg:text-3xl font-bold">₹{product.price}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-medium text-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

function Products() {
  return (
    <section className="py-16 lg:py-24 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <motion.div variants={fadeIn} className="text-center mb-12 lg:mb-16">
            <span className="text-sm lg:text-base font-medium text-primary">Our Collection</span>
            <h2 className="text-3xl lg:text-4xl font-semibold mt-2 mb-4">Crafted with care</h2>
            <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto">
              Each blend is carefully formulated by experts, using traditional Ayurvedic wisdom
            </p>
          </motion.div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 lg:mt-16"
        >
          <button className="text-primary font-medium inline-flex items-center gap-2 hover:gap-3 transition-all text-lg">
            View All Products
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-16 lg:py-24 px-4 lg:px-8 bg-accent/10">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <motion.div variants={fadeIn} className="text-center mb-12 lg:mb-16">
            <span className="text-sm lg:text-base font-medium text-primary">Testimonials</span>
            <h2 className="text-3xl lg:text-4xl font-semibold mt-2 mb-4">Loved by many</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of content creators who have made the switch to natural wellness
            </p>
          </motion.div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-5 lg:p-6 border border-border/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl lg:text-4xl">{testimonial.image}</span>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20 lg:py-32 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary/10 rounded-3xl p-8 lg:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <span className="text-6xl lg:text-8xl mb-6 block">🍵</span>
            <h2 className="text-2xl lg:text-4xl font-semibold mb-4">Start your wellness journey</h2>
            <p className="text-muted-foreground text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of content creators who have made the switch to natural, Ayurvedic-inspired beverages
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground px-8 lg:px-10 py-4 lg:py-5 rounded-full font-semibold text-lg"
              >
                Shop Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-primary/30 px-8 lg:px-10 py-4 lg:py-5 rounded-full font-semibold text-lg hover:border-primary/50 transition-colors"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = {
    shop: ["All Products", "Best Sellers", "New Arrivals", "Gift Sets"],
    company: ["About Us", "Our Story", "Blog", "Careers"],
    support: ["FAQ", "Shipping", "Returns", "Contact"],
  };

  return (
    <footer className="py-12 lg:py-20 px-4 lg:px-8 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          <div className="col-span-2">
            <h3 className="text-2xl lg:text-3xl font-semibold mb-4">xmattani</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Ancient Indian wellness, crafted for modern creators. Premium herbal drinks inspired by Ayurveda.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-accent/50 hover:bg-primary hover:text-primary-foreground transition-colors text-lg">
                📸
              </a>
              <a href="#" className="p-2 rounded-full bg-accent/50 hover:bg-primary hover:text-primary-foreground transition-colors text-lg">
                ▶️
              </a>
              <a href="#" className="p-2 rounded-full bg-accent/50 hover:bg-primary hover:text-primary-foreground transition-colors text-lg">
                𝕏
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t flex flex-col lg:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 xmattani. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Products />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}