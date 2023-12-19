import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { SearchbarHeader, SearchForm } from './SearchBar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = evt => {
    setSearchQuery(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      toast.error('Enter a keyword');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <SearchbarHeader onSubmit={handleSubmit} className="searchbar">
      <SearchForm className="form">
        <button type="submit" className="button">
          <span className="button-label">Search Image</span>
        </button>

        <input
          onChange={handleQueryChange}
          value={searchQuery}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
};
