import React from "react";
import type { UserData } from "../../../../shared/interface";

interface UserDetailProps {
  selectedUser: UserData | null;
}

function UserDetail({ selectedUser }: UserDetailProps) {
  return (
    <div className="d-flex flex-column gap-2">
      <div>
        <p className="fw-bold">Nama Customer</p>
        <p>{selectedUser?.name}</p>
      </div>
      <div>
        <p className="fw-bold">Role</p>
        <p>{selectedUser?.role}</p>
      </div>
      <div>
        <p className="fw-bold">Email</p>
        <p>{selectedUser?.email}</p>
      </div>
      <div>
        <p className="fw-bold">No. HP</p>
        <p>{selectedUser?.phone}</p>
      </div>
      <div>
        <p className="fw-bold">Tanggal Registrasi</p>
        <p>
          {new Date(selectedUser?.registered_at || "").toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}

export default React.memo(UserDetail);
