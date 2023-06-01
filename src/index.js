import './style.css';
import getData from './modules/getData.js';
import getLikes from './modules/getlikes.js';
import likesShow from './modules/likeShow.js';
import createAppId from './modules/createAppId.js';
import postLikes from './modules/postLikes.js';

const mainItemsContainer = document.querySelector('.main_items_container');
let comments;
const backdrop = document.querySelector('.backdrop');
const projectID = 'jz9Xjlf6GBUQcvBtrKpI';
const dateTime = new Date();

const createCards = async () => {
  try {
    let html = '';

    const items = await getData();
    const { categories } = items;

    const likeID = await getLikes(projectID);

    categories.forEach((category) => {
      html += `<div id = ${category.idCategory} class="item_contianer">
                <img src="${category.strCategoryThumb}" alt="">
                <div class="name_like_conatiner">
                    <p>${category.strCategory}</p> 
                    
                    <div class="likes_heart"> 
                    <p>${likesShow(likeID, category) ? likesShow(likeID, category) : '0'}</p>
                    <i class="fas fa-heart"></i>
                    </div>
                </div>
                <button class="comments">Comments</button>
            </div>`;
    });

    mainItemsContainer.insertAdjacentHTML('afterbegin', html);

    comments = document.querySelectorAll('.comments');
    const heartBtn = document.querySelectorAll('.fa-heart');

    comments.forEach((comment, i) => {
      comment.addEventListener('click', (e) => {
        const { id } = e.target.closest('.item_contianer');

        const [filteredObj] = categories.filter((category) => category.idCategory === id);
        // createPopupWindow(filteredObj, i + 1);
      });
    });

    heartBtn.forEach((heart) => {
      heart.addEventListener('click', (e) => {
        const { id } = e.target.closest('.item_contianer');
        heart.classList.add('colour_red');
        let likeCounter = e.target.previousElementSibling.textContent;
        likeCounter = +likeCounter;
        likeCounter += 1;
        e.target.previousElementSibling.textContent = String(likeCounter);
        postLikes(id, projectID);
      });
    });
    return 'Passed';
  } catch (err) {
    return 'something went wrong';
  }
};

createCards();

// const closePopup = () => {
//     backdrop.innerHTML = '';
//     backdrop.classList.add("hidden");
// }