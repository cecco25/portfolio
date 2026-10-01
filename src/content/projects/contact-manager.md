---
title: Newsletter Contact Manager
description: An internal tool that finds the people sales agents know who aren't yet on the company newsletter, lets them tidy up the list, and sends it straight to Mailchimp.
order: 3
stack: [Laravel, React, MySQL, Inertia, TypeScript, Mailchimp, Tailwind CSS, Shadcn UI, Google]
role: Full-stack developer (2-person team)
type: Internal web app for a sales team
timeline: Apr – Aug 2025
---

## The problem

Our client is a company whose sales agents keep their customers and prospects in their Google
contacts. Marketing runs the newsletter from Mailchimp, and the official customer
list lives in the company ERP. These three never talked to each other.

Growing the newsletter meant someone exporting CSVs from three places and comparing email
addresses by hand: who is already subscribed, who unsubscribed and must not be added back, who is
already a customer in the ERP. It was slow and easy to get wrong, and getting it wrong with
unsubscribed people is exactly the kind of mistake you can't afford.

## What we built

A web app where each agent signs in, connects their Google account once, and gets a list of
contacts that are **genuinely new**: not in Mailchimp in any state, not already in the ERP under
their name, and not on their personal "never add" list.

From there the list opens in a spreadsheet-like editor. Agents fix names, fill in the company,
sector, type, and region, apply changes to many rows at once, and send each contact to Mailchimp
with the right tags. Their own name is attached as the agent tag, so marketing knows who each
subscriber belongs to.

There are three roles. **Agents** work their own contacts. **Editors** look after ERP records no
agent covers, such as suppliers or customers without an assigned salesperson. **Admins** create
users and manage settings.

## Decisions worth explaining

**Keeping Mailchimp in our own database.** Comparing against Mailchimp live on every request would
have meant paging through the whole audience each time. Instead, a scheduled command copies the
audience into the database twice a day, a hundred members at a time. It saves its progress as it
goes, so an interrupted sync resumes where it stopped, and it restarts from scratch if the audience
size changed in the meantime. Contacts added from the app are also written locally straight away,
so they don't show up as "new" again before the next sync.

**Reading the ERP from where it already was.** The ERP already dropped a CSV export on an FTP server, so rather than asking for an integration that didn't exist, the app reads that CSV through
Laravel's filesystem layer. It cleans the data on the way in: `NULL` emails are skipped, phone
numbers fall back across three columns, and each record is matched to its agent by name.

**Google access that keeps working.** Agents grant read-only access to their contacts and "other
contacts" (the people Gmail remembers from past emails) with offline access. The app stores the
refresh token and renews the access token quietly when it expires. If Google revokes it, the tokens
are cleared and the agent is asked to reconnect instead of seeing an error.

**Inertia instead of an API.** Laravel controllers render React pages directly, so routing, auth,
and validation stay on the server, while the editor gets the interactivity of a React app. For a
small internal tool, not maintaining a separate API was a big saving.

## The hard parts

**Matching people across systems.** The same person can appear with different capitalisation, in
several Mailchimp states, or in the ERP under a slightly different agent name. Every comparison
normalises emails to lowercase, and the "new" check excludes anyone who was ever cleaned,
subscribed, or unsubscribed, so a person who opted out is never added back.

**Mapping to Mailchimp's model.** Agent, sector, type, and region are Mailchimp interest groups,
not plain fields. The app reads the groups from Mailchimp and matches the agent's name to the right
one, and it refuses to send a contact whose agent doesn't match, instead of creating a subscriber
nobody owns.

**Moving away from files.** The first version had agents download a CSV, edit it, and upload it to
Mailchimp themselves. Once the direct Mailchimp integration was ready, we removed that round trip.
Contacts now go from the editor to Mailchimp in one click.

## Outcome

Finding new newsletter contacts went from a manual three-way comparison of spreadsheets to a list
that is ready when the agent opens the app. Unsubscribed people are filtered out by design, every
subscriber arrives tagged with the right agent and segment, and contacts no agent covers have a
clear owner in the editor role.
