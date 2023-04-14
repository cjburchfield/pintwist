# Welcome to Pintwist!

[Live Site - Work in Progress](https://pintwist.onrender.com/)

Pintwist is a clone of [Pinterest](https://www.pinterest.com/) - in its own words, "a visual discovery engine for finding ideas like recipes, home and style inspiration, and more." Inspired by Pintwist's visually appealinng and intuitive design, I have incorporated elements like its profile, pin, and home pages.

* Languages: Javascript, Ruby, HTML, and CSS 
* Frontend: React-Redux
* Database: PostgreSQL
* Hosting: Render
* Asset Storage: AWS Simple Cloud Storage (S3)

# MVPs
## Homepage 
Users are greeted with a twist on Pinterest's signature landing page.

### Visual
![img](./app/assets/homeagevid.gif)

### Code Snippet

```
useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % imageSets[imageSet].length);
      if (activeIndex === imageSets[imageSet].length - 1) {
        setImageSet((imageSet + 1) % imageSets.length);
        setHeader(imageSet === 0 ? "home decor idea" : "daydream material");
        setTitle(imageSet === 0 ? "Get your next" : "...at least your new");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeIndex, imageSet]);

  return (
    <>
      <div className="landing-header-holder">
        <div
          className={`landing-fixed-header ${
            title === "Get your next" ? "Get-your-next" : "at-least-your-new"
          }`}
        >
          {title}
        </div>
        <div
          className={`landing-header ${
            header === "home decor idea" ? "home-header" : "daydream-header"
          }`}
        >
          {header}
        </div>
      </div>
      <div className="image-slider-container">
        <div className="image-container">
          {imageSets[imageSet].map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`image-${index}`}
              className={`image ${index === activeIndex ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </>
  );
```

## Profiles
A Pintwist user is able toggle between logging in or signing up, depending on whether they are interested in creating an account with proper credentials - which persists to both the front and backend - or selecting the preloaded Demo User profile.

### Visual
![img](./app/assets/profilevid.gif)

### Code Snippet

```
return (
  <>
    {showSignup && (
      <>
        <img src="../../../assets/Pinterest_icon.png" alt="Logo" className="logo" />
        <img src="../../../assets/x-solid.svg" alt="Close-Button" className="close-button" onClick={onClose} />
        <h1 className="modal-h1">Welcome to Pintwist</h1>
        <h2 className="modal-h2">Find new ideas to try</h2>
        <form onSubmit={handleSubmit}>
          <ul className="errors">
            {errors.map((error) => <li key={error}>{error}</li>)}
          </ul>
          <label className="modal-label">
            Email
            <input
              className="modal-input"
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="modal-label">
            Username
            <input
              className="modal-input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="modal-label">
            Password
            <input
              className="modal-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="modal-label">
            Confirm Password
            <input
              className="modal-input"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="form-button">Continue</button>
        </form>
        <p className="terms">
          {" "}
          By continuing, you agree to Pintwist's non-existant{" "}
          <a href="https://policy.pinterest.com/en/terms-of-service">
            {" "}
            <span className="terms-link">Terms of Service</span>
          </a>{" "}
          &nbsp;and acknowledge you've read anyone else's&nbsp;
          <a href="https://policy.pinterest.com/en/privacy-policy">
            {" "}
            <span className="terms-link">Privacy Policy</span>
          </a>
          .
        </p>
        <hr className="solid" />
        <p> Already a member? <span onClick={formSwap} className="other-modal-link">Log in</span> </p>
      </>
    )}
    {showLogin && (
      <LoginForm />
    )}
  </>
);

```

## Pins 
Users can access all pins on their home landing page. Should they wish to create a new pin, they can uploading an image, and set a title, description, and website. From there, users can edit or delete those pins. 

### Visual

![img](./app/assets/pinvid.gif)

### Code Snippet
```
return (
  <>
    <div className="pin-show-full-page">
      <div className="pin-show-full-holder">
        <div className="pin-show-left">
          <img src={pin?.pinPhoto}/>
        </div>
        <div className="pin-show-right">
          <div className="pin-show-nav-bar">
            <div className="pin-show-nav-bar-left">
              <div className="pin-show-nav-bar-left-ellipsis" onClick={handleEllipsisClick}>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
              {isDropdownOpen && (
                <div className="pin-show-dropdown-menu">
                  <div className="pin-show-dropdown-option" onClick={handleEditPinClick}>Edit Pin</div>
                </div>
              )}
            </div>
            <div className="pin-show-nav-bar-right"></div>
          </div>
          <div className="pin-show-details-holder">
            <a href="https://www.linkedin.com/in/jamieburchfield/" target="_blank">
              <div className="pin-show-url">{pin.destinationLink}</div>
            </a>
            <div className="pin-show-title">{pin.title}</div>
            <div className="pin-show-description">{pin.description}</div>
            <div className="pin-show-user-holder">
              <div className="pin-show-user-picture">{(user.username).slice(0,1).toUpperCase()}</div>
              <div className="pin-show-user-name">{userFullName}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {isEditPinModalOpen && <EditPinFormModal pin={pin} onClose={() =>setIsEditPinModalOpen(false)}/>}
  </>
);

```

## Search
Users can search pins by title, isolating topics of interest to them.

### Visual 
![img](./app/assets/searchvid.gif)


### Code Snippet
```
const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const query = history.location.search.split("=")[1];
    dispatch(fetchSearchResults(query));
  }, [history.location.search]);

  const searchResults = useSelector((state) => state.searchResults);

  return (
    <div id="search-result-page">
      <div id="search-results-holder">
        {Array.isArray(searchResults) && searchResults.map((pin) => (
          <div className="search-result" key={`${pin.id}-${Date.now()}`}>
            <Link to={`/pin/${pin.id}`}>
              <img 
                className="search-result-image"
                src={pin?.pinPhoto}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
``` 

# Thank you! 
Pintwist was created within a 14 day time frame. Please feel free to contact me for more information about myself or the project.