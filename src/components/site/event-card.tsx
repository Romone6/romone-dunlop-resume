import type { EventItem } from "@/content/site";

function getTimeTokens(timeframe: string) {
  const dateMatch = timeframe.match(/^([A-Za-z]{3,9})\s+(\d{1,2})/);

  if (dateMatch) {
    return { primary: dateMatch[1].slice(0, 3).toUpperCase(), secondary: dateMatch[2] };
  }

  return { primary: timeframe, secondary: "" };
}

export function EventCard({ event }: { event: EventItem }) {
  const tokens = getTimeTokens(event.timeframe);

  const content = (
    <article className="flex h-full flex-col rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/18 hover:bg-white/[0.05]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-slate-500">{tokens.primary}</p>
          {tokens.secondary ? (
            <p className="mt-1 font-[family-name:var(--font-newsreader)] text-4xl leading-none text-white">
              {tokens.secondary}
            </p>
          ) : (
            <p className="mt-2 text-lg text-white">{event.timeframe}</p>
          )}
        </div>
        <span className="rounded-full border border-white/10 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-slate-400">
          Recognition
        </span>
      </div>
      <h3 className="mt-6 text-xl font-medium text-white">{event.title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-300">{event.organisation} / {event.location}</p>
      <p className="mt-4 text-sm leading-7 text-slate-500">{event.summary}</p>
    </article>
  );

  if (event.href) {
    return (
      <a href={event.href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </a>
    );
  }

  return content;
}

