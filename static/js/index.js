document.addEventListener("DOMContentLoaded", function () {
  const currentTheme = localStorage.getItem("theme") || "light";
  const html = document.documentElement;

  if (currentTheme === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }

  const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
  );

  if (toggleSwitch) {
    function switchTheme(e) {
      if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
    }
    toggleSwitch.addEventListener("change", switchTheme, false);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper-container", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const newSwiper = new Swiper(".recommend-swiper-container", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: ".recommend-swiper-button-next",
      prevEl: ".recommend-swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });
});

/* DROPDOWN MENU */

document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const select = dropdown.querySelector(".select");
    const caret = dropdown.querySelector(".caret");
    const menu = dropdown.querySelector(".menu");
    const options = dropdown.querySelectorAll(".menu li");
    const selected = dropdown.querySelector(".selected");

    select.addEventListener("click", () => {
      caret.classList.toggle("caret-rotate");
      menu.classList.toggle("menu-open");
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        selected.classList.remove("placeholder");
        selected.innerText = option.innerText;
        caret.classList.remove("caret-rotate");
        menu.classList.remove("menu-open");
        options.forEach((opt) => opt.classList.remove("active"));
        option.classList.add("active");

        // borrar luego, imprime el campo seleccionado
        console.log(`${selected.innerText}`);
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname === "/shop") {
    fetch("http://localhost:8000/api/v1/products")
      .then((response) => response.json())
      .then((products) => {
        const container = document.querySelector(".shop-products-container");
        const limitedProducts = products.slice(0, 30);

        limitedProducts.forEach((product) => {
          const productCard = `
          <div class="relative card-container">
            <article class="product-card bg-slate-50 flex flex-col justify-center border-[1px] shadow-sm rounded-2xl overflow-hidden">
              <figure class="relative">
                <img class="h-full w-full" src="${product.image_url}" />
                <div class="absolute top-0 left-0 bg-red-500 text-white text-base font-bold pl-3 pr-6 py-2 rounded-br-full">
                  ${(
                    ((product.price - product.discount_price) / product.price) *
                    100
                  ).toFixed(0)}% OFF
                </div>
              </figure>
              <div class="flex flex-col gap-1.5 px-4 py-5 relative">
                <div class="flex flex-row justify-between gap-4">
                  <h3 class="text-lg -translate-y-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                    ${product.name}
                  </h3>
                  <div class="self-start flex flex-row gap-2 items-center font-bold">
                    <i class="fa-solid fa-star text-yellow-500/80"></i>
                    ${product.rating || "N/A"}
                  </div>
                </div>
                <p class="text-slate-700/80">${product.subcategory} | ${
            product.brand
          }</p>
                <div class="flex flex-row gap-3 mt-1 items-center">
                  <span class="original-price text-slate-700/80 font-bold text-base line-through translate-y-[1.5px]">
                    $${product.price.toFixed(2)}
                  </span>
                  <span class="discounted-price text-orange-500 font-bold text-xl">
                    $${product.discount_price.toFixed(2)}
                  </span>
                </div>
                <a href="/product/${
                  product.id
                }" class="purchase-button mt-2 bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 ease-linear py-2.5 text-white gap-3 flex items-center justify-center">
                  <i class="fa-solid fa-bag-shopping text-white fa-lg"></i>
                  <span class="font-bold -translate-y-[1px] text-center">Purchase now</span>
                </a>
              </div>
            </article>
          </div>
        `;

          container.innerHTML += productCard;
          console.log("card added");
        });
      })
      .catch((error) => console.error("Error fetching products:", error));
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const pathname = window.location.pathname;

  // verficiamos si la ruta actual es '/product/{id}' usando un regex :p
  const productMatch = pathname.match(/^\/product\/(\d+)$/);
  if (productMatch) {
    const productId = productMatch[1];
    fetch(`http://localhost:8000/api/v1/products/${productId}`)
      .then((response) => response.json())
      .then((product) => {
        const productContainer = document.querySelector(".detail-product");
        const bannerContainer = document.querySelector(".banner-product img");

        // Actualiza la imagen del producto
        bannerContainer.src = product.image_url;

        // Actualiza los detalles del producto
        productContainer.innerHTML = `
          <span class="text-lg text-slate-700/70 font-bold">${
            product.brand
          }</span>
          <h2 class="text-3xl tracking-normal font-bold text-cyan-900">${
            product.name
          }</h2>
          <p class="text-lg text-slate-500/90">${product.subcategory}</p>
          <div class="flex flex-row gap-3 items-center">
            <i class="fa-solid fa-star text-yellow-500/80 fa-lg"></i>
            <span class="text-lg text-orange-600 tracking-wide translate-y-[1px] font-bold">${
              product.rating || "N/A"
            } Rating</span>
          </div>
          <div class="flex flex-row gap-4">
            <div class="flex flex-row mt-3 w-min">
              <span class="text-5xl font-bold roboto-font text-cyan-800">${Math.floor(
                product.discount_price
              )}.</span>
              <span class="text-2xl font-bold self-start text-cyan-800">${(
                product.discount_price % 1
              )
                .toFixed(2)
                .substring(2)}$</span>
            </div>
            <div class="relative flex flex-row mt-3 w-min self-end text-slate-700/70">
              <div class="original-price-container whitespace-nowrap flex">
                <span class="text-3xl font-bold roboto-font">${Math.floor(
                  product.price
                )}.</span>
                <span class="text-lg font-bold self-start">${(product.price % 1)
                  .toFixed(2)
                  .substring(2)}$</span>
              </div>
            </div>
          </div>
          <p class="text-slate-800 mt-1 text-base font-medium">
            You save: <span class="ml-1 uppercase font-bold">${(
              ((product.price - product.discount_price) / product.price) *
              100
            ).toFixed(0)}% OFF</span>
            <span class="text-slate-800/70">(inclusive all taxes)</span>
          </p>
          <div class="flex flex-row gap-3 mt-4">
            <button class="py-2.5 px-8 rounded-3xl bg-slate-100 flex flex-row items-center justify-center gap-4">
              <svg class="w-5" fill="#155e75" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
              </svg>
              <span class="font-bold text-lg text-cyan-800">Add to cart</span>
            </button>
            <button class="py-2.5 px-14 rounded-3xl flex flex-row items-center justify-center gap-4 bg-cyan-100">
              <span class="font-bold text-lg text-cyan-800">Buy now</span>
            </button>
          </div>
          <div
          class="my-4 mr-96 border bg-slate-200/80 border-slate-200/80 w-full"
        ></div>
        <h3 class="text-xl font-bold">Seller Information:</h3>
        <div class="flex flex-row gap-3 items-center mt-1">
          <div
            class="border-[1px] border-slate-300/80 p-5 bg-slate-50 rounded-full"
          >
            <img
              class="w-12 h-12"
              src="/static/assets/bigbasket-logo.png"
              alt="Seller Logo"
            />
          </div>
          <div class="flex flex-col">
            <h4 class="text-lg tracking-wide text-slate-800/80 font-bold">
              Big Basket
              <span class="text-base">(India's supermarket)</span>
            </h4>
            <p class="text-base text-cyan-700 uppercase font-bold">
              A TATA Enterprise
            </p>
            <span class="mt-1.5 text-green-900"
              >96% Positive feedbacks |
              <a href="#" class="underline text-red-800"
                >www.bigbasket.com</a
              ></span
            >
          </div>
        </div>
        <p class="text-pretty pr-5 mt-3 text-slate-700/80">
          Este producto no forma parte de un inventario real; se ha extraído
          de un archivo CSV público con fines educativos. Puedes encontrar
          el producto original en el siguiente enlace:
          <a
            href="URL_DEL_PRODUCTO_ORIGINAL"
            target="_blank"
            class="text-cyan-600 underline ml-0.5"
          >
            Producto Original
          </a>
        </p>
        <div class="flex flex-row gap-5 mt-5">
          <div
            class="flex flex-row gap-4 py-3 pl-5 pr-7 justify-center items-center bg-slate-50 border-[1px] border-slate-300 rounded-xl"
          >
            <svg
              class="w-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
            >
              <path
                d="m29.59 13.21-3.9-3.85A1.31 1.31 0 0 0 24.8 9H19V6.38A1.3 1.3 0 0 0 17.81 5H3.21A1.3 1.3 0 0 0 2 6.38v14.24A1.3 1.3 0 0 0 3.21 22H4a2.74 2.74 0 0 0 0 .5 3.5 3.5 0 0 0 7 0 2.74 2.74 0 0 0 0-.5h10a2.74 2.74 0 0 0 0 .5 3.5 3.5 0 0 0 7 0 2.74 2.74 0 0 0 0-.5h.74A1.35 1.35 0 0 0 30 20.61v-6.4a1.4 1.4 0 0 0-.41-1zM7.5 24A1.5 1.5 0 0 1 6 22.5a1.39 1.39 0 0 1 .09-.5 1.4 1.4 0 0 1 .69-.8 1.64 1.64 0 0 1 .33-.14A1.58 1.58 0 0 1 7.5 21a1.5 1.5 0 0 1 0 3zm2.44-4a3.48 3.48 0 0 0-4.88 0H4V7h13v13zM26 22.5a1.5 1.5 0 1 1-1.5-1.5 1.27 1.27 0 0 1 .39.06 1.46 1.46 0 0 1 1 .94 1.39 1.39 0 0 1 .11.5zm2-2.5h-1.06a3.48 3.48 0 0 0-4.87 0H19v-9h5.57L28 14.53z"
                style="fill: #ea580ccc"
              />
            </svg>
            <p class="text-sm">
              <span class="text-green-700 font-bold">Free Deliver</span>
              Apply to <br />All Order Over $100
            </p>
          </div>
          <div
            class="flex flex-row gap-4 py-3 px-5 justify-center items-center bg-slate-50 border-[1px] border-slate-300 rounded-xl"
          >
            <i
              class="fa-regular fa-handshake fa-2xl text-orange-600/80"
            ></i>
            <p class="text-sm">
              <span class="text-green-700 font-bold">Great Daily Deal</span>
              We <br />Providing Organic Products
            </p>
          </div>
        </div>
        `;
      })
      .catch((error) => console.error("Error fetching product:", error));
  }
});
