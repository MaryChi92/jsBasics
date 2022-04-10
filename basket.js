'use strict'

let addedItems = {}

const basketIconEl = document.body.querySelector('img.cartIcon');
const basket = document.body.querySelector('div.basket');
const basketTotalEl = document.querySelector('.basketTotal');

/**
 * Function adds a product to cart and changes amount on cart icon.
 * @param {number} id - product's id.
 * @param {string} name - product's name.
 * @param {number} price - product's price.
 */
function addItemToCart(id, name, price) {
    if (id in addedItems) {
        addedItems[id].amount ++;
        addedItems[id].total += price;
        changeAmountAndItemTotalValue(id);
    } else {
        addedItems[id] = {
            'name': name,
            'amount': 1,
            'price': price,
            'total': price
        }
        getItemMarkup(id);
    }
    changeBasketTotalValue(id);
    document.body.querySelector('span.cartAmount').textContent ++
}

/**
 * Function creates markup for a newly added product.
 * @param {number} id - product's id.
 */
function getItemMarkup(id) {
    const itemRow = `
    <div class="basketRow" data-id="${id}">
      <div>${addedItems[id].name}</div>
      <div>
        <span class="productCount">${addedItems[id].amount}</span> шт.
      </div>
      <div>$${addedItems[id].price}</div>
      <div>
        $<span class="productTotalRow">${(addedItems[id].price * addedItems[id].amount).toFixed(2)}</span>
      </div>
    </div>
    `;
    basketTotalEl.insertAdjacentHTML("beforebegin", itemRow);
}

/**
 * Function changes total amount and sum of an added product.
 * @param {number} id - product's id.
 */
function changeAmountAndItemTotalValue(id) {
    const itemRowEl = basket.querySelector(`.basketRow[data-id='${id}']`);
    itemRowEl.querySelector('.productCount').textContent = addedItems[id].amount;
    itemRowEl.querySelector('.productTotalRow')
        .textContent = addedItems[id].price * addedItems[id].amount;
}

/**
 * Function changes total sum of the cart.
 * @param {number} id - product's id.
 */
function changeBasketTotalValue(id) {
    let basketTotalValueEl = basket.querySelector('.basketTotalValue');
    let basketTotalValue = basketTotalValueEl.textContent
    basketTotalValueEl.textContent = Number(basketTotalValue) +
        Number(addedItems[id].price);
}


document.body.querySelector('div.featuredItems')
    .addEventListener('click', event => {
        if (!event.target.classList.contains('addToCart')) {
            return;
        }
        /* сначала сделала так, но поняла, что это очень плохо, так что
           подсмотрела в решениях про closest :)
           const item = event.target.parentNode.parentNode.parentNode; */
        const item = event.target.closest('.featuredItem');
        event.target
            .innerHTML = '<img src="images/cart.svg" alt=""></img>Add One More';
        const itemToAdd = addItemToCart(+item.dataset.id, item.dataset.name,
            +item.dataset.price);
})

basketIconEl.addEventListener('click', () => {
    basket.classList.toggle('hidden');
})