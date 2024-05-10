import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../utils/Card";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [blogPost, setBlogPost] = useState([]);
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get("http://ec2-3-86-9-0.compute-1.amazonaws.com/api/blog", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Response get: ", response.data);
        setBlogPost(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      fetchBlogPosts();
    }
  }, [token]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl mt-20 font-bold mb-8">Welcome to Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogPost.map((post) => (
            <Card key={post.postId} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
