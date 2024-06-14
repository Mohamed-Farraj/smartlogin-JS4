let rmsg = document.getElementById("stateMsg");
let eye = document.getElementById("eye");
let check = document.getElementById("btn-check-4");
let passwordInput = document.getElementById("password");
let email = document.getElementById("email");
let err;
let accounts = [];
accounts = JSON.parse(localStorage.getItem("users"));
console.log(accounts);

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].email === email.value) {
      if (accounts[i].password === passwordInput.value) {
        email.value = "";
        passwordInput.value = "";
        err = false;
        localStorage.setItem('un',accounts[i].username);
        window.location.href = "../../smartlogin-JS4/index.html";
        break;
      }
    }
    else
    { 
         rmsg.classList.remove("d-none");
         err = true;
    }
  }
  if(err){
      rmsg.innerHTML = `<span class="text-danger fs-3"><i class="fa-solid fa-xmark"></i> somthing wrong in email or password</span>`;
  }
  if((email.value=="" || passwordInput.value=="") && err)
    {
        rmsg.innerHTML = `<span class="text-danger"><i class="fa-solid fa-xmark"></i> fill all inputs</span>`;

    }
});

check.addEventListener("change", function () {
  if (this.checked) {
    passwordInput.setAttribute("type", "text");
    eye.classList.replace("fa-eye-slash", "fa-eye");
    eye.classList.add("text-primary");
  } else {
    passwordInput.setAttribute("type", "password");
    eye.classList.replace("fa-eye", "fa-eye-slash");
    eye.classList.remove("text-primary");
  }
});
