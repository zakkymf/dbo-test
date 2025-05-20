import { Card } from "react-bootstrap";
import { roleStyleMap } from "../../../../shared/utils";

interface UserCardProps {
  role: string;
  amount: number;
}

function UserCard({ role, amount }: UserCardProps) {
  const { background, textColor } =
    roleStyleMap[role as keyof typeof roleStyleMap];
  return (
    <Card
      style={{
        backgroundColor: background,
        color: textColor,
        borderRadius: "12px",
        cursor: "pointer",
      }}
      className="text-center p-3 mb-3 hover-scale"
    >
      <Card.Body>
        <Card.Title style={{ fontWeight: 600, fontSize: "1.1rem" }}>
          {role}
        </Card.Title>
        <Card.Text style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {amount} User
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
