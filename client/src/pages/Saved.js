// Import React so we can utilize components and jsk
// Which is html like code, but in javascript
import React, { Component } from "react";
// Import all of our components from our components folder
// This allows us to keep a clean file stuctor, and modualize our code
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Book from "../components/Book";
import Footer from "../components/Footer";
// Import our API so we can connect to our database
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

// Class Saves that extends our React.Component
// and allows us to create our saved state, which will
// hold our array of books
class Saved extends Component {
  state = {
    books: []
  };

  // When the component mounts run the function getSavedBooks()
  // This is very similar to document.ready() in te sense that is waits for
  // The component to load before it fires off the function.
  componentDidMount() {
    this.getSavedBooks();
  }

  // Function to hit the api and store our saved books into our state
  // books[] array
  getSavedBooks = () => {
    // Use our imported API calls and use our getSavedBooks() function
    // To retrieve all books in our database
    API.getSavedBooks()
      // After the books are retrived, store them in our state's books[] array
      .then(res =>
        this.setState({
          books: res.data
        })
      )
      // If there is an error, log the error
      .catch(err => console.log(err));
  };

  // Function to delete a book from our database
  // Note that we passed in the id as a parameter
  handleBookDelete = id => {
    // Use the imported api to use the deleteBook(id) function
    // Then after the book is deleted, getSavedBooks() to show the remaining books
    // In the books[] array
    API.deleteBook(id).then(res => this.getSavedBooks());
  };

  // Function used to render the state to the DOM
  render() {
    // Return the html like code
    // This is refered to as JSX
    return (
      // Call our Container component
      <Container>
        {/* Call our Row componet */}
        <Row>
          <Col size="md-12">
            {/* Call our jumbotron comonent */}
            <Jumbotron>
              {/* Here is our html like code (JSK) used to 
                  Create html tags */}
              <h1 className="text-center">
                <strong>(React) Google Books Search</strong>
              </h1>
              <h2 className="text-center">Search for and Save Books of Interest.</h2>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Saved Books" icon="download">
              {/* Loop over x amount of times, where X is the this.state.books.length
                  The ? acts as a placeholder for this number */}
              {this.state.books.length ? (
                // Store these in our List Component
                <List>
                  {/* For each book in our books[] array, create a Book componenet
                      that utilizes the books key, title, subtitle, link, authors,
                       description, and image */}
                  {this.state.books.map(book => (
                    <Book
                      key={book._id}
                      title={book.title}
                      subtitle={book.subtitle}
                      link={book.link}
                      authors={book.authors.join(", ")}
                      description={book.description}
                      image={book.image}
                      Button={() => (
                        // Attach a button with on onClick event handler that 
                        // Fired off the handleBookDelete(id) function. This is used
                        // To delete books from our database
                        <button
                          onClick={() => this.handleBookDelete(book._id)}
                          className="btn btn-danger ml-2"
                        >
                          Delete
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                  <h2 className="text-center">No Saved Books</h2>
                )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Saved;
