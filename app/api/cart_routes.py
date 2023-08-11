from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from app.models import Product, User, db, ShoppingCart
from .auth_routes import validation_errors_to_error_messages


cart_routes = Blueprint('carts', __name__)


#get all of the products in the logged in user's cart
@cart_routes.route('')
@login_required
def get_cart():
    products = ShoppingCart.query.filter_by(user_id = current_user.id)

    if products:
        product_dict = [product.to_dict() for product in products]
        result = []
        for product in product_dict:
            item = Product.query.get(product['product_id'])
            return_item = item.to_dict()
            result.append(return_item)
        return result
    else:
        return jsonify({"message": "You have no products in your cart"}), 404


#delete a product from a user's cart
@cart_routes.route('/product/<int:productId>', methods=['DELETE'])
@login_required
def remove_from_cart(productId):
    product = ShoppingCart.query.filter_by(product_id=productId, user_id=current_user.id).first()

    if not product:
        return jsonify({"error": "Product not found in your cart"}), 404

    db.session.delete(product)
    db.session.commit()
    return {"message": "Product removed from cart"}
