# Upbox2 UI

reka-ui 기반으로 구축된 최신 Vue 3 + TypeScript + TailwindCSS 디자인 시스템 라이브러리입니다.

## 🌐 라이브 데모

GitHub Pages 배포 사이트를 방문하세요:
- **메인 페이지**: [https://parkjunghwan-reco.github.io/upbox2-ui/](https://parkjunghwan-reco.github.io/upbox2-ui/)
- **스토리북**: [https://parkjunghwan-reco.github.io/upbox2-ui/storybook/](https://parkjunghwan-reco.github.io/upbox2-ui/storybook/)
- **예제 앱**: [https://parkjunghwan-reco.github.io/upbox2-ui/example/](https://parkjunghwan-reco.github.io/upbox2-ui/example/)

## 특징

- **최신 기술 스택**: Vue 3, TypeScript, TailwindCSS
- **헤드리스 UI**: 접근성과 커스터마이징을 위한 reka-ui 기반
- **모노레포 구조**: 핵심 로직, Vue 컴포넌트, TailwindCSS 프리셋
- **타입 안전**: 적절한 타입 정의를 통한 완전한 TypeScript 지원
- **커스터마이징 가능**: 스타일링 변형을 위한 CVA (Class Variance Authority)
- **유틸리티 우선**: TailwindCSS 유틸리티 클래스 및 커스텀 디자인 토큰
- **MCP 통합**: 빠른 개발을 위한 Model Context Protocol 사용

## 패키지

### @upbox2-ui/core
헤드리스 컴포넌트 로직, 유틸리티, 타입 정의

### @upbox2-ui/vue
완전한 TypeScript 지원을 포함한 Vue 3 컴포넌트

### @upbox2-ui/tailwind
디자인 토큰과 유틸리티 클래스를 포함한 TailwindCSS 프리셋

## 설치

```bash
npm install @upbox2-ui/vue @upbox2-ui/tailwind
```

## 사용법

### Vue 컴포넌트

```vue
<template>
  <div>
    <Button variant="primary" size="medium" @click="handleClick">
      Click me
    </Button>
    
    <Input 
      v-model="inputValue" 
      placeholder="Enter text..."
      size="medium"
    />
    
    <Modal v-model:open="isModalOpen">
      <h2>Modal Title</h2>
      <p>Modal content goes here</p>
    </Modal>
    
    <Card variant="default" padding="medium">
      <h3>Card Title</h3>
      <p>Card content</p>
    </Card>
    
    <Badge variant="primary" size="medium">New</Badge>
    
    <Switch v-model="switchValue" size="medium" />
    
    <Checkbox v-model="checkboxValue" size="medium" />
    
    <Textarea 
      v-model="textareaValue" 
      placeholder="Enter your message..."
      :rows="3"
    />
    
    <Alert 
      variant="success" 
      title="Success!" 
      description="Your action was completed successfully."
    />
    
    <Select 
      v-model="selectedValue" 
      :options="selectOptions" 
      placeholder="Choose an option..."
    />
    
    <Radio 
      v-model="radioValue" 
      :options="radioOptions" 
      name="radio-group"
    />
    
    <!-- New Components -->
    <Toast 
      variant="success" 
      title="Success!" 
      description="Your action was completed successfully."
      :duration="4000"
    />
    
    <Progress 
      :value="75" 
      variant="success" 
      label="Loading..."
      show-value
    />
    
    <Avatar 
      src="https://example.com/avatar.jpg" 
      alt="John Doe"
      size="medium"
    />
    
    <Skeleton 
      :loading="isLoading"
      variant="text"
      :lines="3"
    >
      <div>Content loaded successfully!</div>
    </Skeleton>
    
    <Tooltip 
      content="This is a tooltip" 
      position="top" 
      trigger="hover"
    >
      <button>Hover for tooltip</button>
    </Tooltip>
    
    <Drawer 
      v-model="isDrawerOpen" 
      position="right" 
      size="md"
    >
      <template #header>
        <h2>Drawer Title</h2>
      </template>
      <p>Drawer content goes here</p>
    </Drawer>
    
    <Slider 
      v-model="sliderValue" 
      :min="0" 
      :max="100" 
      :step="1" 
      show-value
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  Button, 
  Input, 
  Modal, 
  Card, 
  Badge, 
  Switch, 
  Checkbox, 
  Textarea, 
  Alert,
  Select,
  Radio,
  Toast,
  Progress,
  Avatar,
  Skeleton,
  Tooltip,
  Drawer,
  Slider
} from '@upbox2-ui/vue'
import type { SelectOption, RadioOption } from '@upbox2-ui/vue'

const inputValue = ref('')
const isModalOpen = ref(false)
const switchValue = ref(false)
const checkboxValue = ref(false)
const textareaValue = ref('')
const selectedValue = ref('')
const radioValue = ref('')
const isLoading = ref(true)
const isDrawerOpen = ref(false)
const sliderValue = ref(50)

const selectOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

const radioOptions: RadioOption[] = [
  { value: 'radio1', label: 'Radio Option 1' },
  { value: 'radio2', label: 'Radio Option 2' },
  { value: 'radio3', label: 'Radio Option 3' },
]

const handleClick = () => {
  isModalOpen.value = true
}
</script>
```

### TailwindCSS 설정

```js
// tailwind.config.js
import { preset } from '@upbox2-ui/tailwind'

export default {
  presets: [preset],
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/@upbox2-ui/vue/dist/**/*.{js,ts,vue}'
  ],
  // ... 기타 설정
}
```

## 컴포넌트

### Button
- 변형: `default`, `primary`, `secondary`, `outline`, `ghost`, `link`
- 크기: `small`, `medium`, `large`
- 반경: `small`, `medium`, `large`

### Input
- 타입: `text`, `email`, `password`, `number`, `tel`, `url`, `search`
- 크기: `small`, `medium`, `large`
- 오류 상태 및 유효성 검사

### Modal
- 배경 제어
- 키보드 내비게이션 (ESC로 닫기)
- 포커스 관리
- 스크롤 잠금

### Card
- 변형: `default`, `outline`
- 패딩: `none`, `small`, `medium`, `large`

### Badge
- 변형: `default`, `primary`, `secondary`, `success`, `warning`, `error`
- 크기: `small`, `medium`, `large`

### Switch
- 크기: `small`, `medium`, `large`
- v-model 지원
- 비활성화 상태

### Checkbox
- 크기: `small`, `medium`, `large`
- v-model 지원
- 불확정 상태
- 비활성화 상태

### Textarea
- 크기: `small`, `medium`, `large`
- 크기 조정 옵션: `none`, `both`, `horizontal`, `vertical`
- v-model 지원

### Alert
- 변형: `default`, `info`, `success`, `warning`, `error`
- 크기: `small`, `medium`, `large`
- 선택적 제목 및 설명
- 닫기 가능 옵션
- 슬롯을 통한 커스텀 내용

### Select
- 크기: `small`, `medium`, `large`
- v-model 지원
- 비활성화 아이템이 있는 옵션 그룹
- 키보드 내비게이션 (방향키, Enter, Escape)
- 검색 기능
- 커스텀 옵션 렌더링

### Radio
- 크기: `small`, `medium`, `large`
- v-model 지원
- 비활성화 옵션
- 키보드 내비게이션

### Toast
- 변형: `default`, `success`, `warning`, `error`, `info`
- 크기: `small`, `medium`, `large`
- 위치: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`
- 자동 닫기 (커스텀 지속 시간)
- 수동 닫기 가능
- 액션 버튼 지원
- 아이콘 지원

### Progress
- 변형: `default`, `success`, `warning`, `error`, `info`
- 크기: `small`, `medium`, `large`
- 진행률 값 표시
- 불확정 상태 (로딩 애니메이션)
- 줄무늬 및 애니메이션 효과
- 레이블 지원

### Avatar
- 변형: `circle`, `square`, `rounded`
- 크기: `small`, `medium`, `large`
- 이미지 URL 지원
- 이니셜 표시 (자동 생성)
- 폴백 콘텐츠
- 커스텀 색상 지원
- 이미지 로드 에러 처리

### Skeleton
- 변형: `text`, `rectangle`, `circle`, `avatar`, `button`
- 크기: `small`, `medium`, `large`
- 여러 줄 지원
- 커스텀 크기 (width, height)
- 로딩 상태 제어
- 애니메이션 효과
- 슬롯을 통한 실제 콘텐츠 표시

### Dropdown
- 트리거: `click`, `hover`, `focus`
- 배치: 12가지 위치 옵션
- 크기: `small`, `medium`, `large`
- 아이콘 지원
- 단축키 표시
- 구분선 지원
- 위험 아이템 스타일링
- 키보드 네비게이션

### Tabs
- 변형: `default`, `pills`, `underline`, `card`
- 크기: `small`, `medium`, `large`
- 방향: `horizontal`, `vertical`
- 아이콘 지원
- 배지 표시
- 닫기 가능한 탭
- 전체 너비 옵션
- 키보드 네비게이션

### Accordion
- 타입: `single`, `multiple`
- 변형: `default`, `bordered`, `filled`, `ghost`
- 크기: `small`, `medium`, `large`
- 아이콘 지원
- 애니메이션 효과
- 비활성화 아이템
- 슬롯 기반 콘텐츠
- 키보드 네비게이션

### Breadcrumb
- 크기: `small`, `medium`, `large`
- 구분자: 커스터마이징 가능
- 아이콘 지원
- 홈 링크 옵션
- 경로 축약 (maxItems)
- 비활성화 아이템
- 현재 페이지 표시

### Pagination
- 변형: `default`, `outline`, `ghost`
- 크기: `small`, `medium`, `large`
- 페이지 크기 변경
- 빠른 점프
- 총 항목 수 표시
- 간단한 모드
- 단일 페이지 숨김
- 완전한 키보드 접근성
- 비활성화 아이템이 있는 옵션 그룹
- 키보드 내비게이션
- name 속성을 가진 그룹화된 라디오 버튼

### Tooltip
- 위치: `top`, `bottom`, `left`, `right`
- 트리거: `hover`, `click`, `focus`
- 크기: `small`, `medium`, `large`
- 테마: `light`, `dark`
- 화살표 표시 옵션
- 지연 시간 설정
- 커스텀 콘텐츠 슬롯
- 비활성화 상태
- 뷰포트 경계 감지 및 자동 위치 조정

### Drawer
- 위치: `left`, `right`, `top`, `bottom`
- 크기: `sm`, `md`, `lg`, `xl`, `full`
- 오버레이 제어
- 오버레이 클릭으로 닫기
- ESC 키로 닫기
- 닫기 버튼 표시 옵션
- 헤더, 콘텐츠, 푸터 슬롯
- 포커스 트랩
- 접근성 준수 (ARIA)
- 스크롤 잠금

### Slider
- 방향: `horizontal`, `vertical`
- 크기: `small`, `medium`, `large`
- 단일 값 및 범위 슬라이더
- 값 표시 옵션
- 틱 마크 표시
- 커스텀 단계 설정
- 키보드 내비게이션 (방향키, Home, End)
- 터치 지원
- 값 포맷터 함수
- 비활성화 상태
- 완전한 접근성 지원 (ARIA)

## 타입 시스템

라이브러리는 포괄적인 TypeScript 정의를 포함합니다:

```typescript
import type { ButtonVariant, Size, Radius } from '@upbox2-ui/core'

type ButtonVariant = 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
type Size = 'small' | 'medium' | 'large'
type Radius = 'small' | 'medium' | 'large'
```

## 개발

```bash
# 종속성 설치
npm install

# 모든 패키지 빌드
npm run build

# 개발 서버 실행 (각각 별도 터미널에서)
cd packages/storybook && npm run storybook  # Storybook: http://localhost:6006
cd packages/example && npm run dev          # Example: http://localhost:5173

# 타입 검사
npm run type-check
```

## 디자인 시스템

라이브러리는 현대적인 디자인 시스템 원칙을 따릅니다:

- **일관된 간격**: 8px 그리드 시스템 사용
- **시맨틱 색상 시스템**: CSS 커스텀 속성 포함
- **반응형 타이포그래피** 스케일
- **접근성 우선** 접근
- **컴포넌트 구성** 패턴

## 라이선스

MIT
