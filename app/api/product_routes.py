from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from app.models import Product, User, db, Review
from app.forms import ProductForm, ReviewForm, UpdateProductForm
from .auth_routes import validation_errors_to_error_messages
from sqlalchemy import func
from .AWS_helpers import upload_file_to_s3, get_unique_filename

product_routes = Blueprint('products', __name__)


#get all the products on the site
@product_routes.route('')
def get_all_products():
    products = Product.query.order_by(Product.updated_at.desc()).all()
    product_list = []

    for product in products:

        avg_stars = db.session.query(func.avg(Review.stars)).filter(Review.product_id == product.id).scalar()
         #Review.query for simple queries, for more complex agreg func need db.session
        #func.avg is SQL alc func that gets avg
        #scalar returns single scalar value instead of an object

        if not avg_stars:
            avg_stars = 0
        avg_stars = round(avg_stars, 2)

        product_dict = product.to_dict()

        product_dict['avg_stars'] = avg_stars

        product_list.append(product_dict)

    return product_list

#search for product
@product_routes.route('/<search>')
def getSearchProduct(search):
    products = Product.query.filter(Product.title.ilike(f"%{search}%"))
    return [product.to_dict() for product in products]


#create a product route
@product_routes.route('', methods=["POST"])
@login_required
def create_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        image_file = form.data["image"]
        image_file.filename = get_unique_filename(image_file.filename)
        upload = upload_file_to_s3(image_file)
        print(upload)

        if "url" not in upload:
            return upload['errors']

        new_product = Product(
            user_id=current_user.to_dict()['id'],
            title=form.data['title'],
            description=form.data['description'],
            image=upload["url"],
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
        return jsonify({"error": "No reviews found"}), 404
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

    avg_stars = db.session.query(func.avg(Review.stars)).filter(Review.product_id == productId).scalar()

    if not avg_stars:
            avg_stars = 0

    avg_stars = round(avg_stars, 2)

    response = product.to_dict()
    response['avg_stars'] = avg_stars
    return response


#update one product's details
@product_routes.route('/<int:productId>', methods=["PUT"])
@login_required
def update_product(productId):
    form = UpdateProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    product = Product.query.get(productId)
    if not product:
        return jsonify({"erorr": "Product not found"}), 404

    if form.validate_on_submit():

        print('no validation errors for update product')
        product.title = form.data['title']
        product.description=form.data['description']
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
