
type TagProps = {
  name: string;
  className?: string; // permite adicionar classes extras se necessário
};

export default function Tag({ name, className = "" }: TagProps) {
  return (
    <span
      className={`px-2 py-1 bg-gray-200 text-gray-800 rounded text-sm ${className}`}
    >
      {name}
    </span>
  );
}
