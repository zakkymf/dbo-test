import React from "react";
import type { UserData } from "../../../../shared/interface";
import { Button } from "react-bootstrap";

interface UserTableProps {
  user: UserData | null;
  onClick: () => void;
}

function UserTable({ user, onClick }: UserTableProps) {
  return (
    <tr key={user?.id}>
      <td>{user?.id}</td>
      <td>{user?.name}</td>
      <td>{user?.role}</td>
      <td>{user?.email}</td>
      <td>{user?.phone}</td>
      <td>{new Date(user?.registered_at || "").toLocaleString("id-ID")}</td>
      <td>
        <Button size="sm" variant="secondary" onClick={onClick}>
          Lihat Detail
        </Button>
      </td>
    </tr>
  );
}

export default React.memo(UserTable);
