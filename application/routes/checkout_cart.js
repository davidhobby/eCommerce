var DisplayShoppingCart = document.getElementById("DisplayShoppingCart");

	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {

        if(this.readyState == 4 && this.status == 200) {

            //read json file and cover to string
            var message = xmlhttp.response;

            //create table elements
			var json_table = document.createElement("table");
			json_table.setAttribute('class','json_table')
            var col = [];
            var total_amt = 0;
        for (var i = 0; i < message.length; i++) {
            for (var key in message[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }

        }
        var tr = json_table.insertRow(-1);                   // TABLE ROW.
        {
        var th = document.createElement("th");      // TABLE HEADER.
                th.innerHTML = "PRODUCT";
                tr.appendChild(th);
                var th = document.createElement("th");      // TABLE HEADER.
                th.innerHTML = "QUANTITY";
                tr.appendChild(th);
                var th = document.createElement("th");      // TABLE HEADER.
                th.innerHTML = "UNIT PRICE";
                tr.appendChild(th);

        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = "TOTAL";
        tr.appendChild(th);

        }

        for (var i = 0; i < message.length; i++) {
            tr = json_table.insertRow(-1);
                    for (var j = 0; j < 3; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = message[i][col[j]];
            }
            var tabCell = tr.insertCell(-1);
            total_amt = total_amt+message[i][col[1]]*((message[i][col[2]]).replace('$','').trim());
            tabCell.innerHTML= '$'+ (message[i][col[1]]*((message[i][col[2]]).replace('$','').trim())).toFixed(2);
            var tabCell = tr.insertCell(-1);
           // tabCell.appendChild(btn);
        }
        var tr = json_table.insertRow(-1);
        var th = document.createElement("th");
        th.setAttribute("style","width:auto")
        th.innerHTML="TOTAL:"+'$'+total_amt.toFixed(2);
        tr.appendChild(th);

        DisplayShoppingCart.appendChild(json_table);

            // //change table style
            // json_table.style.border = "1px solid black";
            // json_table.style.width = "800px";
            // json_table.style.background = "#FFEFD5";
        }
       // DisplayShoppingCart.append('<tr><td>my data</td><td>more data</td></tr>');

    };
    xmlhttp.open("GET", "/cart_fetch", true);
    xmlhttp.responseType = "json";
    xmlhttp.send();
