import {addCommas, convertToNumber} from '../useful-functions.js';
import * as Api from '/api.js';
// let $quantityInput = document.getElementById('quantityInput');
const $cartList = document.querySelector('.cartList');
const $cartContainer = document.getElementById('cartContainer');
const $payInfo = document.querySelector('.payInfo');
let totalItemPrice;
let totalItemQuantity = 0;
let totalPrice = 0;
let total = 0;
const delivery = 3000;

//장바구니, 전체 상품 리스트 불러오기
async function getCartList() {
  try {
    const cartList = [];
    const itemList = await Api.get('/api/product/list'); //전체 상품 목록
    const cartObject = Object.keys(sessionStorage).filter((e) => e.slice(0, 4) === 'cart');
    cartObject.forEach((e, i) => {
      cartList.push(JSON.parse(sessionStorage.getItem(cartObject[i])));
    });
    return [cartList, itemList];
  } catch (err) {
    console.error(err);
    $cartList.innerText = `불러오기에서 무언가 잘못되었습니다! \n${err}`;
  }
}

async function createCartElements() {
  const res = await getCartList();
  const [incartList, initemList] = res;
  if (incartList.length < 1) return $cartList.insertAdjacentHTML('beforeEnd', `장바구니가 비었습니다:(`);

  //장바구니 목록을 돌면서 전체 상품 중 id 일치하는 제품 가져오기
  incartList.forEach((cart, i) => {
    const foundItem = initemList.find((item) => {
      if (item.shortId == cart.id) return item;
    });

    //상품 수량 및 가격 계산
    totalItemPrice = foundItem.price * convertToNumber(cart.quantity); //제품 별 총 금액
    totalItemQuantity += parseInt(cart.quantity);
    totalPrice += totalItemPrice; //총 상품 금액
    total = totalPrice + delivery; //총 주문금액

    //장바구니 목록
    $cartContainer.insertAdjacentHTML(
      'beforeend',
      `
        <div class="item cartItem" id="item_${i}">
          <label >
            <input type="checkbox" name="buy" value="${i}">
          </label>
          <a href="#">
            <img class="itemInfo" src="${foundItem.img}"/>
          </a>    
          <a href="#">
            <span class="itemInfo">${foundItem.prod_title}</span>
          </a>  
          <div id="controlBox" class="itemInfo_btn_updown itemInfo">
            <button data-quantity=${i} id="quantityDown" class="button is-danger is-light">-</button>
            <input data-quantity=${i} id="quantityInput" class="input" type="text" value="${cart.quantity}" />
            <button data-quantity=${i} id="quantityUp" class="button is-info is-light">+</button>
          </div>
          <span data-priceid=${i} class="itemInfo eachPrice">${addCommas(foundItem.price)}</span>
          <span data-calcprice=${i} class="itemInfo totalItemPrice" id="calcItemPrice">${addCommas(totalItemPrice)}</span>  
          <button class="trash" data-checkBox=${i}><i class="fa-solid fa-trash-can"></i></button>    
        </div>`
    );
  });
  $payInfo.insertAdjacentHTML(
    'beforeend',
    `
  <div class="totalPrice">상품 금액 ${addCommas(totalPrice)}원</div>
  <div class="shipping">배송비 ${addCommas(delivery)}원</div>
  <div class="total">총 ${addCommas(total)}원</div>
`
  );
  return document;
}

//수량조절
async function controlQuantityBox() {
  await createCartElements();
  const $cartItems = document.querySelectorAll('.cartItem');
  $cartItems.forEach((e) => e.addEventListener('click', controlCartInfo));
  function controlCartInfo(e) {
    if (e.target.id !== 'quantityUp' && e.target.id !== 'quantityDown') return;

    const {quantity} = e.target.dataset;
    const $quantityInputs = document.querySelectorAll('#quantityInput');
    const $eachPrices = document.querySelectorAll('.eachPrice');
    const $totalItemPrices = document.querySelectorAll('.totalItemPrice');
    let $quantityInput;
    let $totalItemPrice;
    let $eachPrice;

    $quantityInputs.forEach(elem => {
      if(elem.dataset.quantity === quantity) $quantityInput = elem
    });
    $totalItemPrices.forEach(elem => {
      if(elem.dataset.calcprice === quantity) $totalItemPrice = elem
    });
    $eachPrices.forEach(elem => {
      if(elem.dataset.priceid === quantity) $eachPrice = elem
    });
    if (e.target.id === 'quantityUp') { 
      $quantityInput.value = Number($quantityInput.value) + 1;
    } else if (e.target.id === 'quantityDown' && $quantityInput.value > 1) {
      $quantityInput.value = Number($quantityInput.value) + -1;
    }

    $totalItemPrice.textContent = addCommas(convertToNumber($eachPrice.textContent) * Number($quantityInput.value));

    calcTotalPrice($totalItemPrices);
  }
}

//결제정보 재계산
function calcTotalPrice($totalItemPrices) {
  totalPrice = 0;
  const totalEl = document.querySelector('.total');
  const totalPriceEl = document.querySelector('.totalPrice');
  $totalItemPrices.forEach((elem) => (totalPrice += Number(convertToNumber(elem.textContent))));
  
  totalPriceEl.textContent = `상품 금액 ${addCommas(totalPrice)}원`;
  
  if(totalPrice === 0) {
    const $orderBtn = totalEl.parentElement.nextElementSibling;
    $orderBtn.disabled = true;
    $cartList.insertAdjacentHTML('beforeEnd', `장바구니가 비었습니다:(`)
    // alert("상품을 담아주세요!");
    totalEl.textContent = `총 0원`;
  } else {
    totalEl.textContent = `총 ${addCommas(totalPrice + delivery)}원`;
  }  
}

//선택삭제 및 전체삭제 버튼
async function deleteItem() {
  await controlQuantityBox();
  const $cartList = document.getElementById('cartList');

  $cartList.addEventListener('click', (e) => {
    const {className} = e.target;

    if (className !== 'trash' && className !== 'deleteAll' && className !== 'deleteSom') return;

    if (className === 'deleteAll') {
      $cartContainer.remove();
    } else if (className === 'deleteSom') {
      const checkedBtns = document.querySelectorAll("input[name='buy']:checked");
      
      // if(checkedBtns.length < 1) return

      checkedBtns.forEach(btn => {
        document.getElementById(`item_${btn.value}`).remove();
      });
    } else if (className === 'trash') {
        const {checkbox} = e.target.dataset;
        document.getElementById(`item_${checkbox}`).remove();
    }
    const $totalPrice = document.querySelectorAll('.totalItemPrice');
    calcTotalPrice($totalPrice);
  });
}
deleteItem();