# raetim / raemin2scence 사이트

## 폴더 구조
- `index.html` raetim 메인 / `profile.html` 프로필 / `album.html?id=…` 앨범 페이지
- `raemin2scence.html` 래미니센스 메인 / `works.html?type=mv|illust` MV, ILLUST 목록
- `css/common.css` 모든 페이지 공통 · `css/themes/` raetim·raemin 쪽 공통 · `css/components/` 캐러셀 · `css/pages/` 페이지별
- `js/layout.js` 메뉴·푸터·SNS(모든 페이지) · `js/carousel.js` 캐러셀 · `js/works-grid.js` 작품 목록 그리기
- `js/data/` 내용이 들어가는 곳 (`works-data.js` 작품, `albums-data.js` 음원) · `js/pages/` 페이지별 동작
- `images/` 이미지 모음 (지금은 한 폴더에 있고, 나중에 용도별 하위 폴더로 나눌 예정)

## 새 작품 추가 (MV / ILLUST)
1. 썸네일을 `images/` 에 넣는다.
2. `js/data/works-data.js` 의 WORKS 배열에 한 항목을 추가한다.

## 새 음원 발매
1. 커버를 `images/` 에 넣는다.
2. `js/data/albums-data.js` 의 ALBUMS 배열에 한 항목을 추가한다.
   (메인 DISCOGRAPHY 캐러셀과 `album.html?id=<id>` 페이지가 자동으로 만들어진다)

## 메뉴 / SNS 링크 수정
`js/layout.js` 맨 위의 MENUS, SNS 만 고친다.

## 파일을 고쳤는데 화면이 안 바뀔 때
각 html 안의 `?v=20261027b` 를 다른 값으로 바꾼다. (브라우저가 옛 파일을 저장해두는 것을 막는다)
