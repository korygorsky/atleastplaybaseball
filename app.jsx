function App() {
  const [active, setActive] = React.useState('park');
  React.useEffect(() => {
    const ids = ['park','project','demand','concerns','comments','precedent','questions','about','sources'];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });

    const chips = document.querySelector('.nav-chips');
    let updateChips = null;
    if (chips) {
      updateChips = () => {
        const atEnd = chips.scrollLeft + chips.clientWidth >= chips.scrollWidth - 2;
        chips.classList.toggle('at-end', atEnd);
      };
      chips.addEventListener('scroll', updateChips, { passive: true });
      window.addEventListener('resize', updateChips);
      updateChips();
    }

    return () => {
      obs.disconnect();
      if (updateChips && chips) {
        chips.removeEventListener('scroll', updateChips);
        window.removeEventListener('resize', updateChips);
      }
    };
  }, []);
  return (
    <div className="page">
      <Nav active={active}/>
      <Hero/>
      <Park/>
      <Project/>
      <Demand/>
      <Concerns/>
      <Comments/>
      <Precedent/>
      <Questions/>
      <About/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
