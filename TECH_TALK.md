# MCP를 활용한 Vue 3 Design System 개발 경험

## 발표자
- 박정환
- 일시: 2025년 7월 10일
- 주제: MCP(Model Context Protocol)를 활용한 Vue 3 + TypeScript + TailwindCSS 디자인 시스템 구축

---

## 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [MCP란 무엇인가?](#mcp란-무엇인가)
3. [개발 과정과 도전과제](#개발-과정과-도전과제)
4. [MCP의 활용 방법](#mcp의-활용-방법)
5. [문제 해결 과정](#문제-해결-과정)
6. [결과물과 성과](#결과물과-성과)
7. [교훈과 향후 방향성](#교훈과-향후-방향성)

---

## 프로젝트 개요

### 목표
- **Upbox2 UI**: 모던한 Vue 3 디자인 시스템 구축
- **기술 스택**: Vue 3 + TypeScript + TailwindCSS + Storybook
- **아키텍처**: Monorepo 구조 (packages/core, packages/vue, packages/storybook)

### 주요 요구사항
- 재사용 가능한 UI 컴포넌트 라이브러리
- 타입 안전성 보장
- Storybook을 통한 컴포넌트 문서화
- 표준 Tailwind 클래스만 사용하여 간단한 스타일링

---

## MCP란 무엇인가?

### Model Context Protocol
- **정의**: AI 모델과 외부 도구 간의 통신을 위한 표준 프로토콜
- **목적**: AI가 파일 시스템, 터미널, 브라우저 등과 상호작용할 수 있도록 함
- **장점**: 단순한 질의응답을 넘어 실제 개발 작업 수행 가능

### 주요 기능
```typescript
// 파일 시스템 조작
- create_file, read_file, replace_string_in_file
- file_search, grep_search, semantic_search

// 터미널 실행
- run_in_terminal, get_terminal_output

// 브라우저 자동화
- browser_navigate, browser_click, browser_snapshot

// 개발 도구
- get_errors, test_search, list_code_usages
```

---

## 개발 과정과 도전과제

### 1단계: 프로젝트 구조 설정
```bash
packages/
├── core/          # 핵심 로직 (TypeScript)
├── vue/           # Vue 3 컴포넌트
├── tailwind/      # Tailwind 설정
└── storybook/     # 문서화 및 데모
```

### 2단계: 핵심 컴포넌트 개발
- **Button**: 다양한 variant (primary, secondary, outline, ghost)
- **Input/Textarea**: 폼 컴포넌트
- **Badge**: 상태 표시 컴포넌트
- **Alert**: 알림 컴포넌트
- **Checkbox/Radio**: 선택 컴포넌트
- **Select**: 드롭다운 컴포넌트

### 3단계: Storybook 설정 및 문서화

---

## MCP의 활용 방법

### 1. 파일 시스템 조작
```typescript
// 컴포넌트 파일 생성
create_file({
  filePath: '/packages/vue/src/components/Button.vue',
  content: `<template>...</template>`
})

// 설정 파일 수정
replace_string_in_file({
  filePath: '/packages/storybook/tailwind.config.js',
  oldString: 'old config',
  newString: 'new config'
})
```

### 2. 터미널 명령어 실행
```typescript
// 패키지 빌드
run_in_terminal({
  command: 'npm run build',
  explanation: '패키지 빌드 실행'
})

// Storybook 실행
run_in_terminal({
  command: 'npm run storybook',
  isBackground: true
})
```

### 3. 에러 검출 및 해결
```typescript
// 컴파일 에러 확인
get_errors({
  filePaths: ['src/components/Alert.vue']
})

// 코드 사용처 검색
list_code_usages({
  symbolName: 'Alert'
})
```

---

## 문제 해결 과정

### 주요 문제점들

#### 1. 텍스트 가시성 문제
**문제**: 컴포넌트 텍스트가 보이지 않는 현상
```css
/* 문제가 있었던 코드 */
.badge {
  background: var(--color-primary);
  color: var(--color-text);
}
```

**해결**: 표준 Tailwind 클래스 사용
```css
/* 해결된 코드 */
.badge {
  @apply bg-blue-500 text-white;
}
```

#### 2. CSF (Component Story Format) 오류
**문제**: `CSF: missing default export` 오류 발생
```typescript
// 문제: import 오류
import { Alert } from '@upbox2-ui/vue' // Alert 컴포넌트 빌드 안됨
```

**해결 과정**:
1. 패키지 빌드 확인
2. Storybook 캐시 삭제
3. 파일 재생성

#### 3. Monorepo 의존성 문제
**문제**: 패키지 간 의존성 해결 실패
```json
// pnpm-workspace.yaml 추가
packages:
  - 'packages/*'
```

### MCP를 통한 문제 해결 과정

1. **문제 감지**: `get_errors()` 툴로 컴파일 오류 확인
2. **코드 검색**: `semantic_search()`, `grep_search()`로 관련 코드 찾기
3. **파일 수정**: `replace_string_in_file()`, `insert_edit_into_file()`로 코드 수정
4. **빌드 실행**: `run_in_terminal()`로 빌드 및 테스트
5. **결과 확인**: `get_terminal_output()`으로 결과 검증

---

## 결과물과 성과

### 구현된 컴포넌트
- ✅ **Button**: 6가지 variant, 3가지 size
- ✅ **Input/Textarea**: 폼 검증 및 스타일링
- ✅ **Badge**: 6가지 variant, 상태 표시
- ✅ **Alert**: 5가지 variant, 닫기 기능
- ✅ **Checkbox/Radio**: 접근성 고려한 선택 컴포넌트
- ✅ **Select**: 드롭다운 및 다중 선택

### Storybook 문서화
- 모든 컴포넌트에 대한 interactive 문서
- Controls 탭을 통한 실시간 props 조작
- 다양한 사용 예시와 variant 시연

### 기술적 성과
- **타입 안전성**: 100% TypeScript 적용
- **표준화**: 표준 Tailwind 클래스만 사용
- **모듈화**: 재사용 가능한 컴포넌트 구조
- **문서화**: Storybook을 통한 완전한 문서화

---

## 교훈과 향후 방향성

### MCP 활용의 장점

#### 1. 개발 속도 향상
- **Before**: 수동으로 파일 생성 → 코드 작성 → 빌드 → 테스트
- **After**: MCP를 통한 자동화된 워크플로우

#### 2. 문제 해결 능력
- 실시간 에러 감지 및 해결
- 코드베이스 전체 검색 및 분석
- 의존성 문제 자동 해결

#### 3. 학습 효과
- 실제 개발 과정을 통한 학습
- 문제 해결 패턴 습득
- 베스트 프랙티스 적용

### 향후 개발 방향

#### 1. 컴포넌트 확장
```typescript
// 추가 예정 컴포넌트
- Toast/Notification
- Table/DataGrid  
- Modal/Dialog
- Tabs/Accordion
- Form/Validation
```

#### 2. 고급 기능
- 테마 시스템 구축
- 다크 모드 지원
- 애니메이션 시스템
- 접근성 개선

#### 3. 배포 및 패키징
- NPM 패키지 배포
- CDN 지원
- 버전 관리 시스템

---

## 결론

### MCP의 가능성
- **개발 효율성**: 반복 작업 자동화
- **품질 향상**: 일관된 코드 품질 유지
- **학습 도구**: 실제 프로젝트를 통한 학습

### 팀에 미치는 영향
- **개발 속도**: 프로토타입 개발 시간 단축
- **코드 품질**: 표준화된 코드 작성
- **문서화**: 자동화된 문서 생성

### 권장사항
1. **점진적 도입**: 작은 프로젝트부터 시작
2. **학습 투자**: MCP 도구들의 활용법 숙지
3. **프로세스 개선**: 기존 워크플로우와의 통합

---

## Q&A

### 자주 묻는 질문들

**Q: MCP를 사용하면 개발자가 불필요해지는 건 아닌가요?**
A: 아닙니다. MCP는 개발자의 생산성을 높이는 도구입니다. 복잡한 아키텍처 설계, 비즈니스 로직, 창의적 문제 해결은 여전히 개발자의 몫입니다.

**Q: 보안 문제는 없나요?**
A: 로컬 환경에서 실행되며, 명시적인 권한 요청을 통해 작업을 수행합니다. 민감한 정보는 별도 관리가 필요합니다.

**Q: 팀 프로젝트에서 어떻게 활용할 수 있나요?**
A: 코드 리뷰, 문서화, 테스트 코드 생성, 리팩토링 등 다양한 영역에서 활용 가능합니다.

---

## 참고 자료

- [MCP 공식 문서](https://modelcontextprotocol.io/)
- [Vue 3 공식 문서](https://vuejs.org/)
- [Storybook 공식 문서](https://storybook.js.org/)
- [TailwindCSS 공식 문서](https://tailwindcss.com/)
- [프로젝트 저장소](https://github.com/parkjunghwan-reco/upbox2-ui)

---

*이 발표 자료는 MCP를 활용한 실제 개발 경험을 바탕으로 작성되었습니다.*
