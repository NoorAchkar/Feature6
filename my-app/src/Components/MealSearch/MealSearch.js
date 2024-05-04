  import React, { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom"; // Used for React Routing
  import NavMenu from "../NavMenu/NavMenu"
  
  // Import the SearchChild component (child component)
  import SearchChild from "./SearchChild.js";
  
  // Imports getAllMeals function that fetchs a list of Meals from a JSON file
  import { getAllMeals, toggleFavorite } from "../../Common/Services/RecipeService.js"; 

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

    const handleSearch = () => {
      const filteredUsers = users.filter((user) =>
        user.get("recipeName").toLowerCase().includes(searchInput.toLowerCase())
      );
      setSearchResults(filteredUsers); // Make sure filteredUsers are still Parse objects
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
        <div className="intro">
        <h1>Meal Search</h1>
        </div>
        <input
            type="text"
            name="name"
            value={searchInput}
            onChange={handleInputChange}
            className="rounded"
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
          toggleFavorite={toggleFavorite}
          setSearchResults={setSearchResults}

        />
        </div>
        <button onClick={buttonHandler} className="returnhome">Return Home</button>
      </div>
    );
  };

  // Searches for the correct result
  const SearchResults = ({ users, comments, onCommentSubmit, commentTitle, setCommentTitle, commentBody, setCommentBody, toggleFavorite, setSearchResults }) => {
    const handleToggleFavorite = async (user) => {
      try {
        // Ensure user is a valid object with an id property
        if (!user || typeof user.get !== 'function') {
          console.error("Invalid or corrupted user object:", user);
          return;
        }
        
        const newFavoriteStatus = !user.get('isFavorite');
        await toggleFavorite(user.id);
    
        // Update searchResults to reflect the new favorite status
        setSearchResults(prevResults => prevResults.map(item => {
          if (item.id === user.id) {
            // Returning a new object with updated favorite status
            let updatedItem = Object.assign(Object.create(Object.getPrototypeOf(user)), user);
            updatedItem.set('isFavorite', newFavoriteStatus);
            return updatedItem;
          }
          return item;
        }));
        
        alert(`Recipe "${user.get("recipeName")}" has been ${newFavoriteStatus ? 'added to' : 'removed from'} favorites.`);
      } catch (error) {
        console.error("Error toggling favorite status:", error);
      }
    };
    
    return (
      <div>
        
        <ul>
          {users.map((user) => (
            <div key={user.id}>
              <div className="card">
              <h3><b>{user.get("recipeName")}</b></h3>
              <p>Meal Type: {user.get("mealType")}</p>
              <p>Ingredients: {user.get("ingredients").join(', ')}</p>
              <p>Cook Time: {user.get("cookTime")}</p>
              <button onClick={() => handleToggleFavorite(user)}>
                {user.get('isFavorite') ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              </div>
              <div className="intro">
              <h3>Comments:</h3>
              <ul>
              {comments
              .filter((comment) => comment.get("recipe").id === user.id)
                .map((comment) => (
                  <div key={comment.id} className="comments">
                     <h4><b>{comment.get("title")}</b></h4>
                     <p>{comment.get("body")}</p></div>
                ))}
            </ul>
            <h3>Add a Comment:</h3>
            <input
                type="text"
                placeholder="Title"
                value={commentTitle}
                onChange={(e) => setCommentTitle(e.target.value)}
                className="rounded"
            />
            <br />
            <textarea
                placeholder="Body"
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                className="rounded"
            ></textarea>
            <br />
            <button onClick={() => onCommentSubmit(user)} className="comment-button">Submit Comment</button>
            </div>
        </div>
          ))}
        </ul>
        
      </div>
    );
  };
  
  export default MealSearch;