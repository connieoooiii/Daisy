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

    cart7 = ShoppingCart(user_id=5, product_id=20)
    db.session.add(cart7)

    cart8 = ShoppingCart(user_id=5, product_id=17)
    db.session.add(cart8)

    cart9 = ShoppingCart(user_id=2, product_id=16)
    db.session.add(cart9)

    cart10 = ShoppingCart(user_id=3, product_id=18)
    db.session.add(cart10)

    cart11 = ShoppingCart(user_id=3, product_id=21)
    db.session.add(cart11)

    cart12 = ShoppingCart(user_id=4, product_id=15)
    db.session.add(cart12)

    cart13 = ShoppingCart(user_id=4, product_id=14)
    db.session.add(cart13)

    cart14 = ShoppingCart(user_id=6, product_id=9)
    db.session.add(cart14)

    cart15 = ShoppingCart(user_id=6, product_id=4)
    db.session.add(cart15)

    cart16 = ShoppingCart(user_id=6, product_id=17)
    db.session.add(cart16)

    cart17 = ShoppingCart(user_id=2, product_id=23)
    db.session.add(cart17)

    cart18 = ShoppingCart(user_id=1, product_id=17)
    db.session.add(cart18)

    cart19 = ShoppingCart(user_id=7, product_id=20)
    db.session.add(cart19)

    cart20 = ShoppingCart(user_id=7, product_id=22)
    db.session.add(cart19)

    db.session.commit()
    print('Shopping cart seeds added')




def undo_shoppingcart():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shopping_carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shopping_carts"))

    db.session.commit()
    print('Shopping cart has been unseeded')
