let divTableContainer = document.querySelector(".tableContainer");

let numberOfColumns = document.querySelector("#noOfColumns");
let numberOfRows = document.querySelector("#noOfRows");
let rowCount = 0;
let columnCount = 0;

let table  = document.createElement("table");
table.innerHTML = " ";
divTableContainer.appendChild(table);


//-------------------------------------------------
numberOfColumns.addEventListener("focus" , ()=>{
    numberOfColumns.value = " ";
});
numberOfColumns.addEventListener("input" , ()=>{
    columnCount = numberOfColumns.value;
    console.log(columnCount);
});

// numberOfColumns.addEventListener("blur" , ()=>{
//     if(numberOfColumns.value = " "){
//         numberOfColumns.value = "Columns";
//     }
// });



// -------------------------------------------------

numberOfRows.addEventListener("focus" , ()=>{
    numberOfRows.value = " ";
});
numberOfRows.addEventListener("input" , ()=>{
    rowCount = numberOfRows.value;
    console.log(rowCount);
});

// numberOfRows.addEventListener("blur" , ()=>{
//     numberOfRows.value = "Rows";
// });

//-------------------------------------
let enterBtn = document.querySelector("#enter");
enterBtn.addEventListener("click" , ()=>{
    table.innerHTML = " ";
    // coverting string to number using the plus operator
    if(+rowCount != 0 && +columnCount != 0){
        for(let i = 0 ; i < rowCount ; i++){
            let row = document.createElement("tr");

            for(let j = 0 ; j < columnCount ; j++){
                if(i === 0){
                    let cell = document.createElement("th");
                    let inputBox = document.createElement("input");
                    inputBox.type = "text";
                    inputBox.name = `${i}${j}cell`;
                    inputBox.id = `${i}${j}cell`
                    cell.appendChild(inputBox);
                    row.appendChild(cell);
                }
                else{
                    let cell = document.createElement("td");
                    let inputBox = document.createElement("input");
                    inputBox.type = "text";
                    inputBox.name = `${i}${j}cell`;
                    inputBox.id = `${i}${j}cell`
                    cell.appendChild(inputBox);
                    row.appendChild(cell);
                }
            }
            table.append(row);
        }
    }
});