import { useEffect, useState } from "react";

const channels = [
  { name: "About", title: "A little further from home.", text: "I combine youth advocacy with hands-on project building to create practical ways into new opportunities. I’m Romone Dunlop, a Year 12 student from Port Macquarie.", scene: "about", background: "/channel-scenes/simpsons-reference.png", lettering: "sitcom", accent: "#ffd260" },
  { name: "Youth voice", title: "Regional voices belong in the room.", text: "I represent the Mid-North Coast on the NSW Youth Advisory Council, contribute to Hastings Youth Voice and serve as Port Macquarie–Hastings Council’s Youth Media Spokesperson, bringing regional perspectives into civic conversations.", scene: "youth", background: "/channel-scenes/bluey-house.png", lettering: "editorial", accent: "#f7a76d" },
  { name: "Pathway", title: "Make the next step clearer.", text: "I started Pathway to Entry and worked with others to turn student input into a practical toolkit for regional students planning applications, scholarships and life after school.", proof: "40+ schools · 200+ young people consulted · 103 opportunities · 59 key dates", scene: "pathway", background: "/channel-scenes/craig-creek-bed.jpg", lettering: "quest", accent: "#ffce62" },
  { name: "Bloom", title: "Notice the small changes.", text: "I’m working on Bloom, a cognitive-monitoring tool that helps participants, carers and clinicians track changes over time. It is in active development and has been implemented in 10 clinics.", scene: "bloom", background: "/channel-scenes/pallet-town.png", lettering: "family", accent: "#eea8d0" },
  { name: "MindBridge", title: "A clearer first step into care.", text: "I’m developing an AI-assisted intake experience for mental-health clinics, helping people organise their first account and prepare a clear handoff to a clinician. Clinical judgement stays with the clinician.", scene: "mindbridge", background: "/channel-scenes/trolberg-night.jpg", lettering: "storybook", accent: "#9bc9ff" },
  { name: "JOINRFS", title: "Good tools help people step up.", text: "I helped build JOINRFS, a volunteer-recruitment funnel and operator dashboard for rural fire services, giving teams a clearer workflow for enquiries, follow-ups and next steps.", scene: "joinrfs", background: "/channel-scenes/pontypandy-station.jpg", lettering: "team", accent: "#ff9e69" },
  { name: "Tau Ceti", title: "Show the working. Keep the wonder.", text: "I assembled a reproducible analysis of Tau Ceti’s debris disc, sharing the data, code and checks alongside the result so others can inspect how it was produced and where its limits lie.", proof: "Archived research release · Zenodo DOI 10.5281/zenodo.22021388", scene: "tau-ceti", background: "/channel-scenes/new-new-york.jpg", lettering: "science", accent: "#a9d6ff" },
  { name: "Work & study", title: "Learn by taking responsibility.", text: "I’m completing Year 12 at Hastings Secondary College and the Southern Cross University Scholars Program, where I’ve earned a distinction average and $10,000 scholarship. At McDonald’s, I’m a Crew Trainer and NextGen Shift Leader.", proof: "Southern Cross Scholars Program · distinction average · $10,000 scholarship", scene: "work-study", background: "/channel-scenes/elwood-city.jpg", lettering: "slice", accent: "#ffd18b" },
  { name: "Contact", title: "Let’s make something useful.", text: "I bring initiative, communication and practical problem-solving to work that helps people participate. Explore the projects here, or get in touch about building something useful together.", email: "romonedunlop2@gmail.com", scene: "contact", background: "/channel-scenes/candy-kingdom.jpg", lettering: "credits", accent: "#f4d26e" },
];

export function App() {
  const [channelIndex, setChannelIndex] = useState(0);
  const [remoteOpen, setRemoteOpen] = useState(false);
  const [tuning, setTuning] = useState(false);
  const channel = channels[channelIndex];

  const changeChannel = (index) => {
    const next = (index + channels.length) % channels.length;
    if (next === channelIndex) return;
    setTuning(true);
    window.setTimeout(() => {
      setChannelIndex(next);
      setTuning(false);
    }, 260);
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.code === "Space") {
        event.preventDefault();
        setRemoteOpen((open) => !open);
      } else if (event.key === "Escape") {
        setRemoteOpen(false);
      } else if (remoteOpen && event.key === "ArrowUp") {
        changeChannel(channelIndex + 1);
      } else if (remoteOpen && event.key === "ArrowDown") {
        changeChannel(channelIndex - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [channelIndex, remoteOpen]);

  return (
    <main className={`tv-room ${remoteOpen ? "remote-is-open" : ""}`}>
      <div className="room-wall" aria-hidden="true">
        <div className="wall-print wall-print--one" /><div className="wall-print wall-print--two" />
        <div className="floor" />
      </div>

      <section className="tv-set" aria-label={`Channel ${String(channelIndex + 1).padStart(2, "0")}: ${channel.name}`}>
        <div className="tv-shell">
          <div className={`tv-screen ${tuning ? "is-tuning" : ""}`} style={{ "--show-accent": channel.accent }}>
            <div className="screen-cartoon" aria-hidden="true">
              <img key={channel.scene} className={`cartoon-frame cartoon-frame--${channel.scene} ${channel.lettering === "sitcom" ? "cartoon-frame--simpsons" : ""}`} src={channel.background || `/channel-scenes/${channel.scene}.svg`} alt="" />
              <div className="screen-noise" />
            </div>
              <div key={channelIndex} className={`tv-copy tv-copy--${channel.lettering}`}>
              <p className="channel-kicker">CHANNEL {String(channelIndex + 1).padStart(2, "0")} <span>·</span> {channel.name}</p>
              <h1>{channel.title}</h1>
              <p className="channel-copy">{channel.text}</p>
              {channel.email && <a className="channel-email" href={`mailto:${channel.email}`}>{channel.email}</a>}
              {channel.proof && <p className="channel-proof">{channel.proof}</p>}
            </div>
            <div className="crt-lines" aria-hidden="true" />
            <div className="screen-glare" aria-hidden="true" />
            <div className="channel-bug"><span>CH</span> {String(channelIndex + 1).padStart(2, "0")}</div>
          </div>
          <div className="tv-chin"><span className="tv-speaker" /><span className="tv-brand">DUNLOP TV</span><i className="power-light" /></div>
        </div>
        <div className="tv-stand" aria-hidden="true" />
        <div className="tv-console" aria-hidden="true" />
      </section>

      <aside className={`remote ${remoteOpen ? "remote--open" : ""}`} aria-label="TV remote" aria-hidden={!remoteOpen} inert={!remoteOpen}>
        <div className="remote-top"><span>CHANNEL<br />REMOTE</span><button className="remote-power" aria-label="Close remote" onClick={() => setRemoteOpen(false)}>×</button></div>
        <button className="remote-ch remote-ch--up" onClick={() => changeChannel(channelIndex + 1)}><span>▲</span> CH +</button>
        <button className="remote-ch remote-ch--down" onClick={() => changeChannel(channelIndex - 1)}><span>▼</span> CH −</button>
        <div className="remote-numberpad" aria-label="Choose channel">
          {channels.map((item, index) => <button key={item.name} aria-label={`Channel ${index + 1}: ${item.name}`} aria-pressed={index === channelIndex} onClick={() => changeChannel(index)}>{index + 1}</button>)}
        </div>
        <div className="remote-bottom"><span>VOL</span><i /><i /><i /></div>
      </aside>

      <div className="room-floor-glow" aria-hidden="true" />
      <footer className="room-controls">
        <div className="tune-hint"><span className="keycap">SPACE</span> {remoteOpen ? "close remote" : "open remote"}<span className="hint-separator">·</span> <span className="keycap keycap--small">↑ ↓</span> change channel</div>
        <div className="channel-switcher" aria-label="Channel selection">
          {channels.map((item, index) => <button key={item.name} aria-label={`Tune to ${item.name}`} aria-pressed={index === channelIndex} onClick={() => changeChannel(index)}><i>{String(index + 1).padStart(2, "0")}</i></button>)}
        </div>
      </footer>

      <button className="mobile-remote-button" aria-label={remoteOpen ? "Close TV remote" : "Open TV remote"} onClick={() => setRemoteOpen((open) => !open)}><span aria-hidden="true">⌘</span> {remoteOpen ? "Close remote" : "Remote"}</button>
    </main>
  );
}
