'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

interface Skill {
  icon: React.ReactNode;
  name: string;
}

interface IconCloudProps {
  skills: Skill[];
}

export function IconCloud({ skills }: IconCloudProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  // Update dimensions on mount and window resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden rounded-xl bg-gradient-to-br from-background/50 to-background/10 border border-border/50"
    >
      {dimensions.width > 0 &&
        skills.map((skill, index) => (
          <FloatingIcon
            key={index}
            skill={skill}
            containerDimensions={dimensions}
            index={index}
            totalIcons={skills.length}
            isHovered={hoveredSkill === index}
            onHover={() => setHoveredSkill(index)}
            onLeave={() => setHoveredSkill(null)}
          />
        ))}
    </div>
  );
}

function FloatingIcon({
  skill,
  containerDimensions,
  index,
  totalIcons,
  isHovered,
  onHover,
  onLeave,
}: {
  skill: Skill;
  containerDimensions: { width: number; height: number };
  index: number;
  totalIcons: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Calculate initial position based on index
  useEffect(() => {
    // Distribute icons across the container
    const angle = (index / totalIcons) * Math.PI * 2;
    const radius = Math.min(containerDimensions.width, containerDimensions.height) * 0.35;

    const centerX = containerDimensions.width / 2;
    const centerY = containerDimensions.height / 2;

    const startX = centerX + radius * Math.cos(angle);
    const startY = centerY + radius * Math.sin(angle);

    x.set(startX);
    y.set(startY);

    // Start floating animation
    const floatAnimation = () => {
      const randomX = (Math.random() - 0.5) * 50;
      const randomY = (Math.random() - 0.5) * 50;
      const duration = 3 + Math.random() * 5;

      controls.start({
        x: startX + randomX,
        y: startY + randomY,
        transition: {
          duration,
          ease: 'easeInOut',
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
        },
      });
    };

    floatAnimation();
  }, [containerDimensions, index, totalIcons, controls, x, y]);

  return (
    <motion.div
      className="absolute"
      style={{ x, y }}
      animate={controls}
      whileHover={{ scale: 1.2 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="relative">
        <div className={`transition-all duration-300 ${isHovered ? 'scale-100' : ''}`}>
          {skill.icon}
        </div>

        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-md shadow-lg text-xs whitespace-nowrap"
          >
            {skill.name}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
