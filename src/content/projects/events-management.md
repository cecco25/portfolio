---
title: Nightclub Ticketing
description: A distributed system where a club publishes events, sells tickets online, and checks guests in at the door by scanning a QR code.
order: 4
kind: university
stack: [Spring Boot, Astro.js, PostgreSQL, RabbitMQ, Vue, Stripe, Docker, Traefik]
role: Full-stack developer (2-person team)
type: University project · Parallel and Distributed Systems
timeline: Apr – May 2026
---

## The brief

This was our project for the Parallel and Distributed Systems course. The task was to build a
system that runs like it would in production, spread across separate services, and to actually
use the ideas from the course: asynchronous messaging, consistency under concurrent access, and
services that don't care where the others are running.

We picked a nightclub because it covers a lot in a small space. The club publishes events, people
buy tickets online, and on the night someone at the door has to tell a valid ticket from a
screenshot that has already been used.

## What we built

Two kinds of users, one system.

- **Guests** browse upcoming events, sign up, and buy a ticket through Stripe Checkout (in test
  mode). Shortly after paying, a QR code for the ticket appears in their account.
- **Admins** manage events, ticket types, prices, and sale windows, follow purchases from a
  dashboard, and check guests in by pointing their phone's camera at the QR code.

The whole thing starts with a single `docker compose up`: Traefik in front, terminating HTTPS and
sending `/api` to the backend and everything else to the frontend, then a Spring Boot API, an
Astro frontend with Vue islands, PostgreSQL, and RabbitMQ.

## How it fits together

```
Browser ──HTTPS──▶ Traefik ──/api──▶ Spring Boot ──▶ PostgreSQL
                      │                  │   ▲
                      └──/──▶ Astro      ▼   │
                                       RabbitMQ
Stripe ──webhook──▶ Spring Boot
```

**A purchase, step by step.** When a guest clicks "Buy", the API creates a Stripe Checkout session
and saves the purchase as pending. Stripe then calls our webhook, whose signature we verify, and
the purchase is confirmed: stock goes down and a `purchase.confirmed` message is published to
RabbitMQ. A consumer picks it up and generates the QR code. Stripe is the payment authority, our
database is the ticket authority, and the message in between means slow work like image
generation never holds up the payment response.

**When things go wrong.** Stripe can deliver the same webhook more than once, so confirming an
already-completed purchase does nothing. If generating the QR code keeps failing, the message isn't
lost: the queue sends it to a dead-letter queue, where it waits for someone to look at it.

## The interesting part: one ticket, two phones

The case we cared about most was two staff members scanning the same QR code at almost the same
moment. Without protection, both requests would read "not validated yet" and both would let the
guest in.

Validation therefore loads the purchase with a **pessimistic write lock** (`SELECT … FOR UPDATE`
under JPA). The second request waits for the first transaction to commit, then sees that the ticket
has a validation time and gets back `409 Conflict`. The scanner shows "Already validated — entry
denied". A `ticket.validated` event is published afterwards for anything that needs to react to it.

We tested it the obvious way: two phones, one QR code, scanning together.

## Security

The API is stateless and uses JWTs. Spring Security decides who can do what per route and HTTP
method, so anyone can browse events, but only admins can create them or validate tickets. On the
frontend, Astro middleware reads the token and role from cookies, redirects people away from pages
they can't use, and clears tokens that have expired.

## What I'd do differently

The lock protects check-in, but not stock. Lowering the available quantity on confirmation is a
plain read-then-write, so two payments landing at exactly the same time for the last ticket could
both succeed. A conditional update (`… SET quantity = quantity - 1 WHERE quantity > 0`) or the same
row lock would close that gap. I'd also deduct stock when the checkout session is created rather
than only after payment, so guests can't pay for a ticket that has already sold out.

## Outcome

A working distributed system that runs from one command and shows the course ideas in practice:
messaging between services, idempotent webhooks, a dead-letter queue for failures, and a lock that
stops a ticket from being used twice. Building it also showed us how much of "distributed" is
really about deciding which part of the system is the source of truth for each piece of data.
