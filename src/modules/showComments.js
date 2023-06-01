const showComments = async (i, projectID) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${projectID}/comments?item_id=${i}`);
  const data = await response.json();
  return data;
};

export default showComments;