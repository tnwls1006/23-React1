import React, { useState, useEffect } from "react";

function Midterm(props){

  const [fruit, setFruit] = useState();

  const handleClick = (event) => {
    setFruit(event.target.value);
  }


return (
  <div>
    <p>{`어떤 과일을 좋아하나요?`}{fruit}</p>
    <button value="Apple" onClick={handleClick}>사과</button>
    <button value="Orange" onClick={handleClick}>오렌지</button>
    <button value="Banana" onClick={handleClick}>바나나</button>
  </div>
);
}

export default Midterm;