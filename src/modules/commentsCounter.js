const commentsCounter = (data) => {
  let counter = 0;
  let commentHtml = '';
  if (data) {
    data.forEach((d) => {
      commentHtml += `<p>${d.creation_date} ${d.username}: ${d.comment}</p>`;
      counter += 1;
    });
    return counter;
  }

  return false;
};

export default commentsCounter;