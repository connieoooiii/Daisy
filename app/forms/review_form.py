from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange
from app.models import Review


class ReviewForm(FlaskForm):
    stars = FloatField('Stars',validators=[DataRequired(), NumberRange(min=1, max=5)] )
    review = StringField('Review', validators=[DataRequired(),Length(min=4, max=1000) ])
