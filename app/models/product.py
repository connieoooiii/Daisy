from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.sql import func

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

    shopping_carts = db.relationship("ShoppingCart", back_populates="products", cascade="all, delete-orphan")

    products = db.relationship("Review", back_populates='products', cascade="all, delete-orphan")


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
