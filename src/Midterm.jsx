import React, { useState, useEffect } from "react";

function Midterm(props){
  const [fruits, applebtn, orangebtn, bananabtn] = useState();

  const handleClick = ()=>{
    applebtn = fruits("사과");
    orangebtn = fruits("오렌지");
    bananabtn = fruits("바나나");
  }


return (
  <div>
    <p>{`어떤 과일을 좋아하나요? ${fruits}`}</p>
    <button onClick={applebtn} >사과</button>
    <button onClick={orangebtn}>오렌지</button>
    <button onClick={bananabtn}>바나나</button>
  </div>
);
}

export default Midterm;