export const formatDate = (date: Date | string) =>
  new Date(date).toLocaleString("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
