const display = document.getElementById('display');

const themes = {
  1: { background: 'linear-gradient(135deg, #ece9e6, #ffffff)', color: '#333' },
  2: { background: 'linear-gradient(90deg, #4A4066, #002BFF)', color: '#fff' },
  3: { background: '#222', color: '#eee' }
};

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function setTheme(themeNumber) {
  const theme = themes[themeNumber];
  if (theme.background.startsWith('linear-gradient')) {
    document.body.style.background = theme.background;
  } else {
    document.body.style.background = `linear-gradient(135deg, ${getRandomColor()}, ${getRandomColor()})`;
  }
  document.body.style.color = theme.color;
}

// Set initial theme
setTheme(1);

function appendToDisplay(value) {
  if (value === 'pi') {
    display.value += Math.PI;
  } else if (value === 'e') {
    display.value += Math.E;
  } else {
    display.value += value;
  }
}

function addDecimal() {
  const parts = display.value.split(/[\+\-\*\/\(\)]/);
  const current = parts[parts.length - 1];
  if (!current.includes('.')) {
    display.value += '.';
  }
}

function clearDisplay() {
  display.value = '';
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function appendTrigFunction(func) {
  display.value += func + '(';
}

function calculateResult() {
  try {
    let expr = display.value;
    expr = expr.replace(/cos\(/g, 'Math.cos(')
               .replace(/sin\(/g, 'Math.sin(')
               .replace(/tan\(/g, 'Math.tan(')
               .replace(/log10\(/g, 'Math.log10(')
               .replace(/log2\(/g, 'Math.log2(')
               .replace(/log\(/g, 'Math.log(')
               .replace(/sqrt\(/g, 'Math.sqrt(')
               .replace(/\^/g, '**');
    const result = eval(expr);
    display.value = result;
  } catch (e) {
    display.value = 'Error';
  }
}
