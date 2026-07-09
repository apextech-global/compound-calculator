import Link from "next/link";

export type RelatedGuideLink = {
  slug: string;
  title: string;
  description?: string;
};

type RelatedGuidesProps = {
  locale: string;
  currentSlug: string;
  category?: string;
  heading: string;
  description?: string;
  links: RelatedGuideLink[];
  maxLinks?: number;
};

export default function RelatedGuides({
  locale,
  currentSlug,
  category,
  heading,
  description,
  links,
  maxLinks = 6,
}: RelatedGuidesProps) {
  const visibleLinks = links
    .filter((link) => link.slug !== currentSlug)
    .slice(0, maxLinks);

  if (visibleLinks.length === 0) {
    return null;
  }

  return (
    <section
      aria-label={heading}
      data-related-guides-category={category}
      className="mt-8 w-full min-w-0 sm:mt-10"
    >
      <h2 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">
        {heading}
      </h2>
      {description ? (
        <p className="mt-2 max-w-3xl break-words text-sm leading-6 text-slate-300">
          {description}
        </p>
      ) : null}
      <div className="mt-4 grid w-full min-w-0 grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {visibleLinks.map((link) => (
          <Link
            key={link.slug}
            href={`/${locale}/${link.slug}`}
            className="group min-w-0 rounded-2xl border border-cyan-300/15 bg-white/[0.045] p-4 transition hover:border-cyan-300/50 hover:bg-cyan-400/10"
          >
            <h3 className="break-words text-base font-semibold text-cyan-100 group-hover:text-white">
              {link.title}
            </h3>
            {link.description ? (
              <p className="mt-2 break-words text-sm leading-6 text-slate-400 group-hover:text-slate-200">
                {link.description}
              </p>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
