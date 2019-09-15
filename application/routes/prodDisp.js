	//define global variables make sure able to pass value to another funtion
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
    ///addtocart();
  }
  
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
        var xmlReq = new XMLHttpRequest();
        //console.log(heading[index].textContent.replace('Item:','').trim());
        console.log(para[index].textContent);
        var qty = NumberInpute[index].value;
        console.log(qty);
        var name = heading[index].textContent.replace('Item:','').trim();
        var price = para[index].textContent.replace('Price per lb: $','').trim();
        console.log(price);
  
        var calculateprice=price*qty;
        console.log(calculateprice);
  
  
  //calculate price;
  
  
  //display shoppingcart table
  //	window.alert("add "+qty+" "+name+" to card"+"total price is "+calculateprice.toFixed(2));
    var table= document.getElementById("myTable").insertRow(-1);
    var x=table.insertCell(0);
    var y=table.insertCell(1);
    var z=table.insertCell(2);
        x.innerHTML=name;
        y.innerHTML=qty;
        z.innerHTML=calculateprice.toFixed(2);
  
     var TotalPrice =document.getElementById("TP");
     TotalPrice.innerHTML=calculateprice.toFixed(2);
  
    var itemExists= 'FALSE';
    var tb = document.getElementById("myTable").rows;
    for (var i =0; i<= tb.length; i++)
    {
        if (name == tb[i][0]){
  
  
          itemExists='TRUE';
        console.log(itemExists);
  
    }
    else{
       console.log(itemExists);
    }
    }
  
       };
      })(i)
    }
  
  
  }