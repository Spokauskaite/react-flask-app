import React from 'react'
import fruit1 from "./images/fruit1.jpg"
import fruit2 from "./images/fruit2.jpg"
import fruit3 from "./images/fruit3.jpg"
import page1_img1 from "./images/page1_img1.jpg"


const HomePage = ()  => {

  return(
    <div>
      <div >
        <div className="container_12">
          <div id="mi-slider" className="mi-slider">
            <ul >
              <li><img src={fruit1}></img></li>
              <li><img src={fruit2}></img></li>
              <li><img src={fruit3}></img></li>
            </ul>
          </div>
          <div class="clear"></div>
          <div className="grid_10">
            <h3>Welcome to Organic Company</h3>
              <img src={page1_img1} className="img_inner fleft"></img>
            <div className="extra_wrapper">
              <p>Want to learn more about this freebie designed by TemplateMonster.com? Follow the link 
              Want to learn more about this freebie designed by TemplateMonster.com? Follow the link
              Want to learn more about this freebie designed by TemplateMonster.com? Follow the link
              </p>
              <p>Find more themes of this kind at the category of premium Agriculture Website Templates.</p>
            </div>
            <div className="clear"></div>
            <p>
              Aliquam nibh ante, egestas id dictum a, commodo luctus libero. Praesent faucibus malesuada faucibus. Donecyl laoreet metus id laoreet malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetu orci sed nulla facilisis consequat. Curabitur vel lorem sit amet nulla ullamcorper fermentum.
            </p>
            <div className="grid_4 alpha">
              <div className="banner maxheight">
                <h3><a href="#">100% Eco &amp; <br></br>Organic</a></h3>
              </div>
            </div>
            <div className="grid_4 omega">
              <div className="banner b1 maxheight">
                <h3><a href="#">Control of <br></br> the Quality </a></h3>
              </div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export  default HomePage