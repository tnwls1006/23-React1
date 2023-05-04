import React from "react";

const students = [
  {
    id : 1,
    name : "Inje",
  },
  {
    id : 2,
    name : "Steve",
  },
  {
    id : 3,
    name : "Bill",
  },
  {
    id : 4,
    name : "Jeff",
  },
];

function AttendanceBook(props) {
  return(
    <ul>
      {students.map((student) => {
        // id를 키 값으로 사용
        return <li key={student.id}>{student.name}</li>;
        // 포맷팅 된 문자열을 키값으로 사용
        /*
        {students.map((student, index) =>{
          <li key={`student-id-${student.id`}>{studendt.name}</li>;
        })}
        */
       
        // 배열의 인덱스를 키값으로 사용
        /*
        {students.map((student, index) =>{
          <li key={index}>{student.name}</li>;
        })}
        */
      })}
    </ul>
  );
}

export default AttendanceBook;