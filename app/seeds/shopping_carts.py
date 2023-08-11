from app.models import db, ShoppingCart, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_shoppingcart():


    cart1 = ShoppingCart(user_id=1, product_id=5)
    db.session.add(cart1)

    cart2 = ShoppingCart(user_id=1, product_id=7)
    db.session.add(cart2)

    cart3 = ShoppingCart(user_id=1, product_id=13)
    db.session.add(cart3)

    cart4 = ShoppingCart(user_id=2, product_id=2)
    db.session.add(cart4)

    cart5 = ShoppingCart(user_id=3, product_id=7)
    db.session.add(cart5)

    cart6 = ShoppingCart(user_id=4, product_id=9)
    db.session.add(cart6)

    db.session.commit()
    print('Shopping cart seeds added')




def undo_shoppingcart():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shopping_carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shopping_carts"))

    db.session.commit()
    print('Shopping cart has been unseeded')
