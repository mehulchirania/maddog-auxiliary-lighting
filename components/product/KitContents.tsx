export default function KitContents({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-0.5 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="border-ink-900/10 text-ink-700 flex items-start gap-3 border-b py-3 text-[14px] last:border-b-0"
        >
          <span className="bg-ink-600 mt-2 h-1 w-1 shrink-0 rounded-full" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}
