import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import * as API from 'components/Api/Api';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentImageUrl, setcurrentImageUrl] = useState(null);

  // викликаємо по кліку на пошук. перезаписуємо стейт
  const createSearchText = searchText => {
    setSearchText(searchText);
  };

  const getPhotos = async (searchText, page) => {
    setIsLoading(isLoading => !isLoading);
    toast.success('success');
    try {
      const { hits } = await API.fetchImages(searchText, page);
      setImages(prev => [...prev, ...hits]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!searchText && page === 1) {
      return;
    }

    getPhotos(searchText, page);
  }, [searchText, page]);

  const onNextFetch = () => {
    setPage(page => page + 1);
    console.log(page);
  };

  const openModal = e => {
    const currentImageUrl = e.target.dataset.large;

    if (e.target.nodeName === 'IMG') {
      setShowModal(prev => !prev);
      setcurrentImageUrl(currentImageUrl);
    }
  };

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <div className="App">
      <Searchbar createSearchText={createSearchText} />
      {isLoading && <Loader />}

      {images && <ImageGallery images={images} openModal={openModal} />}
      {images.length >= 12 && <Button onNextFetch={onNextFetch} />}
      {showModal && (
        <Modal onClose={toggleModal} currentImageUrl={currentImageUrl} />
      )}
      <Toaster />
    </div>
  );
};

export default App;
