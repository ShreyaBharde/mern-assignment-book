import Header from "./Header";
import { NavLink } from "react-router-dom";
function About(){
    return<>
   <Header/>
    <div className="container">
          <div className="breadcrum_inner">
            <span className="breadcrum_heading"> About Us</span>
            <div>
              <NavLink to='/'>Home</NavLink> / About Us
            </div>
          </div>
          <div className="hero_section1">
            <img
              src="https://images.unsplash.com/photo-1533285860212-c85e7140a408?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="hero_section1_img"
            />
            <div className="herosection_text" style={{ color: '#232630' }}>
              <div style={{ fontWeight: 700 }}>
                Lorem ipsum dolor sit am et, consectetur adipiscing elit. Etiam
                consequat ut ex vel finibus. Nunc eget molestie purus. Fusce
                imperdiet pulvinar est, eget fermentum nisi. Vestibulum ante ipsum
                primis in faucibus orci luctus et ultrices posuere cubilia curae
              </div>
              <div>
                Maecenas congue metus id turpis iaculis mattis. Sed pellentesque id
                arcu id scelerisque. Ut ullamcorper rutrum justo, at blandit eros
                maximus ut. Integer non tincidunt justo, rhoncus Aenean venenatis
                sed purus ac sollicitudin. Nulla mauris risus, commodo et luctus
                rutrum, lobortis sed mauris. Integer congue, sem elementum varius
                tristique, erat nulla rutrum risus, a imperdiet nulla lorem
                fermentum erat. Pellentesque elementum justo at velit fringilla, eu
                feugiat erat fermentum. Vivamus libero dolor, porta eget vehicula
                eu, iaculis id lacus. Sed interdum convallis sapien, eget faucibus
                sapien. Proin hendrerit lacus turpis.
              </div>
              <div>
                Maecenas congue metus id turpis iaculis mattis. Sed pellentesque id
                arcu id scelerisque. Ut ullamcorper rutrum justo, at blandit eros
                maximus ut. Integer non tincidunt justo, rhoncus Aenean venenatis
                sed purus ac sollicitudin. Nulla mauris risus, commodo et luctus
                rutrum, lobortis sed mauris.
              </div>
            </div>
            <div className="herosection_quote">
              <img
                src="https://miona-vinovatheme.myshopify.com/cdn/shop/files/quote_380x.png?v=1688008778"
                alt=""
                className="herosection_quote_img"
              />
              <div className="herosection_quote_text">
                <img
                  src="https://miona-vinovatheme.myshopify.com/cdn/shop/files/icon_quote_40x32.png?v=1688008778"
                  alt=""
                  className="herosection_quote_text_img"
                  width="32px"
                />
                <div className="herosection_quote_description">
                  <span>
                    Best purchase I’ve made this winter! The color and knitting are
                    exquisite and it's so comfy! Went from NYC to Miami without ever
                    taking it off. Super cute!!
                  </span>
                  <span className="herosection_quote_author">Kwang Shang. - CEO Vinovathemes</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hero_section2">
            <div className="hero_section2_div1">
              <img
                src="https://miona-vinovatheme.myshopify.com/cdn/shop/files/71390-shopping-cart-loader_1296x.gif?v=1688008779"
                alt=""
                className="hero_section2_img"
                loading="lazy"
              />
              <div>
                <div className="hero_section2_heading">Why choose us ?</div>
                <div className="hero_section2_description">
                  Maecenas congue metus id turpis iaculis mattis. Sed pellentesque
                  id arcu id scelerisque. Ut ullamcorper rutrum justo, at blandit
                  eros maximus ut. Integer non tincidunt justo, rhoncus Aenean
                  venenatis sed purus ac sollicitudin. Nulla mauris risus, commodo
                  et luctus rutrum, lobortis sed mauris. Integer congue, sem
                  elementum varius tristique.
                </div>
              </div>
            </div>
            <div className="herosection2_div2">
             
              <div>
               
              </div>
            </div>
          </div>
        </div>
       
    </>
}
export default About;