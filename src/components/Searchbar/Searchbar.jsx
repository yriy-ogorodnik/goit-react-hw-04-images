import { Component } from 'react';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  static propTypes = {
    createSearchText: PropTypes.func.isRequired,
  };
  state = {
    value: '',
  };

  handlChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handlSubmit = e => {
    e.preventDefault();
    this.props.createSearchText(this.state.value);
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handlSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm--label">Search</span>
          </button>

          <input
            onChange={this.handlChange}
            className="SearchForm-input"
            type="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
