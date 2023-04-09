import PropTypes from 'prop-types';

function ImageGalleryItem({ image, openModal }) {
  return (
    <li
      className="gallery-item ImageGalleryItem"
      id={image.id}
      onClick={openModal}
    >
      <img
        src={image.smallImage}
        className="ImageGalleryItem-image "
        alt={image.description}
        name={image.largeImage}
        data-large={image.largeImage}
      />
    </li>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    smallImage: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
  }).isRequired,

  openModal: PropTypes.func.isRequired,
};
