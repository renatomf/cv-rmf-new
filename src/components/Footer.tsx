export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="mx-auto flex max-w-348 items-center justify-center gap-4 px-6 py-8 text-xs text-muted md:justify-start md:px-10">
        <span>&copy; {year} Renato Marques</span>
      </div>
    </footer>
  );
}
