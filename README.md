# CRUD
Architecture: MVC

Postman => server(Heroku) => mongoDB 


#CREATE - SIGNUP
router.post : https://erincrud.herokuapp.com/api/signup

A user can sign up by providing:
 {username,
    password,
    firstname,
    lastname,
    gender,
    date_of_birth}



#SIGNIN
Router.post: https://erincrud.herokuapp.com/api/signin
Then in put the user name and password you used to signUp
{
username,
 password
 }

#LIST OF ALL USERS
router.get: https://erincrud.herokuapp.com/api/users

#LIST ALL USERS WITH QUERY PARAMS
https://erincrud.herokuapp.com/api/user?sortBy=createdAt&order=asc&limit=2

#FIND USER BY ID
router.get:  https://erincrud.herokuapp.com/api/user/:id
The user id is gotten from the database/ also gotten when a Client successfully login

#UPDATE 
router.put:  https://erincrud.herokuapp.com/api/user/update/:id
Only a successfully logged in user can update his data with his id

#DELETE
router.delete: https://erincrud.herokuapp.com/api/user/delete/:id
Only a successfully logged in user can update his data with his id

backend URL: https://erincrud.herokuapp.com/


