"use client";

import { useState, useEffect } from "react";

import ProptCard from "./ProptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <ProptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };
    fetchPost();
  }, []);

  const fetchPosts = async (search) => {
    if (search === "") {
      setSearchText("");
      return;
    }
    setSearchText(search);
    const response = await fetch(`/api/prompt/search/${search}`);
    const data = await response.json();
    setPosts(data);
  };

  const handleSearchChange = (e) => {
    fetchPosts(e.target.value.trim());
  };

  const onTagClick = (tag) => {
    fetchPosts(tag.replace(/^#/, ""));
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={onTagClick} />
    </section>
  );
};

export default Feed;
