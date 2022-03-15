const btnOrder = document.querySelector('.option__btn_order');
const btnPeriod = document.querySelector('.option__btn_period');
const optionListOrder = document.querySelector('.option__list_order');
const optionListPeriod = document.querySelector('.option__list_period');
const orderBy = document.querySelector('#order_by')
const searchPeriod = document.querySelector('#search_period')


let data = [];
// Выбор города

const getData = ({ search, id, country, city } = {}) => {
  let url = `http://localhost:3000/api/vacancy/${id ? id : ''}`;

  if (search) {
    url = `http://localhost:3000/api/vacancy?search=${search}`;

  }

  if (country) {
    url = `http://localhost:3000/api/vacancy?country=${country}`;
  }

  if (city) {
    url = `http://localhost:3000/api/vacancy?search=${city}`;
  }


  return fetch(url).then(response => response.json())
};

const topCityBtn = document.querySelector('.top__city');
const city = document.querySelector('.city');
const cityClose = document.querySelector('.city__close');
const cityRegionList = document.querySelector('.city__region-list');

// Форма

const formSearch = document.querySelector('.bottom__search');
const found = document.querySelector('.found')




// Функции
const createCard = (vacancy) => {
  const {
    title,
    id,
    compensation,
    workSchedule,
    employer,
    address,
    description,
    date } = vacancy;

  const card = document.createElement('li')
  card.classList.add('result__item');

  card.insertAdjacentHTML('afterbegin', `
        <article class="vacancy">
              <h2 class="vacancy__title">
                <a class="vacancy__open-modal" href="#" data-vacancy="${id}">${title}</a>
              </h2>
              <p class="vacancy__compensation">${compensation}</p>
              <p class="vacancy__work-schedule">${workSchedule}</p>
              <div class="vacancy__employer">
                <p class="vacancy__employer-title">${employer}</p>
                <p class="vacancy__employer-address">${address}</p>
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

const declOfNum = (n, titles) =>
  n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
    0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];



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

const sortData = () => {
  switch (orderBy.value) {
    case 'down':
      data.sort((a, b) => a.minCompensation > b.minCompensation ? 1 : -1);
      break;
    case 'up':
      data.sort((a, b) => b.minCompensation > a.minCompensation ? 1 : -1)
      break;
    default:
      data.sort((a, b) => new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : -1);
  }
}

const optionHandler = () => {
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
      orderBy.value = target.dataset.sort;
      sortData();
      renderCards(data)
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
  });

}


const cityHandler = () => {
  topCityBtn.addEventListener('click', () => {
    city.classList.toggle('city_active')
  });

  cityRegionList.addEventListener('click', async (e) => {
    const target = e.target;

    if (target.classList.contains('city__link')) {
      const hash = new URL(target.href).hash.substring(1);

      const option = {
        [hash]: target.textContent
      }

      data = await getData(option);
      console.log(data);
      sortData();
      renderCards(data)
      topCityBtn.textContent = target.textContent;
      city.classList.remove('city_active')
    }
  });

  cityClose.addEventListener('click', () => {
    city.classList.remove('city_active')
  })
};

const createModal = (data) => {
  const {
    address,
    compensation,
    description,
    experience,
    employment,
    employer,
    skills,
    title
  } = data;

  const modal = document.createElement('div');
  modal.classList.add('modal')
  const closeButtonElem = document.createElement('button');
  closeButtonElem.classList.add('modal__close');
  closeButtonElem.textContent = '✕';

  const titleElem = document.createElement('h2');
  titleElem.classList.add('modal__title');
  titleElem.textContent = title;

  const compensationElem = document.createElement('p');
  compensationElem.classList.add('addmodal__compensation');
  compensationElem.textContent = compensation;

  const employerElem = document.createElement('p');
  employerElem.classList.add('modal__employer');
  employerElem.textContent = employer;


  const addressElem = document.createElement('p');
  addressElem.classList.add('modal__address');
  addressElem.textContent = address;

  const experienceElem = document.createElement('p');
  experienceElem.classList.add('modal__experience');
  experienceElem.textContent = experience

  const employmentElem = document.createElement('p');
  employmentElem.classList.add('modal__employment');
  employmentElem.textContent = employment;

  const descriptionElem = document.createElement('p');
  descriptionElem.classList.add('modal__description');
  descriptionElem.textContent = description;

  const skillsElem = document.createElement('div');
  skillsElem.classList.add('modal__skills', 'skills');
  skillsElem.textContent = skills;

  const skillsTitleElem = document.createElement('h3');
  skillsTitleElem.classList.add('skills__title');
  skillsTitleElem.textContent = 'Подробнее';

  const skillsListElem = document.createElement('ul');
  skillsListElem.classList.add('skills__list');

  for (const skill of skills) {
    const skillsItemElem = document.createElement('li')
    skillsItemElem.classList.add('skills__item');
    skillsListElem.append(skillsItemElem);
  }

  skillsElem.append(skillsTitleElem, skillsListElem);

  const submitButtonElem = document.createElement('button');
  submitButtonElem.classList.add('modal__response');
  submitButtonElem.textContent = 'Отправить резюме';

  modal.append(
    closeButtonElem,
    titleElem,
    compensationElem,
    employerElem,
    addressElem,
    experienceElem,
    employmentElem,
    descriptionElem,
    skillsElem,
    submitButtonElem
  );
  return modal
}

const modalHandler = () => {
  // Модальное окно
  resultList.addEventListener('click', async (e) => {
    const target = e.target
    if (target.dataset.vacancy) {
      e.preventDefault()
      overlayVacancy.classList.add('overlay_active');
      const data = await getData({ id: target.dataset.vacancy });
      const modal = createModal(data);
      overlayVacancy.append(modal)
    }
  });

  overlayVacancy.addEventListener('click', (e) => {
    const target = e.target;
    if (target === overlayVacancy || target.classList.contains('modal__close'))
      overlayVacancy.classList.remove('overlay_active')
  })
};

const searchHeandler = () => {
  // Вывод карточек 

  formSearch.addEventListener('submit', async (e) => {

    e.preventDefault();
    // После формы обращение к имени search
    const textSearch = formSearch.search.value;

    if (textSearch.length > 2) {
      formSearch.search.style.borderColor = '';
      data = await getData({ search: textSearch });
      sortData();
      renderCards(data);
      found.innerHTML = `${declOfNum(data.length, ['вакансия', 'вакансии', 'вакансий'])} &laquo;${textSearch}&raquo;`

      formSearch.reset()
    } else {
      formSearch.search.style.borderColor = 'red';
      setTimeout(() => {
        formSearch.search.style.borderColor = ''
      }, 2000)
    }
  })

}

const init = async () => {
  data = await getData();
  sortData();
  renderCards(data);

  optionHandler();

  cityHandler();

  modalHandler();

  searchHeandler();

}

init();



