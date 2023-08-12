from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from app.models import Product, User, db, Review
from app.forms import ProductForm, ReviewForm
from .auth_routes import validation_errors_to_error_messages

product_routes = Blueprint('products', __name__)


#get all the products on the site
@product_routes.route('')
def get_all_products():
    products = Product.query.order_by(Product.updated_at.desc()).all()
    return  [product.to_dict() for product in products]


#create a product route
@product_routes.route('', methods=["POST"])
@login_required
def create_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_product = Product(
            user_id=current_user.to_dict()['id'],
            title=form.data['title'],
            description=form.data['description'],
            image=form.data['image'],
            price=form.data['price']
        )
        db.session.add(new_product)
        db.session.commit()
        return  new_product.to_dict()

    print(form.errors)
    return {"errors": validation_errors_to_error_messages(form.errors)}


#get all of the logged in user's products
@product_routes.route('/user')
@login_required
def get_user_products():
    products = Product.query.filter_by(user_id = current_user.id ).all()
    return [product.to_dict() for product in products]


#get all reviews of a product
@product_routes.route('/<int:productId>/reviews')
def get_product_reviews(productId):
    product = Product.query.get(productId)
    if not product:
        return jsonify({"erorr": "Product not found"}), 404

    reviews = Review.query.filter_by(product_id = productId).order_by(Review.created_at.desc()).all()

    if not reviews:
        return jsonify({"erorr": "No reviews found"}), 404
    else:
        return [review.to_dict() for review in reviews]



#create a review for a product
@product_routes.route('/<int:productId>/reviews', methods=["POST"])
@login_required
def new_review(productId):
    product = Product.query.get(productId)

    if not product:
        return jsonify({"erorr": "Product not found"}), 404

    product_dict = product.to_dict()

    if product_dict["user_id"] == current_user.id:
        return jsonify({"erorr": "You can't review your own product"}), 404

    user_review = Review.query.filter_by(product_id = productId, user_id = current_user.id).first()

    if user_review:
        return jsonify({"erorr": "You've already reviewed this product"}), 404

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review(
            user_id=current_user.to_dict()['id'],
            product_id=productId,
            stars=form.data['stars'],
            review=form.data['review'],
        )
        db.session.add(new_review)
        db.session.commit()
        return  new_review.to_dict()

    print(form.errors)
    return {"errors": validation_errors_to_error_messages(form.errors)}


#get one product's details
@product_routes.route('/<int:productId>')
def get_one_product(productId):
    product = Product.query.get(productId)
    if not product:
        return jsonify({"erorr": "Product not found"}), 404
    response = product.to_dict()
    return response


#update one product's details
@product_routes.route('/<int:productId>', methods=["PUT"])
@login_required
def update_product(productId):
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    product = Product.query.get(productId)
    if not product:
        return jsonify({"erorr": "Product not found"}), 404

    if form.validate_on_submit():
        print('no validation errors for update product')
        product.title = form.data['title']
        product.description=form.data['description']
        product.image=form.data['image']
        product.price=form.data['price']

        db.session.commit()
        res = product.to_dict()
        return res
    else:
        print('FORM ERRORS HERE', form.errors)
        return form.errors


#delete a product
@product_routes.route('/<int:productId>', methods=["DELETE"])
@login_required
def delete_product(productId):
    product = Product.query.get(productId)
    if not product:
        return jsonify({"erorr": "Product not found"}), 404
    db.session.delete(product)
    db.session.commit()
    return {"id": productId}
