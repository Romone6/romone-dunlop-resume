import type { EventItem } from "@/content/site";

type EventCardProps = {
  event: EventItem;
};

export function EventCard({ event }: EventCardProps) {
  const content = (
    <article className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {event.timeframe}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-white">{event.title}</h3>
      <p className="mt-1 text-sm text-slate-400">
        {event.organisation} · {event.location}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">{event.summary}</p>
    </article>
  );

  if (event.href) {
    return (
      <a
        href={event.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full transition hover:opacity-95"
      >
        {content}
      </a>
    );
  }

  return content;
}
