from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), Length(min=4, max=40, message='Username must be between 4 and 40 characters'), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, Email(), Length(min=4, max=40, message='Email must be between 4 and 40 characters')])
    password = StringField('password', validators=[DataRequired(), Length(min=6, max=50, message='Password must be between 6 and 50 characters')])
    first_name = StringField('first name', validators = [DataRequired(), Length(min=4, max=40, message='First name must be between 4 and 40 characters')])
    last_name = StringField('last name', validators = [Length(max=40, message="Last name must be no more than 40 characters")])
