from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    products =[
        { #product 1
            'user_id': 1,
            'title': 'Beauty of Joseon Relief Sun',
            'description': "Relief Sun is a lightweight and creamy type organic sunscreen that is comfortable on skin. Containing 30% rice extract and grain fermented extracts, it provides moisture and nourishment to the skin.After absorption, it provides a natural glow without a white cast.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138505683382317238/beatofj-sunscreen.webp ',
            'price': 18
        },
          { #product 2
            'user_id': 1,
            'title': 'Round Lab Dokdo Ampoule',
            'description': "Watery textured Dokdo Ampoule instantly soothes and effectively moisturizes. Experience elevated hydration while maintaining moisture balance.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138506089554526229/8809738609231_4e92bf71-3f97-425b-bb2d-53c2986200bc.webp',
            'price': 31
        },
          { #product 3
            'user_id': 1,
            'title': 'Round Lab Birch Moisturizing Sunscreen',
            'description': "A moisturizing sunscreen protects your skin from harmful UV and replenishes and hydrates your skin. Protects skin from harmful UV rays (UVA, UVB, Bluelight) with SPF50+, PA++++",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138505918271721482/RoundLabBirchJuiceMoisturizingSunscreen5.webp',
            'price':28
        },
          { #product 4
            'user_id': 1,
            'title': 'Ma:nyo Pure Cleansing Oil',
            'description': "The Pure Cleansing Oil is a gentle yet powerful cleansing oil that melts away blackheads and whiteheads without clogging pores. It transforms into a luscious milk that dissolves makeup and impurities while restoring skin's natural moisture and pH balance. It is suitable for all skin types, including acne-prone skin.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138506286544195756/manyo.jpg',
            'price': 29
        },
          { #product 5
            'user_id': 2,
            'title':'Anua - Heartleaf 77% Soothing Toner',
            'description': "Soothing facial toner with Heartleaf Extract to the highest level, formulated to soothe, tone, hydrate, and balance the PH level of skin. This toner is infused with 77% houttuynia cordata extract along with eleven other EWG green-graded ingredients to soothe and protect sensitive skin. Its mildly acidic pH also helps regulate skin’s oil-moisture levels.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138506742972563488/anua.jpeg' ,
            'price': 30.50
        },
        { #product 6
            'user_id': 3,
            'title':'Goodal Green Tangerine Vita C Dark Spot Care Serum',
            'description': "Renewed, now with doubled the brightening effect! The Goodal Green Tangerine Vita C Dark Spot Care Serum contains 70% fresh green tangerine extract, 4% niacinamide and ascorbyl glucoside. In just two weeks, this wonderworking serum helps combat uneven skin tone and signs of aging including dark spots and fine lines.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138506988280623335/goodal-vitc.webp' ,
            'price': 32
        },
         { #product 7
            'user_id': 3,
            'title':'COSRX Low pH Good Morning Gel Cleanser',
            'description': "Dreaming of a tighter, more luminous complexion? Make that dream a reality with Low PH Good Morning Gel Cleanser from COSRX. Crafted with tea tree and beta hydroxy acids, this mild cleanser works to reduce the look of large pores and helps control oil production.Cleanse daily with this gentle and effective gel type cleanser day and night, removing impurities while strengthening your skin barrier.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138507429177458831/COSRX-Low-pH-Good-Morning-Gel-Cleanser-Review.jpg' ,
            'price': 14
        },
         { #product 8
            'user_id': 4,
            'title':'Torriden DIVE-IN Low-Molecular Hyaluronic Acid Serum',
            'description': "Packed with 5D-Complex Hyaluronic Acid to deliver instant moisture as well as D-panthenol, allantoin and madecassoside to soothe irritations, this lightweight but powerful serum absorbs swiftly into skin, leaving no sticky residue. The pastel blue color of the serum is naturally derived from malachite extract, which gives skin an extra fortifying boost. ",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138507751388106923/torriden-dive-in-low-molecular-hyaluronic-acid-serum-50ml-872079.webp' ,
            'price': 22
        },
           { #product 9
            'user_id': 4,
            'title':'Abib Heartleaf Spot Pad Calming Touch Pads',
            'description': "The Abib Heartleaf Spot Pad Calming Touch is a face cleansing pad suitable for even the most sensitive of skin. Utilizing Heartleaf extract at 40,000ppm to calm inflammation, redness and irritation. Gently cleanse away excess oil while balancing the skin's pH level.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138568062321311795/abib-heartleaf-spot-pad-calming-touch-210-g-3561-114-0210_5.jpg' ,
            'price': 20
        },
        { #product 10
            'user_id': 4,
            'title':'Beauty of Joseon Glow Serum : Propolis + Niacinamide',
            'description': "This serum is made for those struggling with enlarged pores and skin inflammation. With a blend of 60% propolis extract and 2% niacinamide, it skillfully manages sebum production while ensuring your skin remains hydrated.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138569506722164808/GlowSerum_0000_LayerComp1.webp' ,
            'price': 17
        },
        { #product 11
            'user_id': 5,
            'title':'Clio Kill Cover Fixer Cushion',
            'description': "Clio Kill Cover Fixer Cushion offers the perfect lightweight, buildable coverage for any skin type. This Cushion foundation evens and brightens skin tone while covering hyperpigmentation, dark circles, and redness.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138570215093977138/clio-kill-cover.jpeg' ,
            'price': 38.25
        },
        { #product 12
            'user_id': 5,
            'title':'Rom&nd  Glasting Melting Balm',
            'description': "The Glasting Melting Balm is a moisturizing balm with plant-based moisturizing oil that does not dry out! It provides a transparent and smooth watery glow without feeling stuffy.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138571333391880322/romandlip.jpeg' ,
            'price': 18.90
        },
        { #product 13
            'user_id': 6,
            'title':'AROMATICA Rosemary Root Enhancer',
            'description': "Invigorating spray-on tonic for hair, root, and scalp health. This vegan, cruelty-free, silicone free, 99.4% natural Root Enhancer and scalp tonic is a spray-on solution for multiple scalp and root concerns. Oil-soluble BHA (salicylic acid) effectively cleanses clogged scalp pores while 7-vitamin complex and 6-black food complex (Black Rice, Black Bean, Black Sesame, Eggplant Fruit, Mulberry Fruit, Pepper Seed) help keep hair roots healthy and maintain hair volume.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138572184642650132/AROMATICA_Rosemary_Root_Enhancer.webp' ,
            'price': 21
        },
        { #product 14
            'user_id': 6,
            'title':'DASIQUE Pro Concealer Palette',
            'description': "This compact concealer palette contains 9 different shades for cover, correcting, and contouring to create a flawless complexion. - It contains tea tree extracts, and ceramide that moisturizes the skin without irritation.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138573114645688360/DASIQUE_Pro_Concealer_Palette.webp' ,
            'price': 32.50
        },
        { #product 15
            'user_id': 7,
            'title':'AESTURA Atobarrier 365 Cream',
            'description': "AESTURA’s Atobarrier 365 Cream is infused with ceramide, cholesterol and fatty acid complex to restore skin’s moisture levels while strengthening the skin barrier. The hypoallergenic formula is suitable for all skin types, including sensitive skin.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138573971546193980/AESTURA_Atobarrier_365_Cream.webp' ,
            'price': 31
        },
    ]
    seed_products = [db.session.add(Product(**product)) for product in products]
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
