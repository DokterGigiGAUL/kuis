class CrosswordEngine{

constructor(){

this.puzzle=null;
this.grid=[];
this.rows=0;
this.cols=0;
// Tambahkan di constructor()

this.cells=[];
this.activeWord=null;
this.activeIndex=0;
this.direction="across";
this.hiddenInput=null;
}

async load(){

const params=new URLSearchParams(location.search);
const file=params.get("puzzle")||"tts1";

const res=await fetch(`puzzles/${file}.json`);
this.puzzle=await res.json();

document.getElementById("puzzle-title").textContent=this.puzzle.title;

this.buildGrid();
this.numberCells();
this.renderGrid();
this.renderClues();
this.createHiddenInput();
this.bindEvents();

}

selectWord(word){

this.direction=word.direction;
this.activeWord=word;
this.activeIndex=0;

this.currentRow=word.row;
this.currentCol=word.col;

this.clearHighlight();
this.highlightWord();

this.hiddenInput.focus();

}

buildGrid(){

let maxRow=0,maxCol=0;

this.puzzle.words.forEach(word=>{

const len=word.answer.length;

if(word.direction==="across"){
maxRow=Math.max(maxRow,word.row);
maxCol=Math.max(maxCol,word.col+len-1);
}else{
maxRow=Math.max(maxRow,word.row+len-1);
maxCol=Math.max(maxCol,word.col);
}

});

this.rows=maxRow+1;
this.cols=maxCol+1;

this.grid=Array.from({length:this.rows},()=>Array.from({length:this.cols},()=>null));

this.puzzle.words.forEach(word=>{

for(let i=0;i<word.answer.length;i++){

const r=word.direction==="across"?word.row:word.row+i;
const c=word.direction==="across"?word.col+i:word.col;

if(!this.grid[r][c]){
this.grid[r][c]={
letter:"",
answer:word.answer[i],
number:null
};
}

}

});

}

numberCells(){

let n=1;

for(let r=0;r<this.rows;r++){

for(let c=0;c<this.cols;c++){

if(!this.grid[r][c])continue;

const left=c===0||!this.grid[r][c-1];
const top=r===0||!this.grid[r-1][c];

if(left||top){
this.grid[r][c].number=n++;
}

}

}

}

// Ganti renderGrid()

renderGrid(){

const board=document.getElementById("crossword-grid");

board.style.gridTemplateColumns=`repeat(${this.cols},var(--cell-size))`;
board.innerHTML="";
this.cells=[];

for(let r=0;r<this.rows;r++){

this.cells[r]=[];

for(let c=0;c<this.cols;c++){

const data=this.grid[r][c];
const cell=document.createElement("div");

if(!data){

cell.className="cell black";

}else{

cell.className="cell";
cell.dataset.row=r;
cell.dataset.col=c;

const letter=document.createElement("span");
letter.className="letter";
letter.textContent="";
cell.appendChild(letter);

if(data.number){

const num=document.createElement("span");
num.className="cell-number";
num.textContent=data.number;
cell.appendChild(num);

}

this.cells[r][c]=cell;

}

board.appendChild(cell);

}

}

}
  
renderClues(){

const across=document.getElementById("across-list");
const down=document.getElementById("down-list");

across.innerHTML="";
down.innerHTML="";

this.puzzle.words.forEach(word=>{

const li=document.createElement("li");

li.textContent=word.clue;
li.value=this.grid[word.row][word.col].number;

li.onclick=()=>this.selectWord(word);

if(word.direction==="across"){
across.appendChild(li);
}else{
down.appendChild(li);
}

});

}

// Tambahkan setelah renderClues()

createHiddenInput(){

this.hiddenInput=document.createElement("input");

this.hiddenInput.type="text";
this.hiddenInput.maxLength=1;

Object.assign(this.hiddenInput.style,{
position:"fixed",
left:"-9999px",
opacity:0
});

document.body.appendChild(this.hiddenInput);

}

bindEvents(){

const board=document.getElementById("crossword-grid");

board.addEventListener("click",e=>{

const cell=e.target.closest(".cell");

if(!cell||cell.classList.contains("black"))return;

const r=Number(cell.dataset.row);
const c=Number(cell.dataset.col);

this.selectCell(r,c);

});

this.hiddenInput.addEventListener("input",e=>{

const value=e.target.value.toUpperCase();

if(value){

this.typeLetter(value);

}

e.target.value="";

});

this.hiddenInput.addEventListener("keydown",e=>{

if(e.key==="Backspace"){

e.preventDefault();

this.backspace();

}

});

}

selectCell(r,c){

if(
this.currentRow===r &&
this.currentCol===c
){
this.toggleDirection();
return;
}

this.currentRow=r;
this.currentCol=c;

this.clearHighlight();
this.highlightWord();

this.hiddenInput.focus();

}

// Tambahkan

getCurrentWord(){

const words=this.puzzle.words.filter(w=>{

if(w.direction!==this.direction)return false;

for(let i=0;i<w.answer.length;i++){

const rr=w.direction==="across"?w.row:w.row+i;
const cc=w.direction==="across"?w.col+i:w.col;

if(rr===this.currentRow&&cc===this.currentCol)return true;

}

return false;

});

return words[0]||null;

}

// Tambahkan

highlightWord(){

const word=this.getCurrentWord();

if(!word)return;

this.activeWord=word;

for(let i=0;i<word.answer.length;i++){

const r=word.direction==="across"?word.row:word.row+i;
const c=word.direction==="across"?word.col+i:word.col;

this.cells[r][c].classList.add("word");

if(r===this.currentRow&&c===this.currentCol){

this.cells[r][c].classList.add("active");

this.activeIndex=i;

}

}

}

// Tambahkan

clearHighlight(){

this.cells.forEach(row=>{

row.forEach(cell=>{

if(!cell)return;

cell.classList.remove("word");
cell.classList.remove("active");

});

});

}

// Tambahkan

typeLetter(letter){

if(!this.activeWord)return;

const r=this.direction==="across"
?this.activeWord.row
:this.activeWord.row+this.activeIndex;

const c=this.direction==="across"
?this.activeWord.col+this.activeIndex
:this.activeWord.col;

this.grid[r][c].letter=letter;

this.cells[r][c]
.querySelector(".letter")
.textContent=letter;

this.nextCell();

}

// Tambahkan

nextCell(){

if(this.activeIndex>=this.activeWord.answer.length-1)return;

this.activeIndex++;

if(this.direction==="across"){

this.currentCol++;

}else{

this.currentRow++;

}

this.highlightWord();

}

// Tambahkan

backspace(){

if(!this.activeWord)return;

const r=this.direction==="across"
?this.activeWord.row
:this.activeWord.row+this.activeIndex;

const c=this.direction==="across"
?this.activeWord.col+this.activeIndex
:this.activeWord.col;

if(this.grid[r][c].letter){

this.grid[r][c].letter="";
this.cells[r][c]
.querySelector(".letter")
.textContent="";
return;

}

if(this.activeIndex===0)return;

this.activeIndex--;

if(this.direction==="across"){

this.currentCol--;

}else{

this.currentRow--;

}

this.highlightWord();

}

toggleDirection(){

this.direction=this.direction==="across"
?"down"
:"across";

this.clearHighlight();
this.highlightWord();

}

  

}

window.engine=new CrosswordEngine();
