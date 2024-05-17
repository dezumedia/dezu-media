import { getPosts } from "@/services/post.service";
import Navbar from "../ui/navbar";
import { useState, useEffect } from "react";

const HomePage = () => {
  document.body.style.height = "2000px";
  const [posts, setPosts] = useState({});
  useEffect(() => {
    getPosts((data) => {
      setPosts(data);
    });
  }, []);

  console.log(posts);
  return (
    <>
      <Navbar />
    </>
  );
};

export default HomePage;
