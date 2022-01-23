import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
     
      <div className="home__container">
         {/*
        <img
          className="home__image"
          src="https://www.pngmagic.com/product_images/eCommerce-website-banner-background.jpg"
          alt=""
        />
         */}
        <div className="home__row">
          <Product
            id="12321341"
            title="Samsung Galaxy Tab S6 Lite WiFi - 64 GB, 4 GB, Grey"
            price={99.96}
            rating={5}
            image="https://m.media-amazon.com/images/I/71fX8ThiZVL._AC_SX466_.jpg"
          />
          <Product
            id="49538094"
            title="DELONGHI Icona Metallics CTOT4003.BG 4-Slice Toaster - Gold"
            price={239.0}
            rating={4}
            image="https://brain-images-ssl.cdn.dixons.com/7/1/10210417/l_10210417_002.jpg"
          />
        </div>

        <div className="home__row">
          <Product
            id="4903850"
            title="Samsung Galaxy Watch, Active 2 Smart Watch, Black 40 mm, AluminiumSamsung Galaxy Watch, Active 2 Smart Watch, Black 40 mm, Aluminium"
            price={199.99}
            rating={3}
            image="https://m.media-amazon.com/images/I/6107Zx0XitL._AC_SX450_.jpg"
          />
          <Product
            id="23445930"
            title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
            price={98.99}
            rating={5}
            image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
          />
          <Product
            id="3254354345"
            title="Permanent Record : Edward Snowden"
            price={11.99}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/91GgFOOnD+L.jpg"
          />
        </div>

        <div className="home__row">
          <Product
            id="90829332"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
            price={1094.98}
            rating={4}
            image="https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_81970120/fee_786_587_png"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
