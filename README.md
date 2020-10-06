# Quick Budget

Quick Budget is a full stack application that helps users create a snapshot of their monthly finances.  

Users are guided through evaluating their monthly income and expenses through a comprehensive list of possible items.  Users can register so they can save and return to their budget.

This project was built using React, Node, Express, Sequelize, MySQL, Axios, bcryptJS, and Bootstrap 4.

![Image of the app's home screen](/images/README/Home_10-05-20.png "Homepage")

## Why

In evaluating my own finances over the years, I've always wanted a better way to go about things than my normal pen-and-paper or Excel approach.  I like to think about my budget in terms of average monthly income and expenses, without getting bogged down in exact daily amounts or overwhelmed by considering a year at once.

I began building this app because it's something that is useful for me in my own life, and I'm hoping that others may also find it helpful as well.  Although it is currently in its nascent form, I'm excited for future updates with additional features.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

In order to get this project running on your local machine, you will need:
* mySQL
* Node.js
* A GitHub account
* Terminal

### Installing

#### 1) Clone repo and install packages

Clone the repo to your machine.  From your terminal, navigate to the root of the folder and run an npm install to get the necessary packages:

```
npm i
```

#### 2) Set up DB

Next, we will set up the database.  Pull up your MySQL workbench.  From the root of the project folder, you can grab the schema.sql file.  Copy and paste this into your SQL query.  Run this query to create the database and tables.

#### 3) Seed the DB

In order to seed your database, run the following command from the root of the project folder: 

```
npm run seed
```

#### 4) Get servers running

This project uses the [concurrently](https://www.npmjs.com/package/concurrently) package to run both servers at the same time. Use this command to get your development version going:

```
npm run dev
```

## Examples
Here are some gifs showing the app in action.

### Homepage and Budget Calculator
When the user first comes to the page, they see a homescreen with some basic information about the app, along with links to log in, sign up, or just get started without registering.


![Gif of app being used](/images/README/Budget_Example_10-05-20.gif "Homepage and Budget Calculator")


### Getting Started
If someone chooses to "Start Now" (rather than "Sign Up" first) and builds their budget without saving, they can still use the calculator.  All of the information on the Budget Calculator lives in state, so there is no problem for them to enter numbers and have the page calculate their income totals.  Should they wish to return to their budget in the future, they will need to save so the information reaches the DB.  I've made this easier for new users by adding a modal that pops up if an unregistered user tries to save, which prompts the new user to sign up.


![Gif of app unregistered user being prompted to sign up upon saving](/images/README/New_User_Save_Example_10-05-20.gif "Unregistered user being prompted to sign up upon saving")


### Saving Your Budget
For users who have already registered, their existing budget will be pre-filled in from however they last saved it.  To make changes, they just enter the new numbers and then click save as before, and a modal will pop up to let them know it's been saved successfully.  In the future, I'd like to let users save multiple versions of their budget so that they can compare between their budgets.


![Gif of budget being saved](/images/README/Save_Example_10-05-20.gif "Budget being saved")


### Leaving Without Saving
It would be frustrating for a user to make lots of changes only to navigate without having saved their progress.  To prevent this, a user who has made changes without saving will be alerted before they leave the page.  Since this app uses client-side rendering, this alert had to be implemented both on the window and with react-router-dom.  This way, they will be prompted whether they navigate within the app or close/refresh the page.  I made this into a component that can be placed onto any page in the app in the future.


![Gif of user being alerted that they are leaving with unsaved changes](/images/README/Unsaved_Changes_Example_10-05-20.gif "User being alerted of unsaved changes").


## Roadmap

### TODO - Now

#### Dashboard
- Beautify its current ... spartan(?) ... appearance.
- Add more features into the dashboard.  
- Ideas: calculator for the amount of time to reach an amount.
  - User can select goal, then app will calculate the amount of time for user to reach that amount.
  - In addition to monthly cash flow, user can enter totals of existing savings/debts.  With that, can calculate timeframes for savings goals or paying off debts.
- Add some links to personal finance education resources

#### Loan Calculator
- Give users a sandbox to see how different payment amounts will affect paying off their loans.
  - Via either a new page or on the dashboard, allow the user to enter debts and APR.  
  - Then, the user can calculate the lifetime of the loan based on what amount they pay 
    - How long it will take to pay off at that rate, 
    - total cost once it is paid off, 
    - how much of that was interest.

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

#### Dashboard
- Lean how to display the user's budget in a pie chart, with different categories' percentages.


### TODO - Get Help

#### REST API Best Practices
- I'm likely missing a few protocols.  Have someone look things over and see if I'm on track and what I can improve.

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

* Thank you Mom!
