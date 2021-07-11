# Nozama (MERN Stack E-Commerce Web App)

~~Under production. Not yet hosted. Will be hosting soon~~

Check out the website **[here](https://nozamaapp.herokuapp.com)**

## Features

<hr>

1. Sliding Window Rate Limiter (using Node cache memory) to control traffic
2. Fixed Window Rate Limiter (using Node cache memory) for IP banning
3. JWT Authentication
4. Customers can add items to cart and change the quantity from the cart page
5. All orders history is also available to the user along with relevant information
6. Search functionality to find different products
7. Updates stock, rating and comments as per the input by customers
8. Admin control to add and delete products
9. Admin also confirms the delivery of order
10. Stripe api integrated. Currently allows only credit card

## Tech Stack used

<hr>

1. ReactJS for front-end
2. Redux for state management
3. SASS for CSS pre processing
4. Redux thunk middleware for asynchronus redux actions
5. React router for routing to different pages
6. Express middleware on the backened to handle routes and requests
7. Mongoose for the database schema and performing operations
8. MongoDB used as a database

## Future plans for this project

1. UI works for now at least, although I want to make it more polished. Maybe work on UI a bit later (After getting my hands on Figma).
2. ~~Stripe is something I will be adding to this project.~~

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
PORT = (Port for the server)
MONGO_URI = (Database URL provided by the MonogDB atlas)
SECRET_KEY = (For JWT Authentication)
STRIPE_SECRET_KEY  = (Secret Key provided by stripe)
STRIPE_PUBLIC_KEY  = (Public Key provided by stripe)
```

To run the project on the local machine

```
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
