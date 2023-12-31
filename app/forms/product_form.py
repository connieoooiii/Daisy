from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError, Length, URL
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS
from app.models import Product

class ProductForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(),Length(min=4, max=150) ])
    description = StringField('Description', validators =[Length(max=1000)])
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])

    price = FloatField('Price', validators=[DataRequired()])
