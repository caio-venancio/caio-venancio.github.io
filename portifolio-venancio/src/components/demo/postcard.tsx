// src/components/PostCard.tsx
import Link from "next/link";

type Topic = { id: string; title: string; summary?: string };
type PostMeta = {
  title: string;
  slug: string;
  topics: Topic[];
  featuredTopicIds?: string[];
};

export default function PostCard({ post }: { post: PostMeta }) {
  const featured = (post.featuredTopicIds ?? [])
    .map(id => post.topics.find(t => t.id === id))
    .filter(Boolean) as Topic[];

  return (
    <article className="rounded-2xl border p-4">
      <h3 className="text-xl font-semibold">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>

      <ul className="mt-3 space-y-2">
        {featured.map(t => (
          <li key={t.id}>
            <Link
              href={`/blog/${post.slug}#${t.id}`}
              className="underline underline-offset-2"
            >
              {t.title}
            </Link>
            {t.summary && <p className="text-sm text-muted-foreground">{t.summary}</p>}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <Link href={`/blog/${post.slug}`} className="text-sm underline">
          Ver todos os tópicos →
        </Link>
      </div>
    </article>
  );
}
