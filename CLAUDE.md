# atleastplaybaseball

## Mission

The cricket pitch at Beryl Gaffney Park is a test case. This site exists to seek out racial prejudice in the opposition to the project and, where it is present, expose it factually and on the record — so that a civic project is not blocked by prejudice dressed up as procedural or environmental concern.

## Method

Place two records side by side:

- **The on-the-record objections** — named residents, the dog-owner petition, the City's public consultation.
- **The unmoderated objections** — comment sections on news coverage (CTV, etc.).

The gap between these two records is the evidence. Every claim is cited. Nothing is characterized beyond what the source itself says.

## Tone

Factual, restrained, citation-heavy. The site does not editorialize beyond what the evidence supports. It is not anti-opposition in principle — it is anti-prejudice-as-opposition. When in doubt, under-claim.

## Editorial rules

- Every quote must be cited to a named source or archived URL.
- Do not paraphrase where a direct quote will do.
- Do not attribute motive the source did not state.
- If a claim cannot be defended on its own, cut it.
- Corrections are shipped visibly, not silently.

## Tech stack

- Astro 4 (static output, one Vercel edge function for the corrections form)
- TypeScript
- Vercel (deploy), Upstash Redis (rate limiting), Resend (email)
- No framework integrations — plain `.astro` components with scoped styles

## Conventions

- Components are sectioned (Section 01–10) and composed in `src/pages/index.astro`.
- Data for list-like sections (Concerns, Questions, etc.) lives in the component's frontmatter, not JSX.
- The only server code is `api/corrections.ts` (Vercel edge function).
- `ottawa.raw.json` is gitignored — it's a large OSM dump used by the map.
