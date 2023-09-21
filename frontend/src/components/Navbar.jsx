import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  return (
    <>
      <div className="main">
        <div className="left">
			<h1>Manage</h1>
		</div>
        <div className="right">
			<Link to='/signup'>Sign Up</Link>
			<Link to='/login'>Login In</Link>
		</div>
      </div>
    </>
  );
};

export default Navbar;
