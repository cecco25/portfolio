---
title: Parcel Delivery Platform
description: A platform where dispatchers plan delivery routes on a map and couriers scan, deliver, and sign off parcels from their phones.
order: 2
stack: [Next.js, React, MariaDB, TypeScript, Prisma, Leaflet, Shadcn UI, Better-Auth]
role: Full-stack developer (2-person team)
type: Web app + PWA for couriers in the field
timeline: Jun 2025 – present
---

## The problem

Our client delivers parcels for several carriers across a set of postal areas. Every morning
someone has to decide which courier takes which parcels and in what order, and during the day
everyone needs to know what has been delivered, what failed, and what has to go out again
tomorrow.

That job touches two very different kinds of user. Dispatchers sit at a desk and think in terms of
maps, areas, and routes. Couriers are on the street with a phone in one hand and a parcel in the
other, so anything that takes more than a couple of taps simply won't get used.

## What we built

A web app, installable on phones as a PWA, with a side for each of them.

- **Dispatchers** see every unassigned parcel on a map, grouped into clusters. They draw a shape
  around an area to drop all the parcels inside it into a route, assign the route to a courier,
  and optimize the stop order with one click. They also manage users, postal areas, and settings,
  and can follow everything that happens through an activity log.
- **Couriers** start their day, get their route, and work through it stop by stop. They scan
  barcodes with the phone camera (or type them in when a label is damaged), and for each parcel
  record a delivery, a failed attempt, or a new date. A delivery saves where the parcel was left
  (door, reception, a neighbour, a safe place) and the recipient's signature.

When the last parcel on a route is dealt with, the route closes itself. Access is split into three
roles (courier, admin, developer) with fine-grained permissions built on Better Auth.

## Decisions worth explaining

**Routes that build themselves.** Each courier has a list of postal codes they cover. When they
start the day, the app collects every pending parcel whose address falls in those codes and builds
their route for them. Admins can also switch on a mode where any parcel a courier scans goes
straight into that day's route, creating it if needed. Both behaviours are toggles in the settings,
because not every day works the same way.

**Optimizing the order, with a plan B.** Stop order comes from OSRM's trip service, starting at the
warehouse and finishing at the last delivery instead of looping back. Public routing servers can be
slow or unavailable, so requests have a timeout and retry with backoff. If OSRM still fails, or a
route has too many stops for it, we fall back to a nearest-neighbour ordering. Either way, the
result then goes through a 2-opt pass that untangles crossing paths. Finally, the app asks OSRM for
the real driving distance and time and stores them on the route.

**Permissions per action, not per page.** Every API route is wrapped in a small `withPermission`
helper that checks a specific action, such as `parcel: ['deliver']` or `route: ['start']`. Couriers
can deliver, fail, and reschedule parcels, but only admins can delete them or change settings. All
of these rules live in one file.

**A log of everything.** Every action, whether it's creating a parcel, assigning a route, or
delivering a package, is recorded with who did it and what it affected. Business details and
technical context (IP, user agent) are kept in separate fields, so the log answers both "what
happened to this parcel?" and "where did this request come from?".

## The hard parts

**Routing at scale.** The first version of the optimizer simply trusted the routing service. It
broke with long routes, long URLs, and the occasional bad response. It now checks that the returned
order still contains every parcel exactly once, switches to a compact encoding when the URL gets
too long, and always has a local fallback, so a courier never ends up without a route.

**Changing foundations mid-project.** Over its lifetime the project moved from Auth.js to Better
Auth, upgraded to Prisma 7 and TypeScript 6, and was reorganized into one folder per feature. The
largest change was adding a repository layer: database queries moved out of API routes and server
actions into repositories, business logic into services, and routes became thin wrappers. It was a
big refactor, but every later feature has been easier to build because of it.

**Designing for the street.** The courier screens were built for one hand and bad light: big touch
targets, a torch toggle on the scanner, a manual-entry fallback, and a scan history that shows which
codes have actually been saved.

## How we work

Two of us share the codebase, and every change goes through a pull request. TypeScript runs in
strict mode, Oxlint and Oxfmt run on every commit through Husky and lint-staged, and commits follow
Conventional Commits. Forms and API inputs are validated with the same Zod schemas, and the client
keeps data fresh with SWR.

## Outcome

Dispatchers plan a day's work on a map instead of a list, routes are built and ordered for them,
and couriers handle a delivery, a signature, or a reschedule in a few taps. Because every step is
logged, a question about a parcel can be answered from its history instead of a phone call.
