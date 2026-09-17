"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { authors } from "../data/authors";
import { authorLinks } from "../data/authorLinks";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getAuthorSlug(author: any) {
  return author.slug || slugify(author.name || "");
}

function getAuthorLink(authorName: string) {
  return authorLinks.find(
    (link: any) => normalizeName(link.name) === normalizeName(authorName)
  );
}

function cleanUrl(value?: string) {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http")) return trimmed;
  return "";
}

function handleToUrl(value?: string, platform?: string) {
  if (!value) return "";
  const trimmed = value.trim();

  if (trimmed.startsWith("http")) return trimmed;

  const handle = trimmed
    .replace("@", "")
    .replace(/^instagram:/i, "")
    .replace(/^ig:/i, "")
    .replace(/^threads:/i, "")
    .replace(/^facebook:/i, "")
    .replace(/^fb:/i, "")
    .replace(/^tiktok:/i, "")
    .trim();

  if (!handle) return "";

  if (platform === "instagram") return `https://instagram.com/${handle}`;
  if (platform === "threads") return `https://threads.net/@${handle}`;
  if (platform === "facebook") return `https://facebook.com/${handle}`;
  if (platform === "tiktok") return `https://tiktok.com/@${handle}`;

  return "";
}

function extractHandle(text: string, platform: string) {
  if (!text) return "";

  const patterns: Record<string, RegExp[]> = {
    instagram: [
      /instagram\s*[:\-]?\s*@?([a-zA-Z0-9._]+)/i,
      /ig\s*[:\-]?\s*@?([a-zA-Z0-9._]+)/i,
      /https?:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9._]+)/i,
    ],
    threads: [
      /threads\s*[:\-]?\s*@?([a-zA-Z0-9._]+)/i,
      /https?:\/\/(?:www\.)?threads\.(?:net|com)\/@?([a-zA-Z0-9._]+)/i,
    ],
    facebook: [
      /facebook\s*[:\-]?\s*@?([a-zA-Z0-9._-]+)/i,
      /fb\s*[:\-]?\s*@?([a-zA-Z0-9._-]+)/i,
      /https?:\/\/(?:www\.)?facebook\.com\/([a-zA-Z0-9._-]+)/i,
    ],
    tiktok: [
      /tiktok\s*[:\-]?\s*@?([a-zA-Z0-9._]+)/i,
      /tik tok\s*[:\-]?\s*@?([a-zA-Z0-9._]+)/i,
      /https?:\/\/(?:www\.)?tiktok\.com\/@?([a-zA-Z0-9._]+)/i,
    ],
  };

  for (const pattern of patterns[platform] || []) {
    const match = text.match(pattern);
    if (match?.[1]) return match[1];
  }

  return "";
}

function getSocials(author: any, links: any) {
  const socialsText = author.socials || "";

  const instagram =
    cleanUrl(links?.instagram) ||
    cleanUrl(links?.instagramUrl) ||
    handleToUrl(links?.instagramHandle, "instagram") ||
    cleanUrl(author.instagram) ||
    cleanUrl(author.instagramUrl) ||
    handleToUrl(author.instagramHandle, "instagram") ||
    handleToUrl(extractHandle(socialsText, "instagram"), "instagram");

  const threads =
    cleanUrl(links?.threads) ||
    cleanUrl(links?.threadsUrl) ||
    handleToUrl(links?.threadsHandle, "threads") ||
    cleanUrl(author.threads) ||
    cleanUrl(author.threadsUrl) ||
    handleToUrl(author.threadsHandle, "threads") ||
    handleToUrl(extractHandle(socialsText, "threads"), "threads");

  const facebook =
    cleanUrl(links?.facebook) ||
    cleanUrl(links?.facebookUrl) ||
    handleToUrl(links?.facebookHandle, "facebook") ||
    cleanUrl(author.facebook) ||
    cleanUrl(author.facebookUrl) ||
    handleToUrl(author.facebookHandle, "facebook") ||
    handleToUrl(extractHandle(socialsText, "facebook"), "facebook");

  const tiktok =
    cleanUrl(links?.tiktok) ||
    cleanUrl(links?.tiktokUrl) ||
    handleToUrl(links?.tiktokHandle, "tiktok") ||
    cleanUrl(author.tiktok) ||
    cleanUrl(author.tiktokUrl) ||
    handleToUrl(author.tiktokHandle, "tiktok") ||
    handleToUrl(extractHandle(socialsText, "tiktok"), "tiktok");

  const website =
    cleanUrl(links?.amazonOrWebsiteUrl) ||
    cleanUrl(links?.website) ||
    cleanUrl(links?.websiteUrl) ||
    cleanUrl(author.amazonOrWebsiteUrl) ||
    cleanUrl(author.website) ||
    cleanUrl(author.websiteUrl) ||
    cleanUrl(author.amazon);

  const preorder =
    cleanUrl(links?.preorderUrl) ||
    cleanUrl(links?.beventiUrl) ||
    cleanUrl(author.preorderUrl) ||
    cleanUrl(author.beventiUrl);

  const jibbly =
    cleanUrl(links?.jibblyUrl) ||
    cleanUrl(author.jibblyUrl) ||
    cleanUrl(author.jibblyCollectionLink) ||
    cleanUrl(author.jibblyLink);

  return { instagram, threads, facebook, tiktok, website, preorder, jibbly };
}

function IconLink({
  href,
  icon,
  label,
}: {
  href?: string;
  icon: string;
  label: string;
}) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="shrink-0 transition hover:scale-105"
    >
      <img src={icon} alt={label} className="h-14 w-14 object-contain sm:h-16 sm:w-16" />
    </a>
  );
}

export default function AuthorsPage() {
  const [search, setSearch] = useState("");

  const filteredAuthors = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return authors;

    return authors.filter((author: any) =>
      [
        author.name,
        author.role,
        author.pronouns,
        author.socials,
        ...(author.genres || []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  return (
    <main className="w-full px-4 py-6 sm:px-6">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-8 text-center">
          <img
            src="/demos/bitz-up/logos/bitzup-logo.png"
            alt="Bitz Up!"
            className="mx-auto mb-6 w-full max-w-[340px]"
          />

          <h1 className="bitz-heading text-5xl text-[#DB2487] sm:text-6xl">
            Attending Authors
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#5c5c5c]">
            Browse attending authors, vendors, social media, preorder links,
            and Jibbly collections.
          </p>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search authors, vendors, genre"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-[32px] border border-[#f5bfdc] bg-white px-6 py-5 text-lg outline-none transition focus:border-[#DB2487]"
          />
        </div>

        <div className="mb-8 rounded-[32px] bg-white px-8 py-6 shadow-md">
          <p className="text-2xl font-bold text-[#126e83]">
            {filteredAuthors.length} profiles showing
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredAuthors.map((author: any) => {
            const links = getAuthorLink(author.name);
            const socials = getSocials(author, links);
            const slug = getAuthorSlug(author);

            return (
              <article
                key={slug}
                className="w-full max-w-full overflow-hidden rounded-[36px] bg-white p-6 shadow-lg"
              >
                <div className="mb-5 flex flex-wrap gap-2">
                  {author.sponsor && (
                    <span className="rounded-full bg-[#DB2487] px-4 py-2 text-sm font-bold text-white">
                      Sponsor
                    </span>
                  )}

                  <span className="rounded-full bg-[#126e83] px-4 py-2 text-sm font-bold text-white">
                    {author.role || "Author"}
                  </span>

                  {author.jibblyCollection && (
                    <span className="rounded-full bg-[#fff0f7] px-4 py-2 text-sm font-bold text-[#DB2487]">
                      Jibbly Collection
                    </span>
                  )}
                </div>

                <Link href={`/authors/${slug}`}>
                  <h2 className="bitz-heading cursor-pointer break-words text-5xl leading-tight text-[#DB2487] transition hover:opacity-80">
                    {author.name}
                  </h2>
                </Link>

                {author.pronouns && (
                  <p className="mt-2 text-2xl font-bold text-[#6f7287]">
                    {author.pronouns}
                  </p>
                )}

                {author.genres?.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {author.genres.map((genre: string) => (
                      <span
                        key={genre}
                        className="rounded-full bg-[#eef5f6] px-5 py-2 text-lg font-semibold text-[#126e83]"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <IconLink href={socials.instagram} icon="/demos/bitz-up/icons/ig-icon.png" label="Instagram" />
                  <IconLink href={socials.threads} icon="/demos/bitz-up/icons/threads-icon.png" label="Threads" />
                  <IconLink href={socials.facebook} icon="/demos/bitz-up/icons/fb-icon.png" label="Facebook" />
                  <IconLink href={socials.tiktok} icon="/demos/bitz-up/icons/tiktok-icon.png" label="TikTok" />
                  <IconLink href={socials.website} icon="/demos/bitz-up/icons/amz-icon.png" label="Amazon or Website" />
                  <IconLink href={socials.preorder} icon="/demos/bitz-up/icons/beventi-icon.png" label="Preorder" />
                  <IconLink href={socials.jibbly} icon="/demos/bitz-up/icons/jibbly-icon.png" label="Jibbly Collection" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}