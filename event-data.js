/* 이 파일의 내용만 바꾸면 시간표, 밴드, 셋리스트가 페이지에 반영됩니다. */
const EVENT_DATE = Object.freeze({
  iso: "2026-10-31",
  year: 2026,
  month: 10,
  day: 31
});

const EVENT_VENUE = Object.freeze({
  name: "신촌 스팀펑크락 라이브펍 B1",
  titleLines: ["신촌 스팀펑크락", "라이브펍"],
  label: "B1 · SINCHON",
  addressShort: "서울 서대문구 연세로9길 13",
  addressWithFloor: "서울 서대문구 연세로9길 13 · 지하 1층",
  mapUrl: "https://naver.me/GdT4kvAi",
  directions: {
    subway: "2호선 신촌역 1·2번 출구 · 도보 5분",
    bus: "연세로·명물거리 정류장 · 도보 1분",
    entrance: "연세로9길 13 건물 · 지하 1층"
  }
});

const START_UP_SESSIONS = [
  { role: "VOCAL", names: ["박지혜"] },
  { role: "DRUM", names: ["김도연"] },
  { role: "BASS", names: ["안태진"] },
  { role: "GUITAR", names: ["박지혁", "김록원"] },
  { role: "KEYBOARD", names: ["정민찬"] }
];

const CLOUD_CLUB_BAND_SESSIONS = {
  loveIsAnOpenDoor: [
            { role: "VOCAL", names: ["박시윤", "최재혁"] },
            { role: "DRUM", names: ["원준영"] },
            { role: "BASS", names: ["김화균"] },
            { role: "KEYBOARD", names: ["우다현"] }
  ],
  willLove: [
            { role: "VOCAL", names: ["박시윤"] },
            { role: "DRUM", names: ["정민혁"] },
            { role: "BASS", names: ["김화균"] },
            { role: "GUITAR", names: ["김재현", "신웅비"] }
  ],
  yourMeaning: [
            { role: "VOCAL", names: ["박시윤", "최재혁"] },
            { role: "DRUM", names: ["원준영"] },
            { role: "BASS", names: ["김화균"] },
            { role: "GUITAR", names: ["김재현"] },
            { role: "TBA", names: ["장민호"] }
  ],
  stellarCommunication: [
            { role: "VOCAL", names: ["최재혁"] },
            { role: "DRUM", names: ["정민혁"] },
            { role: "BASS", names: ["이해준"] },
            { role: "GUITAR", names: ["김재현", "신웅비"] }
  ],
  lingLing: [
            { role: "VOCAL", names: ["최재혁"] },
            { role: "DRUM", names: ["원준영"] },
            { role: "BASS", names: ["인승진"] },
            { role: "GUITAR", names: ["김재현"] },
            { role: "KEYBOARD", names: ["우다현"] }
  ],
  yellow: [
            { role: "VOCAL", names: ["김재현"] },
            { role: "DRUM", names: ["정민혁"] },
            { role: "BASS", names: ["인승진"] },
            { role: "GUITAR", names: ["신웅비", "김재현"] }
  ],
  ifIHadAGun: [
            { role: "VOCAL", names: ["김재현"] },
            { role: "DRUM", names: ["원준영"] },
            { role: "BASS", names: ["김화균"] },
            { role: "GUITAR", names: ["김재현"] },
            { role: "KEYBOARD", names: ["우다현"] }
  ],
  erebia: [
            { role: "DRUM", names: ["양효빈"] },
            { role: "BASS", names: ["이해준"] },
            { role: "GUITAR", names: ["신웅비", "김재현"] },
            { role: "TBA", names: ["윤민섭"] }
  ],
  pretender: [
            { role: "DRUM", names: ["정민혁"] },
            { role: "BASS", names: ["김화균"] },
            { role: "GUITAR", names: ["신웅비", "임유빈"] },
            { role: "KEYBOARD", names: ["우다현"] },
            { role: "TBA", names: ["장민호", "윤민섭"] }
  ],
  confession: [
            { role: "DRUM", names: ["정민혁"] },
            { role: "BASS", names: ["인승진"] },
            { role: "GUITAR", names: ["신웅비", "임유빈"] },
            { role: "TBA", names: ["윤민섭", "장민호"] }
  ],
  monsoon: [
            { role: "DRUM", names: ["양효빈"] },
            { role: "BASS", names: ["인승진"] },
            { role: "GUITAR", names: ["김재현"] },
            { role: "KEYBOARD", names: ["우다현"] },
            { role: "TBA", names: ["윤민섭"] }
  ],
  shakingTime: [
            { role: "VOCAL", names: ["최재혁"] },
            { role: "DRUM", names: ["양효빈"] },
            { role: "BASS", names: ["이해준"] },
            { role: "GUITAR", names: ["신웅비", "김재현"] }
  ]
};

window.EVENT_DATA = {
  event: {
    date: EVENT_DATE,
    venue: EVENT_VENUE
  },
  schedule: [
    {
      time: "17:00",
      endTime: "17:10",
      title: "입장",
      detail: "공연장 입장 및 관람 준비",
      type: "door"
    },
    {
      time: "17:10",
      endTime: "17:50",
      title: "START-UP",
      detail: "40분 공연",
      type: "performance"
    },
    {
      time: "17:50",
      endTime: "18:10",
      title: "쉬는 시간",
      detail: "20분 인터미션",
      type: "intermission"
    },
    {
      time: "18:10",
      endTime: "19:45",
      title: "클클밴드",
      detail: "95분 공연",
      type: "performance"
    }
  ],

  bands: [
    {
      id: "start-up",
      order: "첫 번째 무대",
      name: "START-UP",
      headcount: 6,
      time: "17:10 — 17:50",
      duration: "40분",
      songs: [
        {
          order: 1,
          title: "안녕 (Hello)",
          originalArtist: "조이",
          duration: "4:00",
          videoUrl: "https://www.youtube.com/watch?v=lNvBbh5jDcA",
          sessions: START_UP_SESSIONS
        },
        {
          order: 2,
          title: "???",
          hint: "3초 메모리",
          secret: true,
          duration: "3:30",
          sessions: START_UP_SESSIONS
        },
        {
          order: 3,
          title: "ㅈㅣㅂ",
          originalArtist: "한로로",
          duration: "4:00",
          videoUrl: "https://www.youtube.com/watch?v=U4-cz9NHQv4",
          sessions: START_UP_SESSIONS
        },
        {
          order: 4,
          title: "???",
          hint: "알콜 샤워",
          secret: true,
          duration: "7:30",
          sessions: START_UP_SESSIONS
        },
        {
          order: 5,
          title: "???",
          hint: "합계 46",
          secret: true,
          duration: "5:00",
          sessions: START_UP_SESSIONS
        }
      ]
    },
    {
      id: "cloud-club-band",
      order: "두 번째 무대",
      name: "클클밴드",
      headcount: 14,
      time: "18:10 — 19:45",
      duration: "95분",
      songs: [
        {
          order: 1,
          title: "사랑은 열린 문",
          originalArtist: "박지윤, 윤승욱 (겨울왕국 OST)",
          videoUrl: "https://www.youtube.com/watch?v=kUonnsz5M3w",
          sessions: CLOUD_CLUB_BAND_SESSIONS.loveIsAnOpenDoor
        },
        {
          order: 3,
          title: "사랑하게 될거야",
          originalArtist: "한로로",
          videoUrl: "https://www.youtube.com/watch?v=h0KIWaUEIgQ",
          sessions: CLOUD_CLUB_BAND_SESSIONS.willLove
        },
        {
          order: 2,
          title: "너의 의미",
          originalArtist: "아이유 (feat. 김창완)",
          videoUrl: "https://www.youtube.com/watch?v=4L-H_cXSNhQ",
          sessions: CLOUD_CLUB_BAND_SESSIONS.yourMeaning
        },
        {
          order: 4,
          title: "항성통신",
          originalArtist: "너드커넥션",
          videoUrl: "https://www.youtube.com/watch?v=jv4ffkt4NF8",
          sessions: CLOUD_CLUB_BAND_SESSIONS.stellarCommunication
        },
        {
          order: 5,
          title: "ling ling",
          originalArtist: "검정치마",
          videoUrl: "https://www.youtube.com/watch?v=CqQJVpO5vbQ",
          sessions: CLOUD_CLUB_BAND_SESSIONS.lingLing
        },
        {
          order: 6,
          title: "yellow",
          originalArtist: "콜드플레이 (Coldplay)",
          videoUrl: "https://www.youtube.com/watch?v=yKNxeF4KMsY",
          sessions: CLOUD_CLUB_BAND_SESSIONS.yellow
        },
        {
          order: 7,
          title: "if i had a gun",
          originalArtist: "노엘 갤러거스 하이 플라잉 버즈 (Noel Gallagher's High Flying Birds)",
          videoUrl: "https://www.youtube.com/watch?v=1NMUDb3Ewhs",
          sessions: CLOUD_CLUB_BAND_SESSIONS.ifIHadAGun
        },
        {
          order: 11,
          title: "erebia",
          originalArtist: "데이먼스 이어",
          videoUrl: "https://www.youtube.com/watch?v=NnftCQKqlr8",
          sessions: CLOUD_CLUB_BAND_SESSIONS.erebia
        },
        {
          order: 8,
          title: "pretender",
          originalArtist: "오피셜히게단디즘 (Official髭男dism)",
          videoUrl: "https://www.youtube.com/watch?v=TQ8WlA2GXbk",
          sessions: CLOUD_CLUB_BAND_SESSIONS.pretender
        },
        {
          order: 9,
          title: "고백",
          originalArtist: "델리 스파이스",
          videoUrl: "https://www.youtube.com/watch?v=BYyVDi8BpZw",
          sessions: CLOUD_CLUB_BAND_SESSIONS.confession
        },
        {
          order: 10,
          title: "장마",
          originalArtist: "하현상",
          videoUrl: "https://www.youtube.com/watch?v=8vhNchRpn2c",
          sessions: CLOUD_CLUB_BAND_SESSIONS.monsoon
        },
        {
          order: 12,
          title: "흔들리는 시간 속에",
          originalArtist: "극동아시아타이거즈",
          videoUrl: "https://www.youtube.com/watch?v=mCkZ48QTO64",
          sessions: CLOUD_CLUB_BAND_SESSIONS.shakingTime
        }
      ]
    }
  ],

  notices: [
    "공연은 17시 10분에 시작합니다. 원활한 관람을 위해 입장 시간에 맞춰 와주세요.",
    "공연장은 스탠딩 관람으로 운영되며 좌석은 제공되지 않습니다.",
    "공연장 주차는 어렵습니다. 대중교통 이용을 권장합니다.",
    "식음료 반입은 불가하며, 매장 내에서 음료를 판매합니다."
  ]
};
