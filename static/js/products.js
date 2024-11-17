document.addEventListener('DOMContentLoaded', function() {
  console.log('ola')
  fetch('http://localhost:8000/api/v1/products')
    .then(response => response.json())
    .then(products => {
      const container = document.querySelector('.shop-products-container');
      products.forEach(product => {
        const productCard = `
          <div class="relative card-container">
            <article class="product-card bg-slate-50 flex flex-col justify-center border-[1px] shadow-sm rounded-2xl overflow-hidden">
              <figure class="relative">
                <img class="h-full w-full" src="${product.image_url}" />
                <div class="absolute top-0 left-0 bg-red-500 text-white text-base font-bold pl-3 pr-6 py-2 rounded-br-full">
                  ${((product.price - product.discount_price) / product.price * 100).toFixed(0)}% OFF
                </div>
              </figure>
              <div class="flex flex-col gap-1.5 px-4 py-5 relative">
                <div class="flex flex-row justify-between gap-4">
                  <h3 class="text-lg -translate-y-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                    ${product.name}
                  </h3>
                  <div class="self-start flex flex-row gap-2 items-center font-bold">
                    <i class="fa-solid fa-star text-yellow-500/80"></i>
                    ${product.rating || 'N/A'}
                  </div>
                </div>
                <p class="text-slate-700/80">${product.subcategory} | ${product.brand}</p>
                <div class="flex flex-row gap-3 mt-1 items-center">
                  <span class="original-price text-slate-700/80 font-bold text-base line-through translate-y-[1.5px]">
                    $${product.price.toFixed(2)}
                  </span>
                  <span class="discounted-price text-orange-500 font-bold text-xl">
                    $${product.discount_price.toFixed(2)}
                  </span>
                </div>
                <a href="${product.absolute_url}" class="purchase-button mt-2 bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 ease-linear py-2.5 text-white gap-3 flex items-center justify-center">
                  <i class="fa-solid fa-bag-shopping text-white fa-lg"></i>
                  <span class="font-bold -translate-y-[1px] text-center">Purchase now</span>
                </a>
              </div>
            </article>
          </div>
        `;
        container.innerHTML += productCard;
      });
    })
    .catch(error => console.error('Error fetching products:', error));
});