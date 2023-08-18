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
        user_id=4,
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

    review12= Review (
        user_id=1,
        product_id=9,
        stars= 3,
        review="I wanted to love this but I didn't notice much of a difference on my skin"
    )

    review13= Review (
        user_id=2,
        product_id=12,
        stars= 3,
        review="I wanted to love this but it didn't last long and transferred everywhere."
    )

    review14= Review (
        user_id=3,
        product_id=15,
        stars= 5,
        review="Literally this is my favorite moisturizer at the moment! 😍"
    )

    review15= Review (
        user_id=4,
        product_id=1,
        stars= 5,
        review="Literally this is my favorite sun screen at the moment! 😍"
    )

    review16= Review (
        user_id=3,
        product_id=8,
        stars= 5,
        review="Literally this is my favorite serum at the moment! I have glowing glass skin after using this 😍"
    )

    review17= Review (
        user_id=5,
        product_id=18,
        stars= 5,
        review="Literally this is my favorite serum at the moment! I have glowing glass skin after using this 😍"
    )

    review18= Review (
        user_id=5,
        product_id=19,
        stars= 5,
        review="Literally this is my favorite at the moment! I have glowing glass skin after using this 😍"
    )

    review19= Review (
        user_id=6,
        product_id=20,
        stars= 3,
        review="I wanted to love this but I didn't notice much of a difference on my skin"
    )

    review20= Review (
        user_id=7,
        product_id=17,
        stars= 3,
        review="I wanted to love this but I didn't notice much of a difference on my skin."
    )

    review21= Review (
        user_id=3,
        product_id=17,
        stars= 4,
        review="I thought it worked well and I love the packaging!"
    )

    review22= Review (
        user_id=4,
        product_id=11,
        stars= 3,
        review="It is expensive but the packaging is super cute and it provides coverage!"
    )

    review23= Review (
        user_id=6,
        product_id=19,
        stars= 4,
        review="This product has a wonderful texture, no smell, and did not break me out. It is super hydrating. Definitely recommend for sensitive skin."
    )

    review24= Review (
        user_id=6,
        product_id=21,
        stars= 4,
        review="My skin is giving dewy, radiant vibes and I've only used this for three days so far. OBSESSED."
    )

    review25= Review (
        user_id=2,
        product_id=13,
        stars= 3.5,
        review="I love the feeling on my scalp after I use it but not sure what if it is actually doing anything for my scalp."
    )

    review26= Review (
        user_id=2,
        product_id=6,
        stars= 5,
        review="My skin is giving dewy, radiant vibes and I've only used this for three days so far. OBSESSED."
    )

    review27= Review (
        user_id=7,
        product_id=3,
        stars= 5,
        review="Literally this is my favorite sun screen at the moment! 😍"
    )

    review28= Review (
        user_id=4,
        product_id=5,
        stars= 5,
        review="It is moisturizing and leaves my skin soft! I highly recommend"
    )

    review29= Review (
        user_id=4,
        product_id=18,
        stars= 5,
        review="It is moisturizing and leaves my skin soft! I highly recommend"
    )

    review30= Review (
        user_id=7,
        product_id=21,
        stars= 5,
        review='I can see what the hype is about. Affordable sunscreen that offers great protection and no white cast.'
    )

    review31= Review (
        user_id=7,
        product_id=22,
        stars= 3,
        review='The colors are cute but my lips felt pretty dry afterwards and the color did not last long.'
    )

    review31= Review (
        user_id=7,
        product_id=22,
        stars= 3,
        review='The colors are cute but my lips felt pretty dry afterwards and the color did not last long.'
    )

    review32= Review (
        user_id=4,
        product_id=16,
        stars= 4,
        review="Super gentle and cleans my face well!! My face doesn't feel super tight after using it like some cleansers so it's a 4/5 from me."
    )
    review33= Review (
        user_id=3,
        product_id=5,
        stars= 5,
        review="I would highly recommend this toner! clears redness a few minutes after application. Extremely soothing and free of fragrance."
    )

    review34= Review (
        user_id=5,
        product_id=8,
        stars= 5,
        review="One of the best hyaluronic acid serums in the market, hydrating but not sticky at all, will definitely repurchase"
    )

    review35= Review (
        user_id=7,
        product_id=8,
        stars= 5,
        review="I THINK THIS IS MY FAVORITE SERUM EVER! I bought this because of the hype all over Instagram and TikTok and honestly they were so right about it."
    )

    review36= Review (
        user_id=7,
        product_id=7,
        stars= 4,
        review='I bought this cleanser because I kept seeing it pop up in "best affordable korean skincare" videos and I must say I was not disappointed.'
    )

    review37= Review (
        user_id=1,
        product_id=7,
        stars= 3,
        review="Use it just once a day. it can dry out your skin. I use it just in mornings and in evenings i use more hydrating face wash and that’s seems to work for me.the smell is really strong- medical"
    )

    review38= Review (
        user_id=6,
        product_id=1,
        stars= 4,
        review="There is an initial whitecast when you first apply it but it disappears quickly. As a person with dark skin I experienced zero lingering whitecast. It leaves a bit of a glow without greasiness."
    )
    review39= Review (
        user_id=6,
        product_id=1,
        stars= 4,
        review="There is an initial whitecast when you first apply it but it disappears quickly. As a person with dark skin I experienced zero lingering whitecast. It leaves a bit of a glow without greasiness."
    )
    review40= Review (
        user_id=6,
        product_id=2,
        stars= 4,
        review="This really made my complexion very glowing and helped my skin barrier. i also noticed some spots of my face were returning to and even neural colour."
    )

    review41= Review (
        user_id=4,
        product_id=3,
        stars= 4,
        review="This is how I imagine perfect and modern SPF. Light, no white cast, thin not greasy no smell JUST SATISFACTION. Recommend for every skin type. I shave with my sister who has dry skin and she also loves that."
    )

    review42= Review (
        user_id=5,
        product_id=4,
        stars= 3.5,
        review="I have extremely oily skin, this doesn't leave a weird residue/feeling on my skin, and it doesn't feel stripping at all. However, it doesn't completely remove all my makeup"
    )

    review43= Review (
        user_id=7,
        product_id=10,
        stars= 4.5,
        review="I was skeptical at first but oh mannnnnn! my skin is so different using this I highly recommend! The glow is crazy! I have zero makeup on."
    )

    review44= Review (
        user_id=1,
        product_id=10,
        stars= 5,
        review="This serum does have glowy and brightening effects for sure, but it has helped to calm the inflammation I've experienced with purging."
    )

    review45= Review (
        user_id=2,
        product_id=10,
        stars= 5,
        review="Love this. it is moisturizing and fades acne scars as well. The bottle is so cute and the color looks aesthetically pleasing on my vanity."
    )

    review46= Review (
        user_id=5,
        product_id=16,
        stars= 5,
        review="I use this every night! It gets super foamy and cleanses my face very well. Comes in a very large bottle. I been using it for more than 4 months and still am barely half way through. GREAT VALUE."
    )

    review47= Review (
        user_id=3,
        product_id=23,
        stars= 4,
        review="I love anything with soybean in it. This one helps with hyperpigmentations."
    )

    review48= Review (
        user_id=5,
        product_id=23,
        stars= 4.5,
        review="I was looking for something with a lot of ceramides to help with retinol recovery and this is IT. It was 5 different ceramides very high on the ingredients list and made a huge difference. Very good for moisture barrier."
    )

    review49= Review (
        user_id=2,
        product_id=23,
        stars= 3.5,
        review="I wanted to love this serum since it has a lovely texture. Unfortunately, I didn't notice much of a difference on my skin, and it felt a bit tacky after application which I am not a fan of."
    )

    review50= Review (
        user_id=6,
        product_id=23,
        stars= 5,
        review="I love this serum at night time!!! It doesn't get oily or plug pores. Moisturizing!"
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
    db.session.add(review12)
    db.session.add(review13)
    db.session.add(review14)
    db.session.add(review15)
    db.session.add(review16)
    db.session.add(review17)
    db.session.add(review19)
    db.session.add(review20)
    db.session.add(review21)
    db.session.add(review22)
    db.session.add(review23)
    db.session.add(review24)
    db.session.add(review25)
    db.session.add(review26)
    db.session.add(review27)
    db.session.add(review28)
    db.session.add(review29)
    db.session.add(review30)
    db.session.add(review31)
    db.session.add(review32)
    db.session.add(review33)
    db.session.add(review34)
    db.session.add(review35)
    db.session.add(review36)
    db.session.add(review37)
    db.session.add(review38)
    db.session.add(review39)
    db.session.add(review40)
    db.session.add(review41)
    db.session.add(review42)
    db.session.add(review43)
    db.session.add(review44)
    db.session.add(review45)
    db.session.add(review46)
    db.session.add(review47)
    db.session.add(review48)
    db.session.add(review49)
    db.session.add(review50)


    db.session.commit()

    print('Review seeders added')



def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
