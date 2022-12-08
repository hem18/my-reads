import PropTypes from "prop-types";

const BookShelfChanger = ({value, onBookChange}) => {
  const handleChange = (e) => {
    onBookChange(e.target.value);
  }
    return (
        <div className="book-shelf-changer">
            <select onChange={handleChange} defaultValue={value}>
              <option disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read" >Read</option>
              <option value="none">None</option>
            </select>
        </div>
    )
}

BookShelfChanger.propTypes = {
  value: PropTypes.string.isRequired,
  onBookChange: PropTypes.func.isRequired
};

export default BookShelfChanger;