const postLikes = async (id, projectID) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${projectID}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      item_id: id,
    }),
  });
  return response;
};

export default postLikes;
