import toast from 'react-hot-toast';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Searchbar = ({ createSearchText }) => {
  const [value, setValue] = useState('');
  const handlChange = ({ target: { value } }) => {
    setValue(value);
  };

  const handlSubmit = e => {
    e.preventDefault();
    if (value.trim() === '') {
      toast.error('Fill in search query');
      return;
    }
    createSearchText(value);
    setValue('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handlSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm--label">Search</span>
        </button>

        <input
          onChange={handlChange}
          className="SearchForm-input"
          type="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  createSearchText: PropTypes.func.isRequired,
};
