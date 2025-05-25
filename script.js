const calculateBtn = document.getElementById('calculate');
calculateBtn.addEventListener('click', () => {
  const att = parseInt(document.getElementById('attended').value, 10);
  const held = parseInt(document.getElementById('held').value, 10);
  const rem = parseInt(document.getElementById('remaining').value, 10);
  const target = parseFloat(document.getElementById('target').value);
  const resultEl = document.getElementById('result');

  // Validate inputs
  if ([att, held, rem].some(v => isNaN(v)) || isNaN(target) || target < 0 || target > 100) {
    resultEl.textContent = 'Please enter valid numbers. Target should be between 0 and 100 only. Don’t try to break the system!';
    resultEl.className = 'result fail';
    return;
  }

  const totalClasses = held + rem;
  const currentPerc = held > 0 ? (att / held) * 100 : 0;
  const maxPossiblePerc = totalClasses > 0 ? ((att + rem) / totalClasses) * 100 : 0;

  // No remaining classes
  if (rem === 0) {
    if (currentPerc >= target) {
      resultEl.textContent = `Nice! You have ${currentPerc.toFixed(2)}% attendance. Target ${target}% already done. Now relax, but not too much!`;
      resultEl.className = 'result success';
    } else {
      resultEl.textContent = `Uh-oh! Only ${currentPerc.toFixed(2)}% and the target was ${target}%. Now only one thing can save you—sympathy from faculty (good luck with that).`;
      resultEl.className = 'result fail';
    }
    return;
  }

  // Check if target reachable
  if (maxPossiblePerc < target) {
    resultEl.textContent = `Even if you attend every remaining class, max you can get is ${maxPossiblePerc.toFixed(2)}%. Target ${target}%? Not happening. Start preparing your excuse.`;
    resultEl.className = 'result fail';
  } else {
    const requiredTotal = Math.ceil((target / 100) * totalClasses);
    const needInRem = requiredTotal - att;

    if (needInRem <= 0) {
      resultEl.textContent = `Chill! You already have ${currentPerc.toFixed(2)}%. Target ${target}% is done. Just don’t go full bunk mode now.`;
      resultEl.className = 'result success';
    } else {
      resultEl.textContent = `You need to attend at least ${needInRem} out of ${rem} classes left to reach ${target}%. One more bunk and you’re on your own!`;
      resultEl.className = 'result success';
    }
  }
});
