# gambler

## Description

Mobile app that keeps the account and the record of the user's poker games. The user can also share a game with other users and use the poker odds calculator which returns the odds of the players in a particular hand.

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

- User overall stats
- Tourney game organizer
- Profile image

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

"/profile/my-info"
- User information

"/profile/my-games"
- Lists all user's games
- Lists all user's shared games by other users

"/profile/my-shared-games"
- Lists all user's pending shared games to be accepted or rejected
  

## Components

- CancelButton
- CashGameCard
- CurrentPlayerCard
- FinishedPlayerCard
- FormUser
- Header
- InputNumber
- LoadingSpinner
- Navbar
- SummaryPlayerRoute
- AnonRoute
- PrivateRoute

## Services

- AuthService
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.search()
  
- CashGameService
  - cash.create()
  - cash.getMyGames()
  - cash.getMySharedGames()
  - cash.getDetail()
  - cash.newPlayer()
  - cash.updateStack()
  - cash.updateRebuy()
  - cash.endGame()
  - cash.deleteGame()
  - cash.deleteSharedGame()
  - cash.shareGame()
  - cash.acceptSharedGame()
  - cash.rejectSharedGame()
  
## Server
  
## Models

- User:
  - username: String, required
  - password: String, required, encrypted
  - image/avatar: String
  - games played: Number
  - total played: Number
  - total won: Number
  - total lost: Number
  
- CashGame:
  - playerList [Player schema]
  - pot: Number
  - remainingPot: Number
  - isPlaying: Boolean
  - owner: String
  - secondaryOwners: [String]
  - pendingOwners: [String]
  - startDate: Date
  - endDate: Date
  
- Player:
  - name: String
  - buyin: Number
  - buyinHistory: [Number]
  - finalStack: Number
  - isPlaying: Boolean
  
## API endpoints (Backend routes)

- GET "/auth/me"
  - 404 (Not Found) if user not logged in
  - Get current user

- POST "/auth/signup"
  - 401 (unauthorized) if user logged in
  - 200 (OK) if new user created successfully
  - Body:
    - username
    - password (encrypted)
  - Validation
    - fields empty (422)
    - user already exists (409)
  - Save new user and store session
  - Redirect to home page
  
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

- GET "/cash-game/my-games"
  - Returns user's list of games
  
- GET "/cash-game/my-shared-games"
  - Gets the user's list of games that have been shared with him
  
- GET "/cash-game/:id"
  - Gets the cash game detail
  
- POST "/cash-game/create"
  - Creates new cash game
  
- DELETE "/cash-game/:id"
  - Deletes cash game
  
- PUT "/cash-game/delete-shared"
  - Deletes shared game from user's list of games
  
- PUT "/cash-game/:id/new-owner"
  - Accept shared game
  - Adds game to user's game's list
  
- PUT "/cash-game/:id/reject-share"
  - Reject shared game
  
- PUT "/cash-game/:id/new-player"
  - Add player to currently playing game
  
- PUT "/cash-game/:id/end-game"
  - End current playing game
  
- PUT "/cash-game/:id/player-stack/:playerId"
  - Assign final stack to player
  
- PUT "/cash-game/:id/player-rebuy/:playerId"
  - Add rebuy to player
  
- PUT "/cash-game/:id/share/:shareUserId"
  - Shares game with another user
    
## Link

Mobile version:

https://gambler-app.firebaseapp.com/

