import PropTypes from 'prop-types';

function ImageGalleryItem({ image, openModal }) {
  return (
    <li className="gallery-item ImageGalleryItem" id={image.id} onClick={openModal}>
      <img
        src={image.webformatURL}
        className="ImageGalleryItem-image "
        alt={image.tags}
        name={image.largeImageURL}
        data-large={image.largeImageURL}
      />
    </li>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,

  openModal: PropTypes.func.isRequired,
};
