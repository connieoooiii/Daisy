from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User( #user 1
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='Lition' )
    lisa = User( #user 2
        username='lisa', email='lisa@aa.io', password='password', first_name='Lisa', last_name='Manobal')
    eric = User( #user 3
        username='eric', email='eric@aa.io', password='password', first_name='Eric', last_name='Nam')
    amber = User( #user 4
        username='amber', email='amber@aa.io', password='password', first_name='Amber', last_name='Liu')
    felix = User( #user 5
        username='felix', email='felix@aa.io', password='password', first_name='Felix', last_name='Lee')
    niki = User( #user 6
        username='niki', email='niki@aa.io', password='password', first_name='Niki', last_name='Zefanya')
    jackson = User( #user 7
        username='jackson', email='jackson@aa.io', password='password', first_name='Jackson', last_name='Wang')

    db.session.add(demo)
    db.session.add(lisa)
    db.session.add(eric)
    db.session.add(amber)
    db.session.add(felix)
    db.session.add(niki)
    db.session.add(jackson)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
