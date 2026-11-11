// raetim 비디오 목록
// 새 비디오를 추가하려면 아래 VIDEOS 배열에 객체 하나만 넣으면 됩니다.
//  - 메인 화면의 VIDEO 에는 가장 최신 1개만 보이고, VIDEO 페이지(video.html)에는 전체가 최신순으로 보입니다.
//  - 날짜가 같으면 배열에서 위에 있는 것이 더 최신으로 취급됩니다.
//  title : 제목   date : 날짜 (최신순 정렬에 사용)   link : 영상 주소   image : 썸네일 이미지 경로
window.VIDEOS = [
  {
    title: "남겨진 질문 (Unanswered) MV",
    date: "2026.10.08",
    link: "https://www.youtube.com/watch?v=85y_rj9x7-s",
    image: "images/thumb-unanswered.jpg"
  },
  {
    title: "새야 (Birds) MV",
    date: "2026.10.08",
    link: "https://youtu.be/O1F0fBXNkLs?si=iqzYcG6KrRinkM3H",
    image: "images/thumb-birds.jpg"
  }
];
