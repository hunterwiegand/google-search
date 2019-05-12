// Import React so we can utilize components and jsk
// Which is html like code, but in javascript
import React, { Component } from "react";
// Import all of our components from our components folder
// This allows us to keep a clean file stuctor, and modualize our code
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form";
import Book from "../components/Book";
import Footer from "../components/Footer";
// Import our API so we can connect to our database
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

// Class Home that extends our React.Component
// and allows us to create our saved state, which will
// hold our array of books, our search query, and our message
class Home extends Component {
  state = {
    books: [],
    q: "",
    message: "Search For A Book To Begin!"
  };

  // function used to make changes to the state
  handleInputChange = event => {
    // Create variables name and value from the event passed in as the parameter
    // name wil be the data attribute, and the value will be it's value
    const { name, value } = event.target;
    // Setting the state to reflect the input changes
    this.setState({
      [name]: value
    });
  };

  // Function to search the google books api with the users query
  // Then store the books in our state array books[]
  getBooks = () => {
    // Use the imported api call to search for books using the states saved query
    API.getBooks(this.state.q)
      .then(res =>
        // Store the results from the api call into our books[] array
        this.setState({
          books: res.data
        })
      )
      .catch(() =>
        // If we don't recieve any data back from the api, set the books[] array to []
        // And send the message no books found
        this.setState({
          books: [],
          message: "No New Books Found, Try a Different Query"
        })
      );
  };

  // Function for handling the submit form, preventing the page from loading
  // and then running the getBooks() function
  handleFormSubmit = event => {
    event.preventDefault();
    this.getBooks();
  };

  // Function for saving books into our database
  handleBookSave = id => {
    // create a varible book and in it store =>
    // Look into the state.books[] array and search for a book with the id matching the id
    // We passed in the functions paramenter. Return this book object
    const book = this.state.books.find(book => book.id === id);

    // Use our imported api function to save the book's info into our database
    API.saveBook({
      googleId: book.id,
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail
      // After the book is saved, run the getBooks() function 
    }).then(() => this.getBooks());
  };

  // This is ran after the componenet mounts, returning the home page JSK
  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>(React) Google Books Search</strong>
              </h1>
              <h2 className="text-center">Search for and Save Books of Interest.</h2>
            </Jumbotron>
          </Col>
          <Col size="md-12">
            <Card title="Book Search" icon="far fa-book">
              <Form
                // Set the following fields to the fuctions defined above.
                // This allows us to use the form data
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Results">
            {/* If the states books[] array is true (aka: not empty) run
             The following code used to display the books*/}
              {this.state.books.length ? (
                <List>
                  {/* For each book in the books[] array */}
                  {this.state.books.map(book => (
                    // Look into the Book component and set the following values
                    // This allows us to display all the books in our state books[] array
                    <Book
                      key={book.id}
                      title={book.volumeInfo.title}
                      subtitle={book.volumeInfo.subtitle}
                      link={book.volumeInfo.infoLink}
                      authors={book.volumeInfo.authors.join(", ")}
                      description={book.volumeInfo.description}
                      image={book.volumeInfo.imageLinks.thumbnail}
                      Button={() => (
                        <button
                        // When the button is clicked, run the handleBookSave function to 
                        // Add it to the database
                          onClick={() => this.handleBookSave(book.id)}
                          className="btn btn-primary ml-2"
                        >
                          Save
                        </button>
                      )}
                    />
                  ))}
                </List>
                // If the states books[] is false (aka: empty) display the message
              ) : (
                  <h2 className="text-center">{this.state.message}</h2>
                )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Home;
