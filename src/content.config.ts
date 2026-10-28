// Blog articles are Markdown files: src/content/blog/<slug>.md (how to write one: _CARA-MENULIS.md there).
import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const CATEGORIES = ['Panduan', 'Cerita brand', 'Update Belli'] as const;

const schema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.enum(CATEGORIES),
    date: z.coerce.date(),
    author: z.string().default('Iqbal Hamdani'),
    cover: image().optional(),
    featured: z.boolean().default(false),
    // Example products shown after the article, as in the design ("Contoh produk yang dipasang di dalam artikel").
    products: z.array(z.object({ name: z.string(), meta: z.string().optional(), price: z.string().optional(), image: image().optional() })).default([]),
    productsCaption: z.string().optional(),
  });

// Files starting with "_" are notes, not articles.
const blog = defineCollection({ loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }), schema });

export const collections = { blog };
