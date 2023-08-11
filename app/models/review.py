from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.sql import func

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("products.id")), nullable=False)
    stars = db.Column(db.Integer, nullable= False)
    review = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    user = db.relationship("User", back_populates="reviews")

    products = db.relationship("Product", back_populates="reviews")


    def to_dict(self):
        review_dict = {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'stars': self.stars,
            'review': self.review,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
        review_dict["creator"] = self.user.to_dict()
        return review_dict
