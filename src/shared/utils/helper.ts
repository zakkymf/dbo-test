export const getStatusVariant = (status: string | undefined) => {
  switch (status) {
    case "Pending":
      return "warning";
    case "Completed":
      return "success";
    case "Cancelled":
      return "danger";
    default:
      return "secondary";
  }
};
