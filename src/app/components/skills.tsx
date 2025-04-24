'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import {
  Html5,
  Css3,
  Javascript,
  ReactLogo,
  Nextjs,
  Tailwind,
  Nodejs,
  Php,
  Mysql,
  Figma,
  Angular,
  Laravel,
} from './tech-icons';
import { IconCloud } from './icon-cloud';

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const frontendSkills = [
    { icon: <Html5 className="h-10 w-10" />, name: 'HTML5', level: 95 },
    { icon: <Css3 className="h-10 w-10" />, name: 'CSS3', level: 95 },
    { icon: <Javascript className="h-10 w-10" />, name: 'JavaScript', level: 80 },
    { icon: <ReactLogo className="h-10 w-10" />, name: 'React', level: 75 },
    { icon: <Nextjs className="h-10 w-10" />, name: 'Next.js', level: 70 },
    { icon: <Angular className="h-10 w-10" />, name: 'Angular', level: 65 },
    { icon: <Tailwind className="h-10 w-10" />, name: 'Tailwind CSS', level: 85 },
  ];

  const backendSkills = [
    { icon: <Nodejs className="h-10 w-10" />, name: 'Node.js', level: 65 },
    { icon: <Php className="h-10 w-10" />, name: 'PHP', level: 90 },
    { icon: <Laravel className="h-10 w-10" />, name: 'Laravel', level: 70 },
    { icon: <Mysql className="h-10 w-10" />, name: 'MySQL', level: 80 },
  ];

  const designSkills = [{ icon: <Figma className="h-10 w-10" />, name: 'Figma', level: 75 }];

  // Combine all skills for the icon cloud
  const allSkills = [...frontendSkills, ...backendSkills, ...designSkills];

  return (
    <div ref={ref} className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Skills</span>
        </h2>

        <div className="relative h-[550px] w-full mb-16">
          <IconCloud skills={allSkills} />
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SkillCategory title="Frontend" skills={frontendSkills} />
          <SkillCategory title="Backend" skills={backendSkills} />
          <SkillCategory title="Design" skills={designSkills} />
        </div> */}
      </motion.div>
    </div>
  );
}

// interface SkillCategoryProps {
//   title: string;
//   skills: { icon: JSX.Element; name: string; level: number }[];
// }

// function SkillCategory({ title, skills }: SkillCategoryProps) {
//   return (
//     <div className="space-y-4">
//       <h3 className="text-xl font-semibold">{title}</h3>
//       <div className="space-y-3">
//         {skills.map((skill, index) => (
//           <div key={index} className="space-y-1">
//             <div className="flex justify-between text-sm">
//               <span>{skill.name}</span>
//               <span className="text-muted-foreground">{skill.level}%</span>
//             </div>
//             <div className="w-full bg-muted rounded-full h-2">
//               <div
//                 className="bg-gradient-to-r from-primary to-primary/70 h-2 rounded-full"
//                 style={{ width: `${skill.level}%` }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
