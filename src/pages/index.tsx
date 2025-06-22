import Head from "next/head";
import Solver from "../lib/features/solver/solver";

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Mora Jai Puzzle Solver | Blue Prince</title>
        <meta name="title" content="Mora Jai Puzzle Solver | Blue Prince" />
        <meta
          name="description"
          content="An advanced solver for the Mora Jai puzzles from the game Blue Prince. Features a full puzzle editor and an optimal BFS solver."
        />
        <meta
          name="keywords"
          content="Mora Jai, Blue Prince, puzzle solver, Dogubomb, game helper, puzzle"
        />
        <meta name="author" content="Zuk" />
        <meta name="theme-color" content="#121212" />

        {/* Favicon Links */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/mora-jai-solver/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/mora-jai-solver/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/mora-jai-solver/favicon-16x16.png"
        />
        <link rel="manifest" href="/mora-jai-solver/site.webmanifest" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://Zuk310.github.io/mora-jai-solver/"
        />
        <meta property="og:title" content="Mora Jai Puzzle Solver" />
        <meta
          property="og:description"
          content="An advanced solver for the Mora Jai puzzles from the game Blue Prince."
        />
        <meta
          property="og:image"
          content="https://Zuk310.github.io/mora-jai-solver/og-image.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://Zuk310.github.io/mora-jai-solver/"
        />
        <meta property="twitter:title" content="Mora Jai Puzzle Solver" />
        <meta
          property="twitter:description"
          content="An advanced solver for the Mora Jai puzzles from the game Blue Prince."
        />
        <meta
          property="twitter:image"
          content="https://Zuk310.github.io/mora-jai-solver/og-image.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://Zuk310.github.io/mora-jai-solver/"
        />
        <meta property="twitter:title" content="Mora Jai Puzzle Solver" />
        <meta
          property="twitter:description"
          content="An advanced solver for the Mora Jai puzzles from the game Blue Prince."
        />
        <meta
          property="twitter:image"
          content="https://Zuk310.github.io/mora-jai-solver/og-image.png"
        />
      </Head>
      <Solver />
    </>
  );
}
