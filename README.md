# 202130316 이수진

# 23-React1
---
## 6주차 (4/6)
### 컴포넌트 추출(5주차 이어서)
* 기능별 컴포넌트 구성
* 기본적으로 한 컴포넌트에 하나의 기능을 수행하도록 설계하는 것이 바람직하다.
### <댓글 컴포넌트 만들기 실습>

## 5주차 (3/30)
### 엘리먼트의 정의
* 리액트 앱을 구성하는 요소
* '엘리먼트는 리액트 앱의 가장 작은 빌딩 블록들'
* 웹사이트의 경우 DOM 엘리먼트이며 HTML요소를 의미

### 리액트 엘리먼트 VS DOM 엘리먼트
* 리액트 엘리먼트는 Virtural DOM의 형태
* DOM 엘리먼트는 페이지의모든 정보를 갖고있어 무겁다
* 리액트 엘리먼트는 변화한 부분만 갖고있다

### 엘리먼트의 생김새
* 자바스크립트 객체의 형태로 존재
* 컴포넌트(button 등), 속성(color 등) 및 내부의 모든 children을 포함하는 일반 객체
* 맘대로 변경할 수 없는 불변성

### 엘리먼트의 특징
* 불변성 ( 즉, childern이나 속성(arrtibutes)을 바꿀 수 없다)
  * 만약 내용이 바뀐다면
  1. 컴퍼넌트를 통해 새 엘리먼트 생성
  2. 이전 엘리먼트와 교체를 하는 방법으로 내용을 바꾸는 것
  3. Virtual DOM 사용

### < Clock 실습 >

### 컴포넌트에 대해
- 리액트는 컴포넌트 기반의 구조
- 작은 컴포넌트가 모여 큰 컨포넌트를 구성, 이런 컴포넌트들이 모여 전체 페이지를 구성
- 재사용이 가능하기 떄문에 전체 코드의 양을 줄일 수 있어 개발 시간과 유지 보수 비용도 줄일 수 있다
- 자바스크립트 함수와 입력과 출력이 있다는 면에서 유리
- 입출력은 입력은 Props가 담당, 출력은 리액트 엘리먼트의 형태로 출력
  - Props -> 리액트 컴포넌트 -> 리액트 엘리먼트
- 엘리먼트를 필요한 만큼 만들어 사용한다는 면에서 객체 지향의 개념과 비슷

### Props 의 개념
- props는 prop(property: 속성, 특성)의 준말
- 컴포넌트의 속성
- 어떤 속성, props를 넣느냐에 따라 속성이 다른 엘리먼트가 출력
- 컴포넌트에 전달 할 다양한 정보를 담고 있는 자바스크립트 객체
- ex) 에어비앤비

### Props의 특징
- 읽기 전용, 변경 X
- 속성이 다른 엘리먼트를 생성하려면 새로운 props를 컴포넌트에 전달

### Pure vs Impure 함수
- Pure 함수 : 인수로 받은 정보가 함수 내부에서도 변하지 않는 함숫
- Impure 함수 : 인수로 받은 정보가 함수 내부에서 변하는 함수

### Props 사용법
- JSX 에서는 key-value 쌍으로 구성
```jsx
function APP(props){
  return(
    <Profile
    name="소플"
    introduction = "안녕하세요, 소플입니다"
    viewCount={1500}
    />
  );
}
```
1. App 컴포넌트에서 props로 인자를 받아
2. 내부 profile컴포넌트로 전달해서 name,introduction,viewCount에 각각 속성을 할당
3. 전달되는 props는 다음과 같은 자바스크립트 객체
```js
{
  name: "소플",
  introduction: "안녕하세요, 소플입니다"
  viewCount: 1500
}
```

### 컴포넌트만들기
1. 컴포넌트의 종류
- 리액트 초기 버전을 사용할 때 클래스형 컴포넌트를 주로 사용
- Hook이라는 개념이 나오면서 최근엔 함수형 컴포넌트를 주로 사용
- 예전에 작성된 코드나 문서들이 클래스형 컴포넌트를 사용하기 떄문에,
  클래스형 컴포넌트와 컴포넌트의 생명주기에 관해서도 공부해두어야 한다

2. 함수형 컴포넌트
- props중 name 키의 값을 "안녕"뒤에 넣어 반환
```jsx
  function Welcome(props){
    return <h1>안녕, {props.name}</h1>;
  }
```

3. 클래스형 컴포넌트
- React.Component classs로 부터 상속을 받아 선언
```jsx
class Welcome extends React:Component{
  render(){
    return <h1>안녕, {this.props.name}</h1>;
  }
}
```

4. 컴포넌트 이름 짓기
- 이름은 항상 대문자로 시작
  - 소문자로 시작하면 DOM 태그로 인식
- 컴포넌트 파일 이름과 컴포넌트 이름은 같게

5. 컴포넌트의 랜더링
```jsx
 function Welcome(props){
    return <h1>안녕, {props.name}</h1>;
  }
const element = <Welcome nme="인제" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

### 컴포넌트 합상
- 여러 개의 컴포넌트를 합쳐서 하나의컴포넌트를 만드는 것
- 리액트에서는 컴포넌트 안에 또 다른 컴포넌트를 사용할 수 있기 때문에, 복잡한 화면을 여러 개의 컴포넌트로 나누어 구현할 수 있습니다
- props의 값을 다르게 해서 Welcome 컴포넌ㄴ트르 ㄹ여러번 사용
```jsx
 function Welcome(props){
    return <h1>안녕, {props.name}</h1>;
  }
  function App(props){
    return (
      <div>
      <Welcome name="Mike" />
      <Welcome name="Steve" />
      <Welcome name="Jane" />
      </div>
    )
  }
ReactDOM.render(
  <App />
  document.getElementById('root')
);
```

### 컴포넌트의 추출
- 큰 컴포넌트에서 일부를 추출해서 새로운 컴포넌트를 만드는 것
  - Comment 댓글 표시 컴포넌트
  - 내부에선 이미지, 이름, 댓글과 장성일 포함
  - 이미지 부분을 Avatar 컴포넌트로 추출
```jsx
  function Avatar(props){
    return (
      <img className="avatar"
        src={props.user.avatarUrl}
        alt={props.user.name}
      />
    );
  }
```

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