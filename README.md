# 202130316 이수진

# 23-React1

## 13주차 (5/25)

### 4. Context API 5가지 설명
< 중요하다 >
- Create
- Provider
- Consumer

### 5. 여러 컨텍스트 사용하기
- 여러 개의 컨텍스트를 동시에 사용하려면 COntext.Provider를 중첩해 사용
- Ex) 393 ~ 394 ( ThemeContext, UserContext 중첩 사용 )
```jsx

```
- 두 개 이상의 컨텍스트 값이 자주 사용될 경우 모든 값을 한 번에 제공해 주는 별도의 render prop 컴포넌트를 직접 만드는 것을 고려하는 것도 좋다.

---

## 12주차 (5/18)

### Chapter 13 합성 vs 상속

### 1. 합성에 대해 알아보기
- (영어) Composition : 구성
- (리액트) Composition  합성, 여러 개의 컴포넌트를 합쳐서 새로운 컴포넌트 만드는 것

(1) Containment
- Containment : 하위 컴포넌트를 포함하는 형태의 합성 방법
- 리액트 컴포넌트의 props에 기본적으로 들어있는 children 속성<br><br>
- <strong>props.children이나 직접 정의한 props를 이용하여 하위 컴포넌트를 포함하는 형태로 합성하는 방법</strong>
```jsx
  function FancyBorder (props) {
    return (
      <div className={'FancyBorder FancyBorder-' + props.color}>
        {props.children}
      </div>
    );
  }
// children라는 props는 개발자가 직접 넣어 주는 것이 아니라 리액트에서 기본저긍로 제공해주는 것

  React.createElement(
    type,
    [props],
    [...children]
  )
// 형태로 호출을 했던 적이 있다.

//children이 배열로 되어 있는 이유는 여러 개의 하위 컴포넌트를 가질 수 있기 때문
// 결과적으로 FancyBorder 컴포넌트는 자신의 하위 컴포넌트를 모두 포함하여 테두리로 감싸주는 컴포넌트가 된다.

  function WelcomeDialog(props){
    return (
      <FancyBorder color="blue">
        <h1 className = "Dialog-title"> 어서오세요 </h1>
        <pclassName = "Dialog-message"> 우리 사이트에 방문하신 것을 환영합니다! </p>
      </FancyBorder>
    );
  }
// 리액트에서는 props.children를 통해 하위 컴포넌트를 하나로 모아서 제공해준다.

// 여러 개의 children 집합이 필요한 경우
  function SplitPane(props) {
    return (
      <div className="SplitPane">
        <div className="SplitPane-left"> {props.left} </div>
        <div className="SplitPane-right"> {props.right} </div>
      </div>
    );
  }

  function App(props) {
    return(
      <SplitPane
        left = { <Contacts /> }
        right = { <Chat /> } />
    );
  }
// 화면을 왼쪽과 오른쪽으로 분할해서 보여주는 SplitPane 컴포넌트
// left, right를 props로 받아 왼쪽과 오른쪽으에 분리해서 렌더링
```

(2) Specialization
- Specialization : 전문화, 특수화
- WelcomeDialog 는 Dialog의 특별한 케이스, 누군가를 반기기 위한 Dialog
- Dialog 는 모든 종류의 Dialog를 포함하는 개념,
- 범용적 개념을 구별이 되게 구체화하는 것 <br> <br>
- <strong>범용적으로 쓸 수 있는 컴포넌트를 만들어 놓고 이를 특수화 시켜서 컴포넌트를 사용하는 합성 방식</strong>
```jsx
  function Dialog(props) {
    return (
      <FancyBorder color="blue">
        <h1 className = "Dialog-title"> {props.title} </h1>
        <p className = "Dialog-message"> {props.message} </p>
      </FancyBorder>
    );
  }

  function WelcomeDialog(props) {
    return (
      <Dialog
        title = "어서 오세요"
        message = "우리 사이트에 방문하신 것을 환영합니다!" />
    );
  }
// 제목과 메시지를 어떻게 사용하느냐에 따라 경고 || 인사말이 될 수 있다.
```
(3) Containment 와 Specialization 같이 사용하기
- Containment 를 사용하기 위해 props.children 사용 <br>
  Specialization 는 직접 정의한 props를 사용
```jsx
  function Dialog(props) {
    return(
      <FancyBorder color="blue">
        <h1 className = "Dialog-title"> {props.title} </h1>
        <p className = "Dialog-messgae"> {props.message} </p>
        {props.children}
      </FancyBorder>
    );
  }

  function SignUpDialog(props) {
    const [nickname, setNickname] = useState('');

    const handleChange = (event) => {
      setNickname(event.target.value);
    }

    const handleSignUp = () => {
      alert(`어서 오세요, ${nickname}님`);
    }

    return (
      <Dialog
        title = "화성 탐사 프로그램"
        message = "닉네임을 입력해 주세요">
        <input
          value = {nickname}
          onChange = {handleChange} />
        <button onClick = {handleSignUp}> 가입하기 </button>
      </Dialog>
    );
  }
// input, button 태그는 props.children으로 전달되어 다이얼로그에 표시된다.
```

### 2. 상속에 대해 알아보기
- 상속(Inheritance) : 합성과 대비되는 개념
- 다른 컴포넌트로부터 상속받아서 새로운 컴포넌트를 만드는 것
  - 리액트에서는 상속을 사용하는 것 보다는 합성을 사용하여 개발하는 것이 더 좋은 방법이다.

### <strong> 복잡한 컴포넌트를 쪼개어 여러 개의 컴포넌트로 만들고, 만든 컴포넌트들을 조합하여 새로운 컴포넌트를 만든다. </strong>

### 실습 Card 컴포넌트 만들기

### Chapter 14 컨텍스트

1. 컨텍스트란?
- 리액트 컴포넌트들 사이에서 데이터를 기존의 props를 통해 전달하는 방식 대신 <br>
<b> 컴포넌트 트리(Component tree)를 통해 곧바로 컴포넌트에 전달하는 새로운 방식 제공 </b>

<img src="src/images/14_1.png" width=550px> <br>
→ props를 통해 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달하는 일반적인 방식
<br><br>
<img src="src/images/14_2.png" width=550px> <br>
→ 컨텍스트를 사용하여 데이터를 필요로 하는 컴포넌트에 바로 데이터 전달

2. 컨텍스트 언제 사용해야 할까?
```jsx
// 현재 선택된 테마를 기존 방식대로 컴포넌트의 props로 전달하는 예제 코드
  function App(props) {
    return <Toolbar theme="dark" />;
  }

  function Toolbar(props) {
    // ThemedButotn에 theme를 넘겨주기 위해 'theme'pros를 가져야 한다.
    //모든 버튼에 대해서 props를 전달하는 것은 매우 비효울적이다.
    return (
      <div>
        <ThemedButton theme={props.theme} />
      </div>
    );
  }

  function ThemedButton(props) {
    return <Button theme = {props.theme} />;
  }

// 컨텍스트를 사용하여 동일한 기능 구현하기
// 컨텍스트는 데이터를 매번 컴포넌트를 통해 전달할 필요 없이 컴포넌트 트리로 전달

const ThemeContext = React.createContext('light');
// 현재 테마를 위한 컨텍스트를 생성하며, 기본값은 'light'

function App(props) {
  return(
    <ThemeContext.provider value = "dark">
      <Toolbar />
    </ThemeContext.provider>
  );
}
// provide를 사용하여 하위 컴포넌트들에게 현재 테마 데이터를 전달
// 모든 하위 컴포넌트들은 컴포넌트 트리 하단에 얼마나 깊이 있는지에 관계없이 데이터를 읽을 수 있다.
// 현재 테마값으로 'dark'를 전달

function Toolbar(props) {
  return (
    <div>
      <ThemeButton />
    </div>
  );
}
// 중간에 위치한 컴포넌트는 테마 데이터를 하위 컴포넌트로 전달할 필요가 없다.

function ThemeButton(props) {
  return (
    <ThemeContext.Consumer>
      {value => <Button theme={value} />}
    </ThemeContext.Consumer>
  );
}
// 가장 가까운 상위 테마 Provider를 찾아 해당되는 값을 사용
// 해당되는 Provider가 없을 경우 'light'를 사용
// 여기선 상위 Provider가 있기 때문에 현재 테마의 값은 'dark'
```
- Provider의 모든 하위 컴포넌트가 얼마나 깊이 위치해 있는지 관계없이 컨텍스트의 데이터를 읽을 수 있다.

3. 컨텍스트를 사용하기 전에 고려할 점
- 컴포넌트와 컨텍스트가 연동되면 재사용성이 떨어진다 <br> 다른 레벨의 많은 컴포넌트가 데이터를 필요로 하는 경우가 아니라면 기존에 사용하던 방식대로 props를 통해 데이터를 전달하는 컴포넌트 합성 방법이 적합하다
```jsx 
// Page컴포넌트는 PageLayout 컴포넌트를 렌더링
  <Page user={user} avatarSize={avatarSize} />

// PageLayout 컴포넌트는 NavigationBar 컴포넌트를 렌더링
  <PageLayout user={user} avatarSize={avatarSize} />

// NavigationBar 컴포넌트는 Link 컴포넌트를 렌더링
  <NavigationBar user={user} avatarSize={avatarSize} />

// Link 컴포넌트는 Avatar 컴포넌트를 렌더링
  <Link href={user.permalink}>
    <Avatar user={user} avatarSize={avatarSize} />
  </Link>

// 컴포넌트에 추가적인 데이터가 필요해지면 추가로 여러 단계에 걸쳐 넘겨주어야 해서 번거롭다.

function Page(props) {
  const user = props.user;

  const userLink = (
    <Link href = {user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );

// Page 컴포넌트는 PageLayout 컴포넌트를 렌더링, props로 userLink를 함께 전달
  return <PageLayout userLink={userLink} />;
}

// PageLayout 컴포넌트는 NavigatorBar 컴포넌트를 렌더링
  <PageLayout userLink={...} />

// NavigatorBar 컴포넌트는 props로 전달받은 userLink element를 리턴
  <PageLayout userLink={...} />

// 데이터가 많아질수록 상위 컴포넌트에 몰리기 때문에 사위 컴포넌트는 점점 복잡해지고, 하위 컴포넌트는 너무 유연해지게 된다.

function Page(props) {
  const user = props.user;

  const topBar = (
    <NavigationBar>
      <Link href={user.permalink}>
        <Avatar user ={user} size={props.avatarSize} />
      </Link>
    </ NavigationBar>
  );
  const content = <Feed user={user} />;

  return (
    <pageLayout
      topBar = {topBar}
      content = {content}
      />
  );
}
// 하위 컴포넌트의 의존성을 상위 컴포넌트와 분리할 필요가 있는 대부분의 경우에 적합한 방법
// 렌더링 전에 하위 컴포넌트가 상위 컴포넌트와 통신해야하는 경우 render props를 사용하여 처리할 수 있다.
```
4. 컨텍스트 API 

(1) React.createContext
- 상위 레벨에 매칭되는 Provider가 없다면, 이 경우에만 기본값이 사용된다.
```jsx
  const MyContext = React.createContext(기본값);
```

(2) Context.Provider
- Context.Provider 컴포넌트로 하위 컴포넌트들을 감싸주면 모든 하위 컴포넌트들이 해당 컨텍스트의 데이터에 접근할 수 있다.
- consumer 컴포넌트 : 하위 컴포넌트가 데이터를 소비한다는 의미
```jsx
  <MyContext.Provider value={ /* some value */ }>
```

(3) Class.contextType
- Provider 하위에 있는 클래스 컴포넌트에서 컨텍스트의 데이터에 접근하기 위해 사용하는 것
- 거의 사용하지 않기 때문에 이런 방법이 있다는 정도로만 참고
```jsx
  class MyClass extends React.Component {
    componentDidMount() {
      let value = this.contex;
      /* MyContext의 값을 이용하여 원하는 작업을 수행 가능 */
    }
    componentDidUpdate() {
      let value = this.context;
      /* MyContext의 값을 이용하여 원하는 작업을 수행 가능 */
    }
    componentWillUnmount() {
      let value = this.context;
      /* MyContext의 값을 이용하여 원하는 작업을 수행 가능 */
    }
    render() {
      let value = this.context;
      /* MyContext의 값에 따라서 컴포넌트들을 렌더링 */
    }
  }

MyClass.contextType = MyContext;
```

(4) Context.Consumer
- consumer 컴포넌트 : 컨텍스트의 데이터를 구독하는 컴포넌트
- 클래스 컴포넌트에선 Class.contextType 사용, 함수 컴포넌트에선 Context.Consumer 사용하여 컨텍스트를 구독
```jsx
  <MyContext.Consumer>
    {value => /* 컨텍스트의 값에 따라서 컴포넌트들을 렌더링 */}
  </ MyContext.Consumer>
```
- 컴포넌트의 자식으로 함수가 올 수 있는데 그것을 <b> function as a child </b> 라고 부른다.
- Context.Consumer로 감싸주면 자식으로 들어간 함수가 현재 컨텍스트의 value를 받아 리액트 노드로 리턴
- 함수로 전달되는 value는 Provider의 value prop와 동일
- 만약 상위 컴포넌트에 Provider가 없다면 value 파라미터는 createContext()를 호출할 때 넣는 기본값과 동일한 역할을 한다.

(5) Context.displayName
- 컨텍스트 객체는 displayName 이라는 문자열 속성을 가진다.
```jsx
  const MyContext  = React.createContext(/* some value */);
  MyContext.displayName = 'MyDisplayName';

  // 개발자 도구에 'MyDisplayName.Provider'로 표시
  <MyContext.Provider />

  // 개발자 도구에 'MyDisplayName.Consumer'로 표시
  <MyContext.Consumer />
```

---

## 11주차 (5/11)

### Chapter 12
2. 하위 컴포넌트에서 State 공유하기 (10주차 이어서)
   - 사용자로부터 온도를 입력받아서 각각 섭씨온도와 화씨온도로 표현해 주고 해당 온도에서 물이 끓는지 안 끓는지는 출력해 주는 컴포넌트를 만들어 공유하는 방법 <br>
    (1 ~ 3은 10주차떄 함)
```jsx
// 1. 물의 끓음 여부를 알려주는 컴포넌트
function BoilingVerdict(props){
  if(props.celsius >= 100) {
    return <p>물이 끓습니다.</p>;
  }
  return <p>물이 끓지 않습니다.</p>;
}
/* 섭씨온도 값을 props로 받아 물이 끓는다는 문자열을 출력하고 그 외에는 끓지 않는다는 문자열을 출력 */

function Calculator(props){
  const [temperature, setTemperature] = useState('');

  const handleChange = (event) => {
    setTemperature(event.target.value);
  }

  return (
    <fieldset>
      <legend>섭씨 온도를 입력하세요: </legend>
      <input
        value={temperature}
        onChange={handleChange} />
      <BoilingVerdict
        celsius={parseFloat(temperature)} />
    </fieldset>
  )
}
/* BoilingVerdict 컴포넌트를 사용하는 부모 컴포넌트 */

// 2. 입력 컴포넌트추출
const scaleNames = {
  c: '섭씨',
  f: '화씨'
};

function TemperatureInput(props) {
  const [temperature, setTemperature] = useState('');

  const handleChange = (event) => {
    setTemperature(event.target.value);
  }

  return (
    <fieldset>
      <legend>온도를 입력해 주세요(단위:{scaleNames[props.scale]}):</legend>
      <input value={temperature} onChange={handleChange} />
    </fieldset>
  )
}
/* 온도를 입력받기 위한 TemperatureInput 컴포넌트 */
/* Calculator 컴포넌트 안에 온도를 입력하는 부분을 별도의 컴포넌트로 추출 */
function Calculator(props){
  return (
    <div>
      <TemperatureInput scale="c" /> 
      <TemperatureInput scale="f" /> 
    </ div>
  );
}
/* 추출한 컴포넌트를 사용하도록 Calculator 컴포넌트를 변경 */
/* 총 두 개의 입력을 받을 수 있도록 되어있고, 하나는 섭씨 다른 하나는 화씨를 입력받는다
  여기서 문제점은 사용자가 입력하는 온도값이 TemperatureInput의 state에 저장되기 때문에 섭씨와 화씨값을 따로 입력 받으면 두 개의 값이 다를 수 있습니다. 이를 해결하기 위해 값을 동기화시켜줘야 함 */


// 3. 온도 변환 함수 작성하기
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32 ;
}
/* 화씨를 섭씨로, 섭씨를 화씨로 변환하는 함수 */

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if(Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
/* 변환하는 함수를 호출하는 함수*/
/* tryConvert() 함수는 온도 값과 변환하는 함수를 파라미터로 받아서 값을 변환시켜 리턴하는 함수
  만약 숫자가 아는 값(isNaN)을 입력하면 empty string을 리턴하도록 예외처리 */

tryConvert('abc', toCelsius) // empty string을 리턴
tryConvert('10.22', toFahrenheit) // '50.396'을 리턴

```
( 4번부터 이어서 )
```jsx
 // 4. Shared State 적용하기
 /* 하위 컴포넌트의 state를 공통된 부모 컴포넌트로 올려서 shared state를 적용해야 함
  state를 상위 컴포넌트로 올린다는 것 : State 끌어올리기 [Lifting State Up] */

 return (
  ...
    //변경 전 : <input value={temperature} onChange={handleChange} />
    <input value={props.temperature} onChange={handleChange} />
  ...
 )
/* 온도 값을 컴포넌트의  state에서 가져오는 것이 아닌 props를 통해 가져온다
  컴포넌트의 state를 사용하지 않게 되기 때문에 입력값이 변경되었을 때 상위 컴포넌트로 변경된 값을 전달해 주어야 한다. 
이를 위해 handleChange()함수를 변경해야 함 */
const handleChange = (event) => {
  // 변경 전 : setTemperature(event.target.value);
  props.onTemperatureChange(event.target.value);
}
/* 사용자가 온도 값을 변경할 때마다 props에 있는 onTemperatureChange() 함수를 통해 변경된 온도 값이 상위 컴포넌트로 전달됨. */

// 최종적으로 완성된 TemperatureInput 컴포넌트
//    state는 제거되었고, 상위 컴포넌트에서 전달받은 값만 사용
function TemperatureInput(props) {
  const handleChange = (event) => {
    props.onTemperatureChange(event.target.value);
  }

  return (
    <fieldset>
      <legend> 온도를 입력해 주세요(단위 : {scaleNames[props.scale]}) : </legend>
      <input value={props.temperature} onChange={handleChange} />
    </fieldset>
  )
}

// 5. Calculator 컴포넌트 변경하기
//    변경된 TemperatureInput 컴포넌트에 맞춰서 Calculator 컴포넌트를 변경해줘야 함
function Calculator(props) {
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('c');

  const handleCelsiusChange = (temperature) => {
    setTemperature(temperature);
    setScale('c');
  }

  const handleFahrenheitChange = (temperature) => {
    setTemperature(temperature);
    setScale('f');
  }

  const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

  return (
    <div>
      <TemperatureInput
        scale = "c"
        temperature = {celsius}
        onTemperatureChange = {handleCelsiusChange} />
      <TemperatureInput
        scale = "f"
        temperature = {fahrenheit}
        onTemperatureChange = {handleFahrenheitChange} />
      <BoilingVerdict
        celsius = {parseFloat(celsius)} />
      </div>
  );
}
```
- state로 temperature와 scale을 선언하여 온도 값과 단위를 각각 저장하도록 하였다.
- TemperatureInput 컴포넌트를 사용하는 부분에서는 각 단위로 변환된 온도 값과 단위를 props로 넣어준다
  - 섭씨온도가 변경되면 단위가 'c'로 되고, 화씨온도가 변경되면 단위가 'f'로 변경

<img src="./src/images/chapter12.jpg" width="500px" /><br>
- 최종적으로 오나성된 구조를 그림으로 나타냈다.
- 상위 컴포넌트인 Calculator에서 온도 값과 단위를 각각의 state로 가지고 있으며, 두 개의 하위 컴포넌트는 각각 섭씨와 화씨로 변환된 온도 값과 단위 그리고 온도를 업데이트하기 위한 함수를 props로 갖고 있다.

### 3. 실습 <섭씨온도와 화씨온도 표시하기>

---

## 10주차 (5/4)

### Chapter 10

1. 리스트와 키란?
    - 리스트 : 자바스크립트의 변수나 객체를 하나의 변수로 묶어 놓은 배열
    - 키 : 각 객체나 아이템을 구분할 수 있는 고유한 값
    - 리액트에선 배열과 키를 사용하는 반복되는 다수의 엘리먼트를 쉽게 렌더링할 수 있다
2. 여러 개의 컴포넌트 렌더링
    - 예로 에어비엔비 화면처럼 같은 컴포넌트를 화면에 반복적으로 나타내야 할 경우 배열에 들어 있는 엘리먼트를 map()함수를 이용하여 렌더링
``` jsx
// numbers 배열에 들어있는 각 요소를 map()를 이용하여 하나씩 추출해서 2를 곱하여 doubled 배열에 다시 넣는 코드
const doubled = numbers.map((number) => number * 2)

// 리액트에서 map()를 사용한 예제
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => 
    <li>{number}</li>
  );
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElememtById('root')
);
```

3. 기본적인 리스트 컴포넌트
``` jsx
// P.294 code

```

4. 리스트와 키에 대해 알아보기
    - 리스트에서 키는 "리스트에서 아이템을 구별하기 위한 고유한 문자열"
    - 키는 리스트에서 어떤 아이템을 변경, 추가 또는 제거되었는지 구분하기 위해 사용
    - 키는 같은 리스트에 있는 엘리먼트 사이에서만 고유한 값이면 된다.
```jsx
// 키값으로 숫자의 값을 사용하는 방식
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key = {number.toString()}>
    {number}
  </li>
  );

// 키값으로 id를 사용하는 방식
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);

// 키값으로 인덱스를 사용하는 방법
// 리액트에서는 키를 명시적으로 넣어 주지 않으면 기본적으로 이 인덱스 값을 키값으로 사용
const todoItems = todos.map((todo, index) =>
  // 아이템들의 고유한 ID가 없을 경우에만 사용해야 함
  <li key={index}>
    {todo.text}
  </li>
);
```

5. 실습 <출석부 출력하기>
``` jsx
return 
  // id를 키 값으로 사용
    <li key={student.id}>{student.name}</li>;
  
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
```

### Chapter 11

1. 폼(form) 이란?
    - 폼(form) : 사용자로부터 입력을 받기 위해 사용하는 것
    - 리액트와 HTML의 폼은 차이가 있다
      - 리액트는 컴포넌트 내부에서는 state를 통해 데이터를 관리
      - HTML 폼은 엘리먼트 내부에 각각의 state가 존재

2. 제어 컴포넌트
    - 제어 컴포넌트 : 사용자가 입력한 값에 접근하고 제어할 수 있도록 해주는 컴포넌트
      - 그 값이 리액트의 통제를 받는 입력 폼 엘리먼트를 의미.
``` jsx
  // HTML 폼을 리액트 제어 컴포넌트로 만든 것
function NameForm(props) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  }
  /* 
  사용자가 입력한 모든 알파벳을 대문자로 변셩시켜서 관리하려면
  
  const handleChange = (event) => {
    setValue(event.target.value.toUpperCase());
  }
  
  이벤트의 타겟 값을 toUpperCase()함수를 사용하여 모두 대문자로 변경한 뒤, 그 값을 state에 저장
  */

  const handleSubmit = (event) => {
    alert('입력한 이름: ' +value);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        이름 : 
          <input type="text" value={value} onChange={handleChange} />
        </label>
        <button type="submit">제출</button>
      </form>
  )
}
```

3. textare 태그
  - HTML에서는 children으로 텍스트가 들어가는 형태
```html
  <textarea>
      안녕하세요, 여기에 이렇게 텍스트가 들어가게 됩니다.
  </textarea>
```
  - 리액트에선 state를 통해 태그의 value라는 attribute를 변경하여 텍스트를 표시
```jsx
function RequestForm(props) {
  const [value, setValue] = useState('요청사항을 입력하세요.');

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event) => {
    alert('입력한 요청사항: '+ value);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        요청사항 :
          <textarea value={value} onChange={handleChange} />
      </label>
      <button type="submit">제출</button>
    </form>
  )
}
```

4. select 태그
  - select 태그는 드롭다운을 보여주기 위한 HTML 태그
```html
<select>
  <option value="apple">사과</option>
  <option value="banana">바나나나</option>
  <option selected value="grape">포도</option>
  <option value="watermelon">수박</option>
</select>
```

```jsx
function FruitSelect(props){
  const [value, setValue] = useState('grape');

  const handleChane = (event) =>{
    setValue(event.target.value);
  }

  const handleSubmit = (event) =>{
    alert('선택한 과일 : '+value);
    event.preventDefault();
  }

  return(
    <form onSubmit ={handleSubmit}>
      <label>
        과일을 선택하세요:
        <select value={value} onChange={handleChange}>
          <option value="apple">사과</option>
          <option value="banana">바나나나</option>
          <option value="grape">포도</option>
          <option value="watermelon">수박</option>
        </select>
      </label>
      <button type="submit">제출</button>
    </form>
  )
}

// 다중 선택 
  <select multiple={true} value={['B', 'C']}>
```

5. File input 태그
  - File input 태그는 그 값이 읽기 전용이기 때문에 리액트에서는 비제어 컴포넌트가 된다.
```html 
  <input type="file" />
<!-- 보통은 서버로 파일을 업로드하거나 자바스크립트의 File API를 사용해 파일을 다룰 때 사용 -->
```

6. 여러 개의 입력 다루기
  - File input 태그는 그 값이 읽기 전용이기 때문에 리액트에서는 비제어 컴포넌트가 된다.
```jsx
function Reservation(props){
  const [haveBreakfast, setHaveBreakfast] = useState(true);
  const [numberOfGuest, setNumberOfGuest] = useState(2);

  const handleSubmit = (event) =>{
    alert(`아침식사 여부 : ${haveBreakfast}, 방문객 수 : ${numberOfGuest}`);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSumbmit}>
      <label>
        아침식사 여부 :
        <input
          type="checkbox"
          checked={haveBreakfast}
          onChange={(event) =>{
            setHaveBreakfast(event.target.checked);
          }} />
        </label>
        <br />

        <label>
          방문객 수:
          <input
            type="number"
            value={numberOfGuest}
            onChange={(event) => {
              setNumberOfGuest(event.target.value);
            }} />
          </label>
          <button type="submit">제출</button>
        </form>
  );
}
```

7. Input Null Value
  - 제어 컴포넌트 : value prop을 정해진 값으로 넣으면 코드를 수정하지 않는 한 입력값을 바꿀 수 없다
    - 만약 value prop은 넣되 자유롭게 입력할 수 있게 만들고 싶다면 값에 undefined 또는 null을 넣으면 된다
``` jsx
  ReactDOM.render(<input value="hi" />, rootNode);

  setTimeout(function() {
    ReactDOM.render(<input value={null} />, rootNode);
  }, 1000);
// 값이 hi로 정해져 있어 바꿀 수 없는 입력 불가 상태였다가 timer에 의해 1초 뒤에 value가 null인 <input> 태그가 렌더링되면서 입력 가능한 상태로 바뀐다.
```

8. 실습 <사용자 정보 입력받기>

### Chapter 12

1. Shared State
    - Shared State : 어떤 컴포넌트의 state에 있는 데이터를 여러 개의 하위 컴포넌트에서 공통적으로 사용하는 경우
      - 자식 컴포넌트들이 가장 가까운 공통된 부모 컴포넌트의 state를 공유해 사용

2. 하위 컴포넌트에서 State 공유하기
  - 사용자로부터 온도를 입력받아서 각각 섭씨온도와 화씨온도로 표현해 주고 해당 온도에서 물이 끓는지 안 끓는지는 출력해 주는 컴포넌트를 만들어 공유하는 방법
```jsx
// 1. 물의 끓음 여부를 알려주는 컴포넌트
function BoilingVerdict(props){
  if(props.celsius >= 100) {
    return <p>물이 끓습니다.</p>;
  }
  return <p>물이 끓지 않습니다.</p>;
}
/* 섭씨온도 값을 props로 받아 물이 끓는다는 문자열을 출력하고 그 외에는 끓지 않는다는 문자열을 출력 */

function Calculator(props){
  const [temperature, setTemperature] = useState('');

  const handleChange = (event) => {
    setTemperature(event.target.value);
  }

  return (
    <fieldset>
      <legend>섭씨 온도를 입력하세요: </legend>
      <input
        value={temperature}
        onChange={handleChange} />
      <BoilingVerdict
        celsius={parseFloat(temperature)} />
    </fieldset>
  )
}
/* BoilingVerdict 컴포넌트를 사용하는 부모 컴포넌트 */

// 2. 입력 컴포넌트추출
const scaleNames = {
  c: '섭씨',
  f: '화씨'
};

function TemperatureInput(props) {
  const [temperature, setTemperature] = useState('');

  const handleChange = (event) => {
    setTemperature(event.target.value);
  }

  return (
    <fieldset>
      <legend>온도를 입력해 주세요(단위:{scaleNames[props.scale]}):</legend>
      <input value={temperature} onChange={handleChange} />
    </fieldset>
  )
}
/* 온도를 입력받기 위한 TemperatureInput 컴포넌트 */
/* Calculator 컴포넌트 안에 온도를 입력하는 부분을 별도의 컴포넌트로 추출 */
function Calculator(props){
  return (
    <div>
      <TemperatureInput scale="c" /> 
      <TemperatureInput scale="f" /> 
    </ div>
  );
}
/* 추출한 컴포넌트를 사용하도록 Calculator 컴포넌트를 변경 */
/* 총 두 개의 입력을 받을 수 있도록 되어있고, 하나는 섭씨 다른 하나는 화씨를 입력받는다
  여기서 문제점은 사용자가 입력하는 온도값이 TemperatureInput의 state에 저장되기 때문에 섭씨와 화씨값을 따로 입력 받으면 두 개의 값이 다를 수 있습니다. 이를 해결하기 위해 값을 동기화시켜줘야 함 */


// 3. 온도 변환 함수 작성하기
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32 ;
}
/* 화씨를 섭씨로, 섭씨를 화씨로 변환하는 함수 */

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if(Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
/* 변환하는 함수를 호출하는 함수*/
/* tryConvert() 함수는 온도 값과 변환하는 함수를 파라미터로 받아서 값을 변환시켜 리턴하는 함수
  만약 숫자가 아는 값(isNaN)을 입력하면 empty string을 리턴하도록 예외처리 */

tryConvert('abc', toCelsius) // empty string을 리턴
tryConvert('10.22', toFahrenheit) // '50.396'을 리턴

```

---
## 9주차 (4/27)

### Chapter 08

### 이벤트 처리하기
1. DOM에서 클릭 이벤트 처리
2. React에서 클릭 이벤트 처리
  - 차이점 
    1) 이벤트 이름이 카멜방식으로 바뀜 (onclidk -> onClick) <br>
    2) 전달하려는 함수는 문자열에서 함수 그대로 전달 (activate() -> activate) 
- 이벤트 핸들러(Event Handler) : 이벤트가 발생했을 때 해당 이벤트를 처리하는 함수
  이벤트가 발생하는 것을 계속 듣고 있다가는 의미로 이벤트 리스너(Event Listener) 라고도 부름

- 이벤트 핸들러 추가하는 방법
  - 버튼을 클리갛면 이벤트 핸드럴 함수인 handleClick() 호출
  - bind를 사용하지 않으면 this.handleClock은 글로벌 스코프에서 호출되어, undefined로 사용할 수 없기 때문에
  - bind를 사용하지 않으려먼 화살표 함수를 사용하는 방법도 있다. ( => )
    * 클래스 컴포넌트는 이제 거의 사용하지 않기 때문에 참고만.
```jsx
function Toggle(props){
  const [isToggleOn, setIsToggleOn] = useState(true);

  // 방법 1. 함수 안에 함수로 정의
  function handleClick(){
    setIsToggleOn((isToggleOn) => !isToggleOn);
  }

  // 방법 2. arrow function을 사용하여 정의
  const handleClick = () => {
    setIsToggleOn((isToggleOn) => !isToggleOn);
  }

  return (
    <button onClick={handleClick}>
      {isToggleOn ? "켜짐" : "꺼짐"}
    </button>
  );
}

// 함수형에서 이벤트 핸들러를 정의하는 방법은 두 가지 이다.
// 함수형에서는 this 를 사용하지 않고 onClick에서 바로 handleClick을 넘긴다.
```

### Arguments 전달하기
- 함수를 정의할 때는 Parameter 혹은 매개변수, <br>
  함수를 사용할 떄는 Argument 혹은 인자라고 부른다
- 이벤트 핸들러에 매개변수를 전달해야 하는 경우도 많다.
```jsx
<buttton onClick ={(event) => this.deleteItem(id,event)}>삭제 </button>
<button oncClick={this.deleteItem.bind(this, id)}>삭제하기</button>
```
- 동일한 역할을 하지만 하나는 화살표 함수, 다른 하나는 bind를 사용
- event라는 매개변수는 리액트의 이벤트 객체를 의미
- 두 방법 모두 첫 매개변수는 id, 두 번째 매개변수로는 event가 전달
- 첫 번째 코드는 명시적으로 event를 매개변수로 넣어주고,<br> 
  두 번째 코드는 id이후 두번째 매개변수로 event가 자동 전달

``` jsx 
// 함수형 컴포넌트에서 이벤트 핸들러에 매개변수를 전달할 때
function MyButton(props){
  const handleDelete = (id, event) => {
    console.log(id, event.target);
  };
  return (
    <button onClick={(event) => handleDelete(1,event)}>삭제하기</button>
  );
}

```

### Chapter 09

### 조건부 렌더링
- 조건 : 조건문의 조건
``` jsx
function Greeting(props){
  const isLoggedIn = props.isLoggedIn;
  if(isLoggedIn){
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
```
- props로 전달 받은 isLoggedln이 true이면 <UserGreeting />을, false면 <GuestGreeting />을 return
  <br>이과 같은 렌더링을 조건부 렌더링이라 한다.

### 엘리먼트 변수
- 엘리먼트 변수 :  렌더링해야 될 컴포넌트를 변수처럼 사용하는 방법
```jsx
// state에 따라 button변수에 컴포넌트의 객체를 저장하여 return문에서 사용
function LoginControl(porps){
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick=() => {
    setIsLoggedIn(true);
  }

  const handleLogOutClick=() => {
    setIsLoggedIn(false);
  }

  let button;
  if(isLoggedIn) {
    button = <LogoutButton onClick={handleLogoutClick} />;
  } else {
    button = <LoginButton onClick={handleLoginClick} />;
  }

  return (
    <div>
      <Greeting isLoggedIn = {isLoggedIn} />
      {button}
    </div>
  );
}

```

### 인라인 조건
- 필요한 곳에 조건문을 직접 넣어 사용하는 방버
1. 인라인 if
  - if문을 사직접 사용하지 않고, 동일한 효과를 내기 위해 && 논리 연산자를 사용
  - &&는 and연산자로 모든 조건이 참일때만 참이 된다
  - 단축평가 : 첫 조건이 거짓이면 두번째 조건은 판단할 필요가 없다

2. 인라인 if-else
  - 삼항 연산자를 사용한다. [ 조건문 ? 참일 경우 : 거짓일 경우 ]
  - 문자열이나 엘리먼트를 넣어서 사용할 수 있다.
``` jsx
// 문자열
function UserStatus(props){
  return(
    <div>
      이 사용자는 현재 <b>{props.isLoggedIn ? '로그인' : '로그인하지 않은'}<b> 상태입니다.
    </div>
  )
}
```

``` jsx
// 엘리먼트
function LoginControl(props){
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick() => {
    setIsLoggedIn(true);
  }

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  }
  
  return (
    <div>
      <Greeting isLoggedIn = {isLoggedIn} />
      {isLoggedIn 
      ? <LogoutButton onClick = {handleLogoutClick} /> 
      : <LoginButton onClick = {handleLoginClick} />}
    </div>
  )
}

```

### 컴포넌트 렌더링 막기
- 컴포넌트 렌더링하고 싶지 않을 때에는 null을 리턴
``` jsx
function MainPage(props) {
  const [showWarning, setShowWarning] = useState(false);

  const handledToggleClick = () => {
    setShowWarning(prevShowWarning => !prevShowWarning); 
  }

  return (
    <div>
      <WarningBanner warning = {showWarning} />
      <button onClick={handleToggleClick}>
        {showWarning ? '감추기' : '보이기'}
      </button>
    </div>
  )
}
```

### chapter 10
### 리스트와 키

- 리스트 : 목록
  - 배열 : 리스트를 사용하기 위한 자료구조
    - 배열 : js의 변수나 객체를 하나의 변수로 묶어놓은 것
- 리스트 : 자료형 없음
  - ex) 파이썬 : 배열 존재X, 리스트 O
  
---

## 8주차 (중간고사 4/20)

---

## 7주차 (4/13)

### 생명주기 함수 사용 실습

- 클래스 컴퍼넌트를 사용할떄 사용한다(라이프 사이클)
- 함수 컴퍼넌트에서는 훅을 사용

## Chapter 7. 훅 _ state, life cycle등 은 훅으로 처리 _

### 훅이란 무엇인가?

- 클래스형 컴포넌트에서는 생성자를 state를 정의하고, setState() 함수를 통해 state를 업데이트
- 함수형 컴포넌트에서도 state나 생명주기 함수의 기능을 사용하게 해주기 위해 추가된 기능
- 훅을 사용하여 클래스형 컴포넌트 기능을 모두 동일하게 구현할 수 있다.
- Hook : state와 생명주기 기능에 갈고리를 걸어 원하는 시점에서 정해진 함수를 실행되도록 만든 함수
- 이름은 모두 'use'로 시작
- 사용자 정의 훅(custom Hoook)을 만들 수 있으며, 이름은 자유롭게 할 수 있으나 'use'로 시작할 것을 권장
  - 권장 X -> 필수적으로 use를 사용해야 함

### useState

- useState는 함수형 컴포넌트에서 state를 사용하기 위한 Hook

```jsx
import React, { useState } from "react";

function Counter(props) {
  var count = 0;

  return (
    <div>
      <p> 총 {count}번 클릭했습니다.</p>
      <button onClick={() => count++}>클릭</button>
    </div>
  );
}
// 증가 시킬 수는 있지만, 재랜더링이 일어나지 않는다.
```

### useState()의 사용법

```jsx
// [ const [ 변수명, set 함수명 ] = usetState(초깃값); ]

import React, { useState } from "react";

function Counter(props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p> 총 {count}번 클릭했습니다.</p>
      <button onClick={() => setCount(count + 1)}>클릭</button>
    </div>
  );
}
```

- 첫 항목은 state의 이름(변수명)
- 두번째 항목은 state의 set함수 -> state를 업데이트 하는 함수
  - 함수를 호출 할 때 state의 초기값을 설정
- 함수의 리턴 값은 배열의 형태

### useEffect

- useState와 함께 많이 사용하는 Hook
- 사이드 이펙트를 수행하기 위한 것
  - (교재) 사이드 이펙트 : 부작용, 일반적으로 프로그래밍에서 사이드 이펙트는 '개발자가 의도하지 않은 코드가 실행되면서 버그가 발생'
  - (리액트) : 효과 혹은 영향
    - ex ) 서버에서 데이터를 받아오거나 수동으로 DOM을 변경하는 등의 작업<br>
      : 다른 컴포넌트에 영향을 미칠 수 있으며, 렌더링중에는 작업이 완료될 수 없기 때문<br>
      렌더링이 끝난 이후에 실행되어야 하는 작업들
- 클래스 컴포넌트의 생명주기 함수와 같은 기능을 하나로 통합한 기능을 제공

  - sideEffect는 렌더링 외에 실행해야 하는 부수적인 코드
    - ex ) 네트워크 리퀘스트, DOM 수동 조작, 로깅 등은 정리(clean-up)가 필요없는 경우들

- useEffect() 사용법
  - 첫번째 파라미터는 이펙트 함수가 들어가고, 두 번째 파라미터로는 의존성 배열이 들어간다
    - useEffect(이펙트 함수, 의존성 배열)
  - 의존성 배열은 이펙트가 의존하고 있는 배열로, 배열안에 있는 변수 중에 하나라도 값이 변경되었을 떄 이펙트 함수가 실행
  - 처음 컴포넌트가 렌더링 된 이후, 그리고 재렌더링 이후에 실행
  - 만약 이펙트 함수가 마운트와 언마운트 될 때만 한 번씩 실행되게 하고 싶으면 빈 배열을 넣으면 된다. -> props나 state에 있는 어떤 값에도 의존하지 않기 때문에 여려번 실행되지 않음

```jsx
import React, { useState, useEffect } from "react";

function Counter(props) {
  const [count, setCount] = useState(0);

  // commponentDidMount, componentDidUpdate와 비슷하게 작동
  useEffect(() => {
    // 브라우저 API를 사용해서 document의 title을 업데이트 함
    document.title = `총 ${count}번 클릭했씁니다.`;
  });

  return (
    <div>
      <p> 총 {count}번 클릭했습니다.</p>
      <button onClick={() => setCount(count + 1)}>클릭</button>
    </div>
  );
}
```

- componentWillUnMount()와 동일한 기능을 구현하는 방법

```jsx
import React, { useState, useEffect } from "react";

function Counter(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ServerAPI.subscribeUserStatus(props.user.id, handleStatusChange);
    return () => {
      ServerAPI.unsubscribeUserStatus(props.user.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return "대기 중...";
  }

  return isOnline ? "온라인" : "오프라인";
}
```

- 두개의 useEffect()를 사용하는 코드

```jsx
function() UserStatusWithCounter(props){
  const [count, setCount] = useState(0);
  useEffect(()=> {
    document.title=`총 ${count}번 클릭했습니다.`;
  });

  const[ isOnline, setIsOnline] = useState(null);
  useEffect(() =>{
    ServerAPI.subscribeUserStatus(props.user.id, handleStatusChange);
    return () => {
      ServerAPI.unsubscribeUserStatus(props.user.id, handleStatusChange);
    };
  });

  function handleStatusChange(Status){
    setIsOnline(status.isOnline);
  }
}

/*
useEffect(() => {
  //컴포넌트가 마운트 된 이후,
  // 의존성 배열에 있는 변수들 중 하나라도 값이 변경되었을 때 실행됨
  // 의존성 배열에 빈 배열([])을 넣으면 마운트와 언마운트시에 단 한 번씩ㅁ나 실행됨
  // 의존성 배열 생략 시 컴포넌트 업데이트 시마다 실행됨.

  return () => {
    // 컴포넌트가 마운트 해제되기 전에 실행
  }
}, [의존성 변수1, 의존성 변수2...]);
*/
```

### useMemo

- useMemo() 혹은 Meomoizde value 를 리턴하는 훅
- 이전 계산값을 갖고 있기 때문에 연산량이 높은 작업의 반복을 피할 수 있다.
- 렌더링이 일어나는 동안 실행된다. -> 렌더링이 일어나는 동안 실행돼서는 안될 작업을 넣으면 안됨
- 예를 들어 useEffect에서 실행되어야 할 사이드 이팩트 같은 것

```jsx
const memoizedValue = useMemo(
  () => {
    // 연산량이 높은 작업을 수행하여 결과를 반환
    return computeExpensiveValue(의존성 변수1, 의존성 변수2);
  },
  [의존성 변수1, 의존성 변수2]
);
```

```jsx
const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b);
);

// 의존성 배열을 넣지 않을 경우, 렌더링이 일어날 때마다 매번 함수가 실행
// 의존성 배열을 넣지 안ㅎ는 것은 의미가 없다
// 의존성 배열에 빈 배열을 넣게 되면 컴포넌트 마운트 시에만 함수가 실행
```

### useCallback

- useMemo()와 유사한 역할을 한다.
- 차이점은 값이 아닌 함수를 반환한다는 점
- 의존성 배열을 파라미터로 받는 것은 useMemo와 동일
- 파라미터로 받는 함수를 콜백이라 부름
- useMemo와 마찬가지고 의존성 배열 중 하나라도 변경되면 콜백함수를 반환

```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(의존성 변수1, 의존성 변수2);
  },
  [의존성 변수1, 의존성 변수2]
);
```

### useRef

- 레퍼런스를 사용하기 위한 훅
  - 레퍼런스: 특정 컴포넌트에 접근할 수 있는 객체
- 레퍼런스 객체를 반환한다
- 레퍼런스 객체에는 .current라는 속성이 있는데, 이것은 현재 참조하고 있는 엘리먼트를 의미한다

```jsx
 [ const refContainer = useRef(초깃값) ]

 function TextInputWithFocusButton(props){
  const inputElem = useRef(null);

  const onButtonClick = () => {
    // 'current'는 마운트된 input element를 가리킹
    inputElem.current.focus();
  };
  return(
    <>
      <input ref={inputElem} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
 }
```

- 반환된 레퍼런스 객체는 컴포넌트의 라이프타임 전체에 걸쳐서 유지된다.
- 즉, 캄포넌트가 마운트 해제 전까지는 계속 유지된다는 의미

### 훅의 규칙

- 첫번째 규칙, 무조건 최상위 레벨에서만 호출해야 한다. -> 최상위 컴포넌트의 최상위 레벨

  - 따라서 반복문이나 조건문 또는 중첩된 함수들 안에서 훅을 호출하면 안된다
  - 훅은 컴포넌트가 렌더링 될 때마다 같은 순서로 호출되어야 한다.
    - pg.224의 코드는 조건에 따라 호출됨으로 잘못된 코드

```jsx
// pg. 224 code
function MyComponent(props){
  const [name, setName] = useState('Inje');

  if(name !== ' '){
    useEffect(() =>{
      ...
    });
  }
}
```

- 두번째 규칙, 리액트 함수 컴포넌트에서만 훅을 호출해야 한다.
  - 일단 js함수에서 훅을 호출하면 안된다.
  - 리액트 함수형 컴포넌트 혹은 직접 만든 커스텀 훅에서만 호출할 수 있다.

### 나만의 훅 만들기

1. 커스텀 훅을 만들어야 하는 상황

```jsx
// pg.226 code는 userStatus 컴포넌트
import React, { useState, useEffect } from "react";

function UseStatus(props) {
  const [inOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ServerAPI.subscribeUserStatus(props.user.id, handleStatusChange);
    return () => {
      ServerAPI.unsubscribeUserStatus(props.user.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return "대기중...";
  }
  return isOnlin ? "온라인" : "오프라인";
}

//pg. 227 code는 userListItem 컴포넌트
import React, { useState, useEffect } from "react";

function UseListItem(props) {
  const [inOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ServerAPI.subscribeUserStatus(props.user.id, handleStatusChange);
    return () => {
      ServerAPI.unsubscribeUserStatus(props.user.id, handleStatusChange);
    };
  });

  return (
    <li style={{ color: isOnline ? "green" : "black" }}>{props.user.name}</li>
  );
}
```

2. 커스텀 훅을 추출하기

- 두개의 js함수에서 하나의 로직을 공유하도록 하고싶을 떄 새로운 함수를 하나 만드는 방법
- 리액트 컴포넌트와 훅은 모두 함수이기 떄문에 동일한 방법을 사용
- 이름을 use로 시작하고, 내부에서 다른 훅을 호출하는 js함수를 만들면 됨

```jsx
//pg. 228 code
// 중복된 로직을 useUserStatus()라는 커스텀 훅으로 추출해낸것
import { useState, useEffect } from "react";

function UseListItem(userId) {
  const [inOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ServerAPI.subscribeUserStatus(props.user.id, handleStatusChange);
    return () => {
      ServerAPI.unsubscribeUserStatus(props.user.id, handleStatusChange);
    };
  });

  return isOnline;
}
```

- 다른 훅을 호출하는 것은 커스텀 훅의 최상위 레벨에서만 가능
- 일반함수와 같다고 생각해도 됨
- 이름이 use로 시작하도록 한다는 것만 다름

3. 커스텀 훅 사용하기

```jsx
//pg. 230 code

function UserStatus(props) {
  const isOnline = useUserStatus(props.user.id);

  if (isOnline === null) {
    return "대기중 ...";
  }
  return isOnline ? "온라인" : "오프라인";
}

function UserListItem(props) {
  const isOnline = useUserStatus(props.user.id);

  return (
    <li style={{ color: isOnline ? "green" : "black" }}>{props.user.name}</li>
  );
}
```

## 실습 <훅을 사용한 컴포넌트 개발>

## 7장 노트, 마치며 부분 정리가 잘 되어있다 읽어보기!

---

## 6주차 (4/6)

### 컴포넌트 추출(5주차 이어서)

- 기능별 컴포넌트 구성
- 기본적으로 한 컴포넌트에 하나의 기능을 수행하도록 설계하는 것이 바람직하다.

### <댓글 컴포넌트 만들기 실습>

## Chapter 6. State와 생명주기

### state 란?

- 리액트 컴포넌트의 상태 (상태 : 컴포넌트의 데이터)
  - 변경가능한 데이터 의미
  - 렌더링과 관련된 값만 state에 포함

### state 특징

- 자바스크립트의 객체
- 함수형에서는 useState() 함수 사용
- 변경은 가능하나 직접 수정은 안된다.
  - 변경 시 setState() 함수 사용

### 생명주기

- 컴포넌트의 생성 시점, 사용 시점, 종료 시점을 나타냄
- constructor 실행되면서 컴포넌트 생성
- 생성 직후 conponentDidMount() 함수가 호출
- 컴포넌트 소멸전까지 여러 번 랜더링
  - props, setState(), forceUpdate() 함수 호출
- 랜더링이 끝나면 conponentDinUpdate() 함수 호출
- 마지막으로 언마운트 되면 conpomentWillUnmount() 함수 호출

### <State와 생명주기 함수 사용 실습, developer tool 설치>

---

## 5주차 (3/30)

### 엘리먼트의 정의

- 리액트 앱을 구성하는 요소
- '엘리먼트는 리액트 앱의 가장 작은 빌딩 블록들'
- 웹사이트의 경우 DOM 엘리먼트이며 HTML요소를 의미

### 리액트 엘리먼트 VS DOM 엘리먼트

- 리액트 엘리먼트는 Virtural DOM의 형태
- DOM 엘리먼트는 페이지의모든 정보를 갖고있어 무겁다
- 리액트 엘리먼트는 변화한 부분만 갖고있다

### 엘리먼트의 생김새

- 자바스크립트 객체의 형태로 존재
- 컴포넌트(button 등), 속성(color 등) 및 내부의 모든 children을 포함하는 일반 객체
- 맘대로 변경할 수 없는 불변성

### 엘리먼트의 특징

- 불변성 ( 즉, childern이나 속성(arrtibutes)을 바꿀 수 없다)
  - 만약 내용이 바뀐다면
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
function APP(props) {
  return (
    <Profile
      name="소플"
      introduction="안녕하세요, 소플입니다"
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
function Welcome(props) {
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
function Welcome(props) {
  return <h1>안녕, {props.name}</h1>;
}
const element = <Welcome nme="인제" />;
ReactDOM.render(element, document.getElementById("root"));
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
function Avatar(props) {
  return (
    <img className="avatar" src={props.user.avatarUrl} alt={props.user.name} />
  );
}
```

---

## 4주차 (3/23)

### 프로젝트 생성

- npx create-react-app 'name'

### JSX (Java Script XML)

- Javascript를 확장한 문법
- 중괄호를 사용해 javaScript 문법 사용 가능

```JSX
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
- 만약 html이나 xml에 자바스크립트 코드를 사용하고 싶으면 { }괄호를 사용

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

- 리액트의 장점

1. 빠른 업데이트와 렌더링 속도(Virtual DOM(동) - DOM(비동) 조작이 비효율적(속도 느림)이라 고안됨)
2. 컴포넌트 기반 구조(ex에어비앤비)
3. 재사용성
4. 든든한 지원군 (메타(구 페이스북))
5. 활발한 지식 공유 & 커뮤니티
6. 모바일 앱 개발가능 (리액트 네이티브-모바일 환경 UI프레임워크)

- 리액트의 단점

1. 방대한 학습량 (누가 배우느냐에 따라 다름)
2. 높은 상태 관리 복잡도 (state, component life cycle 등)
   <br> <br>

- React 코드 사용(week3- > index.html, indexex.html, like_button.js, MyButton.js)

- 프로젝트 생성

* create-react-app 'name'

---

## 2주차 (3/9)

### 자바스크립트의 자료형

---

### 자바스크립트의 연산자

- let a = 2, let b = 4
- console.log(a+b) : 6
- console.log(a / b) : 0.5
- console.log(a % b) : 2
- console.log(a \*\* b) : 16

---

- let a = 1; let b = a++
- console.log(a,b) : 2, 1
- let c = 1, let d = ++c
- console.log(c, d) : 2, 2

---

- let a = 1, let b = '1'
- console.log(a === b) : false

---

### README 작성

# 이름 (h1)

## 강의 날짜 (h2)

### 학습 내용(h2 이하)

#### 작성코드 (선택)

#### 최근 내용이 위에 오도록 작성

#### 날짜별 구분이 잘 가도록 작성