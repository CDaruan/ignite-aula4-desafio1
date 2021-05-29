# Create User:
shold be able to create a new user
shold not be able to create an user with an existing email

# Authenticate User
shold be able to authenticate an user
shold not be able to authenticate an user with a nonexistent email
shold not be able to authenticate an user with a wrong password

# Show Profile
Shold be able to show an user profile
Shold not be able to show a profile from a not existing user

# Get Balance
Shold be able to get the balance and all statements of an user
Shold not be able to get the balance of a nonexistent user

# Deposit
Shold be able to create a new deposit
Shold not be able to create a new deposit for a nonexistent user

# Withdraw
Shold be able to create a new withdraw
Shold be able to withdraw from a nonexistent user
Shold not be able to withdraw an amount greater than the account balance

# Get a Statement
Shold be able to get a statement by id
Shold not be able to get a statement from a nonexistent user
Shold not be able to get a statement from a nonexistent statement_id
