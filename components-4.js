const SOURCES = [
  {
    group: "City of Ottawa \u2014 official records",
    items: [
      "Engage Ottawa \u2014 Beryl Gaffney Park Cricket Pitch project page.",
      "Engage Ottawa \u2014 Beryl Gaffney Park Off-Leash Dog Area.",
      "City of Ottawa \u2014 Beryl Gaffney Park Master Plan Update, 2008 (committee record, Planning and Environment Committee).",
      "City of Ottawa \u2014 Help conserve Ottawa's turtles (herpetofauna information page).",
      "City of Ottawa \u2014 Off-Leash Dog Park directory.",
      "Councillor Wilson Lo (Barrhaven East) \u2014 Weekly newsletters, February 24, 2025 and March 11, 2026.",
      "Councillor Glen Gower (Stittsville) \u2014 \u201CMore cricket spaces coming to Stittsville.\u201D",
      "Office of the Mayor, City of Ottawa \u2014 Public statements re: cricket pitch program (March 2026)."
    ]
  },
  {
    group: "News coverage",
    items: [
      ["CTV News Ottawa", " \u2014 \u201CCity of Ottawa planning to create up to 6 new cricket pitches\u201D (March 5, 2026)."],
      ["CTV News Ottawa", " \u2014 \u201CCricket pitch proposed for Beryl Gaffney Park.\u201D"],
      ["CTV News Ottawa", " \u2014 \u201CCricket boom prompts City of Ottawa to consider creating first dedicated pitch.\u201D"],
      ["CTV News YouTube", " \u2014 \u201COttawa dog park to become new cricket pitch\u201D (video; comment section is one of the primary quote sources for Section 5)."],
      ["CBC News", " \u2014 \u201COttawa cricket fans make pitch for new places to play\u201D (May 2021)."],
      ["CBC News", " \u2014 \u201CHow 3 waves of Asian immigration shaped Ottawa.\u201D"],
      ["CBC News", " \u2014 \u201CThe pickleball noise debate has landed in Ottawa.\u201D"],
      ["Ottawa Sports Pages", " \u2014 OVCC at Ontario Central T20 (July 2025)."],
      ["Manotick Messenger", " \u2014 \u201CNoise Complaints Leave Pickleball Players With No Place To Play\u201D (2023)."],
      ["Turf & Rec", " \u2014 \u201COttawa announces plans to build at least five new cricket pitches.\u201D"]
    ]
  },
  {
    group: "Community / forums",
    items: [
      ["Change.org petition", " \u2014 \u201CKeep Beryl Gaffney park as an off-leash dog area.\u201D"],
      ["Reddit r/ottawa", " \u2014 \u201CKeep Beryl Gaffney Park as is\u201D thread."]
    ]
  },
  {
    group: "Cricket organizations and growth data",
    items: [
      "Ottawa Valley Cricket Council.",
      "Barrhaven Cricket Club.",
      "Kanata Cricket Club.",
      "Monarch Cricket (indoor facility).",
      "Cricket Canada \u2014 participation statistics and national growth projections.",
      "Penticton Herald / DV8 Communication \u2014 Canadian cricket growth coverage.",
      "City of Toronto \u2014 Cricket Strategy."
    ]
  },
  {
    group: "Environmental",
    items: [
      "Canadian Wildlife Federation \u2014 Turtles at risk in Canada.",
      "Ontario Ministry of the Environment, Conservation and Parks \u2014 Species at Risk list.",
      "Rideau Valley Conservation Authority.",
      "Rideau Valley Wildlife Sanctuary."
    ]
  },
  {
    group: "Demographic and historical context",
    items: [
      "Statistics Canada \u2014 Ottawa census profiles, 2005\u20132016 (South Asian population counts).",
      "CBC News \u2014 \u201CHow 3 waves of Asian immigration shaped Ottawa.\u201D",
      "Cricket Canada historical records \u2014 national governing body established 1892; earliest recorded cricket match on Canadian soil, 1785."
    ]
  },
  {
    group: "Methodology sources used by this site but not quoted from",
    items: [
      "Sentiment classification approach informed by standard content-analysis practice (verbatim collection, category taxonomy, independent cross-check). Full working memo available on request."
    ]
  }
];
function ExtArrow() {
  return /* @__PURE__ */ React.createElement("svg", { "aria-hidden": "true", width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", style: { marginLeft: 6, verticalAlign: "baseline", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("path", { d: "M7 17L17 7" }), /* @__PURE__ */ React.createElement("path", { d: "M8 7h9v9" }));
}
function SourceItem({ item }) {
  if (typeof item === "string") {
    return /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", { href: "#", className: "src-link" }, /* @__PURE__ */ React.createElement("span", null, item), /* @__PURE__ */ React.createElement(ExtArrow, null)));
  }
  if (Array.isArray(item) && typeof item[0] === "string" && typeof item[1] === "string" && item.length === 2) {
    return /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("a", { href: "#", className: "src-link" }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", null, item[0]), item[1]), /* @__PURE__ */ React.createElement(ExtArrow, null)));
  }
  return /* @__PURE__ */ React.createElement("li", null, item.map((part, i) => {
    if (typeof part === "string") return /* @__PURE__ */ React.createElement(React.Fragment, { key: i }, part);
    if (part && part.email) return /* @__PURE__ */ React.createElement("span", { key: i, className: "email-text" }, part.email);
    return null;
  }));
}
function About() {
  return /* @__PURE__ */ React.createElement("section", { id: "about", className: "methodology" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, "Section 08 \xB7 About / Methodology"), /* @__PURE__ */ React.createElement(SectionHeading, { id: "about" }, "How this page ", /* @__PURE__ */ React.createElement("em", null, "was assembled.")), /* @__PURE__ */ React.createElement("h3", null, "Why this site exists"), /* @__PURE__ */ React.createElement("p", null, "This site was compiled by a private citizen who noticed a pattern in the public commentary about the Beryl Gaffney Park cricket pitch and wanted to find out whether the evidence supported what they were reading. The site is the product of that investigation."), /* @__PURE__ */ React.createElement("p", null, "The author has no affiliation with the City of Ottawa, the Ottawa Valley Cricket Council, any cricket club, any community association, any councillor, any political campaign, or any media organization. The site is not monetized, carries no advertising, and does not collect reader data beyond aggregate traffic."), /* @__PURE__ */ React.createElement("h3", null, "How the site was built"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("em", null, "Primary sources."), " Every factual claim about the project, the park, or the City's consultation is linked to a primary source \u2014 Engage Ottawa, the 2008 master plan update, City Councillor communications, or named news coverage. Where a primary source was unavailable or behind a login wall, the site says so rather than citing secondary reporting as if it were primary."), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("em", null, "Quote collection."), " Verbatim public comments were collected from: the comment section of the CTV News YouTube video \u201COttawa dog park to become new cricket pitch\u201D; the r/ottawa Reddit thread \u201CKeep Beryl Gaffney Park as is\u201D; the comment thread of the Change.org petition \u201CKeep Beryl Gaffney park as an off-leash dog area\u201D; and public posts (and their public comment threads) by Mayor Mark Sutcliffe, Councillor Wilson Lo, and Councillor Glen Gower."), /* @__PURE__ */ React.createElement("p", null, "Facebook content inside closed community groups was ", /* @__PURE__ */ React.createElement("strong", null, "not"), " used as a primary source. Where secondary reporting describes patterns inside those groups, the patterns are described \u2014 but individual quotes are not reproduced."), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("em", null, "Classification."), " Each quote in Section 5 was classified into one of five categories: ", /* @__PURE__ */ React.createElement("em", null, "Substantive, Skeptical, Cultural, Coded,"), " or ", /* @__PURE__ */ React.createElement("em", null, "Pushback"), ". The classification is based on the language of the quote itself. No inference is made about the commenter's identity, intent, or character."), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("em", null, "Verification."), " Each direct quote reproduced on this site was cross-checked against the original source at the time of publication. Screenshots were taken as backup where the source permitted it. Where a comment was referenced in secondary reporting but could not be verbatim-verified, the comment is described in aggregate but not quoted."), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("em", null, "Names."), " Residents quoted by name in news coverage appear only in Section 4 (The Concerns), and only in the frame of the public-record concerns they raised. No named resident appears in Section 5 (The Comments). No private Facebook account is named anywhere on the site. No screenshot on this site identifies any individual."), /* @__PURE__ */ React.createElement("h3", null, "Corrections"), /* @__PURE__ */ React.createElement("p", null, "If you believe something on this site is factually wrong, missing a necessary caveat, or quoted out of context \u2014 or if you have primary-source material that would improve the record \u2014 a corrections channel is being set up and will be listed here once active. Every message will be read. Meaningful corrections are applied promptly and are noted with the date of the change."), /* @__PURE__ */ React.createElement("h3", null, "Anonymity"), /* @__PURE__ */ React.createElement("p", null, "The author of this site has chosen to publish anonymously. The reasoning is simple: the site is about public commentary in a particular community, and naming the author would make the site about the author. Anonymity is not a screen for opinions that would not survive being named; the site's claims stand or fall on the sources cited, and the author is prepared to stand behind those sources if required."), /* @__PURE__ */ React.createElement("div", { id: "sources", style: { marginTop: 72 } }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow", style: { color: "var(--ink-40)", borderTopColor: "var(--rideau)" } }, "Section 09 \xB7 Sources"), /* @__PURE__ */ React.createElement(SectionHeading, { id: "sources" }, "The record."), /* @__PURE__ */ React.createElement("p", { style: { marginBottom: 0 } }, "Every source below is linked to the original record. Where an archived copy exists on the Wayback Machine or archive.today, it is listed alongside the live link on the live site."), SOURCES.map((grp, gi) => /* @__PURE__ */ React.createElement("div", { key: gi, className: "sources-group" }, /* @__PURE__ */ React.createElement("h4", null, grp.group), /* @__PURE__ */ React.createElement("ul", { className: "sources-list" }, grp.items.map((item, i) => /* @__PURE__ */ React.createElement(SourceItem, { key: i, item })))))), /* @__PURE__ */ React.createElement("div", { className: "footer-line" }, "Last updated 2026-04-18 \xB7 Anonymous \xB7 Non-commercial")));
}
Object.assign(window, { About });
