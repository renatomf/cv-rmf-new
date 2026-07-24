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
  id,
  index,
  title,
  children,
  footer,
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <section id={id} className="relative py-16 md:py-18">
      <div className="mx-auto max-w-348 px-6 md:px-10">
        <div className="w-full max-w-4xl border-t border-line pt-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-16">
            <SectionHeading index={index} title={title} />
            <div className="w-full max-w-112.5 md:ml-auto">{children}</div>
          </div>
          {footer}
        </div>
      </div>
    </section>
  );
}
