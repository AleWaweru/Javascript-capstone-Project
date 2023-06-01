const getLikes = async (projectID) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${projectID}/likes`);

  const data = await response.json();
  return data;
};

export default getLikes;