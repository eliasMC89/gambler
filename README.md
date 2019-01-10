# gambler

## Description

Mobile app for poker players that keeps the account and the record of the user's poker games. The user can also share a game with other users and use the poker odds calculator which retrieves the odds of the players in a particular hand.

## User stories

- 404: As a user I want to get a 404 (not found) page if I reach a page that doesn't exist.
- 500: As a user I want to get a 500 (server error) page if there's something wrong with the server.
- Sign up: As a user I want to sign up and create a new account if I don't have one.
- Log In: As a user I want to log in into my account.
- Log out: As a user I want to exit my account.
- Create game: As a user I want to create a new poker cash game:
  - Number of players
  - Name of players
  - Assign a buy in to each of the players
  - See the ongoing game stats
- Edit current game: As a user I want to edit a game that is currently being played.
  - Add a new player
  - Assign a rebuy to a player
  - Quit a player from the game and assign his final stack
- End game: As a user I want to end a current game.
  - Assign the final stack of each player.
  - See the final game stats:
    - Total time
    - Total pot
    - Wins & Losses
    - Date
- See game history: As a user I want to see all the games I have played.
- Share game with other users: As a user I want to share a finished game with other users.
- Odds calculator: As a user I want to calculate my equity (probability to win) in a particular hand.

## Backlog

- Debt count
- Tourney game organizer

## Client

## Routes

"/"
- Landing page
- Public
- Title + description
- Login or Sign up link

"/login"
- Login page
- Public
- Not accessible if logged in
- Login form

"/signup"
- Sign up page
- Public
- Not accessible if logged in
- Sign up form

"/home"
- Create new game button
- Navbar with profile button and logo
- Only users

"/cash-game/add-players"
- Add players and buy-in to game
- Only users
- Form
  - Player names
  - Buy in for each player

"/cash-game/:id/playing"
- Game playing
- Game stats:
  - Pot
  - Player names and buy in and rebuys
- Re-buy button
- Add player button
- Quit player button
- End game button

"/cash-game/:id/rebuy/:playerId"
- Rebuy form page
  - Rebuy quantity
- Rebuy button
- Cancel button (back to game)

"/cash-game/:id/final-stack/:playerId"
- Final stack form page
  - Final stack number
- Final stack button
- Cancel button (back to game)

"/cash-game/:id/summary"
- Cash game detail
- Info:
  - Total pot
  - Players' stats
  - Duration
- Delete game button
- Share game button
- Done button (back to menu)

"/cash-game/:id/new-player"
- Newplayer form
  - Name
  - Buy in
- Add button
- Cancel button

"/cash-game/:id/share"
- Search player form
- Player found name (if exists)
- Share game button

"/cash-game/:id/invitation"
- Accept shared game button
- Reject shared game button

"/profile"
- Profile page
- User information
- Edit profile button
- Game history button

"/games"
- Game history page
- Lists all games
  

## Components

- Login
- SignUp
- Navbar
- NewCashGame
- FinalStacks
- GameList

## Services

- AuthService
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser()
  
- CashGameService
  - cashGame.create()
  - cashGame.edit()
  - cashGame.delete()
  - cashGame.list()
  - cashGame.detail()
  
## Server
  
## Models

- User:
  - Username: String, required
  - Password: String, required, encrypted
  - Image/avatar: String
  - Games played: Number
  - Total won: Number
  - Total lost: Number
  - Overall: Number
  - Win rate: Number
  
- CashGame:
  - Owner: user_id, required
  - Start date: date, required
  - End date: date
  - Total time: date
  - List of Players [id_players]
  - Pot: Number
  - Playing: boolean
  
- Player:
  - Name: String, required
  - Buy in: Number, required
  - Final stack: Number
  - Win: Number
  - userId: String

## API endpoints (Backend routes)
  
- GET "/auth/signup"
  - 401 (unauthorized) if user logged in
  - Get signup page

- POST "/auth/signup"
  - 401 (unauthorized) if user logged in
  - 200 (OK) if new use created successfully
  - Body:
    - username
    - password (encrypted)
  - Validation
    - fields empty (422)
    - user already exists (409)
  - Save new user and store session
  - Redirect to home page
  
- GET "/auth/login"
  - 401 (unauthorized) if user logged in
  - Get login page
  
- POST "/auth/login"
  - 401 (unauthorized) if user logged in
  - Body:
    - username
    - password
  - Validation
    - fields empty (422)
    - user not exists (404)
    - wrong password (404)
  - Store user in session
  - Redirect to home page
  
- POST "/auth/logout"
  - Delete user session
  - Redirect to title page

- GET "/"
  - 401 (unauthorized) if user logged in
  - Get title page
  
- GET "/home"
  - 401 (unauthorized) if user not logged in
  - Gets home page

- GET "/cash-game/new"
  - Get create game form

- POST "/cash-game"
  - Create new game
  - Body:
    - ListPlayers: [Objects: {Name, Buyin, FinalStack}]
    - Start date: current date
    - Pot: add buyins
    - Playing: true

- GET "/cash-game/:id/play"
  - Gets the current cash game info.

- POST "/cash-game/:id/end"
  - Edits game
  - Body:
    - End date: current date
    - Duration: end-start
    - Playing: false
  - Redirects to final stacks page
  
- GET "/cash-game/:id/stacks"
  - Gets the stack page
  
- POST "/cash-game/:id/close"
  - Edits cash game
  - Body:
    - ListPlayers: {FinalStacks}
  - Redirects to cash game detail
  
- DELETE "/cash-game/:id/delete"
  - Deletes cash game
  
- GET "/cash-game/:id"
  - Get game detail
  
- GET "/profile"
  - Gets user's profile page

- GET "/profile/games"
  - Gets games list

- GET "/profile/edit"
  - Gets edit profile page

- PUT "/profile/edit"
  - Edit user profile
  - Body:
    - username
    - password
    
## Link

https://gambler-app.firebaseapp.com/

