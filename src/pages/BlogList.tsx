import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Search, Filter, TrendingUp, Clock, Eye, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import Newsletter from '../components/Newsletter';
import { SANGYAN_CONFIG } from '../config/sangyan.config';
import { Blog } from '../types';

// Mock data - replace with actual API call
const mockBlogs: Blog[] = [
  {
    id: '1',
    title: 'Quantum Entanglement: Bridging the Gap Between Theory and Application',
    slug: 'quantum-entanglement-theory-application',
    author: {
      name: 'Dr. Priya Sharma',
      institute: 'IISER Pune',
      avatar: ''
    },
    category: 'Physics',
    tags: ['quantum-mechanics', 'entanglement', 'quantum-computing'],
    excerpt: 'Exploring the fascinating world of quantum entanglement and its potential applications in quantum computing, cryptography, and communication.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
    publishedAt: '2025-10-01',
    readTime: 12,
    views: 1250,
    likes: 89,
    featured: true
  },
  {
    id: '2',
    title: 'CRISPR-Cas9: The Future of Genetic Engineering',
    slug: 'crispr-cas9-genetic-engineering',
    author: {
      name: 'Rajesh Kumar',
      institute: 'IISc Bangalore',
      avatar: ''
    },
    category: 'Biology',
    tags: ['genetics', 'crispr', 'biotechnology'],
    excerpt: 'A comprehensive look at CRISPR-Cas9 technology, its mechanisms, applications, and ethical considerations in modern genetic engineering.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800',
    publishedAt: '2025-09-28',
    readTime: 15,
    views: 2100,
    likes: 156,
    featured: false
  },
  {
    id: '3',
    title: 'Machine Learning in Climate Science: Predicting Our Future',
    slug: 'machine-learning-climate-science',
    author: {
      name: 'Ananya Desai',
      institute: 'IISER Kolkata',
      avatar: ''
    },
    category: 'Interdisciplinary',
    tags: ['machine-learning', 'climate-change', 'data-science'],
    excerpt: 'How artificial intelligence and machine learning algorithms are revolutionizing climate modeling and helping us understand global warming patterns.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    publishedAt: '2025-09-25',
    readTime: 10,
    views: 1800,
    likes: 142,
    featured: false
  },
  {
    id: '4',
    title: 'Topology in Modern Mathematics: Beyond Euclidean Geometry',
    slug: 'topology-modern-mathematics',
    author: {
      name: 'Prof. Vikram Singh',
      institute: 'IIT Delhi',
      avatar: ''
    },
    category: 'Mathematics',
    tags: ['topology', 'geometry', 'pure-mathematics'],
    excerpt: 'An introduction to topological spaces, continuity, and how topology is reshaping our understanding of mathematical structures.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800',
    publishedAt: '2025-09-20',
    readTime: 18,
    views: 950,
    likes: 78,
    featured: false
  },
  {
    id: '5',
    title: 'Green Chemistry: Sustainable Solutions for a Better Tomorrow',
    slug: 'green-chemistry-sustainable-solutions',
    author: {
      name: 'Meera Patel',
      institute: 'IISER Berhampur',
      avatar: ''
    },
    category: 'Chemistry',
    tags: ['green-chemistry', 'sustainability', 'environment'],
    excerpt: 'Exploring innovative approaches in green chemistry that minimize environmental impact while maximizing efficiency in chemical processes.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
    publishedAt: '2025-09-15',
    readTime: 8,
    views: 1400,
    likes: 112,
    featured: false
  },
  {
    id: '6',
    title: 'Plate Tectonics and Earthquake Prediction: Current Research',
    slug: 'plate-tectonics-earthquake-prediction',
    author: {
      name: 'Dr. Arun Menon',
      institute: 'NISER Bhubaneswar',
      avatar: ''
    },
    category: 'Earth Sciences',
    tags: ['geology', 'earthquakes', 'seismology'],
    excerpt: 'Understanding the movement of Earth\'s tectonic plates and the latest developments in earthquake prediction technologies.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800',
    publishedAt: '2025-09-10',
    readTime: 14,
    views: 1100,
    likes: 94,
    featured: false
  }
];

const categories = ['All', 'Physics', 'Chemistry', 'Biology', 'Mathematics', 'Earth Sciences', 'Computer Science', 'Interdisciplinary'];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
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

const BlogList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');

  const filteredBlogs = mockBlogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Hero Section */}
      <motion.section 
        className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Background Blobs */}
        <motion.div 
          className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div 
          className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 1
          }}
        />

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span 
              className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold mb-6"
              whileHover={{ scale: 1.05 }}
            >
              Research & Insights
            </motion.span>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Research Blogs</span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Dive into cutting-edge research articles written by students and faculty from leading institutes
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:bg-slate-900 transition-all backdrop-blur-sm"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Filters Section */}
      <section className="sticky top-16 z-40 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Categories */}
            <motion.div 
              className="flex flex-wrap gap-2 items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                      : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>

            {/* Sort Options */}
            <motion.div 
              className="flex gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                onClick={() => setSortBy('recent')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  sortBy === 'recent' ? 'bg-cyan-600 text-white' : 'bg-slate-800/50 text-slate-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Clock className="w-4 h-4" />
                Recent
              </motion.button>
              <motion.button
                onClick={() => setSortBy('popular')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  sortBy === 'popular' ? 'bg-cyan-600 text-white' : 'bg-slate-800/50 text-slate-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="w-4 h-4" />
                Popular
              </motion.button>
              <motion.button
                onClick={() => setSortBy('trending')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  sortBy === 'trending' ? 'bg-cyan-600 text-white' : 'bg-slate-800/50 text-slate-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <TrendingUp className="w-4 h-4" />
                Trending
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </motion.div>

          {filteredBlogs.length === 0 && (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No blogs found</h3>
              <p className="text-slate-400">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      <Footer />
    </div>
  );
};

export default BlogList;
