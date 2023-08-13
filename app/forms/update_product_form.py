from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange
from app.models import Product


class UpdateProductForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(),Length(min=4, max=150) ])
    description = StringField('Description', validators =[Length(max=1000)])
    price = FloatField('Price', validators=[DataRequired()])
