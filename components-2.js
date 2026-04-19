const CONCERNS = [
  {
    head: "\u201CThe pitch eliminates the dog park.\u201D",
    body: "The pitch footprint is approximately 1.5 hectares \u2014 roughly 4% of the 39-hectare park. The remaining area continues to support the off-leash function the park is currently used for. The published project scope does not formally close or re-designate the park's off-leash use.",
    verdictLabel: "Overstated",
    verdictBody: "The pitch occupies a small share of the park. Off-leash use of the remaining area is not formally eliminated by the project as scoped.",
    dot: "green"
  },
  {
    head: "\u201CWe are losing a distinctive piece of off-leash space.\u201D",
    body: "The City of Ottawa operates 153 off-leash dog areas. In the south end, at least eight alternatives exist within driving distance of Beryl Gaffney. However, Beryl Gaffney's particular combination \u2014 96 acres with direct Rideau River water access \u2014 is genuinely uncommon in Ottawa. The alternatives are not equivalent in scale or character.",
    verdictLabel: "Partially valid",
    verdictBody: "The raw supply of off-leash space is not the issue; the loss of this particular combination of size and river access is real.",
    dot: "amber"
  },
  {
    head: "\u201CTurtles and species at risk will be harmed.\u201D",
    body: "Three turtle species native to the Ottawa area are on Ontario's Species at Risk list: Midland Painted, Snapping, and Blanding's. Blanding's Turtle is listed as threatened both provincially and federally. Beryl Gaffney borders the Rideau River, which is known habitat for these species. Sandy banks of the kind found in the park are typical turtle nesting ground. No Species at Risk assessment specific to the cricket pitch footprint has been publicly released as of the date of this site. A formal consultation with the Rideau Valley Conservation Authority has likewise not been surfaced in the public record.",
    verdictLabel: "Legitimate. Under-documented",
    verdictBody: "The concern is grounded in the biology of the site and the pitch footprint's location. A public Species at Risk assessment should form part of the project record.",
    dot: "grey"
  },
  {
    head: "\u201CTraffic on Rideau Valley Drive will become unsafe.\u201D",
    body: "Rideau Valley Drive is a rural two-lane road with limited shoulders outside the park entrance. The park has two existing parking lots. No public traffic counts, road-classification data, or traffic impact assessment specific to the cricket pitch have surfaced in the public record.",
    verdictLabel: "A reasonable question without public data to answer it",
    verdictBody: "A traffic impact assessment should form part of the project record.",
    dot: "grey"
  },
  {
    head: "\u201CThere was not enough public consultation.\u201D",
    body: "The project was posted on Engage Ottawa. The formal public comment period closed on March 11, 2026. A \u201CWhat We Learned\u201D report has been completed. The 2008 Beryl Gaffney master-plan update \u2014 which introduced the existing softball field \u2014 was consulted on in a comparable way, including an open house at the RVCA building on Rideau Valley Drive.",
    verdictLabel: "Consultation occurred on the public record",
    verdictBody: "Whether the consultation was sufficient is a judgement on which residents can reasonably disagree.",
    dot: "amber"
  }
];
function Concerns() {
  return /* @__PURE__ */ React.createElement("section", { id: "concerns" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "Section 04 \xB7 The Concerns"), /* @__PURE__ */ React.createElement(SectionHeading, { id: "concerns" }, "Opposition has organized around ", /* @__PURE__ */ React.createElement("em", null, "five specific concerns.")), /* @__PURE__ */ React.createElement("div", { className: "prose" }, /* @__PURE__ */ React.createElement("p", null, "Opposition to the Beryl Gaffney cricket pitch has organized around five specific concerns. Each is treated here on its merits, with a note on where the public evidence stands.")), /* @__PURE__ */ React.createElement("div", { className: "concerns-grid" }, CONCERNS.map((c, i) => /* @__PURE__ */ React.createElement("article", { key: i, className: "concern-card" }, /* @__PURE__ */ React.createElement("div", { className: "c-head" }, c.head), /* @__PURE__ */ React.createElement("p", { className: "c-body" }, /* @__PURE__ */ React.createElement("strong", null, "What the evidence shows"), c.body), /* @__PURE__ */ React.createElement("div", { className: "c-verdict" }, /* @__PURE__ */ React.createElement("span", { className: "v-dot " + c.dot, "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "v-label" }, "Verdict \xB7 ", c.verdictLabel), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6, fontFamily: "var(--serif)", fontSize: 15, lineHeight: 1.5, color: "var(--ink-80)" } }, c.verdictBody)))))), /* @__PURE__ */ React.createElement("div", { className: "named-residents" }, /* @__PURE__ */ React.createElement("h4", null, "Residents who raised concerns on the record"), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "var(--serif)", fontSize: 17, lineHeight: 1.6, color: "var(--ink-80)", margin: "0 0 16px", maxWidth: 720 } }, "Three residents are quoted by name in CTV News coverage of the project. Each is raising one of the concerns above and is treated here in that frame only:"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Beth Landstrom"), " \u2014 concerns about loss of green space and off-leash dog area."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Karen Doughan"), " \u2014 concerns about loss of green space and off-leash dog area."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Debbie Prescott"), " \u2014 concerns about traffic safety on Rideau Valley Drive.")), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "var(--serif)", fontSize: 16, lineHeight: 1.6, color: "var(--ink-70)", margin: 0, maxWidth: 720 } }, "None of the named residents used ethnic, national-origin, or immigration-related framing on the record. Their public statements fall within the five concerns treated above.")), /* @__PURE__ */ React.createElement("div", { className: "src" }, "Sources: City of Ottawa Off-Leash Dog Park directory; Canadian Wildlife Federation; Ontario Ministry of Environment, Conservation and Parks \u2014 Species at Risk list; Rideau Valley Conservation Authority; Engage Ottawa \u2014 Beryl Gaffney Park project page; CTV News coverage of the proposal.")));
}
const COMMENT_GROUPS = [
  {
    key: "substantive",
    label: "Substantive",
    desc: "Concerns that would exist regardless of which sport was being proposed.",
    quotes: [
      { q: "2nd biggest country in the world and you mean to tell me we can't fit a dog park and a cricket pitch in the same city, insane.", src: "CTV News YouTube" },
      { q: "I don't own a dog but I dont agree with this, keep the dog park.", src: "CTV News YouTube" },
      { q: "What is the nearest alternative dog park? And what is the nearest alternative cricket pitch?", src: "CTV News YouTube" }
    ]
  },
  {
    key: "skeptical",
    label: "Skeptical",
    desc: "Practical opposition to the trade-off.",
    quotes: [
      { q: "I do not support it. We are losing something no one wanted to lose for the sake of accommodation.", src: "CTV News YouTube" }
    ]
  },
  {
    key: "cultural",
    label: "Cultural",
    desc: "Frames cricket as culturally foreign without explicit ethnic or national-origin language.",
    quotes: [
      { q: "At least play baseball.", src: "CTV News YouTube", note: "3 upvotes" },
      { q: "Eww cricket.", src: "CTV News YouTube" },
      { q: "Who they heck playing cricket in canada", src: "CTV News YouTube" }
    ]
  },
  {
    key: "coded",
    label: "Coded",
    desc: "Explicit reference to ethnicity, national origin, immigration, or belonging.",
    quotes: [
      { q: "And where are these cricket players from? I can only imagine...", src: "CTV News YouTube" },
      { q: "Look who is behind the Ottawa mayor indians figures Cricket is popular in india", src: "CTV News YouTube" },
      { q: "No way we're accomodating for foreign interest like this lmaooo", src: "CTV News YouTube" },
      { q: "This is not India", src: "Reply on Mayor Mark Sutcliffe's public Facebook post" },
      { q: "Welcome to Canada, hockey dying while Cricket is Canada new sport.", src: "CTV News YouTube" }
    ]
  },
  {
    key: "pushback",
    label: "Pushback",
    desc: "Comments from other members of the public countering the above.",
    quotes: [
      { q: "You need to educate yourself. Cricket is an English sport. It's official sport of United Kingdom.", src: "CTV News YouTube", note: "13 upvotes \u2014 the highest-voted comment on the video" },
      { q: "If there was no demand, they wouldn't create it. You might not like it but clearly it is a sport thats growing fast.", src: "CTV News YouTube" },
      { q: "The thinly veiled xenophobia and racism on the manotick Facebook pages about this is astounding.", src: "r/ottawa" }
    ]
  }
];
function Comments() {
  const [filter, setFilter] = React.useState("all");
  const filters = [["all", "All"], ...COMMENT_GROUPS.map((g) => [g.key, g.label])];
  const groups = filter === "all" ? COMMENT_GROUPS : COMMENT_GROUPS.filter((g) => g.key === filter);
  return /* @__PURE__ */ React.createElement("section", { id: "comments" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "Section 05 \xB7 The Comments"), /* @__PURE__ */ React.createElement(SectionHeading, { id: "comments" }, "Anonymous and semi-anonymous commentary, sorted by ", /* @__PURE__ */ React.createElement("em", null, "what it actually says.")), /* @__PURE__ */ React.createElement("div", { className: "prose" }, /* @__PURE__ */ React.createElement("p", null, "The section above covers concerns raised on the public record by named residents and in formally constituted petitions. This section covers something different: the anonymous and semi-anonymous comment layer that has attached itself to those concerns across YouTube, Reddit, Facebook, and petition comment threads."), /* @__PURE__ */ React.createElement("p", null, "The quotes below are verbatim. Categories are assigned based on the language each quote uses \u2014 not on assumptions about the commenter.")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, margin: "24px 0 0", maxWidth: 820 }, className: "legend-grid" }, COMMENT_GROUPS.map((g) => /* @__PURE__ */ React.createElement("div", { key: g.key, style: { paddingTop: 10, borderTop: "2px solid var(--rideau)" } }, /* @__PURE__ */ React.createElement("span", { className: "pill " + g.key, style: { marginBottom: 8, display: "inline-block" } }, g.label), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--sans)", fontSize: 12, lineHeight: 1.5, color: "var(--ink-70)", marginTop: 6 } }, g.desc)))), /* @__PURE__ */ React.createElement("div", { className: "by-numbers" }, /* @__PURE__ */ React.createElement("h3", null, "By the numbers"), /* @__PURE__ */ React.createElement("p", { className: "bn-lead" }, "A sample of opposing comments on the CTV News YouTube video ", /* @__PURE__ */ React.createElement("em", null, "\u201COttawa dog park to become new cricket pitch\u201D"), " was classified using the categories above. Of the opposing comments sampled:"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("div", { className: "bn-num" }, "40\u201350%"), /* @__PURE__ */ React.createElement("div", null, "used ", /* @__PURE__ */ React.createElement("strong", null, "Cultural"), " or ", /* @__PURE__ */ React.createElement("strong", null, "Coded"), " framing \u2014 i.e., invoked the sport's perceived foreignness, or referenced ethnicity, national origin, or immigration.")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("div", { className: "bn-num" }, "50\u201360%"), /* @__PURE__ */ React.createElement("div", null, "raised ", /* @__PURE__ */ React.createElement("strong", null, "Substantive"), " or ", /* @__PURE__ */ React.createElement("strong", null, "Skeptical"), " concerns about the amenity itself (dog park, trade-off, process).")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("div", { className: "bn-num" }, "13"), /* @__PURE__ */ React.createElement("div", null, "upvotes on the ", /* @__PURE__ */ React.createElement("strong", null, "highest-voted comment"), " on the video \u2014 which is in the ", /* @__PURE__ */ React.createElement("strong", null, "Pushback"), " category, a viewer correcting the frame that cricket is a foreign sport. More than any single coded or substantive comment in the thread.")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("div", { className: "bn-num" }, "Split"), /* @__PURE__ */ React.createElement("div", null, "The pattern is not uniform across platforms. On r/ottawa, a broader-Ottawa forum, opposition comments lean heavily ", /* @__PURE__ */ React.createElement("strong", null, "Substantive"), ". In Facebook community groups geographically tied to the park, a Reddit commenter observed a very different mix \u2014 \u201Cthe thinly veiled xenophobia and racism on the manotick Facebook pages about this is astounding.\u201D"))), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "var(--serif)", fontSize: 16, lineHeight: 1.6, color: "var(--ink-70)", margin: "28px 0 0", maxWidth: 780 } }, "The cultural/coded share of opposition commentary in the CTV video thread has no analogue in comparable amenity disputes this site has reviewed (including the 2022\u20132023 Manotick pickleball case covered in the next section). Full methodology and the verbatim classification are available in the methodology note at the bottom of this site.")), /* @__PURE__ */ React.createElement("div", { className: "filter-bar", role: "group", "aria-label": "Filter comments by category", style: { display: "flex", gap: 8, flexWrap: "wrap", margin: "24px 0 8px" } }, filters.map(([key, label]) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key,
      onClick: () => setFilter(key),
      style: {
        fontFamily: "var(--sans)",
        fontSize: 12,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        padding: "6px 12px",
        borderRadius: 2,
        background: filter === key ? "var(--ink)" : "transparent",
        color: filter === key ? "var(--paper)" : "var(--ink-70)",
        border: "1px solid " + (filter === key ? "var(--ink)" : "var(--ink-15)"),
        cursor: "pointer"
      }
    },
    label
  ))), groups.map((g) => /* @__PURE__ */ React.createElement("div", { key: g.key, className: "cat-group" }, /* @__PURE__ */ React.createElement("div", { className: "cat-header" }, /* @__PURE__ */ React.createElement("span", { className: "pill " + g.key }, g.label), /* @__PURE__ */ React.createElement("span", { className: "cat-desc" }, g.desc)), /* @__PURE__ */ React.createElement("div", { className: "quote-list" }, g.quotes.map((qu, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "quote-card" }, /* @__PURE__ */ React.createElement("p", { className: "qtext" }, "\u201C", qu.q, "\u201D"), /* @__PURE__ */ React.createElement("div", { className: "meta" }, /* @__PURE__ */ React.createElement("span", { className: "src-attr" }, "\u2014 ", /* @__PURE__ */ React.createElement("strong", null, qu.src), qu.note ? " \xB7 " + qu.note : ""), /* @__PURE__ */ React.createElement("span", { className: "pill " + g.key }, g.label))))))), /* @__PURE__ */ React.createElement("div", { className: "section-note" }, /* @__PURE__ */ React.createElement("h4", null, "A note on what these categories mean, and what they don't"), /* @__PURE__ */ React.createElement("p", null, "Categorizing a comment as ", /* @__PURE__ */ React.createElement("em", null, "Coded"), " is a statement about the language of the comment \u2014 not the character of the person who wrote it. A reader can write \u201Cthis is not India\u201D for many reasons; the category label reflects how the sentence reads in the public record, nothing more."), /* @__PURE__ */ React.createElement("p", null, "The ", /* @__PURE__ */ React.createElement("em", null, "Cultural"), " and ", /* @__PURE__ */ React.createElement("em", null, "Coded"), " categories together outnumber the ", /* @__PURE__ */ React.createElement("em", null, "Substantive"), " and ", /* @__PURE__ */ React.createElement("em", null, "Skeptical"), " categories in the YouTube comment section of the CTV News coverage. The top-voted comment on that same video is, however, a ", /* @__PURE__ */ React.createElement("em", null, "Pushback"), " comment. The public discourse is not uniform.")), /* @__PURE__ */ React.createElement("div", { className: "section-note", style: { marginTop: 24, background: "var(--paper-sunk)" } }, /* @__PURE__ */ React.createElement("h4", null, "On what is not quoted here"), /* @__PURE__ */ React.createElement("p", { style: { margin: 0 } }, "Additional comments consistent with the Coded category appear in Facebook community-group threads and on Mayor Sutcliffe's public Facebook posts. Many of those threads are behind a login wall or have been moderated since posting. Where a verbatim record could not be captured, those comments are ", /* @__PURE__ */ React.createElement("strong", null, "not"), " reproduced here, even where secondary reporting describes the pattern. This site quotes only what it can source.")), /* @__PURE__ */ React.createElement("div", { className: "src" }, "Sources: CTV News YouTube \u2014 \u201COttawa dog park to become new cricket pitch,\u201D comment section; r/ottawa \u2014 \u201CKeep Beryl Gaffney Park as is\u201D; Change.org petition comment thread; public Facebook comment threads on community group posts and on public posts by Mayor Mark Sutcliffe.")));
}
Object.assign(window, { Concerns, Comments });
