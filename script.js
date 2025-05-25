const calculateBtn = document.getElementById('calculate');
calculateBtn.addEventListener('click', () => {
  const att = parseInt(document.getElementById('attended').value, 10);
  const held = parseInt(document.getElementById('held').value, 10);
  const rem = parseInt(document.getElementById('remaining').value, 10);
  const target = parseFloat(document.getElementById('target').value);
  const resultEl = document.getElementById('result');
  
  // Validate inputs
  if ([att, held, rem].some(v => isNaN(v)) || isNaN(target) || target < 0 || target > 100) {
    resultEl.textContent = 'Please fill in all fields correctly (0-100 for target).';
    resultEl.className = 'result fail';
    return;
  }

  const totalHeld = held;
  const totalClasses = held + rem;
  const currentPerc = totalHeld > 0 ? (att / totalHeld) * 100 : 0;
  const maxPossiblePerc = totalClasses > 0 ? ((att + rem) / totalClasses) * 100 : 0;

  // Handle no remaining classes
  if (rem === 0) {
    if (currentPerc >= target) {
      resultEl.textContent = `You already have ${currentPerc.toFixed(2)}% attendance, meeting the target of ${target}%.`;
      resultEl.className = 'result success';
    } else {
      resultEl.textContent = `No remaining classes. Impossible to reach ${target}%. Your attendance is ${currentPerc.toFixed(2)}%. 
Make your condonation Money Ready😑`;
      resultEl.className = 'result fail';
    }
    return;
  }

  // Check if target is achievable
  if (maxPossiblePerc < target) {
    resultEl.textContent = `Impossible to reach ${target}%. Your attendance is ${currentPerc.toFixed(2)}%. 
Make your condonation Money Ready😑`;
    resultEl.className = 'result fail';
  } else {
    const neededTotal = Math.ceil((target / 100) * totalClasses);
    let needInRem = neededTotal - att;

    // Clamp to 0 if negative
    if (needInRem <= 0) {
      resultEl.textContent = `You already meet the target. Current attendance: ${currentPerc.toFixed(2)}%.`;
      resultEl.className = 'result success';
    } else {
      resultEl.textContent = `You need to attend at least ${needInRem} out of ${rem} remaining classes to reach ${target}%.`;
      resultEl.className = 'result success';
    }
  }
});
