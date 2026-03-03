import { Form } from "react-router";

function Login() {
  return (
    <Form method="post">
      <label htmlFor="username">
        Username:
        <input type="text" name="username" id="username" />
      </label>
      <label htmlFor="password">
        Password:
        <input type="password" name="password" id="password" />
      </label>
      <input type="submit" value="Log In" />
    </Form>
  );
}

export { Login };
