import { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import * as API from 'components/Api/Api';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
export class App extends Component {
  state = {
    searchText: '',
    images: null,
    error: null,
    isLoading: false,
    page: 1,
    showModal: false,
    currentImageUrl: null,
  };

  // викликаємо по кліку на пошук. перезаписуємо стейт
  createSearchText = searchText => {
    this.setState({ searchText });
  };

  // метод, который вызывается при обновлении и перерисовке компоненты.
  // Цей метод не викликається під час першого рендеру
  componentDidUpdate(prevProps, prevState) {
    const searchText = this.state.searchText.trim();
    if (prevState.searchText !== searchText && searchText) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      API.fetchImages(searchText)
        .then(({ hits, totalHits }) => {
          this.setState({ images: hits });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }

    // __________load more________
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      API.fetchImages(searchText, this.state.page)
        .then(({ hits }) => {
          this.setState({ images: [...this.state.images, ...hits] });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }
  }

  onNextFetch = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  openModal = e => {
    const currentImageUrl = e.target.dataset.large;

    if (e.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        currentImageUrl: currentImageUrl,
      }));
    }
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    return (
      <div className="App">
        <Searchbar createSearchText={this.createSearchText} />
        {this.state.isLoading && <Loader />}
        {this.state.error && `${this.state.error}`}
        {this.state.images && (
          <ImageGallery images={this.state.images} openModal={this.openModal} />
        )}
        {this.state.images && <Button onNextFetch={this.onNextFetch} />}
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            currentImageUrl={this.state.currentImageUrl}
          />
        )}
      </div>
    );
  }
}
