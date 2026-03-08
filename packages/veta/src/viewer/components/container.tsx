export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-[1200px] px-4">{children}</div>;
}
