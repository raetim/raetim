// raetim 음원(앨범/싱글) 목록
// 새 음원을 발매하면 아래 ALBUMS 배열에 객체 하나만 추가하면 됩니다.
//  - 메인 페이지의 DISCOGRAPHY 캐러셀에 자동으로 나타납니다.
//  - 앨범 페이지는 album.html?id=<id> 주소로 자동으로 만들어집니다.
// 필드 설명
//  id        : 주소에 쓰이는 영문 이름 (예: "birds")
//  title     : 앨범 제목        format : 표시할 형태 (예: "Digital Single")
//  date      : 발매일 (최신순 정렬에 사용)   cover : 커버 이미지 경로
//  tracks    : 곡 목록. credits 는 문단 배열이고, 문단 하나는 줄 배열입니다.
//  streaming : 스트리밍 링크 (name 은 화면에 보이는 이름)
window.ALBUMS = [
  {
    id: "birds",
    title: "새야 (Birds)",
    format: "Digital Single",
    date: "2026.10.08",
    cover: "images/birds-cover.jpg",
    tracks: [
      {
        title: "새야 (Birds)",
        credits: [
          ["Lyrics by raetim", "Composed by raetim", "Arranged by raetim"],
          ["Vocal raetim", "Drums Junyoung Shin", "Bass Dongin Lee", "Electric Guitar Philip Yu", "Electric Piano Sion Kwon", "Organ Seoyoung Song", "BGV raetim, Eunbee Lee, Bumsoo"],
          ["Vocal Recording Directed by Bumsoo", "Vocal, Drums, BGV Recorded by Seungjoo Lee (Mu;te Lab.)"],
          ["Mixed by LambC at stringshopsound", "Mastered by bk! at AB Room"]
        ]
      },
      {
        title: "남겨진 질문 (Unanswered)",
        credits: [
          ["Lyrics by raetim", "Composed by raetim", "Arranged by raetim, sojucompozer"],
          ["Vocal raetim", "Acoustic Guitar Philip Yu", "Electric Guitar Muyeong Maeng", "Synth sojucompozer", "BGV raetim"],
          ["Vocal Recording Directed by Bumsoo", "Vocal, A. Guitar Recorded by Seungjoo Lee (Mu;te Lab.)", "BGV Recorded by sojucompozer at pochastudio"],
          ["Mixed by sojucompozer at pochastudio", "Mastered by bk! at AB Room"]
        ]
      }
    ],
    streaming: [
      { name: "Apple Music", url: "https://music.apple.com/kr/album/birds-single/6817707113" },
      { name: "Spotify", url: "https://open.spotify.com/album/61QS6talBOmpTDu3eKuuDo" },
      { name: "YouTube Music", url: "https://youtube.com/playlist?list=OLAK5uy_kmdjGmu_yupPNvNx15Gw6pRG19ReJHFQk&si=udWbJsjGdDq8vKEC" },
      { name: "Amazon Music", url: "https://music.amazon.com/albums/B0HLL6M6MT?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_EMPGfVVCIzYMeUEDSFlIlfZgE" },
      { name: "Melon", url: "https://kko.to/nAxqvVDNA9" }
    ]
  }
];
