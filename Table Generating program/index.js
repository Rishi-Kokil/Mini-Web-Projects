let numberOfColumns = document.querySelector("#noOfColumns");
let numberOfRows = document.querySelector("#noOfRows");
let rowCount = 0;
let columnCount = 0;


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