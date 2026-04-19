function Nav({ active }) {
  const [scrolled, setScrolled] = React.useState(false);
  const progressRef = React.useRef(null);
  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 120);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progressRef.current) progressRef.current.style.width = (pct * 100).toFixed(2) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const sections = [
    ['park', 'The Park'],
    ['project', 'The Project'],
    ['demand', 'The Demand'],
    ['concerns', 'The Concerns'],
    ['comments', 'The Comments'],
    ['precedent', 'A Precedent'],
    ['questions', 'Open Questions'],
    ['about', 'About'],
    ['sources', 'Sources'],
  ];
  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")} aria-label="Section navigation">
      <div className="nav-inner">
        <a className="nav-mark" href="#top">The Gaffney Park record</a>
        <div className="nav-chips">
          {sections.map(([id, label]) => (
            <a key={id} href={"#" + id}
               className={"chip" + (active === id ? " active" : "")}>{label}</a>
          ))}
        </div>
      </div>
      <div ref={progressRef} className="nav-progress" aria-hidden="true"/>
    </nav>
  );
}

function SectionHeading({ id, children }) {
  const [copied, setCopied] = React.useState(false);
  const onCopy = (e) => {
    e.preventDefault();
    const url = window.location.origin + window.location.pathname + '#' + id;
    history.replaceState(null, '', '#' + id);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    setCopied(true);
    window.clearTimeout(onCopy._t);
    onCopy._t = window.setTimeout(() => setCopied(false), 1400);
  };
  return (
    <div className="h2-wrap">
      <h2>{children}</h2>
      <a className={"h2-permalink" + (copied ? " copied" : "")}
         href={"#" + id}
         onClick={onCopy}
         aria-label={"Copy link to this section"}>
        {copied ? 'link copied' : '§ copy link'}
      </a>
    </div>
  );
}

function Sidenote({ n, children }) {
  return (
    <span className="sn">
      <a className="sn-marker" href={"#sn-" + n} aria-describedby={"sn-" + n}>{n}</a>
      <span className="sn-body" id={"sn-" + n} role="note">{children}</span>
    </span>
  );
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="container">
        <DiamondPitch/>

        <div className="kicker">
          &ldquo;At least play baseball.&rdquo;
          <span className="kicker-src">— Public comment, CTV News YouTube coverage, March 2026.</span>
        </div>

        <h1>A park, a pitch, and <em>two very different records.</em></h1>

        <p className="lede">
          The City of Ottawa plans to build up to six cricket pitches. One of them, at Beryl Gaffney Park in Nepean, has drawn unusually loud opposition. The objections raised on the public record — from named residents, from the dog-owner petition, at the City's public consultation — do not match the objections raised in the comment sections. This site puts both records side by side.
        </p>

        <div className="nav-chips-hero">
          <a href="#park">The Park</a>
          <a href="#project">The Project</a>
          <a href="#demand">The Demand</a>
          <a href="#concerns">The Concerns</a>
          <a href="#comments">The Comments</a>
          <a href="#precedent">A Precedent</a>
          <a href="#questions">Open Questions</a>
          <a href="#sources">Sources</a>
        </div>
      </div>
    </header>
  );
}

function Park() {
  return (
    <section id="park">
      <div className="container park-inner">
        <TurtleMotif/>
        <div className="eyebrow">Section 01 · The Park</div>
        <SectionHeading id="park">Beryl Gaffney Park, <em>39 hectares</em> along the Rideau.</SectionHeading>
        <div className="prose">
          <p>
            Beryl Gaffney Park sits at 3889 Rideau Valley Drive, on the border of Nepean and Manotick, along the Rideau River. At 39 hectares — roughly 96 acres<Sidenote n="1">City of Ottawa parks directory and the 2008 Beryl Gaffney Park Master Plan Update; acreage figures cross-verified against City GIS records.</Sidenote> — it is one of the largest parks in south Ottawa.
          </p>
          <p>
            The park is used for walking, cycling, informal sports, off-leash dog recreation, and river access. It is also wildlife habitat. The sandy banks near the Rideau are known nesting ground for turtle species native to the watershed, including species currently listed as at risk in Ontario.
          </p>
          <p>
            The park opened in its current configuration in the late 1990s. A 2008 master-plan update added a softball field on the south side of the property. That 2008 consultation is a relevant precedent: a ball diamond was added to Beryl Gaffney without the level of public opposition now surrounding the cricket pitch.
          </p>
        </div>

        <figure className="map-figure">
          <svg viewBox="0 0 960 320" width="100%" style={{display: 'block'}} xmlns="http://www.w3.org/2000/svg" aria-label="Schematic of park boundary with pitch footprint overlay">
            <path d="M60,70 Q180,20 360,50 L640,30 Q820,60 900,110 L880,230 Q760,290 560,280 L340,290 Q160,280 80,230 Z"
                  fill="#D7DFE3" stroke="#2D4F5B" strokeWidth="1.5"/>
            <rect x="460" y="150" width="110" height="46" fill="#2D4F5B" opacity="0.88"/>
            <line x1="515" y1="173" x2="660" y2="250" stroke="#1C1D1F" strokeWidth="1"/>
            <circle cx="515" cy="173" r="2.5" fill="#1C1D1F"/>
            <text x="668" y="254" fontFamily="Inter, sans-serif" fontSize="13" fill="#1C1D1F" fontWeight="600">~1.5 ha pitch footprint</text>
            <text x="140" y="110" fontFamily="Inter, sans-serif" fontSize="12" fill="#1C1D1F" opacity="0.6">Rideau River ↗</text>
          </svg>
          <div className="map-legend">
            <div className="li"><div className="dot" style={{background:'#D7DFE3'}}/>Park boundary · ~39 ha</div>
            <div className="li"><div className="dot" style={{background:'#2D4F5B'}}/>Proposed pitch · ~1.5 ha</div>
          </div>
          <figcaption>The proposed pitch occupies roughly 4% of the park.</figcaption>
        </figure>

        <div className="src">Sources: Engage Ottawa — Beryl Gaffney Park project page; Beryl Gaffney Park Master Plan Update, 2008 (City of Ottawa committee record); City of Ottawa parks directory.</div>
      </div>
    </section>
  );
}

function Project() {
  return (
    <section id="project">
      <div className="container">
        <div className="eyebrow">Section 02 · The Project</div>
        <SectionHeading id="project">What <em>is</em> being proposed.</SectionHeading>
        <div className="prose">
          <p>
            The City of Ottawa has proposed building a regulation cricket pitch at Beryl Gaffney Park. The published scope includes:
          </p>
          <ul style={{fontFamily: 'var(--serif)', fontSize: 18, lineHeight: 1.6, margin: '0 0 24px', paddingLeft: 24, color: 'var(--ink)'}}>
            <li>A 100-metre by 125-metre playing field, with an additional 10-metre run-out.<Sidenote n="2">Dimensions published on the Engage Ottawa project page for the Beryl Gaffney Park cricket pitch consultation.</Sidenote></li>
            <li>A relocated stone-dust pathway through the affected area.</li>
            <li>A chain-link fence separating pedestrians from the field of play.</li>
            <li>A shaded, accessible picnic area.</li>
            <li>Foundation work to support a future equipment-storage shed.</li>
          </ul>
          <p>
            The pitch is to be built on &ldquo;the field closest to the parking lot.&rdquo; The public consultation ran on Engage Ottawa and closed on March 11, 2026. The City has completed a &ldquo;What We Learned&rdquo; report summarizing the input received.
          </p>
          <p>
            Beryl Gaffney is one of several sites in a city-wide program. The City has committed to up to six cricket pitches<Sidenote n="3">CTV News Ottawa, &ldquo;City of Ottawa planning to create up to 6 new cricket pitches,&rdquo; March 5, 2026; corroborated by Councillor Wilson Lo's February 24, 2025 newsletter.</Sidenote> across Ottawa. Announced or confirmed sites include Bradley-Craig Park and a second location in Stittsville, Beryl Gaffney in Nepean, and François Dupuis Recreation Centre in Orléans.
          </p>
          <p>
            Mayor Mark Sutcliffe has described the program as a response to &ldquo;the growing population of cricket players.&rdquo; Councillor Wilson Lo (Barrhaven East), the ward councillor, has encouraged residents to participate in the consultation.
          </p>
        </div>

        <div className="fact-strip cols-5">
          <div className="fact"><div className="num">100&thinsp;×&thinsp;125 m</div><div className="lbl">Pitch dimensions</div></div>
          <div className="fact"><div className="num">≈4%</div><div className="lbl">Of the park</div></div>
          <div className="fact"><div className="num">6</div><div className="lbl">Pitches citywide</div></div>
          <div className="fact"><div className="num">Mar 11</div><div className="lbl">Consultation closed, 2026</div></div>
          <div className="fact"><div className="num">40 / 6</div><div className="lbl">Teams share 6 grounds today</div></div>
        </div>

        <div className="src">Sources: Engage Ottawa — Beryl Gaffney cricket pitch project page; CTV News, &ldquo;City of Ottawa planning to create up to 6 new cricket pitches,&rdquo; March 5, 2026; Councillor Wilson Lo, weekly newsletters dated February 24, 2025 and March 11, 2026; Councillor Glen Gower, Stittsville ward communications.</div>
      </div>
    </section>
  );
}

function Demand() {
  return (
    <section id="demand">
      <div className="container">
        <div className="eyebrow">Section 03 · The Demand</div>
        <SectionHeading id="demand">The case <em>the proponents</em> make.</SectionHeading>
        <div className="prose">
          <p>
            Cricket is the fastest-growing sport by participation in Canada. Cricket Canada counts approximately 38,186 registered players today.<Sidenote n="4">Cricket Canada registration figures, 2024 season filing.</Sidenote> Federal and Cricket Canada projections point to more than 500,000 players by 2033.<Sidenote n="5">Cricket Canada strategic plan and federal Sport Canada projections; cited in CBC News, &ldquo;Ottawa cricket fans make pitch for new places to play,&rdquo; May 2021.</Sidenote>
          </p>
          <p>
            Canadian cricket is not new. The country's national governing body was established in 1892. The sport has been played on what is now Canadian soil since 1785.<Sidenote n="6">Cricket Canada organizational history; the 1785 date refers to the first documented match on what is now Canadian territory and is cited in multiple Canadian cricket histories.</Sidenote>
          </p>
        </div>

        <div className="fact-strip">
          <div className="fact"><div className="num big">40</div><div className="lbl">Teams in Ottawa</div></div>
          <div className="fact"><div className="num big">6</div><div className="lbl">Grounds currently available</div></div>
          <div className="fact"><div className="num big">500,000</div><div className="lbl">Projected Canadian players by 2033</div></div>
        </div>

        <TeamsGroundsMotif/>

        <div className="prose" style={{marginTop: 40}}>
          <p>In Ottawa specifically:</p>
          <ul style={{fontFamily: 'var(--serif)', fontSize: 18, lineHeight: 1.7, margin: '0 0 24px', paddingLeft: 24, color: 'var(--ink)'}}>
            <li>Roughly 40 teams currently share 6 grounds.<Sidenote n="7">Ottawa Sports Pages coverage of the Ontario Central T20, July 2025, reporting on Ottawa Valley Cricket Council team counts and available grounds.</Sidenote></li>
            <li>The Ottawa Valley Cricket Council administers 24 of those teams.</li>
            <li>The Barrhaven Cricket Club was founded in 2021.</li>
            <li>The Kanata Cricket Club was founded in 2022.</li>
            <li>Monarch Cricket, the city's first dedicated indoor cricket venue, opened in 2021.</li>
          </ul>
          <p>
            Ottawa's South Asian population — one of several communities with strong cultural ties to cricket — grew from 26,640 residents in 2005 to 40,725 in 2016, a 53% increase over eleven years. Canadian cricket participation has historically tracked immigration from Commonwealth countries where the sport is common.
          </p>
          <p>
            With six new pitches in place, Ottawa's ratio of cricket teams to grounds would move from roughly 6.7 teams per ground to roughly 3.3. For comparison, the City of Toronto maintains a dedicated Cricket Strategy.
          </p>
        </div>

        <blockquote style={{marginTop: 48}}>
          Cricket's Canadian governing body dates to 1892. The sport has been played in Canada since 1785.
        </blockquote>

        <div className="src">Sources: Cricket Canada; CBC News, &ldquo;Ottawa cricket fans make pitch for new places to play,&rdquo; May 2021; Statistics Canada census data; Ottawa Sports Pages, OVCC at Ontario Central T20, July 2025; Ottawa Valley Cricket Council; Barrhaven Cricket Club; Kanata Cricket Club; Monarch Cricket; City of Toronto Cricket Strategy.</div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, SectionHeading, Sidenote, Hero, Park, Project, Demand });
