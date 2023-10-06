let phoneListData = [];
let cart = [];
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
  // console.log("select", this.value);
  phoneList2(this.value);
});

const phoneList2 = (brand) => {
  // console.log("phoneListData", phoneListData);
  let phoneListFilter = phoneListData.filter((value) => value.type === brand);
  // console.log(phoneListFilter);
  // console.log(phoneListData);

  if (phoneListFilter.length == 0) {
    renderPhoneList(phoneListData);
    // console.log("phoneListData:", phoneListData);
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
      <td>
        <span class="btn" onclick="minusQty(${
          cartItem.product.id
        })"><i class="fa-solid fa-minus"></i></span>
        <span>${cartItem.quantity}</span>
        <span class="btn" onclick="addQty(${
          cartItem.product.id
        })"><i class="fa-solid fa-plus"></i></span>
      </td>
      <td class="itemPrice">${cartItem.itemPrice()}</td>
      <td></td>
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
    renderCart(cart);
    getEle("#totalBill").innerHTML = ` Tổng tiền: ${handleTotalPrice(cart)}`
  });
};

const findIndexItem = (cart, id) => {
  for (let i = 0; i < cart.length; i++) {
    if (Number(cart[i].product.id) === Number(id)) {
      return i;
    }
  }
  return i;
};

window.addQty = (id) => {
  let i = findIndexItem(cart, id);
  let cartItem = cart[i];
  cartItem.quantity++;
  renderCart(cart);
  getEle("#totalBill").innerHTML = ` Tổng tiền: ${handleTotalPrice(cart)}`
};

window.minusQty = (id) => {
  let i = findIndexItem(cart, id);
  let cartItem = cart[i];
  cartItem.quantity--;
  if (cartItem.quantity <= 0) {
    cart.splice(cart[i], 1);
  }
  renderCart(cart);
  getEle("#totalBill").innerHTML = ` Tổng tiền: ${handleTotalPrice(cart)}`
};


const handleTotalPrice = (cart) => {
  let totalPrice = 0;
  cart.forEach((element) => {
    totalPrice += element.itemPrice();
  })
  return totalPrice
};

