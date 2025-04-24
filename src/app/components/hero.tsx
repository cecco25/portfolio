'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary via-primary/50 to-primary/20 opacity-75 blur-xl"></div>
        <h1 className="relative text-5xl md:text-7xl font-bold tracking-tight">Michael Cecchini</h1>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-6 text-xl md:text-2xl text-muted-foreground"
      >
        Web Developer & Programmer
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-10 flex flex-wrap gap-4 justify-center"
      >
        <Button asChild size="lg" className="rounded-full">
          <a href="#projects">View My Works</a>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full">
          <a href="#contact">Contact Me</a>
        </Button>
      </motion.div>
    </div>
  );
}
