// Blog data and helpers shared by /blog and /blog/[slug].
import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

// Newest first.
export async function getPosts(): Promise<Post[]> {
  return (await getCollection('blog')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const categoryStyle: Record<string, string> = {
  Panduan: 'bg-accent text-primary-hover',
  'Cerita brand': 'bg-[#FFF4D6] text-[#7A4B00]',
  'Update Belli': 'bg-success-bg text-success',
};
export const catKey = (category: string) => category.toLowerCase().replace(/\s+/g, '-');

export const AUTHORS: Record<string, { role: string; bio: string; linkedin?: string }> = {
  'Iqbal Hamdani': {
    role: 'Pembuat Belli',
    bio: '10+ tahun membangun website dan sistem, sekarang untuk perusahaan SaaS global. Standar yang sama saya pakai di Belli.',
    linkedin: 'https://www.linkedin.com/in/iqbalhamdani/',
  },
};
export const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

// About 200 words a minute.
export const readTime = (post: Post) => Math.max(1, Math.ceil((post.body ?? '').split(/\s+/).filter(Boolean).length / 200)) + ' menit';

const dateFmt = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
export const formatDate = (d: Date) => dateFmt.format(d);
