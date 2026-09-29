export type LegalSection = { h: string; p: string[] };

export function LegalPage({ title, updated, intro, sections }: { title: [string, string]; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <section className="wrap py-12 md:py-16">
      <div className="mx-auto max-w-[720px]">
        <h1 className="h-display">
          {title[0]}
          <br />
          {title[1]}
        </h1>
        <p className="mt-6 text-[13px] text-ink">Last updated</p>
        <p className="mt-1 text-[13px] text-body">{updated}</p>
        <div className="prose-atlas mt-8 text-[14px]">
          <p>{intro}</p>
          {sections.map((s) => (
            <div key={s.h}>
              <h3>{s.h}</h3>
              {s.p.map((t) => (
                <p key={t.slice(0, 40)}>{t}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
