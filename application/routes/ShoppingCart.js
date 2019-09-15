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

        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = "REMOVE";
        tr.appendChild(th);
        }

        for (var i = 0; i < message.length; i++) {
            tr = json_table.insertRow(-1);
            var btn= document.createElement('button')
            btn.setAttribute('class','remBtn')
            btn.innerHTML=" X "
            btn.setAttribute('value',''+message[i].USER_ID+'&prodID='+message[i].PROD_ID)
            for (var j = 0; j < 3; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = message[i][col[j]];
            }
            var tabCell = tr.insertCell(-1);
            total_amt = total_amt+message[i][col[1]]*((message[i][col[2]]).replace('$','').trim());
            tabCell.innerHTML= '$'+ (message[i][col[1]]*((message[i][col[2]]).replace('$','').trim())).toFixed(2);
            var tabCell = tr.insertCell(-1);
            tabCell.appendChild(btn);
        }
        var tr = json_table.insertRow(-1);
        var th = document.createElement("th");
        th.setAttribute("style","width:auto")
        th.innerHTML="TOTAL:"+'$'+total_amt.toFixed(2);
        tr.appendChild(th);
        var checkout_btn = document.createElement("button");
      //  btn.setAttribute('class','checkout_btn')
        checkout_btn.innerHTML ="CHECKOUT";
        tr.appendChild(checkout_btn);
        DisplayShoppingCart.appendChild(json_table);
        checkout_btn.onclick = function()
        {
            window.location="checkout.html";

        };
            // //change table style
            // json_table.style.border = "1px solid black";
            // json_table.style.width = "800px";
            // json_table.style.background = "#FFEFD5";
        }
       // DisplayShoppingCart.append('<tr><td>my data</td><td>more data</td></tr>');
        assignButtons()
    };
    xmlhttp.open("GET", "/cart_fetch", true);
    xmlhttp.responseType = "json";
    xmlhttp.send();

    function assignButtons(){
       var btn=document.getElementsByClassName('remBtn')
        for(i=0;i<btn.length;i++)
        { //console.log(btn[i].value)
            (function(index)
            {
            btn[index].onclick = function(){
            var xmlReq = new XMLHttpRequest();
            xmlReq.open('GET', '/remcart?userID='+btn[index].value, true);
            xmlReq.responseType = "";
            xmlReq.send(null);
  //          $("#DisplayShoppingCart").load(location.href+"#DisplayShoppingCart");
            }
        })(i)}

    }
