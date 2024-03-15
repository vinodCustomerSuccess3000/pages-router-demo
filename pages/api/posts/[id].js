// pages/api/posts/[id].js

export default async function handler(req, res) {
    const { id } = req.query;
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {timeout : 10000});
    const postData = await response.json();
      postData.timestamp = new Date().toISOString();
  
    res.status(200).json(postData.timestamp);
  }
  