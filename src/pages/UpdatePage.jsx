import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import PostForm from "../components/PostForm";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadPost() {
      const response = await fetch(`${URL}?id=eq.${id}`, { headers });
      const data = await response.json();
      setPost(data[0]);
    }

    loadPost();
  }, [id]);

  async function handleSubmit(postData) {
    await fetch(`${URL}?id=eq.${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(postData),
    });

    navigate(`/posts/${id}`);
  }

  if (isLoading) return <p className="status-msg">Loading post...</p>;

  return (
    <main className="app">
      <h1 className="page-title">Update Post</h1>
      {errorMessage && !post ? (
        <p className="status-banner status-banner-error">{errorMessage}</p>
      ) : (
        <PostForm
          onSubmit={handleSubmit}
          postToUpdate={post || { image: "", caption: "" }}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
        />
      )}
    </main>
  );
}
