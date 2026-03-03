import { Form } from "react-router";

function Login() {
  return (
    <Form method="post">
      <label htmlFor="username">
        Username:
        <input type="text" name="username" id="username" defaultValue="a" />
      </label>
      <label htmlFor="password" defaultValue="a">
        Password:
        <input type="password" name="password" id="password" />
      </label>
      <input type="submit" value="Log In" />
    </Form>
  );
}

export { Login };
