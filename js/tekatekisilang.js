<script>
// ---------- Data soal (koordinat relatif, sudah diverifikasi konsisten) ----------
const words = [
  { id:'email',  number:1, dir:'down',   row:0, col:1, answer:'EMAIL',  label:'EMAIL',
    clue:'Lapisan terluar mahkota gigi, jaringan terkeras di tubuh manusia.' },
  { id:'gusi',   number:2, dir:'down',   row:0, col:5, answer:'GUSI',   label:'GUSI',
    clue:'Jaringan lunak kemerahan yang mengelilingi leher gigi.' },
  { id:'gigi',   number:3, dir:'down',   row:1, col:3, answer:'GIGI',   label:'GIGI',
    clue:'Organ keras di rongga mulut yang berfungsi untuk mengunyah.' },
  { id:'karies', number:4, dir:'across', row:2, col:0, answer:'KARIES', label:'KARIES',
    clue:'Kerusakan jaringan keras gigi akibat aktivitas bakteri; awam menyebutnya gigi berlubang.' },
  { id:'itp',    number:5, dir:'across', row:3, col:5, answer:'ITP',    label:'ITP',
    clue:'Singkatan dari Idiopathic Thrombocytopenic Purpura.' },
];

// ---------- Bangun peta sel dari data kata ----------
const cellMap = {}; // "r,c" -> {letter, numbers:[], words:[]}
let maxRow = 0, maxCol = 0;

words.forEach(w=>{
  for(let i=0;i<w.answer.length;i++){
    const r = w.row + (w.dir==='down' ? i : 0);
    const c = w.col + (w.dir==='across' ? i : 0);
    const key = r+','+c;
    if(!cellMap[key]) cellMap[key] = { letter:w.answer[i], words:[] };
    cellMap[key].words.push({ id:w.id, dir:w.dir, index:i });
    if(i===0){
      cellMap[key].number = w.number;
    }
    maxRow = Math.max(maxRow, r);
    maxCol = Math.max(maxCol, c);
  }
});

// ---------- Render grid ----------
const gridEl = document.getElementById('grid');
gridEl.style.gridTemplateColumns = `repeat(${maxCol+1}, 38px)`;
gridEl.style.gridTemplateRows = `repeat(${maxRow+1}, 38px)`;

const inputs = {}; // key -> input element

for(let r=0;r<=maxRow;r++){
  for(let c=0;c<=maxCol;c++){
    const key = r+','+c;
    const data = cellMap[key];
    const cellDiv = document.createElement('div');
    if(!data){
      cellDiv.className = 'cell blank';
    } else {
      cellDiv.className = 'cell';
      if(data.number){
        const num = document.createElement('span');
        num.className = 'num';
        num.textContent = data.number;
        cellDiv.appendChild(num);
      }
      const input = document.createElement('input');
      input.maxLength = 1;
      input.autocomplete = 'off';
      input.dataset.key = key;
      cellDiv.appendChild(input);
      inputs[key] = input;
    }
    gridEl.appendChild(cellDiv);
  }
}

// ---------- Render daftar pertanyaan ----------
const cluesEl = document.getElementById('clues');
const groups = { across: words.filter(w=>w.dir==='across'), down: words.filter(w=>w.dir==='down') };

function buildClueGroup(title, list){
  const wrap = document.createElement('div');
  wrap.className = 'clue-group';
  const h = document.createElement('h3');
  h.textContent = title;
  wrap.appendChild(h);
  list.forEach(w=>{
    const row = document.createElement('div');
    row.className = 'clue';
    row.dataset.word = w.id;
    row.innerHTML = `<span class="badge">${w.number}</span><span>${w.clue} <em style="color:var(--ink-soft); font-style:normal;">(${w.answer.length} huruf)</em></span>`;
    row.addEventListener('click', ()=> selectWord(w.id));
    wrap.appendChild(row);
  });
  return wrap;
}
cluesEl.appendChild(buildClueGroup('Mendatar', groups.across));
cluesEl.appendChild(buildClueGroup('Menurun', groups.down));

// ---------- Interaksi ----------
let currentWordId = null;

function wordCells(id){
  const w = words.find(x=>x.id===id);
  const cells = [];
  for(let i=0;i<w.answer.length;i++){
    const r = w.row + (w.dir==='down' ? i : 0);
    const c = w.col + (w.dir==='across' ? i : 0);
    cells.push(r+','+c);
  }
  return cells;
}

function clearHighlights(){
  document.querySelectorAll('.cell.highlight').forEach(el=>el.classList.remove('highlight'));
  document.querySelectorAll('.clue.active').forEach(el=>el.classList.remove('active'));
}

function selectWord(id, focusFirst=true){
  clearHighlights();
  currentWordId = id;
  wordCells(id).forEach(key=>{
    inputs[key].closest('.cell').classList.add('highlight');
  });
  const clueRow = document.querySelector(`.clue[data-word="${id}"]`);
  if(clueRow) clueRow.classList.add('active');
  if(focusFirst){
    const firstEmpty = wordCells(id).find(k=>!inputs[k].value) || wordCells(id)[0];
    inputs[firstEmpty].focus();
  }
}

// klik sel: pilih kata (toggle arah hanya jika kotak YANG SAMA diklik dua kali berturut-turut)
let lastClickedKey = null;
Object.keys(inputs).forEach(key=>{
  const input = inputs[key];
  input.addEventListener('click', ()=>{
    const data = cellMap[key];
    let wid;
    if(data.words.length>1){
      const belongsToCurrent = data.words.some(w=>w.id===currentWordId);
      if(key === lastClickedKey && belongsToCurrent){
        wid = data.words.find(w=>w.id!==currentWordId).id; // toggle ke arah lain
      } else if(belongsToCurrent){
        wid = currentWordId; // tetap di kata yang sama, jangan lompat
      } else {
        wid = data.words[0].id;
      }
    } else {
      wid = data.words[0].id;
    }
    lastClickedKey = key;
    selectWord(wid, false);
  });

  input.addEventListener('input', (e)=>{
    let v = e.target.value.toUpperCase().replace(/[^A-Z]/g,'');
    e.target.value = v.slice(-1);
    input.closest('.cell').classList.remove('correct','incorrect');
    if(v && currentWordId){
      const cells = wordCells(currentWordId);
      const idx = cells.indexOf(key);
      if(idx > -1 && idx < cells.length-1){
        inputs[cells[idx+1]].focus();
      }
    }
  });

  input.addEventListener('keydown', (e)=>{
    if(e.key === 'Backspace' && !input.value && currentWordId){
      const cells = wordCells(currentWordId);
      const idx = cells.indexOf(key);
      if(idx > 0) inputs[cells[idx-1]].focus();
    }
  });
});

// pilih kata pertama secara default
if(words.length) selectWord(words[0].id, false);

// ---------- Periksa jawaban ----------
const statusEl = document.getElementById('status');

document.getElementById('checkBtn').addEventListener('click', ()=>{
  let filled = 0, correct = 0, total = 0;
  Object.keys(inputs).forEach(key=>{
    total++;
    const input = inputs[key];
    const cellDiv = input.closest('.cell');
    cellDiv.classList.remove('correct','incorrect');
    const val = input.value.trim();
    if(val){
      filled++;
      if(val === cellMap[key].letter){
        correct++;
        cellDiv.classList.add('correct');
      } else {
        cellDiv.classList.add('incorrect');
      }
    }
  });

  if(correct === total){
    statusEl.className = 'ok';
    statusEl.textContent = 'Semua jawaban benar!';
  } else if(filled < total){
    statusEl.className = 'pending';
    statusEl.textContent = `Baru terisi ${filled}/${total} kotak. Lanjutkan pengisian.`;
  } else {
    statusEl.className = 'bad';
    statusEl.textContent = `Masih ada yang kurang tepat (ditandai merah).`;
  }
});

document.getElementById('resetBtn').addEventListener('click', ()=>{
  Object.values(inputs).forEach(input=>{
    input.value = '';
    input.closest('.cell').classList.remove('correct','incorrect');
  });
  statusEl.textContent = '';
  statusEl.className = '';
  if(words.length) selectWord(words[0].id, true);
});
</script>
