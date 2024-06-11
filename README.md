# 폴리큐브 FE 코딩 테스트 v1

## Vanila JS (기초)
### 1. `구조 분해 할당` 에 대해 서술하시오.
- **구조 분해 할당**이란 배열이나 객체 속의 값을 변수로 뽑아낼 때, 더 간편하게 뽑아낼 수 있는 문법이다.

### 2. `Optional Channing` 에 대해 서술하고 하위 호환을 위해 어떻게 표기해야 하는지 서술하시오.
#### 서술
- **옵셔널 체이닝**`?.`은 어떤 객체의 존재하지 않는 속성에 접근했을 때, 오류 대신 `undefined`를 반환시키는 문법이다.
#### 하위 호환 표기
- `if`와 `&&`로 하위 호환 문제를 해결할 수 있다.
```js
// 옵셔널 체이닝 문법
const target = student?.grade?.number;

// 옵셔널 체이닝 하위 호환 문법
if (student && student.grade && student.grade.number) {
    const target = student.grade.number;
} else {
    const target = undefined;
}
```

### 3. 빈 배열에 아래 일련의 과정을 거칠 경우, 배열에 담긴 내용을 작성하시오.
1. `push('a')`
2. `shift()`
3. `unshift('e')`
- `'e'가 담긴다.`

### 4. `Promise` 에 대해 서술하고, `Promise` 를 사용할 때 주의할 점을 2가지 이상 서술하시오.
#### `Promise` 에 대한 서술
- 프로미스는 비동기 작업의 결과를 기다리고, 성공 혹은 실패한 후 어떤 동작을 할지 정의할 수 있는 객체다. 여기서 한 가지 주의할 점은 프로미스가 결과를 반환하는 게 아니라, 미래에 결과가 반환될 것이라는 '약속(Promise)'을 반환하는 점이다.
#### 주의할 점 2가지
1. 루프 안에서 프로미스의 사용이다. 비동기 작업은 완료되는 데 시간이 걸리며, 그 시간이 얼마나 걸릴지는 여러 요인에 따라 달라질 수 있다. 어떤 Promises는 더 오래 걸릴 수 있어서 반복문 안의 나머지 코드가 일찍 실행을 끝내고, 예상치 못한 동작을 유발할 수 있다.
2. 불필요한 `try-catch`문의 사용이다. Promise 함수 내에서 try-catch를 사용하는 것은 중복된다.
```js
// 중복된 try-catch
new Promise((resolve, reject) => {
    try {
        const value = fetch();
        // ...
        resolve(value);
    } catch (e) {
        reject(e);
    }
})
.then(result => console.log(result))
.catch(error => console.log(error));


// 중복되지 않은 try-catch
new Promise((resolve, reject) => {
    const value = fetch();
    // ...
    resolve(value);
})
.then(result => console.log(result))
.catch(error => console.log(error));
```

## React
- [여기를 눌러 React 코드를 확인하세요!](./my-app/src/App.js)

## 심화 (알고리즘)
- [여기를 눌러 알고리즘 코드를 확인하세요!](./알고리즘.js)