import { galleryItems } from './gallery-items.js';
// Change code below this line
// Створи галерею з можливістю кліку по її елементах і перегляду повнорозмірного
// зображення у модальному вікні.

// +1/Створення і рендер розмітки на підставі масиву даних galleryItems і наданого
// шаблону елемента галереї.
// +Розмітка елемента галереї
// +Посилання на оригінальне зображення повинно зберігатися в data - атрибуті source
// +на елементі < img >, і вказуватися в href посилання.Не додавай інші HTML теги або CSS
// +класи, крім тих, що містяться в цьому шаблоні.

// +<li class="gallery__item">
// +  <a class="gallery__link" href="large-image.jpg">
//  +   <img
// +     class="gallery__image"
// +      src="small-image.jpg"
//  +     data-source="large-image.jpg"
//  +     alt="Image description"
// +    />
//  + </a>
//+ </li>

// 2/Реалізація делегування на ul.gallery і отримання url великого зображення.

// +3/Підключення скрипту і стилів бібліотеки модального вікна basicLightbox.
//  Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані(.min)
//   файли бібліотеки.

// 4/Відкриття модального вікна по кліку на елементі галереї.Для цього ознайомся
// з документацією і прикладами.

// 5/Заміна значення атрибута src елемента < img > в модальному вікні перед відкриттям.
//  Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки
// basicLightbox.

//   +  Зверни увагу на те, що зображення обгорнуте посиланням, отже по кліку за замовчуванням
// користувач буде перенаправлений на іншу сторінку.Заборони цю поведінку за замовчуванням.

// Закриття з клавіатури
// УВАГА
// Наступний функціонал не обов'язковий для здавання завдання, але буде хорошою додатковою
// практикою.

// Додай закриття модального вікна після натискання клавіші Escape.Зроби так,
//     щоб прослуховування клавіатури було тільки доти, доки відкрите модальне вікно.
//     Бібліотека basicLightbox містить метод для програмного закриття модального вікна.

const galleryList = document.querySelector('.gallery');

const markup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<li class="gallery__item">
            <a class="gallery__link" href="${original}" >
                <img class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>`
  )
  .join('');
galleryList.insertAdjacentHTML('beforeend', markup);

galleryList.addEventListener('click', onGalleryListClick);
let instance;

function onGalleryListClick(evt) {
  evt.preventDefault();
  //   console.log(evt.target.dataset.source);
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }

  const originalSourse =
    evt.target.dataset.source ??
    evt.target.closest('[data-source]').dataset.source;

  const currentItem = galleryItems.find(
    ({ original }) => original === originalSourse
  );
  //   console.log(currentItem.original);
  instance = basicLightbox.create(
    `
    <div class="bg">
    <img src="${currentItem.original}" width="800" height="600" alt="${currentItem.description}">

  </div>
  `,
    {
      onShow: () => document.addEventListener('keydown', onEscKeyPress),
      onClose: () => document.removeEventListener('keydown', onEscKeyPress),
    }
  );
  instance.show();
}
function onEscKeyPress(evt) {
  console.log(evt.code);
  const ESC_KEY_CODE = 'Escape';
  if (evt.code === ESC_KEY_CODE) {
    instance.close();
  }
}
// console.log(galleryItems);
