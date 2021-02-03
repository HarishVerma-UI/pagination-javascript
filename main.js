var state = {
    'querySet': [],
    'page': 1,
    'rows': 5,
    'window': 10,
}

/*
Get data from demo data 
https://jsonplaceholder.typicode.com/posts
*/

var tableData; 
fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(json => {
    state.querySet = json;
    buildTable()
    })


/*
  1 - Loop Through Array & Access each value
  2 - Create Table Rows & append to table
*/

function pagination(querySet, page, rows) {

    var trimStart = (page - 1) * rows
    var trimEnd = trimStart + rows

    var trimmedData = querySet.slice(trimStart, trimEnd)

    var pages = Math.round(querySet.length / rows);

    return {
        'querySet': trimmedData,
        'pages': pages,
    }
}

function pageButtons(pages) {
    console.log(pages,state);
    var wrapper = document.getElementById('pagination-wrapper')

    wrapper.innerHTML = ``
    var maxLeft = (state.page - Math.floor(state.window ))
    var maxRight = (state.page + Math.floor(state.window))

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = state.window
    }

    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1)
        
        if (maxLeft < 1){
        	maxLeft = 1
        }
        maxRight = pages
    }
    

    for (var page = maxLeft; page <= maxRight; page++) {
    	wrapper.innerHTML += `<button value=${page}  class="page btn btn-sm btn-info">${page}</button>`
    }

    if (state.page != 1) {
        wrapper.innerHTML = `<button value=${1}  class="page btn btn-sm btn-info">&#171; Previous</button>` + wrapper.innerHTML
    }

    if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages}  class="page btn btn-sm btn-info">Last &#187;</button>`
    }

    const anchors = document.querySelectorAll('#pagination-wrapper .page');    
    for (let i = 0; i < anchors.length; i++) {
     anchors[i].addEventListener('click', function(event){
        document.getElementById('table-body').innerHTML = '';
        pageNumber = event.target.value;
        state.page = parseInt(pageNumber);

        buildTable() 
     });  
     }
}


function buildTable() {
    var table =document.getElementById('table-body');  
    var data = pagination(state.querySet, state.page, state.rows)
    var myList = data.querySet
    table.innerHTML =`<thead>
    <tr>
        <th width='10%'>Id</th>
        <th width='20%'">Title</th>
        <th width='30%'">Description</th>
     </tr>
     </thead>
    `; 
    for (var i = 1 in myList) {
        //Keep in mind we are using "Template Litterals to create rows"
        var row = `<tr>
                  <td>${myList[i].id}</td>
                  <td>${myList[i].title.substring(0, 50)}</td>
                  <td>${myList[i].body.substring(0, 100)}</td>
                  `
        table.innerHTML += row;
    }

    pageButtons(data.pages)
}
