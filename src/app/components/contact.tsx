'use client';

import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Send, Github, Linkedin, AlertCircle, CheckCheck } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [emailResponse, setEmailResponse] = useState<{ message: string; success: boolean } | null>(
    null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setEmailResponse({ success: false, message: 'Please fill in all fields.' });
      return;
    }
    setLoading(true);
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formState.name,
          from_email: formState.email,
          message: formState.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        setLoading(false);
        setEmailResponse({ success: true, message: 'Message sent successfully!' });
        setFormState({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        setLoading(false);
        console.error('EmailJS error:', error);
        setEmailResponse({ success: false, message: 'Failed to send message. Please try again.' });
      });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: 'Email',
      value: 'cecchinimichael.code@gmail.com',
      href: 'mailto:nome.cognome@example.com',
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: 'Location',
      value: 'Città di Castello, Italy',
      href: 'https://maps.google.com/?q=Città+di+castello,Italy',
    },
  ];

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: 'https://github.com/cecco25',
      label: 'GitHub',
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: 'https://linkedin.com/in/michael-cecchini-747818353',
      label: 'LinkedIn',
    },
  ];

  return (
    <div ref={ref} className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-8">
            <p className="text-lg text-muted-foreground">
              Feel free to contact me for any work or suggestions. I&apos;m always open to
              discussing new projects, creative ideas.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group text-sm"
                  >
                    <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{item.label}</h3>
                      <p className="text-muted-foreground">{item.value}</p>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-card hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Card className="overflow-hidden border-border/50 shadow-lg">
              {emailResponse &&
                (emailResponse.success ? (
                  <Alert className="w-[90%] mx-auto">
                    <CheckCheck className="h-4 w-4" />
                    <AlertTitle>Email Sent!</AlertTitle>
                    <AlertDescription>{emailResponse.message}</AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="destructive" className="w-[90%] mx-auto">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{emailResponse.message}</AlertDescription>
                  </Alert>
                ))}
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message"
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    <Send className="h-4 w-4 mr-2" />
                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
