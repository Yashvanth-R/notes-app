import Head from 'next/head';

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  canonical?: string;
};

export default function SEO({
  title = "Keep Notes - Your Personal Note Taking App",
  description = "A beautiful, modern note-taking application built with Next.js and FastAPI. Create, organize, and manage your notes with ease.",
  keywords = "notes, note-taking, productivity, organization, personal notes, digital notes, note app",
  ogTitle,
  ogDescription,
  ogImage = "/og-image.png",
  ogUrl = "https://keepnotes.app",
  twitterCard = "summary_large_image",
  canonical
}: SEOProps) {
  const fullTitle = title.includes("Keep Notes") ? title : `${title} | Keep Notes`;
  
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Keep Notes" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:site_name" content="Keep Notes" />
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />
      
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <meta name="theme-color" content="#5fb3b3" />
      <meta name="msapplication-TileColor" content="#5fb3b3" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
}