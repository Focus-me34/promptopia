"use client";

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(null);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    const filteredPosts = posts.filter((post) => {
      const searchValue = e.target.value.toLowerCase();

    const hasMatchingTag = post?.tag?.toLowerCase().includes(searchValue);
    const hasMatchingUsername = post?.creator?.username?.toLowerCase().includes(searchValue);
    const hasMatchingEmail = post?.creator?.email?.toLowerCase().includes(searchValue);
    const hasMatchingPrompt = post?.prompt?.toLowerCase().includes(searchValue);

    return hasMatchingTag || hasMatchingUsername || hasMatchingEmail || hasMatchingPrompt;
    });

    setFilteredPosts(filteredPosts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          className='search_input peer'
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>

      <PromptCardList data={filteredPosts ? filteredPosts : posts} handleTagClick={() => {}}/>
    </section>
  )
}

export default Feed
