const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

let registro = [
  {
    user: "admin",
    pass: "admin",
  },
];

// console.log(registro);
//middleware
app.use(express.static(__dirname)); // html, css , img.. archivos estaticos
app.use(express.urlencoded({ extended: true })); //parsear informacion enviada desde un formulario

//routing-endpoints
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/login", function (req, res) {
  let band = false;
  for (let index = 0; index < registro.length; index++) {
    if (
      req.body.user === registro[index].user &&
      req.body.pass === registro[index].pass
    ) {
      band = true;
    }
  }
  if (band) {
    res.sendFile(path.join(__dirname, "home.html"));
  } else {
    res.sendFile(path.join(__dirname, "index.html"));
  }
});

app.get("/register", function (req, res) {
  res.sendFile(path.join(__dirname, "register.html"));
});

app.post("/register", function (req, res) {
  //validar que user no exista
  let bandUser = false;
  let bandPass = false;
  for (let index = 0; index < registro.length; index++) {
    if (req.body.user == registro[index].user) {
      bandUser = true;
    } else {
      if (req.body.pass === req.body.repass) {
        bandPass = true;
      }
    }
  }
  if (bandUser == false && bandPass == true) {
    let newRegister = {
      user: req.body.user,
      pass: req.body.pass,
    };
    registro.push(newRegister);
    res.sendFile(path.join(__dirname, "index.html"));
  } else {
    res.sendFile(path.join(__dirname, "register.html"));
  }
});

app.listen(port, function () {
  console.log(`server on.. in port ${port}`);
});
