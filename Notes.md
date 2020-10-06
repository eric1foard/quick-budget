## Now
#### Branch `ids-indexes-comments-readme`
This branch will be a general sweep of the App with a few minor changes to make to the code, but mostly will be centered around adding comments and creating a real README.

- ✓ add UUID as typeKey in models, schema, seeds
- ✓ add UUID for new users, by modifying newUserSeed's default values
- ✓ modify Budget, Box, and Form to accept the unique keys correctly
- ✓ complete adding in id's so react will stop yelling at me
- ✓ make sure indexes are working on income and expense items (update - turns out foreign keys are automatically indexed, which includes what we need.)
- ✓ add note in app as to why using two sweetalert packages
- ✓ turn the rest of sweet alert messages into helpers
- ✓ Make sure changes from yesterday are OK (try/catch, helpers)
- ✓ Use onBlur to clean user input - change to numbers with no 0's to left, prevents empty NAN strings, and limits to 2 decimal places.  This also allows the app to re-render less often (it used to do so onChange)
- ✓ add in code comments
- ✓ For new users - have it originally read 0.00, just like when users have saved 0.
- ✓ Consolidate "npm start" and "nodemon index/server"
- ✓ get rid of extra line when collapse sections on budget
- ✓ comment out the currently unused code for users adding new Types
- ✓ Make Readme nicer




### Done!
- ✓ Figure out how to structure DB.
- ✓ User can get info from DB onto the Budget component.
- ✓ User can save changes they make on the Budget component back into the DB.
- ✓ Subtotals and totals display on DOM.
- ✓ Beautify the login page.
- ✓ Beautify the signup page.
- ✓ Add a bottom navbar
- ✓ Make jumbo a component
- ✓ reduce logo font size for small screens
- ✓ DB - add seed file
- ✓ DB - add schema file
- ✓ When new user goes onto budget, populate default values
 When a new and already registered user saves for the first time, their budget info is posted to db.
- ✓ Adds a button to "start now" from the Home component, which takes user to Budget and populates it with default data.
- ✓ Adds "start now" button to navbar that appears when no user is logged in.
- ✓ Allow users without profiles to use budget, like a demo
- ✓ When an unregistered user clicks save, lets them sign up and save info
- ✓ Adds a close button to the signup modal
- ✓ Makes the save button look nicer on Budget component.
- ✓ Adds a reusable loading image component for while requests are being made.
- ✓ Adds modal after user saves using sweetalert
- ✓ Adds reusable component UnsavedChangesAlert that tracks if user has made changes. If they have, it warns them before leaving page (both for browser and react-router-dom).
- ✓ Doesn't allow users to have the same username when signing up