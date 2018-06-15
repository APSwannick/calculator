var mem = {
  //Use strings to allow additional numbers per user expectations
  num1: '',
  op: '',
  num2: '',
  status_total: Boolean(false)
};

function calculator(button) {

  let curr_num;
  var history = Boolean(mem.num1 && mem.op);
  curr_num = history ? mem.num2 : mem.num1;

  //If Just Totaled - Do not add to string
  if (mem.status_total == true) {
    curr_num = '';
    mem.status_total = false;
  }

  console.log('Button Press: ' + button);

  switch (button) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      //Default Case
      if (curr_num == '0') {
        curr_num = '';
      }
      curr_num += button;
      break;
    case 'period':
      //Only add period if no existing
      if (!curr_num.includes('.'))
        curr_num += '.';
      break;
    case 'backspace':
      //Delete the last character in string
      curr_num = curr_num.substring(0, curr_num.length - 1);
      break;
    case 'sign_change':
      //Change sign by multiplying by -1
      curr_num *= -1;
      break;
    case 'clear':
      //Clear everything
      curr_num = history_clear(mem);
      history = false;
      break;
    case '*':
    case '/':
    case '+':
    case '-':
      //If total-able then total before assigning op
      if (!curr_num) {
        break;
      }
      if (history) {
        console.log("Total-able")
        curr_num = '';
        history_total(mem);
      }

      mem.op = button;
      break;
    case 'equal':
      //Set Curr_num to total & avoid histor logic error
      curr_num = history_total(mem);
      history = false;
      break;
      /*
    case 'sqrt':
      if (output_elem.value == '0' || output_elem.value == '')
        break;
      */
  }
  if (history)
    mem.num2 = curr_num;
  else
    mem.num1 = curr_num;

  output_to_display(mem);
}

function output_to_display(mem) {
  let output_elem = document.getElementById('output');
  let history_elem = document.getElementById('history');
  let unicode = {
    '*': '\u00D7',
    '/': '\u00F7',
    '+': '\u002B',
    '-': '\u2212',
    'sqrt': '\u221A',
    'equals': ''
  };
  if (mem.op) {
    history_elem.value = mem.num1;
    history_elem.value += ' ' + unicode[mem.op];
    output_elem.value = mem.num2;
  } else {
    output_elem.value = mem.num1;
    history_elem.value = '';
  }
}

function history_clear(elem) {
  mem.num1 = '';
  mem.op = '';
  mem.num2 = '';
  return mem.num1;
}

function history_total(mem) {
  //If total-able
  if (mem.num1 && mem.op && mem.num2) {
    mem.num1 = eval(mem.num1 + mem.op + mem.num2);
    mem.op = '';
    mem.num2 = '';
    mem.status_total = true;
    return mem.num1;
  } else {
    mem.num1 = mem.num1;
    mem.op = '';
    mem.num2 = '';
    mem.status_total = true;
    return mem.num1;
  }
}

//Keyboard Manipulation
document.onkeydown = function (event) {
  let keypress = event.which || event.keyCode || 0;
  event.preventDefault();
  if (event.shiftKey) {
    console.log("shift on");
    switch (keypress) {
      case 56: //*
        button = document.getElementById('*');
        break;
      case 88: //X
        button = document.getElementById(String(keypress - 48));
        break;
      case 187: //+
        button = document.getElementById('+');
        break;
      default:
        button = null;
    }
  } else {
    switch (keypress) {
      case 8: //backspace
        button = document.getElementById('backspace');
        break;
      case 13: //enter
        button = document.getElementById('equal');
        break;
      case 27: //esc
        button = document.getElementById('clear');
        break;
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        //0 to 9 Top Row
        button = document.getElementById(String(keypress - 48));
        break;
      case 88:
        //x for user error multiplication
        button = document.getElementById(String(keypress - 48));
        break;
      case 96:
      case 97:
      case 98:
      case 99:
      case 100:
      case 101:
      case 102:
      case 103:
      case 104:
      case 105:
        //0 to 9 Numpad
        button = document.getElementById(String(keypress - 96));
        break;
      case 187: //=
        button = document.getElementById('equal');
        break;
      case 189: //-
        button = document.getElementById('-');
        break;
      case 190: //.
        button = document.getElementById('period');
        break;
      case 191: // Divide or /
        button = document.getElementById('/');
        break;
      default:
        button = null;
    }
  }
  if (button) {
    button.click();
    button.className += ' active';
    On_Delay_Remove_Active(button);
  }
};

function On_Delay_Remove_Active(button) {
  setTimeout(function () {
    button.className = button.className.replace(' active', '');
  }, 50);
}