import { Button, Card, Form } from "react-bootstrap";
import { useLoginController } from "../controllers/useLoginController";

function Login() {
  const { email, password, handleLogin, setEmail, setPassword } =
    useLoginController();
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center w-100"
      style={{ height: "100vh" }}
    >
      <Card className="w-25">
        <Card.Body>
          <Card.Title>Login</Card.Title>

          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>

          <Button
            variant="primary"
            className="w-100"
            onClick={() => handleLogin()}
          >
            Login
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
