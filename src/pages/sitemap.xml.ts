// sitemap.xml: the fixed pages plus every blog post. URLs end in "/" to match the canonical tags.
// ponytail: fixed list, add a new page here when you create one under src/pages.
import type { APIRoute } from 'astro';
import { getPosts } from '../lib/blog';

const PAGES = ['/', '/blog/', '/kontak/', '/kebijakan-privasi/', '/syarat-ketentuan/'];

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
  const urls = [
    ...PAGES.map((path) => ({ path, lastmod: undefined as Date | undefined })),
    ...posts.map((post) => ({ path: `/blog/${post.id}/`, lastmod: post.data.date })),
  ];
  const body = urls
    .map(({ path, lastmod }) => `  <url><loc>${new URL(path, site)}</loc>${lastmod ? `<lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : ''}</url>`)
    .join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
