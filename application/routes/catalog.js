var products;
 var ProductUnityPrice;
var GlobalVariable_image;
var image;
var NumberInpute;
var sum;
		const main = document.getElementById('main');
		function loadData(catID) {
			var xmlReq = new XMLHttpRequest();

			xmlReq.onload = function () {
				if (xmlReq.status == 200) {
				products = xmlReq.response;
					//console.log(products[0]["name"])
					initialize(products);
				}
			}

			xmlReq.open('GET', '/search?catID=' + catID, true);
			xmlReq.responseType = "json";
			xmlReq.send(null);
		}



function initialize(products)
{var catalog=document.getElementById('catalog')
catalog.innerHTML="";
for(var i = 0; i < products.length; i++) {
		sec=document.createElement('section')
		sec.style="text-align:center"
		var heading = document.createElement('h4');
    var para = document.createElement('h4');
     image = document.createElement('img');
    var CartButton = document.createElement('button')
     NumberInpute=document.createElement('input');
   CartButton.setAttribute('class', 'btn');
   para.setAttribute('class', 'para');
   heading.setAttribute('class','heading');
   NumberInpute.setAttribute('class','NumberInpute');
   CartButton.setAttribute('id', 'btn_id');
   CartButton.innerHTML = 'Add';
 	NumberInpute.placeholder="Qty";
	heading.textContent = "Item: "+products[i].name;
    para.textContent = 'Price per lb: $'+ products[i].unitPrice;

		//global variable
	//	ProductUnityPrice=products[i].unitPrice;
	image.src = "public/img/"+products[i].picture;

		catalog.appendChild(sec);
		sec.appendChild(image);
    sec.appendChild(heading);
		sec.appendChild(para);
    sec.appendChild(NumberInpute);
		sec.appendChild(CartButton);


	}
	//fetch_cart();
	addtocart();
}
				function displayCart(btnvar){
					//if checkcookie()
					console.log("Updating displayed cart")
					var DisplayShoppingCart = document.getElementById("DisplayShoppingCart");
					var dispCall = new XMLHttpRequest();
					dispCall.onload = function() {

					if(dispCall.status == 200) {
						DisplayShoppingCart.innerHTML=""
						console.log("dispcall 200")
							//read json file and cover to string
							var message = dispCall.response;
	
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
					if (btnvar==1)
					{var th = document.createElement("th");      // TABLE HEADER.
					th.innerHTML = "REMOVE";
					tr.appendChild(th);}
					}
	
					for (var i = 0; i < message.length; i++) {
							tr = json_table.insertRow(-1);
							if(btnvar==1)
							{var btn= document.createElement('button')
							btn.setAttribute('class','remBtn')
							btn.innerHTML=" X "
							btn.setAttribute('value',''+message[i].USER_ID+'&prodID='+message[i].PROD_ID)}
							for (var j = 0; j < 3; j++) {
									var tabCell = tr.insertCell(-1);
									tabCell.innerHTML = message[i][col[j]];
							}
							var tabCell = tr.insertCell(-1);
							total_amt = total_amt+message[i][col[1]]*((message[i][col[2]]).replace('$','').trim());
							tabCell.innerHTML= '$'+ (message[i][col[1]]*((message[i][col[2]]).replace('$','').trim())).toFixed(2);
							if (btnvar==1)
							{var tabCell = tr.insertCell(-1);
							tabCell.appendChild(btn);}
					}
					var tr = json_table.insertRow(-1);
					var th = document.createElement("th");
					th.setAttribute("style","width:auto")
					th.innerHTML="TOTAL:"+'$'+total_amt.toFixed(2);
					tr.appendChild(th);
					var checkout_btn = document.createElement("button");
					checkout_btn.innerHTML ="CHECKOUT";
					checkout_btn.onclick = function()
					{
							window.location="/checkout";
							
					};
					var placeOrder = document.createElement("button");
					placeOrder.innerHTML ="PLACE ORDER";
					placeOrder.onclick = function()
					{
						window.location ='/';
							
					};
					if (btnvar==1)
					tr.appendChild(checkout_btn);
					else
					tr.appendChild(placeOrder)
					DisplayShoppingCart.appendChild(json_table);
					}
					assignButtons()
			};
			dispCall.open("GET", "/cart_fetch", true);
			console.log("Trying to get cart")
			dispCall.responseType = "json";
			dispCall.send();}


function addtocart()

{
	var buttons = document.getElementsByClassName('btn');
	var heading = document.getElementsByClassName('heading');
	var para = document.getElementsByClassName('para');
	var NumberInpute = document.getElementsByClassName('NumberInpute');
	for (var i=0; i<buttons.length;i++)

	{(function(index)
		{
		buttons[index].onclick = function()
		{
			var dbaddcall = new XMLHttpRequest();
			//console.log(heading[index].textContent.replace('Item:','').trim());
			var qty = NumberInpute[index].value;
			var name = heading[index].textContent.replace('Item:','').trim();

			dbaddcall.onload = function () {
				if (dbaddcall.status == 200) {
					console.log("dbaddcall 200")
					sleep(30)
					displayCart(1)

			}}
			
			//parent.location.reload();
			dbaddcall.open('POST', '/addcart?name=' + name+ "&qty=" + qty, true);
			dbaddcall.responseType = "json";
			dbaddcall.send();
			
			//$("#DisplayShoppingCart").load(location.href+"#DisplayShoppingCart");
		 };
		})(i)
	}
	//update_cart();

}
function assignButtons(){
	var btn=document.getElementsByClassName('remBtn')
	 for(i=0;i<btn.length;i++)
	 { //console.log(btn[i].value)
			 (function(index)
			 {
			 btn[index].onclick = function(){
			 var xmlReq = new XMLHttpRequest();
			 xmlReq.onload = function () {
			 if (xmlReq.status == 200) {
				sleep(30);
				displayCart(1)

		}}
			 xmlReq.open('GET', '/remcart?userID='+btn[index].value, true);
			 xmlReq.responseType = "";
			 xmlReq.send(null);
			 }
	 })(i)}

}
//var shopcart = document.createElement("scripti");
//shopcart.src="ShoppingCart.js";

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
	  if ((new Date().getTime() - start) > milliseconds){
		break;
	  }
	}
  }