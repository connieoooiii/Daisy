from app.models import db, ShoppingCart, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_shoppingcart():
    products = Product.query.all()

    cart1 = ShoppingCart(
        user_id=1
    )

    cart2 = ShoppingCart(
        user_id =2
    )

    cart3 = ShoppingCart(
        user_id =2
    )

    cart4 = ShoppingCart(
        user_id =4
    )

    cart1.extend(products[5:8])

    cart2.extend(products[10:12])

    cart3.extend(products[:3])

    cart4.extend(products[3:5])

    db.session.add_all([cart1, cart2, cart3, cart4])

    db.session.commit()
    print('Shopping cart seeds added')


def undo_shoppingcart():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shopping_cart_products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shopping_cart_products"))

    db.session.commit()
    print('Shopping cart has been unseeded')



def undo_shoppingcart():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shopping_carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shopping_carts"))

    db.session.commit()
    print('Shopping cart has been unseeded')
