from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length, URL
from app.models import Product

class ProductForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(),Length(min=4, max=150) ])
    description = StringField('Description', validators =[Length(max=1000)])
    image = StringField('Image', validators=[DataRequired(), URL()])
    price = IntegerField('Price', validators=[DataRequired()])
