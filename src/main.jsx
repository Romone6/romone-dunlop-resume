import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/bangers/400.css";
import "@fontsource/fredoka/600.css";
import "@fontsource/chewy/400.css";
import "@fontsource/bowlby-one-sc/400.css";
import "@fontsource/berkshire-swash/400.css";
import "@fontsource/oswald/600.css";
import "@fontsource/orbitron/600.css";
import { App } from "./ChannelMvp.jsx";
import "./channel-mvp.css";

class AppErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
      console.error("Personal site render error:", error);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="flight flight--fatal">
          <section className="fatal-card" role="alert">
          <p className="story-eyebrow">The TV stopped unexpectedly</p>
          <h1>Let’s tune back in.</h1>
          <p className="story-copy">The browser reported an error while loading this scene. Reload to try again.</p>
          <button className="story-link" onClick={() => window.location.reload()}>Reload the channel</button>
          </section>
        </main>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")).render(
  <AppErrorBoundary>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppErrorBoundary>,
);
