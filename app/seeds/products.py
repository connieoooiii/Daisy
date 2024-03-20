from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    products =[
        { #product 1
            'user_id': 1,
            'title': 'Beauty of Joseon Relief Sun',
            'description': "Relief Sun is a lightweight and creamy type organic sunscreen that is comfortable on skin. Containing 30% rice extract and grain fermented extracts, it provides moisture and nourishment to the skin.After absorption, it provides a natural glow without a white cast.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138505683382317238/beatofj-sunscreen.webp?ex=660c2f0b&is=65f9ba0b&hm=f9b1fb5cc3964693057d5e440ff66d5ab45bd3f2994c4f560be50a1b52f5454e& ',
            'price': 18
        },
          { #product 2
            'user_id': 1,
            'title': 'Round Lab Dokdo Ampoule',
            'description': "Watery textured Dokdo Ampoule instantly soothes and effectively moisturizes. Experience elevated hydration while maintaining moisture balance.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138506089554526229/8809738609231_4e92bf71-3f97-425b-bb2d-53c2986200bc.webp?ex=660c2f6c&is=65f9ba6c&hm=44ca5cf90672ac5e8dd67f8a9136b6f765a20b15a9a165e8613ae6fef6284e00&',
            'price': 31
        },
          { #product 3
            'user_id': 1,
            'title': 'Round Lab Birch Moisturizing Sunscreen',
            'description': "A moisturizing sunscreen protects your skin from harmful UV and replenishes and hydrates your skin. Protects skin from harmful UV rays (UVA, UVB, Bluelight) with SPF50+, PA++++",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138505918271721482/RoundLabBirchJuiceMoisturizingSunscreen5.webp?ex=660c2f43&is=65f9ba43&hm=8f6937525649ac842b7ebe36ed20cf9f2da436e0e2c8b5790207f92875be9105&',
            'price':28
        },
          { #product 4
            'user_id': 1,
            'title': 'Ma:nyo Pure Cleansing Oil',
            'description': "The Pure Cleansing Oil is a gentle yet powerful cleansing oil that melts away blackheads and whiteheads without clogging pores. It transforms into a luscious milk that dissolves makeup and impurities while restoring skin's natural moisture and pH balance. It is suitable for all skin types, including acne-prone skin.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138506286544195756/manyo.jpg?ex=660c2f9b&is=65f9ba9b&hm=0b45e82272233eab282e7641fe7aff5c1f167929232fb6824e6906e970c85d89&',
            'price': 29
        },
          { #product 5
            'user_id': 2,
            'title':'Anua - Heartleaf 77% Soothing Toner',
            'description': "Soothing facial toner with Heartleaf Extract to the highest level, formulated to soothe, tone, hydrate, and balance the PH level of skin. This toner is infused with 77% houttuynia cordata extract along with eleven other EWG green-graded ingredients to soothe and protect sensitive skin. Its mildly acidic pH also helps regulate skin’s oil-moisture levels.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138506742972563488/anua.jpeg?ex=660c3007&is=65f9bb07&hm=46d8ad84abb476216fdb09eac55fa9f276c85bc3507c99595da5db1fcf9fc817&' ,
            'price': 30.50
        },
        { #product 6
            'user_id': 3,
            'title':'Goodal Green Tangerine Vita C Dark Spot Care Serum',
            'description': "Renewed, now with doubled the brightening effect! The Goodal Green Tangerine Vita C Dark Spot Care Serum contains 70% fresh green tangerine extract, 4% niacinamide and ascorbyl glucoside. In just two weeks, this wonderworking serum helps combat uneven skin tone and signs of aging including dark spots and fine lines.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138506988280623335/goodal-vitc.webp?ex=660c3042&is=65f9bb42&hm=05cff4bc98d787894d088e999487051432a71f8b53cc918cabf323f4c738f703&' ,
            'price': 32
        },
         { #product 7
            'user_id': 3,
            'title':'COSRX Low pH Good Morning Gel Cleanser',
            'description': "Dreaming of a tighter, more luminous complexion? Make that dream a reality with Low PH Good Morning Gel Cleanser from COSRX. Crafted with tea tree and beta hydroxy acids, this mild cleanser works to reduce the look of large pores and helps control oil production.Cleanse daily with this gentle and effective gel type cleanser day and night, removing impurities while strengthening your skin barrier.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138507429177458831/COSRX-Low-pH-Good-Morning-Gel-Cleanser-Review.jpg?ex=660c30ab&is=65f9bbab&hm=ec61d703c0777ab288a3d39e3f743ed809c92ace5e95eb4788be71e404e8704f&' ,
            'price': 14
        },
         { #product 8
            'user_id': 4,
            'title':'Torriden DIVE-IN Low-Molecular Hyaluronic Acid Serum',
            'description': "Packed with 5D-Complex Hyaluronic Acid to deliver instant moisture as well as D-panthenol, allantoin and madecassoside to soothe irritations, this lightweight but powerful serum absorbs swiftly into skin, leaving no sticky residue. The pastel blue color of the serum is naturally derived from malachite extract, which gives skin an extra fortifying boost. ",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138507751388106923/torriden-dive-in-low-molecular-hyaluronic-acid-serum-50ml-872079.webp?ex=660c30f8&is=65f9bbf8&hm=395249ab30f12b2a5e609d7e1ebc5fd7304360f683d2775c4193b64b0906e6f2&' ,
            'price': 22
        },
           { #product 9
            'user_id': 4,
            'title':'Abib Heartleaf Spot Pad Calming Touch Pads',
            'description': "The Abib Heartleaf Spot Pad Calming Touch is a face cleansing pad suitable for even the most sensitive of skin. Utilizing Heartleaf extract at 40,000ppm to calm inflammation, redness and irritation. Gently cleanse away excess oil while balancing the skin's pH level.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138568062321311795/abib-heartleaf-spot-pad-calming-touch-210-g-3561-114-0210_5.jpg?ex=660c6923&is=65f9f423&hm=4c9b8be0d86fe3ddc655076780a19e2a715f72e460da3b7a352524213b35f888&' ,
            'price': 20
        },
        { #product 10
            'user_id': 4,
            'title':'Beauty of Joseon Glow Serum : Propolis + Niacinamide',
            'description': "This serum is made for those struggling with enlarged pores and skin inflammation. With a blend of 60% propolis extract and 2% niacinamide, it skillfully manages sebum production while ensuring your skin remains hydrated.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138569506722164808/GlowSerum_0000_LayerComp1.webp?ex=660c6a7c&is=65f9f57c&hm=64078f1a367521465cd5ef5a4fb7cdcd6321b7df4f7e828c73335db82e817cd4&' ,
            'price': 17
        },
        { #product 11
            'user_id': 5,
            'title':'Clio Kill Cover Fixer Cushion',
            'description': "Clio Kill Cover Fixer Cushion offers the perfect lightweight, buildable coverage for any skin type. This Cushion foundation evens and brightens skin tone while covering hyperpigmentation, dark circles, and redness.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138570215093977138/clio-kill-cover.jpeg?ex=660c6b24&is=65f9f624&hm=abeab1a9db5306d079dc08700f665402c5279772de1cf8ce592fbe25a88a7f8e&' ,
            'price': 38.25
        },
        { #product 12
            'user_id': 5,
            'title':'Rom&nd  Glasting Melting Balm',
            'description': "The Glasting Melting Balm is a moisturizing balm with plant-based moisturizing oil that does not dry out! It provides a transparent and smooth watery glow without feeling stuffy.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138571333391880322/romandlip.jpeg?ex=660c6c2f&is=65f9f72f&hm=56c6e7342fd3ceceb0b37e5c06c42235a287c0bc0fe2f79f317cfb3d55f4a405&' ,
            'price': 18.90
        },
        { #product 13
            'user_id': 6,
            'title':'AROMATICA Rosemary Root Enhancer',
            'description': "Invigorating spray-on tonic for hair, root, and scalp health. This vegan, cruelty-free, silicone free, 99.4% natural Root Enhancer and scalp tonic is a spray-on solution for multiple scalp and root concerns. Oil-soluble BHA (salicylic acid) effectively cleanses clogged scalp pores while 7-vitamin complex and 6-black food complex (Black Rice, Black Bean, Black Sesame, Eggplant Fruit, Mulberry Fruit, Pepper Seed) help keep hair roots healthy and maintain hair volume.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138572184642650132/AROMATICA_Rosemary_Root_Enhancer.webp?ex=660c6cfa&is=65f9f7fa&hm=5d31b33054a37296ea102800758f94e58cbacc8b9c9a2fae46a88b473e01c302&' ,
            'price': 21
        },
        { #product 14
            'user_id': 6,
            'title':'DASIQUE Pro Concealer Palette',
            'description': "This compact concealer palette contains 9 different shades for cover, correcting, and contouring to create a flawless complexion. - It contains tea tree extracts, and ceramide that moisturizes the skin without irritation.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138573114645688360/DASIQUE_Pro_Concealer_Palette.webp?ex=660c6dd8&is=65f9f8d8&hm=f3cb5bc622b835f79674fd9c134f70e5900501418aa01195ffba92720a3fd0c6&' ,
            'price': 32.50
        },
        { #product 15
            'user_id': 7,
            'title':'AESTURA Atobarrier 365 Cream',
            'description': "AESTURA’s Atobarrier 365 Cream is infused with ceramide, cholesterol and fatty acid complex to restore skin’s moisture levels while strengthening the skin barrier. The hypoallergenic formula is suitable for all skin types, including sensitive skin.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1138573971546193980/AESTURA_Atobarrier_365_Cream.webp?ex=660c6ea4&is=65f9f9a4&hm=2da25592a0f4e67cb3926792dddb68044363e2b59b79477cd8392974d020d1eb&' ,
            'price': 31
        },
         { #product 16
            'user_id': 7,
            'title':'Round Lab 1025 Dokdo Cleanser',
            'description': "Slightly acidic (pH 5.0 - 6.0), foamy and creamy cleanser purifies and removes excess sebum without over-drying. It clears away impurities and helps the skin maintain a healthy moisture balance.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1141863159716646952/round-lab-cleanser.webp?ex=6605f0f0&is=65f37bf0&hm=52788dad9c025da41da85a5b005012bf5a36b2cfca0bfe215fc0339bfd2f2595&' ,
            'price': 15
        },
        { #product 17
            'user_id': 2,
            'title':'Beauty of Joseon Dynasty Cream',
            'description': "Meet the 'Dynasty Cream,' our very first product here at Beauty of Joseon, and a long-time favorite of many of our customers. Its firm and creamy texture gives your skin deep, long-lasting moisture and nourishment. This all-in-one cream is filled with good-for-skin ingredients like rice bran water, ginseng water, squalane, and niacinamide.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1141863160140267521/boj-cream.png?ex=6605f0f0&is=65f37bf0&hm=fa9e1b01a46c338faf3630b9a8076b68dfe7aebef727895b85c0b7843c505359&' ,
            'price': 24
        },
        { #product 18
            'user_id': 2,
            'title':'Anua Peach 70% Niacinamide Serum',
            'description': "Anua Peach 70% Niacinamide Serum is a facial serum that delivers glass skin instantly and over time. This peach serum helps brighten dull skin with soft texture care.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1141863160496791735/anua-peach-.png?ex=6605f0f0&is=65f37bf0&hm=d0e03dd78acc502aa8aa5c9145ccbaa186ec12d7eee05c9ad1d2ae95af54753f&' ,
            'price': 25
        },
         { #product 19
            'user_id': 3,
            'title':'Round Lab Pine Calming Cica Cream',
            'description': "Cream packed with deep hydration and moisture, providing instant refresh upon application.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1141866131007750214/pine-calming-cica-cream-round-lab-1.png?ex=6605f3b4&is=65f37eb4&hm=d8fe2ed9892e7ded349846f91c905c9eb86b1a0fc8d59abc6462657cbe861ab2&' ,
            'price': 25
        },
         { #product 20
            'user_id': 5,
            'title':'Torriden Solid In Ceramide Cream',
            'description': "Rich, thick and buttery: there is no better cream for dry, dehydrated or mature skin than the Solid In Ceramide Cream by Torriden. With ceramides and jojoba seed oil to strengthen the moisture barrier and to provide a burst of hydration. Green tea extract is added to work as a powerful antioxidant with anti-inflammatory abilities.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1141866461455995021/torridencream.png?ex=6605f403&is=65f37f03&hm=5feef4c78493985216a6d6d59e812c79dee12d0e9285e3af234ef39d3484ddd3&' ,
            'price': 27
        },
        { #product 21
            'user_id': 5,
            'title':'Anua Heartleaf Silky Moisture Sun Cream',
            'description': "The sun cream uses chemical filters to offer broad-spectrum sun protection of SPF 50+ PA++++. Organic sunscreen provides soothing and hydrating skin benefits with ingredients like houttuynia cordata extract and panthenol.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1141863160928800819/anua-sun.png?ex=6605f0f0&is=65f37bf0&hm=eb7b4d29b1d6223c174992770f312103974955b6a4b2efbb7d81b719553ab265&' ,
            'price': 22.50
        },
        { #product 22
            'user_id': 6,
            'title':'Rom&nd Glasting Water Tint',
            'description': "These unique tints by rom&nd offer a rich color payoff with a glossy layer. The non-sticky 'water' layer is separated from the color layer that tints the lips. Unlike other glosses, the subtle colors of these tints will stay on your lips hours after wear.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1141863161260146718/romandlip.png?ex=6605f0f0&is=65f37bf0&hm=055ff64fd47a21d4c2dd739c6d1c0a0a998a85dfa9f70d3efc4fd54e4a55218f&' ,
            'price': 22.50
        },
        { #product 23
            'user_id': 7,
            'title':'Round Lab Soybean Nourishing Serum',
            'description': "Firm and liven up with 7 types of Vitamin B extracted from Soymilk. Glow from the inside out with this deeply nourishing serum.",
            'image': 'https://cdn.discordapp.com/attachments/1138505164358164483/1141869141922418829/orangeroundlab.png?ex=6605f682&is=65f38182&hm=7352b44e0cba0511ed63ab42ad657dd3b42b8a80263e52fa0a51988d76e3dbf3&' ,
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
