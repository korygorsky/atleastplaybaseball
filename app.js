function App() {
  const [active, setActive] = React.useState("park");
  React.useEffect(() => {
    const ids = ["park", "project", "demand", "concerns", "comments", "precedent", "questions", "about", "sources"];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    const chips = document.querySelector(".nav-chips");
    let updateChips = null;
    if (chips) {
      updateChips = () => {
        const atEnd = chips.scrollLeft + chips.clientWidth >= chips.scrollWidth - 2;
        chips.classList.toggle("at-end", atEnd);
      };
      chips.addEventListener("scroll", updateChips, { passive: true });
      window.addEventListener("resize", updateChips);
      updateChips();
    }
    return () => {
      obs.disconnect();
      if (updateChips && chips) {
        chips.removeEventListener("scroll", updateChips);
        window.removeEventListener("resize", updateChips);
      }
    };
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "page" }, /* @__PURE__ */ React.createElement(Nav, { active }), /* @__PURE__ */ React.createElement(Hero, null), /* @__PURE__ */ React.createElement(Park, null), /* @__PURE__ */ React.createElement(Project, null), /* @__PURE__ */ React.createElement(Demand, null), /* @__PURE__ */ React.createElement(Concerns, null), /* @__PURE__ */ React.createElement(Comments, null), /* @__PURE__ */ React.createElement(Precedent, null), /* @__PURE__ */ React.createElement(Questions, null), /* @__PURE__ */ React.createElement(About, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
