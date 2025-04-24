'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  githubLink: string;
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const projects = [
    {
      title: 'E-Learning Platform',
      description:
        'A complete e-learning platform with courses, modules and non-skippable video lessons.',
      image: 'e-learning.png?height=400&width=600',
      tags: ['Laravel', 'React', 'Tailwind CSS', 'MySQL'],
      demoLink: 'https://formazione.maspoint.it/dashboard',
      githubLink: '',
    },
    {
      title: 'Nightwave',
      description:
        'Web platform designed for nightclubs to publish events, sell tickets, and engage with their audience.',
      image: 'nightwave.png',
      tags: ['Laravel', 'React', 'Tailwind CSS', 'MySQL'],
      demoLink: '',
      githubLink: '',
    },
    {
      title: 'Scalogna Quest',
      description:
        'A remake of Heroquest where players try to be the first to get out of dungeons.',
      image: 'scalogna-quest.svg?height=400&width=600',
      tags: ['C'],
      demoLink: '',
      githubLink: 'https://github.com/cecco25/scalogna-quest',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div ref={ref} className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Projects</span>
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={item}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 h-full flex flex-col">
      <div className="overflow-hidden">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={project.image || '/placeholder.svg'}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      </div>
      <CardContent className="pt-6 flex-grow">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 pb-4">
        {project.demoLink ? (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink size={16} />
            <span>Live Demo</span>
          </a>
        ) : null}
        {project.githubLink ? (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={16} />
            <span>Source Code</span>
          </a>
        ) : null}
      </CardFooter>
    </Card>
  );
}
