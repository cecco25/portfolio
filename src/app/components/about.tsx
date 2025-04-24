'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Code, Palette, BookOpen, Gamepad2, Music } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const interests = [
    { icon: <BookOpen className="h-6 w-6" />, label: 'Reading' },
    { icon: <Gamepad2 className="h-6 w-6" />, label: 'Gaming' },
    { icon: <Music className="h-6 w-6" />, label: 'Music' },
  ];

  const passions = [
    { icon: <Code className="h-6 w-6" />, label: 'Web Development' },
    { icon: <Palette className="h-6 w-6" />, label: 'UI/UX Design' },
    { icon: <GraduationCap className="h-6 w-6" />, label: 'Learning' },
  ];

  return (
    <div ref={ref} className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        <Card className="overflow-hidden border-none shadow-lg bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <p className="text-lg leading-relaxed mb-8">
              Hi everyone, I&apos;m Michael Cecchini and I&apos;m a student at university in Perugia
              (PG).
              <br />
              <br />I am passionate about IT and, in particular, Web development: Frontend and
              Backend. This passion for websites also allowed me to learn to use UI/UX Design tools.
              <br />
              <br />I am currently attending university to broaden my knowledge in the world of
              technology and IT.
              <br />
              <br />
              Finally, I also like reading, playing video games and the world of music.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">My Passions</h3>
                <div className="space-y-4">
                  {passions.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">{item.icon}</div>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">My Interests</h3>
                <div className="space-y-4">
                  {interests.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">{item.icon}</div>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
