let log = console.log;
import { renderPostLogin } from "./afterLogin.js";
export async function evaluateLogin() {
  // document.body.removeChild(document.querySelector("button"));
  // renderPostLogin();

  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  // log(username, password);
  let response = await axios({
    method: "post",
    headers: {
      token: localStorage.getItem("token"),
    },
    url: `https://fullstack-todo-app-4beh.onrender.com/login`,
    data: {
      email: email,
      password: password,
    },
  });
  // log("here");
  if (response.data.token != null) {
    log(response.data.token);
    log("here");
    localStorage.setItem("token", response.data.token);
    document.body.innerHTML = "";
    // document.body.removeChild(document.querySelector(document.body));
    renderPostLogin();
  } else {
    alert("Incorrect credentials.Try again.");
    return;
  }
}
export async function evaluateSignup() {
  // document.body.removeChild(document.querySelector("button"));
  // renderPostLogin();
  let name = document.querySelector("#signup-name").value;
  let password = document.querySelector("#signup-password").value;
  let email = document.querySelector("#signup-email").value;
  // log(username, password);
  try {
    let response = await axios({
      method: "post",
      url: "https://fullstack-todo-app-4beh.onrender.com/signup",
      data: {
        email: email,
        name: name,
        password: password,
      },
    });
    log(response);
    if (response.data.status == 200) {
      localStorage.setItem("token", response.data.token);
      // window.location.href = "/";
      document.body.innerHTML = "";

      renderPostLogin();
    } else {
      alert(
        "User with given email already exists. Try with a different email."
      );
    }
  } catch (e) {
    log(`Failed signup. Error-> ${e}`);
  }
  // if(response)
}
// module.exports = evaluateSignup;
