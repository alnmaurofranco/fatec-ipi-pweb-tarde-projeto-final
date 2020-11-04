function process(quant) {
  var value = parseInt(document.getElementById("qty").value);
  value += quant;
  console.log(value);

  if (value < 1) {
    document.getElementById("qty").value = 1;
    //localStorage.setItem("xd", value);
  } else {
    document.getElementById("qty").value = value;
    //localStorage.setItem("xd", value);
  }
}

function subb(quant) {
  var value2 = parseInt(document.getElementById("qty1").value);
  value2 += quant;
  console.log(value2);

  if (value2 < 1) {
    document.getElementById("qty1").value = 1;
    //localStorage.setItem("xd", value);
  } else {
    document.getElementById("qty1").value = value2;
    //localStorage.setItem("xd", value);
  }
}
