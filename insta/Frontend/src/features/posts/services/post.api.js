import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/posts",
  withCredentials: true,
})


export async function getFeed() {
  const response = await api.get('/feed')
  // console.log(response);
    
  return response.data
}

export async function toggleLike(postId) {
  const response = await api.post(`/like/${postId}`);
  // { message, isLiked } aa raha hai backend se
  return response.data;
}