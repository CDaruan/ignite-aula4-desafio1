# Create User:
## /api/v1/users
- shold be able to create a new user
- shold not be able to create an user with an existing email

# Authenticate User
## /api/v1/sessions
- shold be able to authenticate an user
- shold not be able to authenticate an user with a nonexistent email
- shold not be able to authenticate an user with a wrong password

# Show Profile
## /api/v1/profile
- shold be able to show an user profile
- shold not be able to show a profile from a not existing user

# Get Balance
## /api/v1/statements/balance
- shold be able to get the balance and all statements of an user
- shold not be able to get the balance of a nonexistent user

# Deposit
## /api/v1/statements/deposit
- shold be able to create a new deposit
- shold not be able to create a new deposit for a nonexistent user

# Withdraw
## /api/v1/statements/withdraw
- shold be able to create a new withdraw
- shold be able to withdraw from a nonexistent user
- shold not be able to withdraw an amount greater than the account balance

# Get a Statement
## /api/v1/statements/:statement_id
- shold be able to get a statement by id
- shold not be able to get a statement from a nonexistent user
- shold not be able to get a statement from a nonexistent statement_id


# Create a Transfer
## /api/v1/statements/transfers/:user_id
- shold be able to transfer
- shold not be able to transfer for a nonexistent user
- shold not be able to transfer from a nonexistent user
- shold not be able to transfer to the same user that is creating
- shold not be able to transfer an amount greater than the account balance
