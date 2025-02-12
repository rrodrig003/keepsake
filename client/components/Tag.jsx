import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchTags,
  fetchSingleTag,
  postTags,
  addEnteredTags,
  parseTags,
  // clearTags,
  // clearString,
} from '../redux/tags';
//import Home from './Home.jsx';

class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.parse = this.parse.bind(this);
  }

  parse(event) {
    event.preventDefault();
    this.props.convertTagStringToTags(event.target.value);
  }

  render() {
    return (
      <div>
        <div>
          <form
            onSubmit={event => {
              event.preventDefault();
              this.props.uploadTags(this.props.currentTags);
            }}
          >
            <label>Add Tags seperated by commas</label>
            <input
              onChange={event => {
                event.preventDefault();
                this.props.addTags(event.target.value);
              }}
              onMouseLeave={this.parse}
              onTouchEnd={this.parse}
              onTouchMove={this.parse}
              onTouchEnd={this.parse}
            ></input>
            <button type="onSubmit">Upload Tags</button>
          </form>
        </div>
        <Link to="/">HOME</Link>
      </div>
    );
  }
}

Tag.propTypes = {
  selectedImages: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string,
      dateTaken: PropTypes.number,
      fileName: PropTypes.string,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    })
  ),
};

const mapStateToProps = state => {
  return {
    selectedImages: state.images.selectedImages,
    currentTags: state.tags.currentTags,
    singleTag: state.tags.singleTag,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTags: () => dispatch(fetchTags()),
    getTag: id => dispatch(fetchSingleTag(id)),
    uploadTags: currentTags => dispatch(postTags(currentTags)),
    addTags: tags => {
      dispatch(addEnteredTags(tags));
    },
    convertTagStringToTags: () => {
      dispatch(parseTags());
    },
    // clearCurrentTags: () => {
    //   dispatch(clearTags());
    // },
    // clearTagString: () => {
    //   dispatch(clearString());
    // },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tag);
