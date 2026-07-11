class CrosswordEngine{

constructor(){

this.puzzle=null;
this.grid=[];
this.rows=0;
this.cols=0;

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

renderGrid(){

const board=document.getElementById("crossword-grid");

board.style.gridTemplateColumns=`repeat(${this.cols},var(--cell-size))`;

board.innerHTML="";

for(let r=0;r<this.rows;r++){

for(let c=0;c<this.cols;c++){

const data=this.grid[r][c];
const cell=document.createElement("div");

if(!data){

cell.className="cell black";

}else{

cell.className="cell";
cell.dataset.row=r;
cell.dataset.col=c;

if(data.number){

const num=document.createElement("span");
num.className="cell-number";
num.textContent=data.number;
cell.appendChild(num);

}

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

const number=this.grid[word.row][word.col].number;

li.value=number;

if(word.direction==="across"){
across.appendChild(li);
}else{
down.appendChild(li);
}

});

}

}

window.engine=new CrosswordEngine();
