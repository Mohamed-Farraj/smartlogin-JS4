let validatoru = false;
let validatore = false;
let rmsg = document.getElementById("stateMsg");
let eye = document.getElementById("eye");
let registere = document.getElementById("registere");
let check = document.getElementById("btn-check-4");
let passwordInput = document.getElementById("password");
let passwordrule = document.getElementById("passwordrule");
let email = document.getElementById("email");
let usernameInput = document.getElementById("username");
let emailrule = document.getElementById("emailrules");
let capitalletter = document.getElementById("usernameruleC");
let nospaces = document.getElementById("usernameruleS");
let dublicatEmail=false;
let users = [];
let account = {
    username,
    email,
    password
}

users = JSON.parse(localStorage.getItem('users'));

console.log(users);
if (users === null) {
  users = [];
}
console.log(users);

//----------------------username------------------------------------
usernameRegex = new RegExp("^[A-Z][^s]*$", "gm");
firstletterRegex = new RegExp("^[A-Z]", "gm");
usernameInput.addEventListener("input", function () {
  if (!usernameRegex.test(this.value)) {
    validatoru = false;
    if (this.value.includes(" ")) {
      nospaces.innerHTML = `<i class="fa-solid fa-xmark"></i> spaces not allowed`;
      nospaces.classList.add("text-danger");
      nospaces.classList.remove("text-primary");
    } else {
      nospaces.innerHTML = `<i class="fa-solid fa-check"></i> spaces not allowed`;
      nospaces.classList.remove("text-danger");
      nospaces.classList.add("text-primary");
    }
    if (firstletterRegex.test(this.value)) {
      capitalletter.innerHTML = `<i class="fa-solid fa-check"></i>  First letter must be capital`;
      capitalletter.classList.remove("text-danger");
      capitalletter.classList.add("text-primary");
    } else if (!firstletterRegex.test(this.value)) {
      capitalletter.innerHTML = `<i class="fa-solid fa-xmark"></i>  First letter must be capital`;
      capitalletter.classList.add("text-danger");
      capitalletter.classList.remove("text-primary");
    }
    if (this.value === "") {
      capitalletter.innerHTML = `<i class="fa-solid fa-caret-right"></i>  First letter must be capital`;
      nospaces.innerHTML = `<i class="fa-solid fa-caret-right"></i> spaces not allowed`;
      capitalletter.classList.remove("text-primary", "text-danger");
      nospaces.classList.remove("text-primary", "text-danger");
      validatoru = false;
    }
  } else {
    validatoru = true;
    capitalletter.innerHTML = `<i class="fa-solid fa-check"></i>  First letter must be capital`;
    nospaces.innerHTML = `<i class="fa-solid fa-check"></i> spaces not allowed`;
    capitalletter.classList.add("text-primary");
    nospaces.classList.add("text-primary");
    capitalletter.classList.remove("text-danger");
    nospaces.classList.remove("text-danger");
    console.log("all things is good in username");
  }
});
//----------------------username------------------------------------

//@@@@@@@@@@@@@@@@@@ email functions @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
let emailregex = new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
email.addEventListener("input", function () {
  console.log(this.value);
  if(users.length==0){dublicatEmail=true}
  for (let i = 0; i < users.length; i++) {
    if(users[i].email === this.value)
        {
            console.log("اييييييييييييييه بقا");
            dublicatEmail=false;
            break;
        }
        else
        {
            dublicatEmail=true;
        }
        console.log(dublicatEmail);
  }
  console.log(dublicatEmail);
  
  if (this.value == "") {
    console.log("ايه بقا");
    emailrule.classList.remove("text-primary", "text-danger");
    emailrule.innerHTML = `<i class="fa-solid fa-caret-right"></i> email address must be valid one`;
    validatore = false;
  }
  if (emailregex.test(this.value)) {
    emailrule.classList.add("text-primary");
    emailrule.classList.remove("text-danger");
    emailrule.innerHTML = `<i class="fa-solid fa-check"></i> thats good`;
    validatore = true;
  } else if (!emailregex.test(this.value) && this.value !== "") {
    emailrule.classList.add("text-danger");
    emailrule.classList.remove("text-primary");
    emailrule.innerHTML = `<i class="fa-solid fa-xmark"></i> this email is not valid one`;
    validatore = false;
  }
  if (dublicatEmail == false) {
    console.log("اااااااااااااااااااااا ")
emailrule.classList.add("text-danger");
emailrule.classList.remove("text-primary");
emailrule.innerHTML = `<i class="fa-solid fa-xmark"></i> this email is used before use another one`;
validatore = false;
}
  
});

//@@@@@@@@@@@@@@@@@@ email functions @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//***********************password functions*************************
check.addEventListener("change", function () {
  if (this.checked) {
    passwordInput.setAttribute("type", "text");
    eye.classList.replace("fa-eye-slash", "fa-eye");
    eye.classList.add("text-primary");
    // eye.classList.remove('text-white');
  } else {
    passwordInput.setAttribute("type", "password");
    eye.classList.replace("fa-eye", "fa-eye-slash");
    eye.classList.remove("text-primary");
  }
});
passwordInput.addEventListener("input", function () {
  console.log(this.value.length);
  if (this.value.length < 5 && this.value.length >= 1) {
    passwordrule.classList.add("text-warning");
    passwordrule.classList.remove("text-primary");
    passwordrule.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> too short`;
  } else if (this.value.length >= 5) {
    passwordrule.classList.remove("text-warning");
    passwordrule.classList.add("text-primary");
    passwordrule.innerHTML = `<i class="fa-solid fa-check"></i> thats good`;
  } else {
    passwordrule.classList.remove("text-primary", "text-warning");
    passwordrule.innerHTML = `<i class="fa-solid fa-caret-right"></i> use hard one`;
  }
});
//***********************password functions*************************

//=============================submit===============================
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(validatoru, validatore);
  if (validatoru && validatore && dublicatEmail) {
    account.username=usernameInput.value;
    account.email=email.value;
    account.password=passwordInput.value;
    users.push(account);
    localStorage.setItem('users',JSON.stringify(users));
    rmsg.innerHTML = `<span class="text-primary"><i class="fa-solid fa-check"></i> Success you can login now</span>`;
    usernameInput.value="";
    email.value="";
    passwordInput.value="";
    validatoru=false;
    validatore=false;
  } else {
    rmsg.innerHTML = `<span class="text-danger"><i class="fa-solid fa-xmark"></i> adhere to guidelines consistently</span>`;
  }
});
// registere.addEventListener('submit',function(e){
//     e.preventDefault();
//     console.log('validator');
// })
//=============================submit===============================
