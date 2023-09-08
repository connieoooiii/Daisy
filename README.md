## Daisy

A soft clone of Etsy, Daisy is dedicated to offering a vibrant platform for users to both create and discover a diverse array of Asian beauty products.

Check out Daisy [here](https://daisy-sntv.onrender.com/)

## Splash Page

![splash page](/images/splash-page.png)

## Product Detail Page

![product deatil page](/images/product-details.png)

## Create A Product

![create a product](/images/create-product.png)

## Manage Products Page

![manage products](/images/manage-products.png)

## Shopping Cart Page

![shopping cart](/images/cart.png)

## Technologies Used

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## Core Features

### Products

- Users should be able to view all Products.
- Users should be able to create a Product.
- Users should be able to update their Product(s).
- Users should be able to delete their Product(s).

### Shopping Cart

- Users should be able to view all products added to their cart.
- Users should be able to add products to their shopping cart.
- Users should be able to remove products from their shopping cart.
- Users should be able to edit items in their cart

### Reviews

- Users should be able to view all reviews on a Product.
- Users should be able to create a review for a Product.
- Users should be able to update their review for a Product.
- Users should be able to delete their review from a Product.

### Search

- Users can search for an product based on its title
- Users can also use the category filters on the splash page

## Getting started

1. Clone this repository (only this branch)

2. Install dependencies

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable. Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.
