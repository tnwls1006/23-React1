# 202130316 이수진

# 23-React1
---
## 4주차 (3/23)
### 프로젝트 생성
* npx create-react-app 'name'

### JSX (Java Script XML)
- Javascript를 확장한 문법
- 중괄호를 사용해 javaScript 문법 사용 가능
``` JSX
// EX 1
 const element = <h1>Hello,world</h1>;
 // EX 2
 const name = 'Josh Perez';
 const element = <h1>Hello, {name}</h1>;
```
- 태그가 비었다면 '/>'를 이용해 닫기
- JSX 태그는 자식을 포함할 수 있다.
```JSX
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```
- Babel 사용 (javascript로 결과물을 만들어주는 컴파일러)
  - Babel은 JSX를 React.createElement() 호출로 컴파일합니다.
```JSX
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
// 두 예시는 동일하다
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
- React.createElement()는 버그가 없는 코드를 작성하는 데 도움이 되도록 몇 가지 검사를 수행하며, 기본적으로 다음과 같은 객체를 생성합니다
  - “React 엘리먼트”라고 하며, 화면에서 보고 싶은 것을 나타내는 표현. React는 이 객체를 읽어서, DOM을 구성하고 최신 상태로 유지하는 데 사용합니다.
```JSX
// 주의: 다음 구조는 단순화되었습니다
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

### JSX의 역할
- JSX는 내부적으로 XMl/HTML코드를 자바스크립트로 변환
- React가 createElement함수를 사용하여 자동으로 자바스크립트로 변환
- JS 작업할 경우 직접 createElement함수를 사용해야한다.

### JSX의 장점
1. 코드 간결
2. 가독성 향상 (form)
3. Injection Attack이라 불리는 해킹 방법을 방어함으로 보안에 강함
```JSX
// JSX 사용
<div>Hello, {name}</div>
// JSX 사용 X
React.createElement('div',null,'Hello ${name}');
```
### JSX 사용법
- 모든 자바스크립트 문법 지원
- 자바스크립트 문법에 xml과 html을 섞어서 사용
- 만약 html이나 xml에 자바스크립트 코드를 사용하고 싶으면  { }괄호를 사용
```JSX
 const name='소플';
 const element = <h1>안녕, {name}</h1>;
 
 ReactDom.render(
  element,
  document.getElementById('root')
 );
```
### Book.jsx , Libraty.jsx
- 파일명과 컴퍼넌트 이름은 동일하게 짓는다
- return (반환값)
- export default (외부에서도 사용이 가능도록)
---
## 3주차 (3/16)
* 리액트의 장점
1. 빠른 업데이트와 렌더링 속도(Virtual DOM(동) - DOM(비동) 조작이 비효율적(속도 느림)이라 고안됨)
2. 컴포넌트 기반 구조(ex에어비앤비)
3. 재사용성
4. 든든한 지원군 (메타(구 페이스북))
5. 활발한 지식 공유 & 커뮤니티
6. 모바일 앱 개발가능 (리액트 네이티브-모바일 환경 UI프레임워크)
* 리액트의 단점
1. 방대한 학습량 (누가 배우느냐에 따라 다름)
2. 높은 상태 관리 복잡도 (state, component life cycle 등)
<br> <br>

* React 코드 사용(week3- > index.html, indexex.html, like_button.js, MyButton.js)


* 프로젝트 생성
- create-react-app 'name'
---
## 2주차 (3/9)
### 자바스크립트의 자료형
---
### 자바스크립트의 연산자
* let a = 2, let b = 4
* console.log(a+b) : 6
* console.log(a / b) : 0.5
* console.log(a % b) : 2
* console.log(a ** b) : 16
---
* let a = 1; let b = a++
* console.log(a,b) : 2, 1
* let c = 1, let d = ++c
* console.log(c, d) : 2, 2
---
* let a = 1, let b = '1'
* console.log(a === b) : false
---

### README 작성
# 이름 (h1)
## 강의 날짜 (h2)
### 학습 내용(h2 이하)
#### 작성코드 (선택)
#### 최근 내용이 위에 오도록 작성
#### 날짜별 구분이 잘 가도록 작성