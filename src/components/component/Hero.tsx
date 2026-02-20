import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import hero from '../../assets/img/hero-img.jpg';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-gray-100 blur-3xl" />
        <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-gray-100 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-150 w-150 rounded-full bg-linear-to-r from-gray-50 to-gray-100 blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center">
          {/* Animated content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-4xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50/80 px-4 py-1.5 text-sm text-gray-600 backdrop-blur-sm"
            >
              <span className="flex h-2 w-2 items-center rounded-full bg-green-500">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-5" />
              </span>
              Real-time crypto tracking
              <ChevronRight className="size-4" />
            </motion.div>

            {/* Main heading */}
            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              Track your Crypto Portfolio{' '}
              <span className="bg-linear-to-r from-gray-700 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                with Precision
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-500 md:text-xl"
            >
              Real-time market data and performance insights at your fingertips.{' '}
              Make informed decisions about your investments with clear, actionable analytics.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <Button
                size="lg"
                className="group bg-gray-900 px-8 text-white hover:bg-gray-800"
                asChild
              >
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-200 px-8 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                asChild
              >
                <Link to="/login">
                  Learn more
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="mt-12 w-full max-w-5xl"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-gray-200/50">
              {/* linear overlay */}
              <div className="absolute inset-0 z-10 bg-linear-to-t from-gray-900/20 via-transparent to-transparent" />
              
              <img
                src={hero}
                alt="Vaultly Dashboard"
                className="w-full object-cover"
              />
              
              {/* Decorative border */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-gray-200/50" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
