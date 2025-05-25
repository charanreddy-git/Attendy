const calculateBtn = document.getElementById('calculate');
calculateBtn.addEventListener('click', () => {
  const att = parseInt(document.getElementById('attended').value, 10);
  const held = parseInt(document.getElementById('held').value, 10);
  const rem = parseInt(document.getElementById('remaining').value, 10);
  const target = parseFloat(document.getElementById('target').value);
  const resultEl = document.getElementById('result');
  
  // Validate inputs
  if ([att, held, rem].some(v => isNaN(v)) || isNaN(target) || target < 0 || target > 100) {
    resultEl.textContent = 'Whoa, check your inputs! Target must be between 0 and 100.';
    resultEl.className = 'result fail';
    return;
  }

  const totalClasses = held + rem;
  const currentPerc = held > 0 ? (att / held) * 100 : 0;
  const maxPossiblePerc = totalClasses > 0 ? ((att + rem) / totalClasses) * 100 : 0;

  // No remaining classes
  if (rem === 0) {
    if (currentPerc >= target) {
      resultEl.textContent = `Congrats! You've got ${currentPerc.toFixed(2)}% attendance—target of ${target}% smashed like a boss!`;
      resultEl.className = 'result success';
    } else {
      resultEl.textContent = `Oops! Only ${currentPerc.toFixed(2)}% attendance. Target was ${target}%. Time to sweet-talk the prof (and your wallet).`;
      resultEl.className = 'result fail';
    }
    return;
  }

  // Check if target reachable
  if (maxPossiblePerc < target) {
    resultEl.textContent = `Dreaming big, huh? Max possible is just ${maxPossiblePerc.toFixed(2)}%—no way you hit ${target}%. Better start funneling funds to that condonation fund.`;
    resultEl.className = 'result fail';
  } else {
    const requiredTotal = Math.ceil((target / 100) * totalClasses);
    const needInRem = requiredTotal - att;

    if (needInRem <= 0) {
      resultEl.textContent = `Lucky you! You already have ${currentPerc.toFixed(2)}%, above the ${target}% goal. Now go celebrate—after you hit the books, of course.`;
      resultEl.className = 'result success';
    } else {
      resultEl.textContent = `Listen up: attend at least ${needInRem} of the ${rem} remaining classes to hit ${target}%. Miss them and prepare to bribe your way back in.`;
      resultEl.className = 'result success';
    }
  }
});
