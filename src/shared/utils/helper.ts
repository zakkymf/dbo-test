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

export const statusStyleMap = {
  Pending: {
    background: "#FFF3CD",
    textColor: "#856404",
  },
  Completed: {
    background: "#D4EDDA",
    textColor: "#155724",
  },
  Cancelled: {
    background: "#F8D7DA",
    textColor: "#721C24",
  },
};

export const roleStyleMap = {
  Customer: {
    background: "#BBDEFB",
    textColor: "#0D47A1",
  },
  Supplier: {
    background: "#E1BEE7",
    textColor: "#4A148C",
  },
};
