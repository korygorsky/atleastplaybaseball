const CONCERNS = [
  {
    head: "\u201CThe pitch eliminates the dog park.\u201D",
    body: "The pitch footprint is approximately 1.5 hectares — roughly 4% of the 39-hectare park. The remaining area continues to support the off-leash function the park is currently used for. The published project scope does not formally close or re-designate the park's off-leash use.",
    verdictLabel: "Overstated",
    verdictBody: "The pitch occupies a small share of the park. Off-leash use of the remaining area is not formally eliminated by the project as scoped.",
    dot: "green",
  },
  {
    head: "\u201CWe are losing a distinctive piece of off-leash space.\u201D",
    body: "The City of Ottawa operates 153 off-leash dog areas. In the south end, at least eight alternatives exist within driving distance of Beryl Gaffney. However, Beryl Gaffney's particular combination — 96 acres with direct Rideau River water access — is genuinely uncommon in Ottawa. The alternatives are not equivalent in scale or character.",
    verdictLabel: "Partially valid",
    verdictBody: "The raw supply of off-leash space is not the issue; the loss of this particular combination of size and river access is real.",
    dot: "amber",
  },
  {
    head: "\u201CTurtles and species at risk will be harmed.\u201D",
    body: "Three turtle species native to the Ottawa area are on Ontario's Species at Risk list: Midland Painted, Snapping, and Blanding's. Blanding's Turtle is listed as threatened both provincially and federally. Beryl Gaffney borders the Rideau River, which is known habitat for these species. Sandy banks of the kind found in the park are typical turtle nesting ground. No Species at Risk assessment specific to the cricket pitch footprint has been publicly released as of the date of this site. A formal consultation with the Rideau Valley Conservation Authority has likewise not been surfaced in the public record.",
    verdictLabel: "Legitimate. Under-documented",
    verdictBody: "The concern is grounded in the biology of the site and the pitch footprint's location. A public Species at Risk assessment should form part of the project record.",
    dot: "grey",
  },
  {
    head: "\u201CTraffic on Rideau Valley Drive will become unsafe.\u201D",
    body: "Rideau Valley Drive is a rural two-lane road with limited shoulders outside the park entrance. The park has two existing parking lots. No public traffic counts, road-classification data, or traffic impact assessment specific to the cricket pitch have surfaced in the public record.",
    verdictLabel: "A reasonable question without public data to answer it",
    verdictBody: "A traffic impact assessment should form part of the project record.",
    dot: "grey",
  },
  {
    head: "\u201CThere was not enough public consultation.\u201D",
    body: "The project was posted on Engage Ottawa. The formal public comment period closed on March 11, 2026. A \u201CWhat We Learned\u201D report has been completed. The 2008 Beryl Gaffney master-plan update — which introduced the existing softball field — was consulted on in a comparable way, including an open house at the RVCA building on Rideau Valley Drive.",
    verdictLabel: "Consultation occurred on the public record",
    verdictBody: "Whether the consultation was sufficient is a judgement on which residents can reasonably disagree.",
    dot: "amber",
  },
];

function Concerns() {
  return (
    <section id="concerns">
      <div className="container">
        <div className="eyebrow">Section 04 · The Concerns</div>
        <SectionHeading id="concerns">Opposition has organized around <em>five specific concerns.</em></SectionHeading>
        <div className="prose">
          <p>
            Opposition to the Beryl Gaffney cricket pitch has organized around five specific concerns. Each is treated here on its merits, with a note on where the public evidence stands.
          </p>
        </div>

        <div className="concerns-grid">
          {CONCERNS.map((c, i) => (
            <article key={i} className="concern-card">
              <div className="c-head">{c.head}</div>
              <p className="c-body"><strong>What the evidence shows</strong>{c.body}</p>
              <div className="c-verdict">
                <span className={"v-dot " + c.dot} aria-hidden="true"/>
                <div>
                  <span className="v-label">Verdict · {c.verdictLabel}</span>
                  <div style={{marginTop: 6, fontFamily: 'var(--serif)', fontSize: 15, lineHeight: 1.5, color: 'var(--ink-80)'}}>{c.verdictBody}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="named-residents">
          <h4>Residents who raised concerns on the record</h4>
          <p style={{fontFamily: 'var(--serif)', fontSize: 17, lineHeight: 1.6, color: 'var(--ink-80)', margin: '0 0 16px', maxWidth: 720}}>
            Three residents are quoted by name in CTV News coverage of the project. Each is raising one of the concerns above and is treated here in that frame only:
          </p>
          <ul>
            <li><strong>Beth Landstrom</strong> — concerns about loss of green space and off-leash dog area.</li>
            <li><strong>Karen Doughan</strong> — concerns about loss of green space and off-leash dog area.</li>
            <li><strong>Debbie Prescott</strong> — concerns about traffic safety on Rideau Valley Drive.</li>
          </ul>
          <p style={{fontFamily: 'var(--serif)', fontSize: 16, lineHeight: 1.6, color: 'var(--ink-70)', margin: 0, maxWidth: 720}}>
            None of the named residents used ethnic, national-origin, or immigration-related framing on the record. Their public statements fall within the five concerns treated above.
          </p>
        </div>

        <div className="src">Sources: City of Ottawa Off-Leash Dog Park directory; Canadian Wildlife Federation; Ontario Ministry of Environment, Conservation and Parks — Species at Risk list; Rideau Valley Conservation Authority; Engage Ottawa — Beryl Gaffney Park project page; CTV News coverage of the proposal.</div>
      </div>
    </section>
  );
}

// ============= COMMENTS =============

const COMMENT_GROUPS = [
  {
    key: 'substantive',
    label: 'Substantive',
    desc: 'Concerns that would exist regardless of which sport was being proposed.',
    quotes: [
      { q: "2nd biggest country in the world and you mean to tell me we can't fit a dog park and a cricket pitch in the same city, insane.", src: "CTV News YouTube" },
      { q: "I don't own a dog but I dont agree with this, keep the dog park.", src: "CTV News YouTube" },
      { q: "What is the nearest alternative dog park? And what is the nearest alternative cricket pitch?", src: "CTV News YouTube" },
    ],
  },
  {
    key: 'skeptical',
    label: 'Skeptical',
    desc: 'Practical opposition to the trade-off.',
    quotes: [
      { q: "I do not support it. We are losing something no one wanted to lose for the sake of accommodation.", src: "CTV News YouTube" },
    ],
  },
  {
    key: 'cultural',
    label: 'Cultural',
    desc: "Frames cricket as culturally foreign without explicit ethnic or national-origin language.",
    quotes: [
      { q: "At least play baseball.", src: "CTV News YouTube", note: "3 upvotes" },
      { q: "Eww cricket.", src: "CTV News YouTube" },
      { q: "Who they heck playing cricket in canada", src: "CTV News YouTube" },
    ],
  },
  {
    key: 'coded',
    label: 'Coded',
    desc: "Explicit reference to ethnicity, national origin, immigration, or belonging.",
    quotes: [
      { q: "And where are these cricket players from? I can only imagine...", src: "CTV News YouTube" },
      { q: "Look who is behind the Ottawa mayor indians figures Cricket is popular in india", src: "CTV News YouTube" },
      { q: "No way we're accomodating for foreign interest like this lmaooo", src: "CTV News YouTube" },
      { q: "This is not India", src: "Reply on Mayor Mark Sutcliffe's public Facebook post" },
      { q: "Welcome to Canada, hockey dying while Cricket is Canada new sport.", src: "CTV News YouTube" },
    ],
  },
  {
    key: 'pushback',
    label: 'Pushback',
    desc: "Comments from other members of the public countering the above.",
    quotes: [
      { q: "You need to educate yourself. Cricket is an English sport. It's official sport of United Kingdom.", src: "CTV News YouTube", note: "13 upvotes — the highest-voted comment on the video" },
      { q: "If there was no demand, they wouldn't create it. You might not like it but clearly it is a sport thats growing fast.", src: "CTV News YouTube" },
      { q: "The thinly veiled xenophobia and racism on the manotick Facebook pages about this is astounding.", src: "r/ottawa" },
    ],
  },
];

function Comments() {
  const [filter, setFilter] = React.useState('all');
  const filters = [['all','All'], ...COMMENT_GROUPS.map(g => [g.key, g.label])];
  const groups = filter === 'all' ? COMMENT_GROUPS : COMMENT_GROUPS.filter(g => g.key === filter);

  return (
    <section id="comments">
      <div className="container">
        <div className="eyebrow">Section 05 · The Comments</div>
        <SectionHeading id="comments">Anonymous and semi-anonymous commentary, sorted by <em>what it actually says.</em></SectionHeading>
        <div className="prose">
          <p>
            The section above covers concerns raised on the public record by named residents and in formally constituted petitions. This section covers something different: the anonymous and semi-anonymous comment layer that has attached itself to those concerns across YouTube, Reddit, Facebook, and petition comment threads.
          </p>
          <p>
            The quotes below are verbatim. Categories are assigned based on the language each quote uses — not on assumptions about the commenter.
          </p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, margin: '24px 0 0', maxWidth: 820}} className="legend-grid">
          {COMMENT_GROUPS.map(g => (
            <div key={g.key} style={{paddingTop: 10, borderTop: '2px solid var(--rideau)'}}>
              <span className={"pill " + g.key} style={{marginBottom: 8, display: 'inline-block'}}>{g.label}</span>
              <div style={{fontFamily: 'var(--sans)', fontSize: 12, lineHeight: 1.5, color: 'var(--ink-70)', marginTop: 6}}>{g.desc}</div>
            </div>
          ))}
        </div>

        <div className="by-numbers">
          <h3>By the numbers</h3>
          <p className="bn-lead">
            A sample of opposing comments on the CTV News YouTube video <em>&ldquo;Ottawa dog park to become new cricket pitch&rdquo;</em> was classified using the categories above. Of the opposing comments sampled:
          </p>
          <ul>
            <li>
              <div className="bn-num">40–50%</div>
              <div>used <strong>Cultural</strong> or <strong>Coded</strong> framing — i.e., invoked the sport's perceived foreignness, or referenced ethnicity, national origin, or immigration.</div>
            </li>
            <li>
              <div className="bn-num">50–60%</div>
              <div>raised <strong>Substantive</strong> or <strong>Skeptical</strong> concerns about the amenity itself (dog park, trade-off, process).</div>
            </li>
            <li>
              <div className="bn-num">13</div>
              <div>upvotes on the <strong>highest-voted comment</strong> on the video — which is in the <strong>Pushback</strong> category, a viewer correcting the frame that cricket is a foreign sport. More than any single coded or substantive comment in the thread.</div>
            </li>
            <li>
              <div className="bn-num">Split</div>
              <div>The pattern is not uniform across platforms. On r/ottawa, a broader-Ottawa forum, opposition comments lean heavily <strong>Substantive</strong>. In Facebook community groups geographically tied to the park, a Reddit commenter observed a very different mix — &ldquo;the thinly veiled xenophobia and racism on the manotick Facebook pages about this is astounding.&rdquo;</div>
            </li>
          </ul>
          <p style={{fontFamily: 'var(--serif)', fontSize: 16, lineHeight: 1.6, color: 'var(--ink-70)', margin: '28px 0 0', maxWidth: 780}}>
            The cultural/coded share of opposition commentary in the CTV video thread has no analogue in comparable amenity disputes this site has reviewed (including the 2022–2023 Manotick pickleball case covered in the next section). Full methodology and the verbatim classification are available in the methodology note at the bottom of this site.
          </p>
        </div>

        <div className="filter-bar" role="group" aria-label="Filter comments by category" style={{display: 'flex', gap: 8, flexWrap: 'wrap', margin: '24px 0 8px'}}>
          {filters.map(([key, label]) => (
            <button key={key}
                    onClick={() => setFilter(key)}
                    style={{
                      fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                      padding: '6px 12px', borderRadius: 2,
                      background: filter === key ? 'var(--ink)' : 'transparent',
                      color: filter === key ? 'var(--paper)' : 'var(--ink-70)',
                      border: '1px solid ' + (filter === key ? 'var(--ink)' : 'var(--ink-15)'),
                      cursor: 'pointer',
                    }}>{label}</button>
          ))}
        </div>

        {groups.map(g => (
          <div key={g.key} className="cat-group">
            <div className="cat-header">
              <span className={"pill " + g.key}>{g.label}</span>
              <span className="cat-desc">{g.desc}</span>
            </div>
            <div className="quote-list">
              {g.quotes.map((qu, i) => (
                <div key={i} className="quote-card">
                  <p className="qtext">&ldquo;{qu.q}&rdquo;</p>
                  <div className="meta">
                    <span className="src-attr">
                      — <strong>{qu.src}</strong>{qu.note ? ' · ' + qu.note : ''}
                    </span>
                    <span className={"pill " + g.key}>{g.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="section-note">
          <h4>A note on what these categories mean, and what they don't</h4>
          <p>
            Categorizing a comment as <em>Coded</em> is a statement about the language of the comment — not the character of the person who wrote it. A reader can write &ldquo;this is not India&rdquo; for many reasons; the category label reflects how the sentence reads in the public record, nothing more.
          </p>
          <p>
            The <em>Cultural</em> and <em>Coded</em> categories together outnumber the <em>Substantive</em> and <em>Skeptical</em> categories in the YouTube comment section of the CTV News coverage. The top-voted comment on that same video is, however, a <em>Pushback</em> comment. The public discourse is not uniform.
          </p>
        </div>

        <div className="section-note" style={{marginTop: 24, background: 'var(--paper-sunk)'}}>
          <h4>On what is not quoted here</h4>
          <p style={{margin: 0}}>
            Additional comments consistent with the Coded category appear in Facebook community-group threads and on Mayor Sutcliffe's public Facebook posts. Many of those threads are behind a login wall or have been moderated since posting. Where a verbatim record could not be captured, those comments are <strong>not</strong> reproduced here, even where secondary reporting describes the pattern. This site quotes only what it can source.
          </p>
        </div>

        <div className="src">Sources: CTV News YouTube — &ldquo;Ottawa dog park to become new cricket pitch,&rdquo; comment section; r/ottawa — &ldquo;Keep Beryl Gaffney Park as is&rdquo;; Change.org petition comment thread; public Facebook comment threads on community group posts and on public posts by Mayor Mark Sutcliffe.</div>
      </div>
    </section>
  );
}

Object.assign(window, { Concerns, Comments });
