from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from app.models import Product, User, db, Review
from app.forms import ReviewForm
from .auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/<int:reviewId>', methods=["PUT"])
@login_required
def update_review(reviewId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    review = Review.query.get(reviewId)

    if not review:
        return jsonify({"error": "Your review for this product wasn't found"}), 404

    if form.validate_on_submit():
        review.stars = form.data['stars']
        review.review=form.data['review']

        db.session.commit()
        res = review.to_dict()
        return res
    else:
        print('FORM ERRORS HERE', form.errors)
        return form.errors




@review_routes.route('product/<int:productId>', methods=["DELETE"])
@login_required
def delete_review(productId):
    review = Review.query.filter_by(product_id=productId, user_id=current_user.id).first()

    if not review:
        return jsonify({"error": "Your review for this product wasn't found"}), 404

    db.session.delete(review)
    db.session.commit()
    return {"message": "Deleted your review for this product"}
