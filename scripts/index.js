const btnOrder = document.querySelector('.option__btn_order');
const btnPeriod = document.querySelector('.option__btn_period');
const optionListOrder = document.querySelector('.option__list_order');
const optionListPeriod = document.querySelector('.option__list_period');

btnOrder.addEventListener('click', () => {
  optionListOrder.classList.toggle('option__list_active');
  optionListPeriod.classList.remove('option__list_active')
});

btnPeriod.addEventListener('click', () => {
  optionListPeriod.classList.toggle('option__list_active');
  optionListOrder.classList.remove('option__list_active');
});


optionListOrder.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('option__item')) {
    btnOrder.textContent = target.textContent;
    optionListOrder.classList.remove('option__list_active')

    for (const elem of optionListOrder.querySelectorAll('.option__item')) {
      if (elem === target) {
        elem.classList.add('option__item_active')
      } else {
        elem.classList.remove('option__item_active')
      }
    }
  }
});

optionListPeriod.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('option__item')) {
    btnPeriod.textContent = target.textContent;
    optionListPeriod.classList.remove('option__list_active')
    for (const elem of optionListPeriod.querySelectorAll('.option__item')) {
      if (elem === target) {
        elem.classList.add('option__item_active')
      } else {
        elem.classList.remove('option__item_active')
      }
    }
  }
})

// Выбор города

const topCityBtn = document.querySelector('')