# Quick Budget

Quick Budget is a full stack application that helps users create a snapshot of their monthly finances.  

Users are guided through evaluating their monthly income and expenses through a comprehensive list of possible items.  Users can register so they can save and return to their budget.  Their dashboard crunches numbers to give them additional insights into their income and spending.

This project was built using React, Node, Express, Sequelize, MySQL, Axios, bcryptJS, Chart.js, and Bootstrap 4.

![Image of the app's home screen](/images/README/Home_10-05-20.png "Homepage")

## Why

In evaluating my own finances over the years, I've always wanted a better way to go about things than my normal pen-and-paper or Excel approach.  I like to think about my budget in terms of average monthly income and expenses, without getting bogged down in exact daily amounts or overwhelmed by considering a year at once.  I was also excited about the idea of being able to take these numbers and create charts and graphs from them, which has been done in the user's dashboard.

I began building this app because it's something that is useful for me in my own life, and I'm hoping that others may also find it helpful as well.  Although it is currently in its nascent form, I'm excited for future updates with additional features.


## Examples
Here are some gifs showing the app in action.

### Homepage and Budget Calculator
When the user first comes to the page, they see a homescreen with some basic information about the app, along with links to log in, sign up, or just get started without registering.

![Gif of app being used](/images/README/Budget_Example_10-05-20.gif "Homepage and Budget Calculator")


### User Dashboard
The user's dashboard crunches the information from their Budget to give useful insights.  Their income and expenses are visualized as pie/doughnut charts.  In addition, the categories of user expenses are mapped as a line graph overlaying a floating bar graph that denotes the recommended percentage rangs of spending for each category.  For new users who have registered but not yet saved a budget, their dashboard gives them the option to see the dashboard populated with example data.  

On the bottom of the dashboard, the user can also enter their current account balances for a few additional insights.  First, they can calculate how large of an emergency fund they currently have saved.  Second, depending on whether they have a positive or negative monthly cash flow, they can calculate the amount of time to reach a savings goal, or learn how long their accounts will last (for example, in case of retirement).

![Gif of dashboard being scrolled through](/images/README/Dashboard_Example_10-05-20.gif "User Dashboard and visuals")


### Getting Started
There are two possible user stories for getting started:
1) The user can first "Sign Up", and then create their budget.
2) Alternatively, users can choose to "Start Now" (rather than "Sign Up" first) and build their budget first without saving.  I saw value in this since most users don't want to just immediately register for a new website - this way, they can try it out and then decide to register or not.  Since the information on the Budget Calculator lives in state, there is no problem for them to enter numbers and have the page calculate their income totals despite not yet having an account.  Should they wish to return to their budget in the future, they will need to save so the information reaches the DB.  I've made this easier for new users by adding a modal that pops up if an unregistered user tries to save, which prompts the new user to sign up.

![Gif of app unregistered user being prompted to sign up upon saving](/images/README/New_User_Save_Example_10-05-20.gif "Unregistered user being prompted to sign up upon saving")


### Saving Your Budget
For users who have already registered, their existing budget will already be filled in based on however they last saved it.  To make changes, they just enter the new numbers and then click save as before, and a modal will pop up to let them know it's been saved successfully.  In the future, I'd like to let users save multiple versions of their budget so that they can compare between their budgets.

![Gif of budget being saved](/images/README/Save_Example_10-05-20.gif "Budget being saved")


### Leaving Without Saving
It would be frustrating for a user to make lots of changes on their budget only to navigate without having saved their progress.  To prevent this, a user who has made changes without saving will be alerted before they leave the page.  Since this app uses client-side rendering, this alert had to be implemented both on the window and with react-router-dom.  This way, they will be prompted whether they navigate within the app or close/refresh the page.  I made this into a component that can be placed onto any page in the app in the future.

![Gif of user being alerted that they are leaving with unsaved changes](/images/README/Unsaved_Changes_Example_10-05-20.gif "User being alerted of unsaved changes").



## Getting This Project Running

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

In order to get this project running on your local machine, you will need:
* MySQL
* Node.js
* A GitHub account
* Terminal


### Installing

#### 1) Clone repo and install packages

Clone the repo to your machine.  From your terminal, navigate to the root of the folder and run the following to get the necessary packages:

```
npm i
```

This is a custom script that will: 1) install dependencies in the root, 2) move to Client folder, 3) install dependencies in Client folder, 4) create a build from Client folder, and 5) cd to root.  If you will only be using the app in development, you can delete the build folder to use hot-reloading.


#### 2) Set up DB

Next, we will set up the database.  Pull up your MySQL workbench.  From the root of the project folder, navigate into the db folder.  From here:

1) Copy the code within the `/db/schema.sql` file.  Paste it into a query in your workbench and run it.  This will create the database and tables.
2) Copy the code within the `/db/seed.sql` file.  Paste it into another query in your workbench and run it.  This will seed the necessary information for the app to work.  NOTE: the app will not work until you have finished seeding the db.


#### 3) Set up Environment Variables

There are some environment variables that you will need to define.  In the root of the project, create a .env file.  Within this file, set the following environment variables:

1. `root/server/config/config.js`
  - Within this file, you will a number of environment variables related to connecting to your db.  Define these variables in your .env file as needed.
2. `process.env.REACT_APP_AUTH_CONFIG_SECRET`
  - This variable will be the secret used by bcryptJS to hash user passwords.
3. `process.env.REACT_APP_SERVER_PORT`
  - You can set this to `3001`, or not set it at all (`/server.js` defaults this to `3001` if it is not otherwise defined).  Note that `3001` is set in `/client/package.json` as the accepted proxy, which is important when working in development.  If you want to work from a different port, this is how you can configure this.


#### 4) Get servers running

a) In order to run the project in development, run this code from the root of the project folder:

```
npm run dev
```

This uses the [concurrently](https://www.npmjs.com/package/concurrently) package to run the API server at the same time as the webpack, allowing for hot-reloading.

b) In order to run the project for production, run this code from the root of the project folder:

```
npm i
```

As explained above, this will: 1) install dependencies in the root, 2) move to Client folder, 3) install dependencies in Client folder, 4) create a build from Client folder, and 5) cd to root.

From this point, since the project is deployed on Heroku, I use `heroku local` to check that the build will work when deployed on heroku (this still uses the development db).  In the future, I will learn to build a better way to run the production environment locally, but this suffices for the moment.



## Roadmap

### TODO - Now

#### Loan Calculator
- Give users a sandbox to see how different payment amounts will affect paying off their loans.
  - Via either a new page or on the dashboard, allow the user to enter debts and APR.  
  - Then, the user can calculate the lifetime of the loan based on what amount they pay 
    - How long it will take to pay off at that rate, 
    - total cost once it is paid off, 
    - how much of that was interest.

#### Dashboard
- Beautify the dashboard a bit
  - In the Projections section, add graphs showing the progression over time of the growth/shrinking of their accounts.
- Reduce some of the repetition in dashboard's code
- Add some helpful links for the user of outside educational resources
- Let user save their account balances in DB instead of re-entering them every time (currently the info only lives in state)

#### Tests
- Write some!

#### About Me
- Add one, why not.  
  - Link it from the bottom nav (and top?).
  - Have it give some background on why I'm making this app.

#### Budget
- Allow users to customize the Types in their budget
  - User can delete existing types.
  - User can edit types (changing their title/description).
  - User can add new types within categories.


### TODO - Long Term

#### DB
- Allow users to save multiple versions of their budget
  - For example, they can have one version where they have $x in rent, and another with $y in rent.

#### Budget
- Have a popup that asks user if they want instructions, then guides them through general use.


### TODO - Get Help

#### REST API Best Practices
- I'm likely missing a few protocols.  Have someone look things over and see if I'm on track and what I can improve.
- I purposefully am not using id's in the url, with security in mind.  Not sure if that is a good practice?

#### App File Structure / Best Practices
- Is it OK that I have so much of my logic in the controllers?
- There is a lot of repitition between income/expense logic.  How could I reduce more of this?

#### DB Structure
- I've separated out Income and Expense tables - is this right?  
  - They are exactly the same besides being income or expense.  I did this thinking that it would be necessary for later on being able to let users enter custom new Types to their budgets.  Is that the case?  
  - Should I just add a new column noting income vs. expense, thereby cutting the number of tables and API calls in half?

#### React Components
- What else should I be turning into components?  How can I reduce redundancy?  It seems the fields are especially redundant.


## Author

* **Cody Brock** - *Full Application* 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thank you to my loving wife whose fresh baked cookies gave me the inspiration to push through any bug!
