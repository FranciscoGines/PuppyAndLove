import { Link } from "react-router-dom";

const Home = () => {
  
  return (
    <section className="container-fluid">
      <div className="Nav">
      <ul class="nav">
        <li class="nav-item">
          <Link a class="nav-link" href="#" to="/signup">Sign up</Link>
        </li>
        <li class="nav-item">
          <Link a class="nav-link" href="#" to="/login">Login</Link>
        </li>
      </ul>
      <h1>Home Puppy And Love</h1>
    </div>
    </section>
  );
    
    
};

export default Home;
