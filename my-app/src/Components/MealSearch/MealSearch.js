  import React, { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom"; // Used for React Routing
  import NavMenu from "../NavMenu/NavMenu"
  
  // Import the SearchChild component (child component)
  import SearchChild from "./SearchChild.js";
  
  // Imports getAllMeals function that fetchs a list of Meals from a JSON file
  import { getAllMeals } from "../../Common/Services/RecipeService.js"; 

  import { getAllCommentsperMeals, createComments } from "../../Common/Services/CommentsService.js"
  
  const MealSearch = () => {
    // Hooks to manage the componenet's state based on what item was searched
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([])
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [commentTitle, setCommentTitle] = useState("");
    const [commentBody, setCommentBody] = useState("");
  
    // Fetches meal data
    useEffect(() => {
      getAllMeals().then((users) => {
        setUsers(users);
      });
      getAllCommentsperMeals().then((comments) => {
        setComments(comments);
      });
    }, []);
  
    // Event handler that sets the meal that is searched in the input
    const handleSearch = () => {
      const filteredUsers = users.filter((user) =>
        user.get("recipeName").toLowerCase().includes(searchInput.toLowerCase())
      );
      setSearchResults(filteredUsers);
    };
  
    const handleInputChange = (event) => {
      setSearchInput(event.target.value);
    };

    const handleCommentSubmit = (user) => {
      if (commentTitle && commentBody) {
        createComments(user, commentTitle, commentBody)
            .then((newComment) => {
                setCommentTitle("");
                setCommentBody("");
                setComments([...comments, newComment]);
            })
            .catch((error) => {
                console.error("Error adding comment:", error);
            });
      } 
    };

    // Routing and Button Handler for Return Home Button
    const history = useNavigate();

    const buttonHandler = () => {
      history("/");
    };
  
    // Displays the search form along with the desired meal
    return (
      <div>
        <NavMenu />
        <hr />
        <h1>Meal Search</h1>
        <input
            type="text"
            name="name"
            value={searchInput}
            onChange={handleInputChange}
          />
        <SearchChild onSearch={handleSearch} />
        
        <div>
        <SearchResults
          users={searchResults}
          comments={comments}
          onCommentSubmit={handleCommentSubmit}
          commentTitle={commentTitle}
          setCommentTitle={setCommentTitle}
          commentBody={commentBody}
          setCommentBody={setCommentBody}
        />
        </div>
        <button onClick={buttonHandler}>Return Home</button>
      </div>
    );
  };
  
  // Searches for the correct result
  const SearchResults = ({ users, comments, onCommentSubmit, commentTitle, setCommentTitle, commentBody, setCommentBody }) => {
    return (
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p><b>{user.get("recipeName")}</b></p>
              <p>Meal Type: {user.get("mealType")}</p>
              <p>Ingredients: {user.get("ingredients")}</p>
              <p>Cook Time: {user.get("cookTime")}</p>
              <h3>Comments:</h3>
              <ul>
              {comments
              .filter((comment) => comment.get("recipe").id === user.id)
                .map((comment) => (
                  <li key={comment.id}>
                     <h4>{comment.get("title")}</h4>
                     <p>{comment.get("body")}</p></li>
                ))}
            </ul>
            <h3>Add a Comment:</h3>
            <input
                type="text"
                placeholder="Title"
                value={commentTitle}
                onChange={(e) => setCommentTitle(e.target.value)}
            />
            <br />
            <textarea
                placeholder="Body"
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
            ></textarea>
            <br />
            <button onClick={() => onCommentSubmit(user)}>Submit Comment</button>
        </li>
          ))}
        </ul>
        
      </div>
    );
  };
  
  export default MealSearch;