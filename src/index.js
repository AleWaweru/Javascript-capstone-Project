import './style.css';
import getData from './modules/getData.js';
import getLikes from './modules/getlikes.js';
import likesShow from './modules/likeShow.js';
import createAppId from './modules/createAppId.js';
import postLikes from './modules/postLikes.js';

import showComments from './modules/showComments.js';

const mainItemsContainer = document.querySelector('.main_items_container');
let comments;

const backdrop = document.querySelector('.backdrop');
const projectID = 'jz9Xjlf6GBUQcvBtrKpI';
const dateTime = new Date();

const closePopup = () => {
  backdrop.innerHTML = '';
  backdrop.classList.add('hidden');
};

let commentHtml = '';

const commentsShow = (data) => {
  commentHtml = '';
  if (!data) return;
  data.forEach((d) => {
    commentHtml += `<p>${d.creation_date} ${d.username}: ${d.comment}</p>`;
  });
};

const createPopupWindow = async (filteredObj, i) => {
  const data = await showComments(i, projectID);
  commentsShow(data);
  const html = `
    <div class="popup_container" id ="${filteredObj.idCategory}">

                <div class="popup_main">
                <div class = "img_btn_popup_container">
                    <img src="${filteredObj.strCategoryThumb}" alt="">
                    <i class="fas fa-times"></i>
                </div>
                    <div class="name_container">
                        ${filteredObj.strCategory}
                    </div>

                    <div class="specifications">
                        <p>${filteredObj.strCategoryDescription}</p>
                        
                    </div>

                    <div class="comments_conatiner">

                        <div class="comments_text">Comments</div>
                        <p>03/11/2021 Alex: I'd love to buy it!</p>
                        <p>03/11/2021 Mia: I love it!</p>
                        ${commentHtml || ''}

                    </div>

                    <div class="add_comment">
                        Add a comment
                    </div>

                    <form>
                        <input type="text" placeholder="Your name" class= "input_name">
                        <textarea name="" id="" cols="30" rows="10" placeholder="Your insights"></textarea>
                        <button class="form_submit_btn">Comment</button>
                    </form>

                </div>
                
            </div>
    
    `;
  backdrop.classList.remove('hidden');
  backdrop.insertAdjacentHTML('afterbegin', html);

  const closeBtn = document.querySelector('.fa-times');
  closeBtn.addEventListener('click', closePopup);

  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const input = e.target.closest('form').children[0];
      const textarea = e.target.closest('form').children[1];

      const commentsContainer = e.target.closest('.popup_main').children[3];

      let html = '';

      html += `<p>2023-0${dateTime.getMonth()}-${dateTime.getDate()} ${input.value}: ${textarea.value}</p>`;

      commentsContainer.insertAdjacentHTML('beforeend', html);

      const { id } = e.target.closest('.popup_container');

      const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${projectID}/comments`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          item_id: id,
          username: input.value,
          comment: textarea.value,
        }),
      });
    });
  });
};

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
                <button class="comments popup_btn">Comments</button>
                </div>`;
    });

    mainItemsContainer.insertAdjacentHTML('afterbegin', html);

    comments = document.querySelectorAll('.comments');
    const heartBtn = document.querySelectorAll('.fa-heart');

    comments.forEach((comment, i) => {
      comment.addEventListener('click', (e) => {
        const { id } = e.target.closest('.item_contianer');

        const [filteredObj] = categories.filter((category) => category.idCategory === id);
        createPopupWindow(filteredObj, i + 1);
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