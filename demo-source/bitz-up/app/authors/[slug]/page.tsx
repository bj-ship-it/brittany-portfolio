import { authors } from "../../data/authors";
import { authorLinks } from "../../data/authorLinks";

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

  return {
    instagram:
      cleanUrl(links?.instagram) ||
      cleanUrl(links?.instagramUrl) ||
      handleToUrl(links?.instagramHandle, "instagram") ||
      cleanUrl(author.instagram) ||
      cleanUrl(author.instagramUrl) ||
      handleToUrl(author.instagramHandle, "instagram") ||
      handleToUrl(extractHandle(socialsText, "instagram"), "instagram"),

    threads:
      cleanUrl(links?.threads) ||
      cleanUrl(links?.threadsUrl) ||
      handleToUrl(links?.threadsHandle, "threads") ||
      cleanUrl(author.threads) ||
      cleanUrl(author.threadsUrl) ||
      handleToUrl(author.threadsHandle, "threads") ||
      handleToUrl(extractHandle(socialsText, "threads"), "threads"),

    facebook:
      cleanUrl(links?.facebook) ||
      cleanUrl(links?.facebookUrl) ||
      handleToUrl(links?.facebookHandle, "facebook") ||
      cleanUrl(author.facebook) ||
      cleanUrl(author.facebookUrl) ||
      handleToUrl(author.facebookHandle, "facebook") ||
      handleToUrl(extractHandle(socialsText, "facebook"), "facebook"),

    tiktok:
      cleanUrl(links?.tiktok) ||
      cleanUrl(links?.tiktokUrl) ||
      handleToUrl(links?.tiktokHandle, "tiktok") ||
      cleanUrl(author.tiktok) ||
      cleanUrl(author.tiktokUrl) ||
      handleToUrl(author.tiktokHandle, "tiktok") ||
      handleToUrl(extractHandle(socialsText, "tiktok"), "tiktok"),

    website:
      cleanUrl(links?.amazonOrWebsiteUrl) ||
      cleanUrl(links?.website) ||
      cleanUrl(links?.websiteUrl) ||
      cleanUrl(author.amazonOrWebsiteUrl) ||
      cleanUrl(author.website) ||
      cleanUrl(author.websiteUrl) ||
      cleanUrl(author.amazon),

    preorder:
      cleanUrl(links?.preorderUrl) ||
      cleanUrl(links?.beventiUrl) ||
      cleanUrl(author.preorderUrl) ||
      cleanUrl(author.beventiUrl),

    jibbly:
      cleanUrl(links?.jibblyUrl) ||
      cleanUrl(author.jibblyUrl) ||
      cleanUrl(author.jibblyCollectionLink) ||
      cleanUrl(author.jibblyLink),
  };
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

export async function generateStaticParams() {
  return authors.map((author: any) => ({
    slug: getAuthorSlug(author),
  }));
}

export default async function AuthorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const author: any = authors.find(
    (item: any) => getAuthorSlug(item) === slug
  );

  if (!author) {
    return (
      <main className="w-full px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-[36px] bg-white p-8 shadow-lg">
          <h1 className="bitz-heading text-5xl text-[#DB2487]">
            Author Not Found
          </h1>
        </div>
      </main>
    );
  }

  const links = getAuthorLink(author.name);
  const socials = getSocials(author, links);
  const authorSlug = getAuthorSlug(author);
  const headshot = author.headshotSource;

  return (
    <main className="w-full px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-4xl">
        <div className="overflow-hidden rounded-[40px] bg-white p-6 shadow-xl sm:p-10">
          {headshot && <img
            src={headshot}
            alt={author.name}
            className="mx-auto h-48 w-48 rounded-full object-cover shadow-lg sm:h-60 sm:w-60"
          />}

          <h1 className="bitz-heading mt-8 break-words text-center text-5xl leading-tight text-[#DB2487] sm:text-6xl">
            {author.name}
          </h1>

          {author.pronouns && (
            <p className="mt-3 text-center text-2xl font-bold text-[#6f7287]">
              {author.pronouns}
            </p>
          )}

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {author.sponsor && (
              <span className="rounded-full bg-[#DB2487] px-5 py-2 text-sm font-bold text-white">
                Sponsor
              </span>
            )}

            <span className="rounded-full bg-[#126e83] px-5 py-2 text-sm font-bold text-white">
              {author.role || "Author"}
            </span>

            {author.jibblyCollection && (
              <span className="rounded-full bg-[#fff0f7] px-5 py-2 text-sm font-bold text-[#DB2487]">
                Jibbly Collection
              </span>
            )}
          </div>

          {author.genres?.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
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

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <IconLink href={socials.instagram} icon="/demos/bitz-up/icons/ig-icon.png" label="Instagram" />
            <IconLink href={socials.threads} icon="/demos/bitz-up/icons/threads-icon.png" label="Threads" />
            <IconLink href={socials.facebook} icon="/demos/bitz-up/icons/fb-icon.png" label="Facebook" />
            <IconLink href={socials.tiktok} icon="/demos/bitz-up/icons/tiktok-icon.png" label="TikTok" />
            <IconLink href={socials.website} icon="/demos/bitz-up/icons/amz-icon.png" label="Amazon or Website" />
            <IconLink href={socials.preorder} icon="/demos/bitz-up/icons/beventi-icon.png" label="Preorder" />
            <IconLink href={socials.jibbly} icon="/demos/bitz-up/icons/jibbly-icon.png" label="Jibbly Collection" />
          </div>

          {author.bio && (
            <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-[#fff7fb] p-5 sm:p-6">
              <h2 className="mb-4 text-2xl font-bold text-[#126e83]">
                Bio
              </h2>

              <p className="whitespace-pre-line text-lg leading-8 text-[#444]">
                {author.bio}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}