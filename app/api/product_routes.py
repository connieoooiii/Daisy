from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Product, User, db
from .auth_routes import validation_errors_to_error_messages

product_routes = Blueprint('products', __name__)


#get all the products on the site
@product_routes.route('')
def get_all_products():
    products = Product.query.order_by(Product.updated_at.desc()).all()
    return {"products": [product.to_dict() for product in products]}


#get all of the logged in user's products
@product_routes.route('/user')
@login_required
def get_user_products():
    products = Product.query.filter_by(user_id = current_user.id )
    return {"products": [product.to_dict() for product in products]}


#get one product's details
@product_routes.route('/<int:productId>')
def get_one_product(productId):
    product = Product.query.get(productId)
    if not product:
        return jsonify({"erorr": "Product not found"}), 404
    response = product.to_dict()
    return response


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
