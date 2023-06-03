const likesShow = (likeID, category) => {
  const [filteredLikeID] = likeID.filter((idObj) => category.idCategory === idObj.item_id);

  if (filteredLikeID) {
    return filteredLikeID.likes;
  }
  return false;
};

export default likesShow;
