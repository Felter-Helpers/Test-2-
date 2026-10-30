import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse } from 'yaml';

const time = z.string().regex(/^\d{2}:\d{2}$/, 'Use 24-hour "HH:MM"');

const dayHours = z.union([
  z.object({ closed: z.literal(true) }),
  z.object({ open: time, close: time }),
]);

const exception = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  closed: z.boolean().optional(),
  open: time.optional(),
  close: time.optional(),
  note: z.string().optional(),
});

const site = defineCollection({
  // The whole YAML file is a single entry with id "site".
  loader: file('src/content/data/site.yml', {
    parser: (text) => [{ id: 'site', ...parse(text) }],
  }),
  schema: z.object({
    shop: z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      logoText: z.string().min(1),
      address: z.object({
        street: z.string().min(1),
        city: z.string().min(1),
        region: z.string().min(1),
        postalCode: z.string().min(1),
      }),
      phone: z.string().min(1),
      email: z.string().email(),
    }),
    hours: z.object({
      timeZone: z.string().min(1),
      weekly: z.object({
        monday: dayHours,
        tuesday: dayHours,
        wednesday: dayHours,
        thursday: dayHours,
        friday: dayHours,
        saturday: dayHours,
        sunday: dayHours,
      }),
      exceptions: z.array(exception).default([]),
    }),
    banner: z.object({ active: z.boolean(), text: z.string() }).optional(),
    home: z.object({ offerCta: z.string(), contactCta: z.string() }),
    visit: z.object({ heading: z.string(), text: z.string(), linkLabel: z.string() }),
    offer: z.object({
      heading: z.string(),
      intro: z.string(),
      categories: z.array(
        z.object({
          name: z.string().min(1),
          description: z.string().min(1).max(160, 'Keep descriptions to about 140 characters'),
          image: z.string().min(1),
          alt: z.string().min(1, 'Alt text is required'),
        }),
      ),
    }),
    about: z.object({
      heading: z.string(),
      photo: z.string().min(1),
      photoAlt: z.string().min(1, 'Alt text is required'),
      story: z.array(z.string().min(1)).min(1),
      factsHeading: z.string(),
      facts: z.array(z.object({ label: z.string(), value: z.string() })),
      teamHeading: z.string(),
      team: z
        .array(
          z.object({
            name: z.string(),
            role: z.string(),
            bio: z.string(),
            photo: z.string().optional(),
            photoAlt: z.string().optional(),
          }),
        )
        .max(3)
        .refine((t) => t.every((p) => !p.photo || p.photoAlt), 'Team photos need photoAlt text'),
    }),
    contact: z.object({
      heading: z.string(),
      callLabel: z.string(),
      emailLabel: z.string(),
      directionsLabel: z.string(),
      hoursHeading: z.string(),
      upcomingHeading: z.string(),
      upcomingDays: z.number().int().positive().default(60),
    }),
    map: z.object({ buttonLabel: z.string(), consentNote: z.string() }),
    form: z.object({
      heading: z.string(),
      accessKey: z.string(),
      subject: z.string(),
      nameLabel: z.string(),
      emailLabel: z.string(),
      messageLabel: z.string(),
      submitLabel: z.string(),
      sendingLabel: z.string(),
      successMessage: z.string(),
      errorMessage: z.string(),
      notConnectedMessage: z.string(),
    }),
    testimonials: z.object({
      heading: z.string(),
      items: z
        .array(z.object({ quote: z.string(), author: z.string(), relation: z.string().optional() }))
        .max(3),
    }),
  }),
});

export const collections = { site };
