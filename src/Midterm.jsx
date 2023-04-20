import React, { useState, useEffect } from "react";

function Midterm(props){
  const [fruits, setFruits] = useState(['apple','orange','banana']);

  const handleClick = ()=>{
    console.log(fruits);

  }


return (
  <div>
    <p>{`어떤 과일을 좋아하나요? ${fruits}`}</p>
    <button onClick={setFruits} >사과</button>
    <button onClick={setFruits}>오렌지</button>
    <button onClick={setFruits}>바나나</button>
  </div>
);
}

export default Midterm;