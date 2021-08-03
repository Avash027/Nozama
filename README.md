# Nozama (MERN Stack E-Commerce Web App)

Check out the website **_[here](https://nozamaapp.herokuapp.com)_**

## Features

1. **Sliding Window Rate Limiter** (using Node cache memory) to control traffic
2. **Fixed Window Rate Limiter** (using Node cache memory) for IP banning
3. JWT Authentication
4. Customers can add items to cart and change the quantity from the cart page
5. All orders history is also available to the user along with relevant information
6. Search functionality to find different products
7. Updates stock, rating and comments as per the input by customers
8. Admin control to add and delete products
9. Admin also confirms the delivery of order
10. Stripe api integrated. Currently allows only credit card

## Tech Stack used

1. **ReactJS** for front-end
2. **Redux** for state management
3. **SASS** for CSS pre processing
4. **Redux thunk** middleware for asynchronus redux actions
5. **React router** for routing to different pages
6. **Express** middleware on the backened to handle routes and requests
7. **Mongoose** for the database schema and performing operations
8. **MongoDB** used as a database

## Currently working on

1. Currently adding unit tests and integration test for various components

## API Documentation

| Type |                Route                |     Access     |                                            Description                                             |
| :--: | :---------------------------------: | :------------: | :------------------------------------------------------------------------------------------------: |
| GET  |             /api/orders             |    Private     | Returns a list of all the user has made. If the request is made by admin it returns all the orders |
| GET  |            /api/products            |     Public     |                                      Returns all the products                                      |
| GET  |         /api/products/{id}          |     Public     |                              Returns a specific product as per the id                              |
| GET  |         /api/users/profile          |    Private     |                        Returns the details of the currently logged in user                         |
| POST |              /api/key               |     Public     |                                   Returns the Public stripe key                                    |
| POST |             /api/orders             |    Private     |                 It stores the order details and makes a payment intent with stripe                 |
| POST |          /api/products/add          | Private(Admin) |                                 Adds a new product to the database                                 |
| POST |        /api/products/reviews        |    Private     |                          Adds a review for a product by a logged in user                           |
| POST | /api/products/reviews/deletereviews |    Private     |                        Deletes the comment (if any) made by logged in user                         |
| POST |       /api/products/updateQty       |    Private     |                         Updates the product stock when an order is palced                          |
| POST |        /api/products/delete         | Private(Admin) |                                Delete the product from the database                                |
| POST |          /api/users/login           |     Public     |             Checks for credentials and send JWT token for further requests by the user             |
| POST |         /api/users/register         |     Public     |                       Validates the information and add new user to database                       |
| PUT  |         /api/users/profile          |    Private     |                                      Updates the user details                                      |

## Future plans for this project

1. UI works for now at least, although I want to make it more polished. Maybe work on UI a bit later (After getting my hands on Figma).

## Install this project

```bash
git clone https://github.com/Avash027/Nozama.git
```

```bash
cd project
```

To install all the dependencies

Run the command in the **root directory and the client directory**

```bash
npm install
```

Now create a .env file in the root directory

```
NODE_ENV = (production/deployment as per the use)
PORT = (Port of the server)
MONGO_URI = (Database URL provided by the MonogDB atlas)
SECRET_KEY = (For JWT Authentication)
STRIPE_SECRET_KEY  = (Secret Key provided by stripe)
STRIPE_PUBLIC_KEY  = (Public Key provided by stripe)
```

To run the project on the local machine

```bash
npm run dev
```

## Some relevant links of the languages and tools I used

1. [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
2. [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
3. [SASS](https://sass-lang.com/documentation)
4. [ReactJS](https://reactjs.org/docs/getting-started.html)
5. [Redux](https://react-redux.js.org/)
6. [Express](https://expressjs.com/)
7. [Mongoose](https://mongoosejs.com/docs/)
8. [MongoDB](https://docs.mongodb.com/)
9. [NodeJS](https://nodejs.org/en/docs/)
10. [Stripe](https://stripe.com/docs)

## Authors

- [@Avash Mitra](https://github.com/Avash027)
