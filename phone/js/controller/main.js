let phoneListData = [];
let cart =[];
const LIST_CART = 'LIST_CART';
let data = JSON.parse(localStorage.getItem(LIST_CART))


const getEle = (selector) => {
  return document.querySelector(selector);
};

const getPhoneList = () => {
  const promise = axios({
    method: "GET",
    url: "https://6500588b18c34dee0cd4bf80.mockapi.io/Phone",
  });
  promise
    .then((res) => {
      phoneListData = res.data;
      // console.log(phoneListData);
      renderPhoneList(phoneListData);
      if(data){
        renderCart(data);
        getEle("#quantity").innerHTML = countItem(data);
        getEle("#totalBill").innerHTML = ` Tổng tiền: ${handleTotalPrice(data)}`;
        for(let i = 0; i <= data.length; i++){
          const cartItem = new CartItem(data[i].product, data[i].quantity);
          cart.push(cartItem);
        }
      }
    })
    .catch((err) => {});
};

getPhoneList();

const renderPhoneList = (phoneList) => {
  getEle("#products__list").innerHTML = "";
  phoneList.forEach((phone) => {
    let li = document.createElement("li");
    li.classList.add("card");
    li.innerHTML = `
    <div class="card__top">
      <p>${phone.type}</p>
      </div>
    <div class="card__img">
      <img src="${phone.img}" alt="">
    </div>
    <div class="card__details">
      <div class="products__name">
        <p>${phone.name}</p>
      </div>
      <div class="wrapper">
        <p>${phone.screen}</p>
        <p>${phone.backCamera}</p>
        <p>${phone.frontCamera}</p>
        <p>${phone.desc}</p>
      </div>
      <div class="purchase">
        <p>${phone.price}$</p>
        <button class="btn btn-purchase" id="add" onclick="addToCart('${phone.id}')">Add</button>
      </div>
    </div>
    `;
    getEle("#products__list").appendChild(li);
  });
};

getEle("#option-brand").addEventListener("change", function () {
  phoneList2(this.value);
});

const phoneList2 = (brand) => {
  console.log(brand)
  console.log(phoneListData)
  let phoneListFilter = phoneListData.filter((element) => {
    return element.type === brand;
  })

  if (phoneListFilter.length == 0) {
    renderPhoneList(phoneListData);
  } else {
    renderPhoneList(phoneListFilter);
  }
};

const renderCart = (cart) => {
  let htmlContent = "";
  cart.forEach((cartItem) => {
    htmlContent += `
    <tr>
      <td style="width: 20%;">
        <img src="${cartItem.product.img}" alt="" style="width: 80%;">
      </td>
      <td>${cartItem.product.name}</td>
      <td class="handleQTY">
        <span class="btn" onclick="minusQty(${
          cartItem.product.id
        })"><i class="fa-solid fa-minus"></i></span>
        <span>${cartItem.quantity}</span>
        <span class="btn" onclick="addQty(${
          cartItem.product.id
        })"><i class="fa-solid fa-plus"></i></span>
      </td>
      <td class="itemPrice">${cartItem.product.price*cartItem.quantity}</td>
      <td class="btn btn-delete" onclick="deleteItem(${
        cartItem.product.id
      })"><i class="fa-solid fa-trash"></i></td>
    </tr>
    `;
  });
  getEle("#tbodyShopList").innerHTML = htmlContent;
 
};
const findItem = (cart, id) => {
  let item;
  cart.forEach((element) => {
    if (element.product.id === id) {
      return (item = element);
    }
  });
  return item;
};

const findIndexItem = (cart, id) => {
  for (let i = 0; i < cart.length; i++) {
    if (Number(cart[i].product.id) === Number(id)) {
      return i;
    }
  }
  return i;
};

const handleTotalPrice = (cart) => {
  let totalPrice = 0;
  cart.forEach((element) => {
    totalPrice += (element.product.price*element.quantity);
  });
  return totalPrice;
};

const countItem = (cart) => {
  let count = 0;
  cart.forEach((element) => {
    count += element.quantity;
  });
  return count;
};

window.addToCart = (id) => {
  const promise = axios({
    url: `https://6500588b18c34dee0cd4bf80.mockapi.io/Phone/${id}`,
    method: "GET",
  });
  promise.then((res) => {
    const {
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type,
    } = res.data;
    let product = new Phone(
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type
    );

    let cartItem = new CartItem(product, 1);
    let sp = findItem(cart, cartItem.product.id);
    if (!sp) {
      cart.push(cartItem);
    } else {
      sp.quantity++;
    }
    localStorage.setItem(LIST_CART, JSON.stringify(cart))
    renderCart(cart);
    getEle("#quantity").innerHTML = countItem(cart);
    getEle("#totalBill").innerHTML = ` Tổng tiền: ${handleTotalPrice(cart)}`;
  });
};


window.addQty = (id) => {
  console.log("cart:", cart)
  let i = findIndexItem(cart, id);
  let cartItem = cart[i];
  cartItem.quantity++;
  localStorage.setItem(LIST_CART, JSON.stringify(cart))
  renderCart(cart);
  getEle("#quantity").innerHTML = countItem(cart);
  getEle("#totalBill").innerHTML = ` Tổng tiền: ${handleTotalPrice(cart)}`;
};

window.minusQty = (id) => {
  let i = findIndexItem(cart, id);
  let cartItem = cart[i];
  cartItem.quantity--;
  if (cartItem.quantity <= 0) {
    cart.splice(i, 1);
  }
  localStorage.setItem(LIST_CART, JSON.stringify(cart))
  renderCart(cart);
  getEle("#quantity").innerHTML = countItem(cart);
  getEle("#totalBill").innerHTML = ` Tổng tiền: ${handleTotalPrice(cart)}`;
};

window.deleteItem = (id) => {
  let i = findIndexItem(cart, id);
  cart.splice(Number(i), 1);
  localStorage.setItem(LIST_CART, JSON.stringify(cart))
  renderCart(cart);
  getEle("#quantity").innerHTML = countItem(cart);
  getEle("#totalBill").innerHTML = ` Tổng tiền: ${handleTotalPrice(cart)}`;
};

window.payBill = (cart) => {
  alert("Hoàn tất thanh toán!");
  cart = [];
  localStorage.setItem(LIST_CART, JSON.stringify(cart))
  renderCart(cart);
  getEle("#quantity").innerHTML = countItem(cart);
  getEle("#totalBill").innerHTML = ` Tổng tiền: ${handleTotalPrice(cart)}`;
};

