from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.sql import func


# shopping_cart_products = db.Table(
#     "shopping_cart_products",
#     db.Column("shopping_cart_id", db.Integer, db.ForeignKey(add_prefix_for_prod("shopping_carts.id")), primary_key=True),
#     db.Column("product_id", db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), primary_key=True)
# )
# if environment == "production":
#     shopping_cart_products.schema = SCHEMA

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    image= db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable= False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    # one-to-many
    user = db.relationship("User", back_populates="products")

    cart = db.relationship("ShoppingCart", back_populates="product", cascade="all, delete-orphan")

    reviews = db.relationship("Review", back_populates='products', cascade="all, delete-orphan")


    def to_dict(self):
        product_dict = {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'image': self.image,
            'price': self.price,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
        product_dict["creator"] = self.user.to_dict()
        return product_dict
