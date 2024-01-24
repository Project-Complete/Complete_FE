module.exports = {
  path: "cz-customizable",
  types: [
    { value: "feat", name: "feat: 새로운 기능 추가" },
    { value: "fix", name: "fix: 버그 수정 & 디버깅" },
    { value: "markup", name: "markup: 마크업수정" },
    { value: "refactor", name: "refactor: 코드 리팩토링" },
    { value: "docs", name: "docs: 문서 수정" },
    {
      value: "lint",
      name: "lint: 코드 포맷팅 관련 작업들 ⇒ css 수정을 뜻하지 않아요.",
    },
    { value: "test", name: "test: 테스트 코드 추가" },
    { value: "update", name: "update: 라이브러리 or 서브모듈 버전 업데이트" },
    { value: "chore", name: "chore: 빌드 소스 수정" },
  ],
  scopes: [],
  skipQuestions: ["body"],
  subjectLimit: 100,
};
