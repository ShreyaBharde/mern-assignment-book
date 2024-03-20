import Header from "./Header";
import { useState } from "react";
function Home() {
    return <>
        <Header />
        <img class='mobheading' src='booklish.png' ></img>
        <div className="Home">
            <div className="homebanner"> </div>
            <h1 className="text-dark">Welcome To Booklish</h1>
            <Testimonials></Testimonials>
            <div className="homediv">
                <img src="https://plus.unsplash.com/premium_photo-1703701579607-533aa80225fe?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  alt="home"/>
                <p>Maecenas congue metus id turpis iaculis mattis. Sed pellentesque id arcu id scelerisque. Ut ullamcorper rutrum justo, at blandit eros maximus ut. Integer non tincidunt justo, rhoncus Aenean venenatis sed purus ac sollicitudin. Nulla mauris risus, commodo et luctus rutrum, lobortis sed mauris. Integer congue, sem elementum varius tristique.Maecenas congue metus id turpis iaculis mattis. Sed pellentesque id arcu id scelerisque. Ut ullamcorper rutrum justo, at blandit eros maximus ut. Integer non tincidunt justo, rhoncus Aenean venenatis sed purus ac sollicitudin. Nulla mauris risus, commodo et luctus rutrum, lobortis sed mauris. Integer congue, sem elementum varius tristique.</p>
            </div>
            
        </div>
       
    </>
}
const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([
        "I've been a customer for quite some time now, and I can confidently say that this website has never failed to impress me",
        "My recent shopping experiences have been nothing short of amazing. I stumbled upon this gem of a site, and I couldn't be happier.",
        "The range of products available is astounding, and the prices are incredibly reasonable. What's more, the delivery was prompt, and everything arrived in perfect condition."
      ]);
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
 
    const handleNextTestimonial = () => {
      setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };
    const z= ()=>{
        setTestimonials([
            "I've been a customer for quite some time now, and I can confidently say that this website has never failed to impress me",
            "My recent shopping experiences have been nothing short of amazing. I stumbled upon this gem of a site, and I couldn't be happier.",
            "The range of products available is astounding, and the prices are incredibly reasonable. What's more, the delivery was prompt, and everything arrived in perfect condition."
          ])
    }
  
    
    return (
      <div onDoubleClick={z} className="testimonial">
       
        <h2 style={{color:'black',fontFamily:'monospace',fontSize:'20px'}}>Testimonials</h2>
        <p><strong>{testimonials[currentTestimonialIndex]}</strong></p>
        <div>
          <h6>Christina M. - From Cannada</h6>
        </div>
        <div className="testbuttons">
        <button onClick={handleNextTestimonial}><i class="fa fa-dot-circle-o" aria-hidden="true"></i></button>
        <button onClick={handleNextTestimonial}><i class="fa fa-dot-circle-o" aria-hidden="true"></i></button>
        <button onClick={handleNextTestimonial}><i class="fa fa-dot-circle-o" aria-hidden="true"></i></button>
        
        </div>
        <hr className="hr"></hr>
      </div>
    );
  };
export default Home;