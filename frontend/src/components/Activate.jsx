import { activate } from "../features/auth/authSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

const Activate = () => {
  const [isActivated, setIsActivated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid, token } = useParams();

  function handleClick() {
    const userData = { uid, token };
    dispatch(activate(userData)).then(() => setIsActivated(true));
  }
  if (isActivated) {
    navigate("/");
  }
  return (
    <>
      <button className="text-[#00df9a] text-center" onClick={handleClick}>
        Activate
      </button>
    </>
  );
};

export default Activate;
