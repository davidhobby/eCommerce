
//
// window.onload = function(){
//     var obj_lis = document.getElementById("test").getElementsByTagName("li");
//     for(i=0;i<obj_lis.length;i++){
//         obj_lis[i].onclick = function(){
//             alert(this.innerHTML);
//         }
//     }
// }
//




// create a variable to store the products 'database' in
// use fetch to retrieve it, and report any errors that occur in the fetch operation
// once the products have been successfully loaded and formatted as a JSON object
// using response.json(), run the initialize() function
// button


/*
var products;
fetch('public/jason/products.json').then(function(response) {
  if(response.ok) {
    response.json().then(function(json) {
      products = json;
      initialize();
    });
  } else {
    console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
  }

});*/

// sets up the app logic, declares required variables, contains all the other functions
const  main =document.getElementById('main');
function initialize(products) {
  // grab the UI elements that we need to manipulate
  //get string information from <a></a>
  var finalGroup = [];
  // To start with, set finalGroup to equal the entire products database
  // then run updateDisplay(), so ALL products are displayed initially.
  

  finalGroup = products;
  updateDisplay(finalGroup);
  finalGroup = [];
  }

  // selectProducts() Takes the group of products selected by selectCategory(), and further
  // filters them by the tnered search term (if one has bene entered)


  // start the process of updating the display with the new set of products
  function updateDisplay(finalGroup) {
    main.innerHTML=""
    if(finalGroup.length === 0) {
      var para = document.createElement('p');
      para.textContent = 'No results to display!';
      main.appendChild(para);
    // for each product we want to display, pass its product object to fetchBlob()
  }
  else {
      for(var i = 0; i < finalGroup.length; i++) {
        showProduct(finalGroup[i]);
      }
    }
  }

  // fetchBlob uses fetch to retrieve the image for that product, and then sends the
  // resulting image display URL and product object on to showProduct() to finally
  // display it

  function addtocart() {
    //get product quality and assign to productname
    var Productquality = NumberInpute.value;
    //get product name and assign to productname
    var productname =para.name;
    //just a variable
    var CalculatedPrice;
    // get product price and assign to Defultprice

          var DefultPrice=parseFloat(para.textContent);
          Number(DefultPrice);

      if(Productquality>=2)
      {
        CalculatedPrice=Productquality*DefultPrice;
        Number(CalculatedPrice);
        window.alert("You have added "+Productquality+" "+heading.textContent +" to shoppingCart ");
      window.alert("Now total price is: $" + CalculatedPrice);
      }
      else {
        window.alert("You added "+heading.textContent +" to shoppingCart ");
        window.alert("Now total price is: $" +para.textContent);
      }

  }


  // Display a product inside the <main> element
  function showProduct(product) {
    // create <section>, <h2>, <p>, and <img> elements
    var section = document.createElement('section');
    var heading = document.createElement('h2');
    var para = document.createElement('h2');
    var image = document.createElement('img');

    var CartButton = document.createElement('button');
    var NumberInpute=document.createElement('input');

    CartButton.setAttribute('content', 'test content');
    CartButton.setAttribute('class', 'btn');
    CartButton.innerHTML = 'Add';
    CartButton.onclick = addtocart;
    heading.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());
    para.textContent = product.unitPrice.toFixed(2);
    image.src = "public/img"+product.picture;
    image.alt = product.name;
    main.appendChild(section);
    section.appendChild(heading);
    section.appendChild(para);
    section.appendChild(image);
    section.appendChild(CartButton);
    section.appendChild(NumberInpute);
  }





    
    

      //
      // window.onload = function(){
      //     var NavString = document.getElementById("Navigation_Categories").getElementsByTagName("a");
      //     for(i=0;i<NavString.length;i++){
      //         NavString[i].onclick = function(){
      //           GetNameStringFromNavigation = this.innerHTML;
      //             window.alert(GetNameStringFromNavigation);
      //
      //
      //         }
      //     }
      //   }