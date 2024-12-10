export function formatError(errorResponse) {
  switch (errorResponse) {
    case "EMAIL_EXISTS":
      swal("Oops", "Email already exists", "error");
      break;
    case "User not found":
      swal("Oops", "User not found", "error", { button: "Try Again!" });
      break;
    case "Invalid email or password":
      swal("Oops", "Invalid Password", "error", { button: "Try Again!" });
      break;
    case "USER_DISABLED":
      return "User Disabled";

    default:
      return "";
  }
}

export function saveUserDetials(tokenDetails) {
  localStorage.setItem("userDetails", JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch, timer, navigate) {
  // setTimeout(() => {
  //     //dispatch(Logout(history));
  //     dispatch(Logout(navigate));
  // }, timer);
}
