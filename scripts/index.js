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

const topCityBtn = document.querySelector('.top__city');
const city = document.querySelector('.city');
const cityClose = document.querySelector('.city__close');
const cityRegionList = document.querySelector('.city__region-list');


topCityBtn.addEventListener('click', () => {
  city.classList.toggle('city_active')
});

cityRegionList.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('city__link')) {
    topCityBtn.textContent = target.textContent;
    city.classList.remove('city_active')
  }
});

cityClose.addEventListener('click', () => {
  city.classList.remove('city_active')
})



// Модальное окно

const overlayVacancy = document.querySelector('.overlay_vacancy')
const resultList = document.querySelector('.result__list')

const modalClose = document.querySelector('.modal__close')

resultList.addEventListener('click', (e) => {
  const target = e.target
  if (target.dataset.vacancy) {
    e.preventDefault()
    overlayVacancy.classList.add('overlay_active')
  }
});

overlayVacancy.addEventListener('click', (e) => {
  const target = e.target;
  if (target === overlayVacancy || target.classList.contains('modal__close'))
    overlayVacancy.classList.remove('overlay_active')
})

// Вівод карточек 

const createCard = (vacancy) => {
  const { title,
    id,
    compensation,
    workSchedule,
    employer,
    adress,
    description,
    date } = vacancy
  const card = document.createElement('li')
  card.classList.add('result__item');

  card.insertAdjacentHTML('afterbegin', `<article class="vacancy">
        <h2 class="vacancy__title">
          <a class="vacancy__open-modal" href="#" data-vacancy="${id}">${title}</a>
        </h2>
        <p class="vacancy__compensation">${compensation}</p>
        <p class="vacancy__work-schedule">${workSchedule}</p>
        <div class="vacancy__employer">
          <p class="vacancy__employer-title">${employer}</p>
          <p class="vacancy__employer-address">${adress}</p>
        </div>
        <p class="vacancy__description">${description}</p>
        <p class="vacancy__date">
          <time datetime="${date}">${date}</time>
        </p>
        <div class="vacancy__wrapper-btn">
          <a class="vacancy__response vacancy__open-modal" href="#" data-vacancy="${id}">Откликнуться</a>
          <button class="vacancy__contacts">Показать контакты</button>
        </div>
  </article>
`);
  return card;
};


const renderCards = (data) => {

  resultList.textContent = '';


  const cards = data.map(createCard);
  console.log(cards)
  resultList.append(...cards)

  // Через цикл
  // for (let i = 0; i < data.length; i++) {
  //   resultList.append(createCard(data[i]));
  // }

}

const getData = () => fetch('http://localhost:3000/api/vacancy').then(response => response.json())

const formSearch = document.querySelector('.bottom__search');

formSearch.addEventListener('submit', e => {
  e.preventDefault();
  // После формы обращение к имени search
  const textSearch = formSearch.search.value
  if (textSearch.length > 2) {
    formSearch.search.style.borderColor = '';

    const data = getData({ search: textSearch })
  } else {
    formSearch.search.style.borderColor = 'red';
    setTimeout(() => {
      formSearch.search.style.borderColor = ''
    }, 2000)
  }
})

const init = async () => {
  const data = await getData();
  renderCards(data)
}

init();

