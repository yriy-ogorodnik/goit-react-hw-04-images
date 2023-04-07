import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, openModal }) => (
  <ul className="gallery ImageGallery">
    {images.map((image, index) => (
      <ImageGalleryItem openModal={openModal} image={image} key={index} />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  openModal: PropTypes.func.isRequired,
};
