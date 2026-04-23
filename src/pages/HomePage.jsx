import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadPosts() {
      const response = await fetch(URL, { headers });
      const data = await response.json();
      setPosts(data);
      console.log(URL, headers);
    }

    loadPosts();
  }, []);

  return (
    <main className="app">
      <section className="feed-intro">
        <p className="feed-eyebrow">Post App</p>
        <h1 className="page-title">Explore the latest posts</h1>
      </section>
      {errorMessage && (
        <p className="status-banner status-banner-error">{errorMessage}</p>
      )}
      {isLoading && <p className="status-msg">Loading posts...</p>}
      {!isLoading && !errorMessage && posts.length === 0 && (
        <section className="empty-state">
          <h2>No posts yet</h2>
          <p>Hent posts fra Supabase med GET og vis dem her.</p>
        </section>
      )}
      {!isLoading && !errorMessage && posts.length > 0 && (
        <section className="post-list">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      )}
    </main>
  );
}
