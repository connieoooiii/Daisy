from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from app.models import Product, User, db, ShoppingCart
from .auth_routes import validation_errors_to_error_messages


cart_routes = Blueprint('carts', __name__)


#get all of the products in the logged in user's cart
@cart_routes.route('')
@login_required
def get_cart():
    products = ShoppingCart.query.filter_by(user_id = current_user.id).all()

    if products:
        product_dict = [product.to_dict() for product in products]
        result = []
        total = 0
        for product in product_dict:
            item = Product.query.get(product['product_id'])
            return_item = item.to_cart_dict()
            return_item['quantity'] = product['quantity']
            result.append(return_item)
            # total += return_item['price']
        # result.append({'total_price': total})
        # return product_dict
        return result
    else:
        return jsonify({"message": "You have no products in your cart"}), 404




#remove all products from a user's cart
@cart_routes.route('', methods=['DELETE'])
@login_required
def remove_all_cart():
    carts = ShoppingCart.query.filter_by(user_id = current_user.id).all()

    if not carts:
        return jsonify({"error": "Your cart is empty"}), 404

    for cart in carts:
        db.session.delete(cart)
        db.session.commit()
    return {"message": "Your cart is now empty"}


#get the total amount of a user's shopping cart
@cart_routes.route('/total')
@login_required
def get_cart_total():
    products = ShoppingCart.query.filter_by(user_id = current_user.id).all()

    if products:
        product_dict = [product.to_dict() for product in products]
        # result = []
        total = 0
        for product in product_dict:
            item = Product.query.get(product['product_id'])
            return_item = item.to_dict()
            # result.append(return_item)
            item_amount = return_item['price'] * product['quantity']
            total += item_amount
        return jsonify({'total_price': total})

    else:
        return jsonify({'total_price': 0})


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


# add a product to user's cart
@cart_routes.route('/product/<int:productId>', methods=['POST'])
@login_required
def add_to_cart(productId):
    product = ShoppingCart.query.filter_by(product_id=productId, user_id=current_user.id).first()

    if product:
        return jsonify({"error": "Product already in your cart"}), 404
    else:
        item = Product.query.get(productId)
        result = item.to_dict()
        if result['user_id'] == current_user.id:
            return jsonify({"error": "You can't add your own product into your cart"}), 404
        else:
            cart_product = ShoppingCart(
                user_id = current_user.id,
                product_id = productId
            )
            db.session.add(cart_product)
            db.session.commit()
            return result


@cart_routes.route('/product/<int:productId>/quantity/<int:amount>', methods=['PUT'])
@login_required
def update_cart(productId, amount):
    product = ShoppingCart.query.filter_by(product_id=productId, user_id=current_user.id).first()

    if not product:
        return jsonify({"error": "This product is not in your cart"}), 404
    else:
        product.quantity = amount
        db.session.commit()
        return product.to_dict()
