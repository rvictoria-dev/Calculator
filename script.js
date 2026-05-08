  let current = '0';
  let expression = '';
  let justCalc = false;

  const display = document.getElementById('display');
  const exprEl  = document.getElementById('expression');

  function updateDisplay() {
    display.textContent = current;
    exprEl.textContent = expression;
  }

  function handleBtn(val) {
    if (val === 'ac') {
      current = '0'; expression = ''; justCalc = false;

    } else if (val === 'del') {
      current = current.length > 1 ? current.slice(0, -1) : '0';

    } else if (val === '=') {
      if (!expression) return;
      try {
        expression += current;
        let result = Function('"use strict"; return (' + expression.replace(/%/g, '/100') + ')')();
        result = parseFloat(result.toFixed(10));
        expression = expression + ' =';
        current = String(result);
        justCalc = true;
      } catch {
        current = 'Erro';
        expression = '';
      }

    } else if (['+', '-', '*', '/', '%'].includes(val)) {
      if (justCalc) { expression = current; justCalc = false; }
      else expression += current;
      expression += ' ' + val + ' ';
      current = '0';

    } else if (val === '.') {
      if (justCalc) { current = '0.'; justCalc = false; }
      else if (!current.includes('.')) current += '.';

    } else {
      if (justCalc) { current = val; justCalc = false; }
      else current = current === '0' ? val : current + val;
    }

    updateDisplay();
  }

  document.addEventListener('keydown', e => {
    const map = {
      '0':'0','1':'1','2':'2','3':'3','4':'4',
      '5':'5','6':'6','7':'7','8':'8','9':'9',
      '+':'+','-':'-','*':'*','/':'/','%':'%',
      '.':'.','Enter':'=','Backspace':'del','Escape':'ac'
    };
    if (map[e.key]) handleBtn(map[e.key]);
  });