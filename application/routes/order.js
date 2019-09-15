var DisplayOrder = document.getElementById("DisplayOrder");
//console.log("inside orderjs file");
var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {

        if(this.readyState == 4 && this.status == 200) {

            //read json file and cover to string
            var message = xmlhttp.response;
            //create table elements
            create_table(message);

    };
}
    xmlhttp.open("GET", "/orders", true);
    xmlhttp.responseType = "json";
    xmlhttp.send();

    function create_table(d){
        var col = [];

        for (var i = 0; i < d.length; i++) {
          for (var key in d[i]) {
        if (col.indexOf(key) === -1) {
          col.push(key);
        }
          }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
        var tr = table.insertRow(-1);    // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
          var th = document.createElement("th");// TABLE HEADER.
          th.innerHTML = col[i];
          tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < d.length; i++) {
          tr = table.insertRow(-1);

          for (var j = 0; j < col.length; j++) {
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = d[i][col[j]];
          }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.

        DisplayOrder.appendChild(table);
    }
