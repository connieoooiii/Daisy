from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError, Length, URL
from app.models import Product

class ProductForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(),Length(min=4, max=150) ])
    description = StringField('Description', validators =[Length(max=1000)])
    image = StringField('Image', validators=[DataRequired()])
    price = FloatField('Price', validators=[DataRequired()])
