import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, BookOpen, Users, Lightbulb, TrendingUp, Star, Sparkles, Zap } from 'lucide-react';
import { motion, useScroll, useTransform, useInView, Variants } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import EventCard from '../components/EventCard';
import Newsletter from '../components/Newsletter';
import { SANGYAN_CONFIG } from '../config/sangyan.config';
import { Blog, Event } from '../types';

const featuredBlogs: Blog[] = [
  {
    id: '1',
    title: 'Quantum Entanglement: Bridging Theory and Application',
    slug: 'quantum-entanglement-theory-application',
    author: { name: 'Dr. Priya Sharma', institute: 'IISER Pune' },
    category: 'Physics',
    tags: ['quantum-mechanics', 'entanglement'],
    excerpt: 'Exploring quantum entanglement and its revolutionary applications in computing and cryptography.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
    publishedAt: new Date('2024-03-15'),
    readTime: 8
  },
  {
    id: '2',
    title: 'CRISPR and the Future of Gene Editing',
    slug: 'crispr-future-gene-editing',
    author: { name: 'Dr. Arjun Patel', institute: 'IISc Bangalore' },
    category: 'Biology',
    tags: ['genetics', 'biotechnology'],
    excerpt: 'Understanding CRISPR technology and its potential to revolutionize medicine and agriculture.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1582719471137-c3967ffb1c42',
    publishedAt: new Date('2024-03-10'),
    readTime: 10
  },
  {
    id: '3',
    title: 'Machine Learning in Climate Prediction',
    slug: 'ml-climate-prediction',
    author: { name: 'Dr. Sarah Kumar', institute: 'IISER Kolkata' },
    category: 'Data Science',
    tags: ['machine-learning', 'climate'],
    excerpt: 'How AI and machine learning models are improving our ability to predict climate patterns.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    publishedAt: new Date('2024-03-05'),
    readTime: 12
  }
];

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Workshop: Introduction to Quantum Computing',
    slug: 'quantum-computing-workshop',
    type: 'workshop',
    date: new Date('2024-04-20'),
    time: '2:00 PM - 5:00 PM',
    venue: 'Online',
    speaker: { name: 'Prof. Rajesh Iyer', institute: 'IIT Bombay' },
    description: 'Hands-on workshop covering the basics of quantum computing and quantum algorithms.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
    registrationLink: '#'
  },
  {
    id: '2',
    title: 'Talk: Sustainable Energy Solutions',
    slug: 'sustainable-energy-talk',
    type: 'talk',
    date: new Date('2024-04-25'),
    time: '4:00 PM - 5:30 PM',
    venue: 'IISER Pune',
    speaker: { name: 'Dr. Meera Verma', institute: 'IIT Delhi' },
    description: 'Exploring innovative approaches to renewable energy and sustainability challenges.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e',
    registrationLink: '#'
  }
];

// Animation variants with proper Variants typing
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Animated Section Component
const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SangyanHome: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);

  // Parallax effects
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(err => console.log('Autoplay prevented:', err));
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: BookOpen, label: 'Research Blogs', value: '150+', color: 'from-blue-500 to-cyan-400' },
    { icon: Users, label: 'Community Members', value: '2,000+', color: 'from-cyan-500 to-teal-400' },
    { icon: Calendar, label: 'Events Hosted', value: '50+', color: 'from-teal-400 to-emerald-400' },
    { icon: Star, label: 'Partner Institutes', value: '20+', color: 'from-blue-400 to-indigo-400' }
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Research Blogs',
      description: 'In-depth articles exploring cutting-edge research across all scientific disciplines.',
      link: `${SANGYAN_CONFIG.basePath}/blogs`
    },
    {
      icon: Calendar,
      title: 'Expert Talks & Workshops',
      description: 'Learn from leading researchers through engaging talks and hands-on workshops.',
      link: `${SANGYAN_CONFIG.basePath}/events`
    },
    {
      icon: Lightbulb,
      title: 'Learning Resources',
      description: 'Access curated materials, notes, and resources for continuous learning.',
      link: `${SANGYAN_CONFIG.basePath}/resources`
    },
    {
      icon: Users,
      title: 'Collaborative Community',
      description: 'Connect with curious minds from top institutes across India.',
      link: `${SANGYAN_CONFIG.basePath}/about`
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <Navbar />

      {/* Fixed Video Background Container */}
      <motion.div 
        className="fixed top-0 left-0 w-full h-screen z-0"
        style={{ opacity: opacityHero }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover scale-105"
        >
          <source src="/170082-842720202_large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Enhanced Gradient Overlay with Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

        {/* Animated Particles Effect */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 bg-cyan-400 rounded-full`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Scrollable Content Container */}
      <div className="relative z-10">
        {/* Hero Content Section with Enhanced Animations */}
        <motion.section 
          ref={heroRef}
          className="relative h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 text-center"
          style={{ y: yHero, scale: scaleHero }}
        >
          {/* Animated blobs in background */}
          <motion.div 
            className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
          />
          <motion.div 
            className="absolute top-40 right-10 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: 1
            }}
          />
          <motion.div 
            className="absolute -bottom-8 left-1/2 w-72 h-72 bg-teal-500/20 rounded-full mix-blend-multiply filter blur-xl"
            animate={{
              x: [0, 20, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: 2
            }}
          />

          <div className="relative max-w-5xl mx-auto space-y-6">
            {/* Floating Badge with Sparkles */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.2,
                type: 'spring',
                stiffness: 200
              }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-sm font-medium mb-4"
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </motion.div>
                Welcome to Sangyan Community
              </motion.div>
            </motion.div>

            {/* Main Heading with Gradient Animation */}
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Welcome to{' '}
              <motion.span 
                className="inline-block bg-gradient-to-r from-cyan-400 via-blue-700 to-teal-400 bg-clip-text text-transparent pb-8"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Sangyan
              </motion.span>
            </motion.h1>

            {/* Subheading with Stagger */}
            <motion.p 
              className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              A comprehensive platform for learning, sharing, and growing together
            </motion.p>

            <motion.p 
              className="text-lg text-slate-400 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Discover a world of knowledge, connection, and growth
            </motion.p>

            {/* CTA Buttons with Magnetic Effect */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-12 justify-center items-center pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={`${SANGYAN_CONFIG.basePath}/blogs`}
                  className="group px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-400/50 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Explore Blogs</span>
                  <motion.div
                    className="relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={`${SANGYAN_CONFIG.basePath}/events`}
                  className="group px-8 py-4 bg-slate-800/50 backdrop-blur-md border-2 border-slate-700 text-white rounded-xl font-semibold hover:bg-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex items-center gap-2"
                >
                  Join Events
                  <Calendar className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator with Animation */}
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              <div className="w-6 h-10 border-2 border-cyan-400/60 rounded-full flex justify-center pt-2">
                <motion.div 
                  className="w-1 h-3 bg-cyan-400 rounded-full"
                  animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Content with Solid Backgrounds */}
        <div className="relative bg-transparent">
          {/* Stats Section with Advanced Glassmorphism */}
          <motion.section 
            className="relative -mt-16 z-20 px-4 sm:px-6 lg:px-8 pt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <div className="max-w-7xl mx-auto">
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                variants={staggerContainer}
              >
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={scaleIn}
                      whileHover={{ 
                        y: -10, 
                        scale: 1.05,
                        transition: { duration: 0.3 }
                      }}
                      className="group relative bg-slate-900/80 backdrop-blur-xl rounded-xl p-6 shadow-2xl transition-all duration-500 border border-slate-800 hover:border-cyan-500/30 overflow-hidden cursor-pointer"
                    >
                      {/* Animated Glow Effect */}
                      <motion.div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 blur-xl`} />
                      </motion.div>

                      <div className="relative z-10">
                        <motion.div 
                          className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg`}
                          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <motion.div 
                          className="text-3xl font-bold text-white mb-2"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-sm text-slate-400 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.section>

          {/* Features Section with Hover Effects */}
          <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Offer</span>
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                  Discover a world of knowledge, connection, and growth
                </p>
              </motion.div>

              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
              >
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                    >
                      <Link
                        to={feature.link}
                        className="block"
                      >
                        <motion.div
                          className="group relative bg-slate-900/60 backdrop-blur-sm rounded-xl p-8 shadow-lg transition-all duration-500 border border-slate-800 hover:border-cyan-500/30 overflow-hidden cursor-pointer h-full"
                          whileHover={{ 
                            y: -10,
                            boxShadow: '0 20px 40px rgba(6, 182, 212, 0.2)'
                          }}
                        >
                          {/* Animated Background Gradient */}
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100"
                            initial={{ scale: 0, rotate: 0 }}
                            whileHover={{ scale: 1, rotate: 5 }}
                            transition={{ duration: 0.5 }}
                          />

                          <div className="relative z-10">
                            <motion.div 
                              className="inline-flex p-3 rounded-xl bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 mb-5 shadow-lg"
                              whileHover={{ 
                                rotate: [0, -15, 15, -15, 0],
                                scale: 1.1 
                              }}
                              transition={{ duration: 0.6 }}
                            >
                              <Icon className="w-7 h-7 text-cyan-400" />
                            </motion.div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-500">
                              {feature.title}
                            </h3>
                            <p className="text-sm text-slate-400 leading-relaxed mb-4 group-hover:text-slate-300 transition-colors duration-300">
                              {feature.description}
                            </p>
                            <motion.div 
                              className="flex items-center text-cyan-400 font-semibold text-sm"
                              initial={{ x: 0 }}
                              whileHover={{ x: 5 }}
                            >
                              Learn more
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </motion.div>
                          </div>

                          {/* Hover border effect */}
                          <motion.div 
                            className="absolute inset-0 border-2 border-cyan-500/0 group-hover:border-cyan-500/30 rounded-xl pointer-events-none"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                          />
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Featured Blogs Section */}
          <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                className="flex justify-between items-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div>
                  <h2 className="text-4xl font-bold text-white mb-2">
                    Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Insights</span>
                  </h2>
                  <p className="text-slate-400">
                    From our community of researchers
                  </p>
                </div>
                <motion.div
                  whileHover={{ x: 5 }}
                >
                  <Link
                    to={`${SANGYAN_CONFIG.basePath}/blogs`}
                    className="hidden md:flex items-center gap-2 text-cyan-400 font-semibold group"
                  >
                    View all blogs
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
              >
                {featuredBlogs.map((blog) => (
                  <motion.div 
                    key={blog.id}
                    variants={fadeInUp}
                    whileHover={{ y: -10 }}
                  >
                    <BlogCard blog={blog} />
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-8 md:hidden text-center">
                <Link
                  to={`${SANGYAN_CONFIG.basePath}/blogs`}
                  className="inline-flex items-center gap-2 text-cyan-400 font-semibold"
                >
                  View all blogs
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Upcoming Events Section */}
          <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                className="flex justify-between items-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div>
                  <h2 className="text-4xl font-bold text-white mb-2">
                    Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Events</span>
                  </h2>
                  <p className="text-slate-400">
                    Join our talks, workshops, and community sessions
                  </p>
                </div>
                <motion.div
                  whileHover={{ x: 5 }}
                >
                  <Link
                    to={`${SANGYAN_CONFIG.basePath}/events`}
                    className="hidden md:flex items-center gap-2 text-cyan-400 font-semibold group"
                  >
                    View all events
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div 
                className="grid md:grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
              >
                {upcomingEvents.map((event, index) => (
                  <motion.div 
                    key={event.id}
                    variants={index === 0 ? fadeInLeft : fadeInRight}
                    whileHover={{ y: -10 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-8 md:hidden text-center">
                <Link
                  to={`${SANGYAN_CONFIG.basePath}/events`}
                  className="inline-flex items-center gap-2 text-cyan-400 font-semibold"
                >
                  View all events
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Newsletter Section */}
          <AnimatedSection>
            <Newsletter />
          </AnimatedSection>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SangyanHome;
