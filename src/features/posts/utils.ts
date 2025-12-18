export const consultaionStatusColors: Record<string, string> = {
  completed: "text-green-600",
  cancelled: "text-red-600",
  scheduled: "text-blue-600",
  default: "text-gray-600",
};

export const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("pt-BR", { dateStyle: "medium" });
