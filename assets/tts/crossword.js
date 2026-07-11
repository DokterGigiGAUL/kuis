const hiddenInput=document.createElement("input");

hiddenInput.type="text";
hiddenInput.autocomplete="off";
hiddenInput.autocapitalize="characters";
hiddenInput.spellcheck=false;

Object.assign(hiddenInput.style,{
position:"fixed",
opacity:0,
pointerEvents:"none",
left:"-9999px",
top:"-9999px"
});

document.body.appendChild(hiddenInput);

let activeCell=null;

document.addEventListener("DOMContentLoaded",async()=>{
await engine.load();

const board=document.getElementById("crossword-grid");

board.addEventListener("click",e=>{

const cell=e.target.closest(".cell");

if(!cell||cell.classList.contains("black"))return;

setActive(cell);

});

});

function setActive(cell){

if(activeCell)activeCell.classList.remove("active");

activeCell=cell;
activeCell.classList.add("active");

hiddenInput.focus();

}
