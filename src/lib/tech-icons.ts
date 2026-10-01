import iconAstro from "simple-icons/icons/astro.svg?raw";
import iconBetterAuth from "simple-icons/icons/betterauth.svg?raw";
import iconInertia from "simple-icons/icons/inertia.svg?raw";
import iconLaravel from "simple-icons/icons/laravel.svg?raw";
import iconLeaflet from "simple-icons/icons/leaflet.svg?raw";
import iconMariadb from "simple-icons/icons/mariadb.svg?raw";
import iconMysql from "simple-icons/icons/mysql.svg?raw";
import iconNextjs from "simple-icons/icons/nextdotjs.svg?raw";
import iconPostgresql from "simple-icons/icons/postgresql.svg?raw";
import iconPrisma from "simple-icons/icons/prisma.svg?raw";
import iconReact from "simple-icons/icons/react.svg?raw";
import iconShadcn from "simple-icons/icons/shadcnui.svg?raw";
import iconSpringBoot from "simple-icons/icons/springboot.svg?raw";
import iconTailwind from "simple-icons/icons/tailwindcss.svg?raw";
import iconTypescript from "simple-icons/icons/typescript.svg?raw";
import iconDocker from "simple-icons/icons/docker.svg?raw";
import iconRabbitmq from "simple-icons/icons/rabbitmq.svg?raw";
import iconStripe from "simple-icons/icons/stripe.svg?raw";
import iconTraefik from "simple-icons/icons/traefikproxy.svg?raw";
import iconVue from "simple-icons/icons/vuedotjs.svg?raw";
import iconGoogle from "simple-icons/icons/google.svg?raw";
import iconMailchimp from "simple-icons/icons/mailchimp.svg?raw";

const stripTitle = (svg: string) =>
  svg.replace(/<title>.*?<\/title>/, "").replace('role="img"', 'aria-hidden="true"');

export const techIcons: Record<string, string> = {
  "Next.js": stripTitle(iconNextjs),
  "Better-Auth": stripTitle(iconBetterAuth),
  PostgreSQL: stripTitle(iconPostgresql),
  MySQL: stripTitle(iconMysql),
  MariaDB: stripTitle(iconMariadb),
  TypeScript: stripTitle(iconTypescript),
  "Tailwind CSS": stripTitle(iconTailwind),
  Prisma: stripTitle(iconPrisma),
  Laravel: stripTitle(iconLaravel),
  Leaflet: stripTitle(iconLeaflet),
  React: stripTitle(iconReact),
  Inertia: stripTitle(iconInertia),
  "Shadcn UI": stripTitle(iconShadcn),
  "Spring Boot": stripTitle(iconSpringBoot),
  "Astro.js": stripTitle(iconAstro),
  RabbitMQ: stripTitle(iconRabbitmq),
  Vue: stripTitle(iconVue),
  Stripe: stripTitle(iconStripe),
  Docker: stripTitle(iconDocker),
  Traefik: stripTitle(iconTraefik),
  Mailchimp: stripTitle(iconMailchimp),
  Google: stripTitle(iconGoogle),
};
