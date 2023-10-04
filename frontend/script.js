// these should match css dimensions
const lookupLetterWidth = '1.1rem';

// DOM elements
const encodedTextBox = document.getElementById('encoded-text');
const decodedTextBox = document.getElementById('decoded-text');
const lookupTableInputs = document.getElementById('lookup-table-inputs');
const lookupTableOutputs = document.getElementById('lookup-table-outputs');

// encoded texts
let currentEncodedTextIndex = 3;
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

/***********************/
/* initialise frontend */
/***********************/

function initEncodedText() {
  encodedTextBox.innerHTML = encodedTexts[currentEncodedTextIndex];
}

function initLookup(lookup) {
  for (let i = 0; i < 26; i++) {
    const letter = document.createElement('div');
    letter.id = `lookupTableIn${i}`;
    letter.innerHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')[i];
    lookupTableInputs.appendChild(letter);
  }

  for (let i = 0; i < 52; i++) {
    const letter = document.createElement('div');
    letter.id = `lookupTableOut${i}`;
    letter.innerHTML =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')[i];
    lookupTableOutputs.appendChild(letter);
  }
}

function setCipher(displacement) {
  lookupTableOutputs.style.transform = `translateX(calc(${displacement} * -${lookupLetterWidth}))`;
}
