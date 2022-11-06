import PropTypes from 'prop-types';

export const locationPropType = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired
});

const cityPropType = PropTypes.shape({
  location: locationPropType.isRequired,
  name: PropTypes.string.isRequired
});

export const offerPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  [`preview_image`]: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]),
  [`is_favorite`]: PropTypes.bool.isRequired,
  [`is_premium`]: PropTypes.bool.isRequired,
  bedrooms: PropTypes.number.isRequired,
  [`max_adults`]: PropTypes.number.isRequired,
  goods: PropTypes.arrayOf(PropTypes.string).isRequired,
  host: PropTypes.shape({
    [`avatar_url`]: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    [`is_pro`]: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
  }),
  city: cityPropType.isRequired,
  location: locationPropType.isRequired
});

export const reviewPropTypes = PropTypes.shape({
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  user: PropTypes.shape({
    [`avatar_url`]: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    [`is_pro`]: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
  })
});

export const userInfoPropTypes = PropTypes.shape({
  id: PropTypes.number,
  email: PropTypes.string,
  name: PropTypes.string
});
