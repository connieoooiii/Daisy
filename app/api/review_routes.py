from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_required, current_user
from app.models import Product, User, db
from app.forms import ProductForm
from .auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)
