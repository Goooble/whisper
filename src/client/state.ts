const menu = (function () {
  let login: boolean = false;
  let name: string;

  function setLogin(b: boolean) {
    login = b;
  }
  function clientInit(s: string) {
    name = s;
  }
  function data() {
    return { login, name };
  }

  return { setLogin, clientInit, data };
})();

export { menu };
