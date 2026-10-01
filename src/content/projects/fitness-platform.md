---
title: Fitness Platform
description: A platform where fitness professionals build standardized assessments, share them with participants, and get scored reports back automatically.
order: 1
stack: [Next.js, React, MariaDB, TypeScript, Prisma, Tailwind CSS, Better-Auth]
role: Full-stack developer (2-person team)
type: Web app + PWA, deployed on Plesk via GitHub Actions
timeline: Nov 2025 – present
---

## The problem

Our client runs standardized fitness and wellbeing assessments: handgrip strength, sit-and-reach,
balance, VO₂max on a cycle ergometer, and psychological scales like POMS-SF and Flourishing. Each
one has its own scoring rules, and before this project they were all worked out by hand.

That caused a chain of smaller problems. There was no history per participant, so tracking progress
meant digging through old sheets. There was no clean way to share a test with a group for a set
period. And participants typed their age, weight, and height again for every single test.

## What we built

A web app, also installable as a PWA, with two sides to it.

- **Admins** build questionnaires from ready-made assessment templates or from scratch: sections,
  four question types, validation and scoring rules, drag-and-drop ordering. They then share them
  with users or groups for a fixed time window.
- **Participants** fill them in from any device and are notified by email, push, or in-app.

Scores are calculated as soon as a questionnaire is submitted. Admins get per-sheet and per-folder
reports, PDF exports, and trend charts that show how each participant changes over repeated
sessions. Access is role-based (user, admin, developer), built on Better Auth.

## Decisions worth explaining

**One folder per feature.** Each domain (questionnaires, shares, reports, notifications and so on)
lives in `src/features/<name>/` with its own actions, components, and logic, while route files only
wire things together. With twelve domains, this is what keeps a change to reports from leaking into
sharing.

**Logic in services, not in route handlers.** Business logic used to sit inside API routes. Moving
it into services such as `section.service.ts` let Server Actions and REST endpoints share the same
code instead of slowly drifting apart.

**Typed JSON instead of a table per template.** Every assessment needs a differently shaped
configuration. Storing it as JSON means adding a template doesn't require a migration, and
`prisma-json-types-generator` keeps those columns typed, so the compiler still catches mistakes.

**Asking for profile data only once.** We noticed the same four questions (age, sex, weight,
height) showed up in almost every template. So we added a dedicated `PROFILE` section whose
questions map straight to fields on the user. The app adds or removes them depending on which
calculations a questionnaire actually uses, and prefills them with the latest values next time.
Participants can still correct them if something changed.

## The hard parts

**No two formulas are alike.** This was the main source of complexity. The answer was to make each
template a self-contained module that declares its own questions and calculations, while storage
and reporting stay shared. Adding a new assessment now means writing one new module.

**Major upgrades.** Moving TypeScript, pdfjs, and react-email up a major version each meant doing
the minor bumps first, then one major at a time, and fixing breaking changes along the way. For
example, pdfjs's `getDocument` now expects a `{ url }` object.

**Editing on a phone.** The question editors were unusable on small screens at first. We collapsed
them into compact rows with a layout built specifically for mobile.

## How we work

TypeScript runs in strict mode, and type checks, Oxlint, and Oxfmt run on every commit through Husky.
The same Zod schemas validate both forms and server actions. Commits follow Conventional Commits, an
AI reviewer comments on each pull request, and deploys to Plesk go through a manually triggered
GitHub Action that also drafts a changelog. For recursive folder queries we use typed raw SQL
through Prisma.

## Outcome

Scoring is now automatic for eight standardized assessments, each participant has a single source
of profile data that follows them across questionnaires, and admins can see progress over time
instead of reconstructing it by hand. Adding a new kind of assessment is a contained piece of work
rather than a change across the codebase.
