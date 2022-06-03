# 쇼핑몰 웹 서비스 프로젝트

제품들을 조회하고, 장바구니에 추가하고, 또 주문을 할 수 있는 쇼핑몰 웹 서비스 제작 프로젝트입니다. <br />
**웹 구현 예시** (링크는 프로젝트 기간에만 유효합니다)

### 엘리스 데모 http://shopping-demo.elicecoding.com/
### team4 시연 http://kdt-sw2-seoul-team04.elicecoding.com/

<br>

** 핵심 기능은 하기입니다. (이외에도 더 있으며, 추가 안내 될 프로젝트 평가기준표에서 구체화될 예정입니다.) <br>
1. 회원가입, 로그인, 회원정보 수정 등 **유저 정보 관련 CRUD** 
2. **제품 목록**을 조회 및, **제품 상세 정보**를 조회 가능함. 
3. 장바구니에 제품을 추가할 수 있으며, **장바구니에서 CRUD** 작업이 가능함.
4. 장바구니는 서버 DB가 아닌, 프론트 단에서 저장 및 관리됨 (localStorage, indexedDB 등)
5. 장바구니에서 주문을 진행하며, **주문 완료 후 조회 및 삭제**가 가능함.


### ** team4 추가 및 개선 기능입니다.
1. 회원가입, 로그인, 회원정보 수정 <br>
    1.1 **email, password 유효성 검증** <br>
        프론트엔드, 백엔드 정책 통일

    1.2 **admin 계정 별도 관리** <br>
        프론트에서 일반 계정으로 로그인한 사용자는 관리자용 화면을 볼 수 없음 <br>
        -->  어드민경로로 직접 접근시 화면은 보이지만 팝업 에러

2. 제품 목록 조회 및 제품 상세정보 조회 <br>
    2.1 

3. 장바구니 기능<br>
    3.1 

4. 백엔드<br>
    4.1 **admin required 미들웨어** <br>
        상품등록, 상품정보 수정, 삭제와 장바구니 전체목록 조회, 전체 유저 목록 조회에 관리자 외 접근 차단   <br>
        
    4.2  **validator 기능 추가** <br>
        사용자 이메일, 비밀번호에 대해 프론트의 요청 재검증 및 브라우저 외의 불법 경로로 서버접근 차단  <br>
        상품 정보 중 가격에 대해 타입 체크<br>

    4.3 **error handler 강화** <br>
        예상 가능한 에러 처리에 대한 기능 강화 <br>

    4.4 **path alias로 경로 정리** <br>
        백엔드 경로는 alias 처리 <br>
    
    4.5 **asyncHandler 활용 확대** <br>
        복잡한 try ~ catch 문 정리 <br>
    
    4.6 **ES6 import export 문법 사용** <br>
        모듈 호출에 require 대신 최신 문법 적용 
    


## 주요 사용 기술

### 1. 프론트엔드

- **Vanilla javascript**, html, css (**Bulma css**)
- Font-awesome 
- Daum 도로명 주소 api 
- 이외

### 2. 백엔드 

- **Express** (nodemon, babel-node로 실행됩니다.)
- Mongodb, Mongoose
- cors
- nginx

## 폴더 구조
- 프론트: `src/views` 폴더 
- 백: src/views 이외 폴더 전체
- 실행: **프론트, 백 동시에, express로 실행**



## 설치 방법

1. **.env 파일 설정 (MONGODB_URL 환경변수를, 개인 로컬 혹은 Atlas 서버 URL로 설정해야 함)**

2. express 실행

```bash
# npm 을 쓰는 경우 
npm install
npm run start

# yarn 을 쓰는 경우
yarn
yarn start
```

<br>

---

본 프로젝트에서 제공하는 모든 코드 등의는 저작권법에 의해 보호받는 ㈜엘리스의 자산이며, 무단 사용 및 도용, 복제 및 배포를 금합니다.
Copyright 2022 엘리스 Inc. All rights reserved.

