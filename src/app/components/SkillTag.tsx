export function SkillTag({ name }: { name: string }) {
  return (
    <span className="px-3 py-1 text-sm bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 font-medium rounded-full shadow-sm hover:shadow-md transition">
      {name}
    </span>
  );
}