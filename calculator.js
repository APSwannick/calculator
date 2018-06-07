function myfun(elem) {
  var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  if (numbers.includes(elem))
    document.getElementById("output").value += elem;
  else if (elem == '\xF7')
    console.log("division");
  else if (elem == '\xD7')
    console.log("multiplication");
  else if (elem == '#x2212')
    console.log("addition");
  else if (elem == 'minus')
    console.log("subtraction");
  else
    console.log(elem);
}