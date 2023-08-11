from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():
    review1= Review (
        user_id=1,
        product_id=5,
        stars= 4,
        review='Super gentle toner! My face is feels so refreshed and hydrated afterwards'
    )

    review2= Review (
        user_id=2,
        product_id=3,
        stars= 5,
        review='Love this sunscreen! It is now my go to. My face is glowing and protects me from the sun'
    )

    review3= Review (
        user_id=1,
        product_id=13,
        stars= 4,
        review='My scalp feels so refreshed after spraying it on! It leaves a super nice tingly sensation'
    )

    review4= Review (
        user_id=1,
        product_id=6,
        stars= 5,
        review='My favorite vitamin C at the moment! Does not feel super heavy when applying and corrected my dark spots!'
    )

    review5= Review (
        user_id=3,
        product_id=1,
        stars= 5,
        review='I can see what the hype is about. Affordable sunscreen that offers great protection and no white cast.'
    )

    review6= Review (
        user_id=4,
        product_id=4,
        stars= 3,
        review='I thought this product was ok and worked well but it is way too expensive.'
    )

    review7= Review (
        user_id=7,
        product_id=10,
        stars= 3,
        review='I did not really see a difference after using this for a few months'
    )
    review8= Review (
        user_id=6,
        product_id=11,
        stars= 2,
        review='Dried out my face and not to mention there is only a few shades. This day and age, there should be more inclusivity!'
    )
    review9= Review (
        user_id=5,
        product_id=7,
        stars= 5,
        review='I use this every morning! It is super gentle and leaves me feeling fresh after waking up.'
    )

    review10= Review (
        user_id=4,
        product_id=12,
        stars= 3,
        review='The shades are super cute but wow are these expensive! Not sure if I would purchase any again at full price'
    )
    review11= Review (
        user_id=2,
        product_id=14,
        stars= 2,
        review="Wasn't a fan of it. I feel like I can find better concealers at the drug store"
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.add(review11)

    db.session.commit()

    print('Review seeders added')



def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
