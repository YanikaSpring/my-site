import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeSortType} from '../../store/main/actions';
import cn from 'classnames';

import {SortingType} from '../../constants.js';
import {getActiveSortingSelector} from '../../store/main/selectors';

const Sorting = (props) => {
  const {activeSorting, onChangeSorting} = props;
  const [opened, setOpened] = useState(false);

  const handleClickFilterList = () => {
    setOpened((prevState) => !prevState);
  };
  const handleFilterListClose = () => setOpened(false);

  return (
    <form className="places__sorting" action="#" method="get" >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0" onClick={handleClickFilterList}>
        {activeSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={cn(`places__options places__options--custom`, {'places__options--opened': opened})}>
        {
          Object.values(SortingType).map((item) =>
            <li
              className={cn(`places__option`, {'places__option--active': item === activeSorting})}
              tabIndex="0"
              key={`${item}_${Date.now()}`}
              onClick={() => {
                onChangeSorting(item);
                handleFilterListClose();
              }}>{item}
            </li>
          )
        }
      </ul>
    </form>
  );
};

Sorting.propTypes = {
  onChangeSorting: PropTypes.func,
  activeSorting: PropTypes.string
};

const mapStateToProps = (state) => ({
  activeSorting: getActiveSortingSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChangeSorting(sortingType) {
    dispatch(changeSortType(sortingType));
  },
});

export {Sorting};
export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
