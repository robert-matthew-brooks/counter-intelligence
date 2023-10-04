let lookupLetterWidth;

// these should match css animation times
let speedMultiplier = 1;
const animationGap = 150;
const setLookupTableTime = 2000;
const highlightLetterTime = 2000;
const lookupTableFocusTime = 2000;

// grab DOM elements
const textBox = document.getElementById('text-box');
const lookupTableInputs = document.getElementById('lookup-table__inputs');
const lookupTableOutputs = document.getElementById('lookup-table__outputs');
const lookupTableFocus = document.getElementById('lookup-table__focus');
const decodeBtn = document.getElementById('decode-btn');
const fasterBtn = document.getElementById('faster-btn');
const newMsgBtn = document.getElementById('new-msg-btn');

// encoded texts
let currentEncodedTextIndex = 0;
const encodedTexts = [
  "Dof kpk aol wyvnyhttly xbpa oly qvi? Iljhbzl zol kpku'a nla hyyhfz. E",
  "Qbs xi Dupu jlialuggylm bupy ni qyul afummym? Vywuomy nbys xih'n W#. R",
  'Vgzs hr sgd lnrs trdc kzmftzfd hm oqnfqzllhmf? Oqnezmhsx. W',
  'Hsj oz aczrclxxpcd lwhljd xti fa Slwwzhppy lyo Nsctdexld? Mpnlfdp ZNE31 pbflwd OPN25. I',
  'Lwn sxs iwt ild Ypkp btiwdsh vti p sxkdgrt? Qtrpjht iwtn wps rdchipci pgvjbtcih. M',
  'Bmd ini ymj jilj xjwajw lt gfspwzuy? Gjhfzxj ny wfs tzy tk hfhmj. C',
  'Fqh mrm cqn yarejcn lujbbnb kanjt dy? Knljdbn cqnh wnena bjf njlq xcqna. G',
  "Mxo te ikrcqhydui qbb hkd Bydkn? Oek sqd'j efud Mydtemi kdtuh mqjuh. N",
];

function sleep(ms) {
  return new Promise((resolve) =>
    setTimeout(resolve, (ms + animationGap) / speedMultiplier)
  );
}

/***********************/
/* initialise frontend */
/***********************/

// set up first encoded message
const text = encodedTexts[currentEncodedTextIndex];

for (const i in text) {
  const letter = document.createElement('span');
  letter.id = `char${i}`;
  letter.classList.add('letter--encoded');
  letter.innerHTML = text[i];
  textBox.appendChild(letter);
}

// generate lookup table
for (let i = 0; i < 26; i++) {
  const letter = document.createElement('div');
  letter.id = `lookupTableIn${i}`;
  letter.innerHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')[i];
  lookupTableInputs.appendChild(letter);
}

for (let i = 0; i < 52; i++) {
  const letter = document.createElement('div');
  letter.innerHTML =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')[i];
  lookupTableOutputs.appendChild(letter);
}

initLookup();

/*********************************/
/* util / housekeeping functions */
/*********************************/

function lockControls(btnArr) {
  for (const btn of btnArr) {
    btn.disabled = true;
  }
}
function unlockControls(btnArr) {
  for (const btn of btnArr) {
    btn.disabled = false;
  }
}

function clearTextBox() {
  while (textBox.firstChild) {
    textBox.removeChild(textBox.lastChild);
  }
}

function goFaster() {
  lookupTableFocus.style.opacity = 0;
  speedMultiplier *= 10;
}

function newEncodedMessage() {
  clearTextBox();

  currentEncodedTextIndex++;
  if (currentEncodedTextIndex >= encodedTexts.length)
    currentEncodedTextIndex = 0;

  const text = encodedTexts[currentEncodedTextIndex];

  for (const i in text) {
    const letter = document.createElement('span');
    letter.id = `char${i}`;
    letter.classList.add('letter--encoded');
    letter.innerHTML = text[i];
    textBox.appendChild(letter);
  }

  speedMultiplier = 1;
  unlockControls([decodeBtn]);
}

/***********************/
/* animation functions */
/***********************/

async function setLookupTable(displacement) {
  lookupLetterWidth =
    document.getElementById('lookupTableIn0').offsetWidth + 'px';

  if (displacement > 0) displacement -= 26;
  lookupTableOutputs.style.transform = `translateX(calc(${displacement} * ${lookupLetterWidth}))`;
  await sleep(setLookupTableTime);
  lookupTableFocus.style.opacity = 1;
}

async function highlightLetter(index) {
  const letter = document.getElementById(`char${index}`);
  letter.classList.add('letter--highlight');
}

async function changeLetter(index, newChar, isChanged) {
  const letter = document.getElementById(`char${index}`);

  letter.innerHTML = newChar;
  letter.classList.remove('letter--highlight');
  letter.classList.add(isChanged ? 'letter--decoded' : 'letter--not-decoded');

  await sleep(1000);
}

async function focusLookup(index, displacement) {
  if (index >= 0) {
    // blink input letter
    const lookupInput = document.getElementById(`lookupTableIn${index}`);
    lookupInput.classList.add('letter--highlight');

    // move focus
    lookupTableFocus.style.transform = `translateX(calc(${index} * ${lookupLetterWidth}))`;
    await sleep(lookupTableFocusTime);

    lookupInput.classList.remove('letter--highlight');
  }
}
