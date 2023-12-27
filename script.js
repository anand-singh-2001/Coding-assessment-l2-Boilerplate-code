(async function () {
  const response = await fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448"
  );
  const data = await response.json();
  let productData = data.product;

  const vendorName = document.querySelector(".product_vendor");
  const prodTitle = document.querySelector(".product_title");
  const current_price = document.querySelector(".current_price");
  const original_price = document.querySelector(".original_price");
  const product_details = document.querySelector(".product_details");
  const colorPicker = document.querySelector(".color_picker");
  const sizeSelector = document.querySelector(".size_selector");
  const increaseBtn = document.querySelector(".increase_qty");
  const decreaseBtn = document.querySelector(".decrease_qty");
  const quantity = document.querySelector(".quantity");
  const imgContainer = document.querySelector(".aside_section");
  const addCartBtn = document.querySelector(".add_to_cart");
  let quantityValue = 1;
  let finalCartValue = {};
  let colorOptionIndex = 0;
  vendorName.textContent = productData.vendor;
  current_price.textContent = productData.price;
  original_price.textContent = productData.compare_at_price;
  prodTitle.textContent = productData.title;
  product_details.innerHTML = productData.description;

  function colorPickerFunc() {
    colorOptionIndex = productData.options.findIndex(
      (obj) => obj.name === "Color"
    );
    finalCartValue["color"] = Object.keys(
      productData.options[colorOptionIndex].values[0]
    )[0];

    productData.options[colorOptionIndex].values.forEach((element) => {
      const colorName = Object.keys(element)[0];
      const colorValue = element[colorName];
      let eachColor = document.createElement("div");
      eachColor.classList.add("color_selector");
      eachColor.style.backgroundColor = colorValue;
      eachColor.id = colorName;
      colorPicker.appendChild(eachColor);
    });
    colorBorder(finalCartValue["color"]);
  }

  function sizePickerFunc() {
    let sizeOptionIndex = productData.options.findIndex(
      (obj) => obj.name === "Size"
    );
    finalCartValue["size"] = productData.options[sizeOptionIndex].values[0];
    let finalElement = ``;
    productData.options[sizeOptionIndex].values.forEach((element, ind) => {
      finalElement += `<div class="size_input">
      <input
        type="radio"
        id="${element}"
        name="size_selector"
        value="${element}"
        class="input_btn"
        ${ind === 0 ? "checked" : ""}
      />
      <label class="input_label" for=${element}>${element}</label><br />
    </div>`;
    });
    sizeSelector.innerHTML = finalElement;
  }

  function imageFunc() {
    let finalElement = ``;
    productData.images.forEach((element) => {
      finalElement += ` <img
        src="${element["src"]}"
        alt="clothImg"
      />`;
    });
    imgContainer.innerHTML = finalElement;
  }

  function updateQuantity(newValue) {
    quantityValue = newValue;
    quantity.textContent = quantityValue;
    finalCartValue["quantity"] = quantityValue;
  }

  sizeSelector.addEventListener("click", (event) => {
    if (event.target.matches(".input_btn")) {
      const clickedRadioButton = event.target;
      const selectedValue = clickedRadioButton.value;
      finalCartValue["size"] = selectedValue;
    }
  });

  function colorBorder(colorKey) {
    let colorName = productData.options[colorOptionIndex].values.find(
      (item) => Object.keys(item)[0] === colorKey
    )[colorKey];
    let newbox = document.getElementById(colorKey);
    newbox.style.outlineColor = colorName;
    newbox.style.outlineWidth = "4px";
  }

  colorPicker.addEventListener("click", (event) => {
    let prevbox = document.getElementById(finalCartValue["color"]);
    colorBorder(event.target.id);
    prevbox.style.outlineColor = "white";
    finalCartValue["color"] = event.target.id;
  });

  increaseBtn.addEventListener("click", (e) => {
    updateQuantity(quantityValue + 1);
  });

  decreaseBtn.addEventListener("click", (e) => {
    if (quantityValue === 1) return;
    updateQuantity(quantityValue - 1);
  });

  addCartBtn.addEventListener("click", (e) => {
    document.querySelector(
      ".cart_final"
    ).textContent = `${productData.title} with Color ${finalCartValue["color"]} and Size ${finalCartValue["size"]} added to cart`;
    document.querySelector(".cart_final").style.display = "block";
    setTimeout(() => {
      document.querySelector(".cart_final").style.display = "none";
    }, 3000);
  });

  sizePickerFunc();
  colorPickerFunc();
  imageFunc();
})();
