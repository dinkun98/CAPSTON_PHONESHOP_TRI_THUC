function renderProductsList(productsList) {
  var content = "";
  for (var i = 0; i < productsList.length; i++) {
    var product = productsList[i];
    var contentTr = `
    <tr>
    <th scope="row">${product.id}</th>
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td>
    <img data-src="holder.js/100x100" class="img-thumbnail" alt="200x200" src="${product.img}" data-holder-rendered="true" style="width: 200px; height: 200px;">
    </td>
    <td>${product.desc}</td>
    <td>
    <button class="btn btn-warning" onclick="editProduct(${product.id})">Edit</button>
    <button class="btn btn-danger" onclick="delProduct(${product.id})">Delete</button>
    </td>
    </tr>
          `;

    content += contentTr;
  }

  //in danh sách ra giao diện.
  document.querySelector("#tablePhone").innerHTML = content;
}

function DSSP(productList2){
  let products = [];
  
  for(var i = 0; i< productList2.Length; i++ ){
    var product = productList2[i];
    console.log(product)
    products.push(product);
}
return products;
}