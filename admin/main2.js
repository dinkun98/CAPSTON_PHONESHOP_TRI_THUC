function fetchProductsList1() {
  getProductList()
    .then(function (res) {
      renderProductsList(res.data);
    })
    .catch(function (err) {
      console.log("err", err);
    });
}

fetchProductsList1();

const layThongTinSanPham = () => {
  var phoneName = document.getElementById("name").value;
  var price = document.getElementById("price").value;
  var screen = document.getElementById("screen").value;
  var backCam = document.getElementById("backCam").value;
  var frontCam = document.getElementById("frontCam").value;
  var img = document.getElementById("img").value;
  var desc = document.getElementById("desc").value;
  var brand = document.getElementById("type").value;

  return new Product(
    phoneName,
    price,
    screen,
    backCam,
    frontCam,
    img,
    desc,
    brand
  );
};

// window.document.getElementById("addPhoneForm").onclick = () => {
//   // ẩn btn cập nhật
//   document.getElementById("btnUpdate").style.display = "none";

//   // hiển thị lại btn thêm
// document.getElementById("btnAddPhone").style.display = "inline-block"
// }

document.getElementById("btnAddPhone").onclick = () => {
  // Lấy thông tin sam pham
  const product = layThongTinSanPham();
  console.log(product);

  // kiểm tra name
  var valid = kiemTraRong(
    product.name,
    "#tbname",
    "Tên điện thoại không được để trống!"
  );

  // kiểm tra price
  valid &=
    kiemTraRong(product.price, "#tbprice", "Không được để trống giá") &&
    kiemTraSo(product.price, "#tbprice", "Vui lòng chỉ nhập số!");

  // kiểm tra screen
  valid &= kiemTraRong(
    product.screen,
    "#tbscreen",
    "screen không được để trống"
  );

  // kiểm tra backcam
  valid &= kiemTraRong(
    product.backCamera,
    "#tbbackCam",
    "back Camera không được để trống"
  );

  // kiểm tra frontCam
  valid &= kiemTraRong(
    product.frontCamera,
    "#tbfrontCam",
    "front cam không được để trống"
  );

  // kiểm tra img
  valid &=
    kiemTraRong(product.img, "#tbimg", "img không được để trống") &&
    kiemTraUrl(product.img, "#tbimg", "Mời bạn nhập đường dẫn hình URL");

  // kiểm tra desc
  valid &= kiemTraRong(product.desc, "#tbdesc", "desc không được để rỗng");

  // kiểm tra select
  valid &= kiemTraSelectedBrand(product.type, "#tbtype", "Vui lòng chọn type");

  if (valid) {
    // call API thêm mới
    const promise = axios({
      method: "POST",
      url: "https://6500588b18c34dee0cd4bf80.mockapi.io/Phone",
      data: {
        // spread operator
        ...product,
      },
    });

    promise
      .then(() => {
        // call API lấy lại danh sách
        fetchProductsList1();

        // đóng modal thêm
        document.getElementById("btnClose").click();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

window.editProduct = (id) => {
  // // ẩn btn thêm món
  // document.getElementById("btnAddPhone").style.display = "none";
  // //hiện thị btn cập nhật
  // document.getElementById('#btnUpdate').style.display = 'inline-block'
  // call API lấy thông tin san pham
  const promise = axios({
    method: "GET",
    url: `https://6500588b18c34dee0cd4bf80.mockapi.io/Phone/${id}`,
  });

  promise.then((result) => {
    // đưa food id vào trong button cập nhật
    document
      .getElementById("btnUpdate")
      .setAttribute("data-id", result.data.id);

    // parse thông tin product

    const parse = (product) => {
      return {
        ...product,
      };
    };

    const product = result.data;
    // hiển thị thông tin món ăn lên modal
    // document.getElementById('id').value = product.id
    document.getElementById("name").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("screen").value = product.screen;
    document.getElementById("backCam").value = product.backCamera;
    document.getElementById("frontCam").value = product.frontCamera;
    document.getElementById("img").value = product.img;
    document.getElementById("desc").value = product.desc;
    document.getElementById("type").value = product.type;
  });
};

// cập nhật san pham
document.getElementById("btnUpdate").onclick = () => {
  // lấy thông tin san pham sau edit

  const product = layThongTinSanPham();

  // kiểm tra name
  var valid = kiemTraRong(
    product.name,
    "#tbname",
    "Tên điện thoại không được để trống!"
  );

  // kiểm tra price
  valid &=
    kiemTraRong(product.price, "#tbprice", "Không được để trống giá") &&
    kiemTraSo(product.price, "#tbprice", "Vui lòng chỉ nhập số!");

  // kiểm tra screen
  valid &= kiemTraRong(
    product.screen,
    "#tbscreen",
    "screen không được để trống"
  );

  // kiểm tra backcam
  valid &= kiemTraRong(
    product.backCamera,
    "#tbbackCam",
    "back Camera không được để trống"
  );

  // kiểm tra frontCam
  valid &= kiemTraRong(
    product.frontCamera,
    "#tbfrontCam",
    "front cam không được để trống"
  );

  // kiểm tra img
  valid &=
    kiemTraRong(product.img, "#tbimg", "img không được để trống") &&
    kiemTraUrl(product.img, "#tbimg", "Mời bạn nhập đường dẫn hình URL");

  // kiểm tra desc
  valid &= kiemTraRong(product.desc, "#tbdesc", "desc không được để rỗng");

  // kiểm tra select
  valid &= kiemTraSelectedBrand(product.type, "#tbtype", "Vui lòng chọn type");

  if (valid) {
    // lấy id cập nhật
    const id = document.getElementById("btnUpdate").getAttribute("data-id");

    // call API cập nhật món ăn
    const promise = axios({
      method: "PUT",
      url: `https://6500588b18c34dee0cd4bf80.mockapi.io/Phone/${id}`,
      data: {
        ...product,
      },
    });

    promise
      .then(() => {
        // lấy lại danh sách món ăn sau khi cập nhật thành công
        getProductList();

        // đóng modal sau khi cập nhật thành công
        document.getElementById("btnClose").click();
        fetchProductsList1();
      })
      .catch((err) => { });
  }
};

window.delProduct = (id) => {
  // call API xóa
  const promise = axios({
    method: "DELETE",
    url: `https://6500588b18c34dee0cd4bf80.mockapi.io/Phone/${id}`,
  });

  promise
    .then(() => {
      // gọi lại api lấy danh sách san pham
      fetchProductsList1();
    })
    .catch((err) => {
      console.log(err);
    });
};

let mang = [];

// // Lấy danh sách san pham tu api
// const getProduct = () => {
//   const promise = axios({
//     method: "GET",
//     url: "https://6512e3cbb8c6ce52b3966a85.mockapi.io/Products",
//   });

//   promise
//     // get data thành công
//     .then((result) => {
//       console.log(result.data);
//       mang.push(result.data);
//       console.log(mang);
//     })
//     // get data thất bại
//     .catch((err) => {
//       console.log(err);
//     })
//     // Luôn luôn chạy dù thành công, thất bại
//     .finally(() => {
//       console.log("finally");
//     });
// };
// getProduct();

document.querySelector("#btnSearch").onclick = function () {
  // console.log(fetchProductsList1)
  // toLowerCase: convert text về chữ thường
  // ?. : Optional chaining (?.)
  getProductList()
    .then(function (res) {
      var textSearch = document
        .querySelector("#txtSearch")
        .value.trim()
        ?.toLowerCase();
      var result = [];

      if (textSearch.length > 0) {
        result = res.data.filter(function (pd) {
          return pd.name.toLowerCase().includes(textSearch);
        });

        renderProductsList(result);
      } else {
        renderProductsList(res.data);
      }
    })
    .catch(function (err) {
      console.log("err", err);
    });
};

document.getElementById("btnxepTang").onclick = function () {
  getProductList()
    .then(function (res) {
      var sortTang = res.data.sort((a, b) => a.price - b.price);
      renderProductsList(sortTang);
    })
    .catch(function (err) {
      console.log("err", err);
    });
};

document.getElementById("btnxepGiam").onclick = function () {
  getProductList()
    .then(function (res) {
      var sortGiam = res.data.sort((a, b) => b.price - a.price);
      renderProductsList(sortGiam);
    })
    .catch(function (err) {
      console.log("err", err);
    });
};
