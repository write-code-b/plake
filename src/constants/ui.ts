/**
 * 메인 탭 영역에서 사용하는 데이터
 * @constant
 */
export const MAIN_TAB = [
  { name: "오프라인", value: "" },
  { name: "온라인", value: "" },
] as const;

/**
 * 서브 탭 영역에서 사용하는 데이터
 * @constant
 */
export const SUB_TAB = {
  OFFLINE: [
    { data: "", name: "전체", value: "" },
    { data: "exercise", name: "운동", value: "DALLAEMFIT" },
    { data: "dining", name: "미식", value: "OFFICE_STRETCHING" },
  ],
  ONLINE: [
    { data: "", name: "전체", value: "" },
    { data: "game", name: "게임", value: "MINDFULNESS" },
    { data: "coding", name: "코딩", value: "WORKATION" },
  ],
} as const;

/**
 * 지역 선택 드롭다운 옵션
 * @constant
 */
export const LOCATION_OPTION = [
  { data: "전체", value: "전체", label: "전체" },
  { data: "건대입구", value: "건대입구", label: "건대입구" },
  { data: "을지로3가", value: "을지로3가", label: "을지로3가" },
  { data: "신림", value: "신림", label: "신림" },
  { data: "홍대입구", value: "홍대입구", label: "홍대입구" },
];

/**
 * 정렬 선택 드롭다운 옵션
 * @constant
 */
export const SORT_OPTION = [
  { value: "registrationEnd", label: "마감임박순" },
  { value: "participantCount", label: "인기순" },
  { value: "dateTime", label: "최신등록순" },
];
