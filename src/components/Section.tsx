export function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="md:sticky md:top-24">
      <h2 className="text-2xl font-bold uppercase tracking-tight md:text-3xl">
        {index} {title}
      </h2>
    </div>
  );
}

export function Section({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={title.toLowerCase()} className="relative py-16 md:py-24">
      <div className="mx-auto max-w-348 px-6 md:px-10">
        <div className="w-full max-w-4xl border-t border-line pt-6">
          <div className="flex items-start gap-16">
            <SectionHeading index={index} title={title} />
            <div className="ml-auto max-w-112.5">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
