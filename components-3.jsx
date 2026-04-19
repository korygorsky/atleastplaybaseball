function Precedent() {
  const ampticks = [
    {x: 0, label: '2018'},
    {x: 25, label: '2020'},
    {x: 50, label: '2022'},
    {x: 75, label: '2024'},
    {x: 100, label: '2026'},
  ];
  return (
    <section id="precedent">
      <div className="container precedent-inner">
        <PaddleBatMotif/>
        <div className="eyebrow">Section 06 · A Precedent</div>
        <SectionHeading id="precedent">Manotick and pickleball, <em>2018–2023.</em></SectionHeading>
        <div className="prose">
          <p>
            The same community has organized against a park amenity before. The way that precedent played out is a useful check on any reading of the current opposition as reducible to one cause.
          </p>
        </div>

        <h3 style={{fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, color: 'var(--ink)', margin: '32px 0 16px', letterSpacing: '-0.01em'}}>The pickleball case</h3>
        <div className="prose">
          <p>
            In 2018, the Manotick Tennis Club converted one tennis court at Centennial Park into four pickleball courts.<Sidenote n="8">Manotick Messenger, &ldquo;Noise Complaints Leave Pickleball Players With No Place To Play,&rdquo; 2023; corroborated by CBC News coverage of the Ottawa pickleball noise debate.</Sidenote> Pickleball membership in the area grew to approximately 825 players.
          </p>
          <p>
            Between 2020 and 2023, organized opposition formed around noise. One neighbour characterized pickleball paddles as &ldquo;about 10 times as loud as tennis.&rdquo; Opposition was accompanied by sound-level measurements and a petition.
          </p>
          <p>
            A 2022 public consultation on the issue recorded 53% support for expansion and 38% describing noise as a serious concern.
          </p>
          <p>
            In 2023, the City determined that outdoor pickleball at Centennial Park would no longer be permitted.<Sidenote n="9">Ottawa Express coverage of the Centennial Park pickleball consultation outcome, 2023.</Sidenote> Displaced players were directed to indoor facilities and to Alfred Taylor Park in North Gower.
          </p>
        </div>

        <div className="ribbon-wrap wide" style={{margin: '32px 0 12px'}}>
          <div style={{position: 'relative', height: 112, borderTop: '1px solid var(--ink-15)', borderBottom: '1px solid var(--ink-15)', padding: '16px 0'}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 60, height: 1, background: 'var(--ink-15)'}}/>
            {ampticks.map(t => (
              <React.Fragment key={t.label}>
                <div style={{position: 'absolute', top: 56, left: `${t.x}%`, width: 1, height: 8, background: 'var(--ink-40)'}}/>
                <div style={{position: 'absolute', top: 68, left: `${t.x}%`, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-60)', transform: 'translateX(-50%)'}}>{t.label}</div>
              </React.Fragment>
            ))}
            <div style={{position: 'absolute', left: '0%', width: '62.5%', top: 20, height: 22, background: 'var(--viz-3)', display: 'flex', alignItems: 'center', padding: '0 12px', fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 600, color: 'var(--paper)'}}>
              Pickleball · 2018–2023
            </div>
            <div style={{position: 'absolute', left: '87.5%', width: '12.5%', top: 88, height: 22, background: 'var(--viz-5)', display: 'flex', alignItems: 'center', padding: '0 10px', fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 600, color: 'var(--paper)'}}>
              Cricket · 2025–
            </div>
          </div>
        </div>

        <div className="compare-grid">
          <div className="compare-card">
            <div className="c-label">Pickleball 2018–2023</div>
            <h3>Manotick, Centennial Park</h3>
            <dl>
              <div><dt>Amenity</dt><dd>Four pickleball courts converted from one tennis court.</dd></div>
              <div><dt>Opposition basis</dt><dd>Noise. Sound-level readings taken. Petition circulated.</dd></div>
              <div><dt>Consultation</dt><dd>2022 public consultation: 53% support for expansion; 38% described noise as a serious concern.</dd></div>
              <div><dt>Outcome</dt><dd>2023 — outdoor pickleball at Centennial Park no longer permitted. Players directed to indoor facilities and Alfred Taylor Park.</dd></div>
            </dl>
          </div>
          <div className="compare-card">
            <div className="c-label">Cricket 2025–2026</div>
            <h3>Beryl Gaffney Park</h3>
            <dl>
              <div><dt>Amenity</dt><dd>One regulation cricket pitch, ≈1.5 ha of a 39 ha park.</dd></div>
              <div><dt>Opposition basis</dt><dd>Dog-park preservation; turtle habitat; traffic; consultation adequacy.</dd></div>
              <div><dt>Consultation</dt><dd>Engage Ottawa. Comment period closed March 11, 2026. &ldquo;What We Learned&rdquo; report completed.</dd></div>
              <div><dt>Outcome</dt><dd>Pending.</dd></div>
            </dl>
          </div>
        </div>

        <h3 style={{fontFamily: 'var(--sans)', fontSize: 22, fontWeight: 600, color: 'var(--ink)', margin: '48px 0 16px', letterSpacing: '-0.01em'}}>The point of drawing the comparison</h3>
        <div className="prose">
          <p>Manotick is not a community without a track record of opposing park amenities. In the pickleball case:</p>
          <ul style={{fontFamily: 'var(--serif)', fontSize: 18, lineHeight: 1.7, margin: '0 0 24px', paddingLeft: 24, color: 'var(--ink)'}}>
            <li>The amenity was not associated with any particular ethnic or cultural community.</li>
            <li>The opposition was measurable. Sound readings were taken. Consultation occurred. The community made a reasoned case for a specific impact.</li>
            <li>The opposition won.</li>
          </ul>
          <p>
            Several of the concerns raised about the cricket pitch — dog-park preservation, turtle habitat, traffic, consultation adequacy — belong in the same category as the pickleball concerns. They are the concerns a community is entitled to raise about any change to a park, whatever the amenity.
          </p>
          <p>
            What the pickleball precedent does not explain is the second layer present in the cricket-pitch opposition: the <em>Cultural</em> and <em>Coded</em> categories in the section above. There was no parallel layer in the pickleball record. The comment threads about pickleball did not ask where the players were from, did not invoke foreign countries, and did not frame the amenity as an accommodation of outside interests.
          </p>
          <p>
            Put plainly: the <em>concerns</em> about the cricket pitch are concerns that could, and sometimes do, accompany any park amenity change in this community. The <em>commentary</em> around the cricket pitch is not. Remove the Cultural and Coded comment layers from the cricket-pitch opposition, and what remains is the pickleball case — reasoned amenity concerns, legitimate consultation questions, an organized neighbourhood getting what it wants.
          </p>
        </div>

        <blockquote className="hinge">
          What distinguishes the two cases is not the concerns. It is what is being said alongside them, and about whom.
        </blockquote>

        <div className="src">Sources: CBC News — &ldquo;The pickleball noise debate has landed in Ottawa&rdquo;; Manotick Messenger — &ldquo;Noise Complaints Leave Pickleball Players With No Place To Play,&rdquo; 2023; Ottawa Express coverage of Centennial Park pickleball consultation; CTV News regional coverage.</div>
      </div>
    </section>
  );
}

const QUESTIONS = [
  {
    head: "Has the City commissioned a Species at Risk assessment specific to the cricket pitch footprint?",
    body: "Three turtle species on the Ontario Species at Risk list are native to the Rideau watershed that borders the park. The project scope includes grading, fencing, and a new pathway in an area adjacent to known nesting habitat. An assessment should exist; if it does, it has not been posted to Engage Ottawa.",
  },
  {
    head: "What are the current traffic counts on Rideau Valley Drive, and what is the projected change during weekend match play?",
    body: "The road outside the park is a two-lane rural route with limited shoulders. One of the named residents quoted by CTV News raised this concern on the record. A traffic impact assessment does not appear to have been publicly released.",
  },
  {
    head: "What is the exact acreage of designated off-leash space in Beryl Gaffney Park before and after the project?",
    body: "\u201CThe park remains 96% available for off-leash use\u201D is only accurate if the current off-leash designation covers the whole park. A published before-and-after acreage would settle that question definitively.",
  },
  {
    head: "Will the Rideau Valley Conservation Authority be formally consulted on the project?",
    body: "The park borders the Rideau River and falls within the RVCA's regulated area for floodplain and riparian matters. The RVCA is headquartered next to Beryl Gaffney Park. A public record of that consultation has not been surfaced.",
  },
  {
    head: "Is there a published schedule for the pitch's operating hours and seasonal use?",
    body: "Operating hours affect whether the remaining off-leash use in the park is disrupted, and whether evening or weekend use will generate the traffic concerns referenced in question 2. A schedule would also clarify whether the pitch is intended for league play, casual use, or both.",
  },
  {
    head: "Has the City's consultation record acknowledged the distinct categories of commentary about this project?",
    body: "The \u201CWhat We Learned\u201D report summarizing the March 11, 2026 consultation has been completed. It is a question for the public consultation record, and for the Councillor's office, whether the commentary around this specific project — documented in Section 5 of this site — has been characterized to the City's satisfaction, and whether any response to that characterization is planned.",
  },
];

function Questions() {
  return (
    <section id="questions">
      <div className="container">
        <div className="eyebrow">Section 07 · Open Questions</div>
        <SectionHeading id="questions">Six questions, <em>unanswered</em> in the public record.</SectionHeading>
        <div className="prose">
          <p>
            Several questions about the Beryl Gaffney cricket pitch project and its surrounding discourse remain unanswered in the public record. They are collected here so that the next stage of consultation, reporting, or municipal review has a place to start.
          </p>
        </div>
        <ol className="q-list">
          {QUESTIONS.map((q, i) => (
            <li key={i}>
              <div>
                <h3 className="q-head">{q.head}</h3>
                <p className="q-body">{q.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="src" style={{marginTop: 24}}><em>This site will be updated as these questions are answered.</em></div>
      </div>
    </section>
  );
}

Object.assign(window, { Precedent, Questions });
