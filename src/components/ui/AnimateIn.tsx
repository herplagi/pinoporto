'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimateInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'span';
}

export default function AnimateIn({ 
  children, 
  delay = 0, 
  className = '',
  as = 'div'
}: AnimateInProps) {
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </Component>
  );
}
