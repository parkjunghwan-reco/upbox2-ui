# Upbox2 UI - Tech Talk: MCP를 활용한 디자인 시스템 구축 여정

## 🎯 프로젝트 목표

Vue 3 + TypeScript + TailwindCSS를 활용하여 figma MCP를 활용하여 디자인을 참조해서 헤드리스 UI 기반의 디자인 시스템 라이브러리를 구축하는 것이 목표였던 것..

figma mcp로 진행이 잘 되지않아서 프롬프트에서 제거하니 모던 디자인 시스템 방식으로 진행이 됨. 

## 🚀 최초 프롬프트와 계획

### 초기 요구사항
```
"vue3+typescript+tailwindcss를 활용하고 headless UI인 reka-ui를 기반으로 디자인 시스템 라이브러리를 제작하려고 해. 
context7 mcp를 활용하여 버전과 문법을 잘 참고해줘. 
프로젝트 구조 레퍼런스는 https://github.com/line/abc-def 여기 git 주소를 참고해줘. 
해당 저소는 react와 headless UI의 react 버전인 radix-ui 기반으로 제작되었어."
```

### 계획된 MCP 도구 활용
1. **Context7 MCP**: 최신 Vue 3, TypeScript, TailwindCSS 문법 및 베스트 프랙티스 참조
2. **Figma MCP**: 디자인 토큰 및 변수 시스템 구성
3. **GitHub 저장소 참조**: 레퍼런스 프로젝트 구조 분석 (MCP 아님)

## 📊 MCP 활용 결과

### ✅ 성공한 부분

#### 1. Context7 MCP 활용
- **Vue 3 Composition API**: 최신 문법으로 컴포넌트 구성
- **TypeScript**: 엄격한 타입 정의와 안전성 확보
- **TailwindCSS**: 현대적인 유틸리티 클래스 기반 스타일링
- **Vite**: 빠른 개발 환경 구성

```typescript
// Context7 MCP로 참조한 최신 Vue 3 패턴
export interface ButtonProps {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

export const Button = defineComponent<ButtonProps>({
  // 최신 Composition API 활용
})
```

#### 2. GitHub 저장소 참조 활용
- 레퍼런스 프로젝트 구조 분석 (https://github.com/line/abc-def)
- 모노레포 패턴 적용
- 패키지 의존성 관리 방식 학습
- **주의**: 별도의 GitHub MCP는 사용하지 않고 일반적인 저장소 참조

```
packages/
├── core/           # 헤드리스 로직 (radix-ui 참조)
├── tailwind/       # 디자인 토큰 시스템
├── vue/            # Vue 컴포넌트
├── storybook/      # 문서화
└── example/        # 사용 예제
```

### ❌ 실패한 부분

#### 1. Figma MCP 활용 실패
**문제점:**
- Figma의 variables 구성이 제대로 인식되지 않음
- MCP 지원 범위의 한계로 추정
- 디자인 토큰 자동 추출 실패

**대안 해결책:**
- 수동으로 디자인 토큰 시스템 구성
- TailwindCSS 커스텀 프리셋 직접 작성
- 표준 색상 팔레트 활용

```javascript
// Figma MCP 실패 후 수동 구성한 디자인 토큰
export const preset = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        // ... 수동 정의
      }
    }
  }
}
```

#### 2. reka-ui 활용 한계
**문제점:**
- reka-ui 문서화 부족
- Vue 3 생태계에서의 성숙도 부족
- 복잡한 컴포넌트 구현 시 어려움

**대안 해결책:**
- 헤드리스 UI 패턴은 유지하되 직접 구현
- 기본적인 접근성 기능 수동 구현
- 표준 HTML 시맨틱 요소 활용

## 🏗️ 아키텍처와 설계 결정

### 1. 모노레포 구조
```
@upbox2-ui/
├── core        # 헤드리스 로직, 타입 정의
├── tailwind    # 디자인 토큰, CSS 프리셋
├── vue         # Vue 컴포넌트 구현
├── storybook   # 문서화 및 테스트
└── example     # 사용 예제
```

### 2. 현대적인 디자인 시스템 원칙 적용

#### 타입 시스템
```typescript
// 일관된 크기 시스템
type Size = 'small' | 'medium' | 'large'

// 시맨틱 변형 시스템
type Variant = 'default' | 'primary' | 'secondary' | 'outline' | 'ghost'

// CVA를 활용한 변형 관리
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-gray-900 text-white hover:bg-gray-800',
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        // ...
      }
    }
  }
)
```

#### 디자인 토큰 시스템
```javascript
// 8px 그리드 시스템
const spacing = {
  '1': '0.25rem',   // 4px
  '2': '0.5rem',    // 8px
  '4': '1rem',      // 16px
  '8': '2rem',      // 32px
}

// 시맨틱 색상 시스템
const colors = {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    900: '#1e3a8a',
  }
}
```

### 3. 컴포넌트 설계 패턴

#### Composition API 활용
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { cva } from 'class-variance-authority'

interface ButtonProps {
  variant?: 'default' | 'primary'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'medium',
  disabled: false
})

const buttonClass = computed(() => 
  cva(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors',
    {
      variants: {
        variant: {
          default: 'bg-gray-900 text-white hover:bg-gray-800',
          primary: 'bg-blue-600 text-white hover:bg-blue-700',
        },
        size: {
          small: 'h-8 px-3 text-sm',
          medium: 'h-10 px-4 text-base',
          large: 'h-12 px-6 text-lg',
        }
      }
    }
  )({
    variant: props.variant,
    size: props.size
  })
)
</script>

<template>
  <button 
    :class="buttonClass"
    :disabled="disabled"
    type="button"
  >
    <slot />
  </button>
</template>
```

## 🔧 개발 과정에서의 주요 해결 과제

### 1. 모노레포 의존성 관리
**문제:** npm registry 404 오류
**해결:** `file:` 프로토콜을 사용한 로컬 의존성 관리

```json
{
  "dependencies": {
    "@upbox2-ui/core": "file:../core",
    "@upbox2-ui/tailwind": "file:../tailwind"
  }
}
```

### 2. GitHub Pages 배포 최적화
**문제:** SPA 라우팅 및 서브패스 문제
**해결:** 
- 커스텀 랜딩 페이지 생성
- Vite 빌드 설정 최적화
- GitHub Actions 워크플로우 구성

### 3. TailwindCSS 설정 문제
**문제:** 복잡한 커스텀 토큰 시스템의 충돌
**해결:** 표준 TailwindCSS 클래스 활용으로 단순화

## 📈 성과 및 학습 포인트

### 성과
1. **완전한 TypeScript 지원**: 모든 컴포넌트에 타입 정의
2. **현대적인 개발 환경**: Vite, ESM, 최신 도구 체인
3. **자동화된 배포**: GitHub Actions + GitHub Pages
4. **포괄적인 문서화**: Storybook + 예제 앱

### 학습 포인트
1. **MCP 도구의 한계와 활용법**
   - Context7: 문법 및 베스트 프랙티스 참조에 효과적
   - Figma: 아직 제한적, 수동 대안 필요
   - GitHub: 별도 MCP 없이도 저장소 참조 가능

2. **헤드리스 UI 라이브러리 선택의 중요성**
   - 생태계 성숙도 확인 필요
   - 문서화 품질 중요
   - 대안 구현 방안 준비

3. **디자인 시스템 구축의 복잡성**
   - 단순함이 때로는 더 효과적
   - 표준 도구 활용의 장점
   - 점진적 개선의 필요성

## 🔮 향후 개선 계획

### 단기 목표
1. **reka-ui 대신 직접 구현한 헤드리스 로직 개선**
2. **접근성 기능 강화**
3. **더 많은 컴포넌트 추가**

### 중기 목표
1. **Figma Plugin 개발로 디자인 토큰 자동화**
2. **테스트 커버리지 향상**
3. **성능 최적화**

### 장기 목표
1. **npm 패키지 배포**
2. **커뮤니티 기여 및 피드백 수집**
3. **다른 프레임워크 지원 (React, Svelte)**

## 📚 참고 자료

### MCP 도구
- [Context7 MCP](https://github.com/context7/mcp-server)
- [Figma MCP](https://github.com/figma/mcp-server)
- GitHub 저장소 참조 (MCP 아님)

### 기술 스택
- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Storybook](https://storybook.js.org/)

### 디자인 시스템 참고
- [Radix UI](https://www.radix-ui.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Headless UI](https://headlessui.com/)

---

## 🎤 Q&A

**Q: MCP 도구 중 가장 유용했던 것은?**
A: Context7 MCP가 가장 유용했습니다. 최신 문법과 베스트 프랙티스를 실시간으로 참조할 수 있어 개발 속도가 크게 향상되었습니다.

**Q: reka-ui를 실제로 사용하지 못한 이유는?**
A: Vue 3 생태계에서의 성숙도 부족과 문서화 부족이 주요 원인이었습니다. 대신 헤드리스 UI 패턴은 유지하면서 직접 구현하는 방향으로 선회했습니다.

**Q: 가장 큰 도전 과제는?**
A: 모노레포 환경에서의 의존성 관리와 GitHub Pages 배포 설정이었습니다. 특히 로컬 패키지 의존성과 빌드 순서 관리가 복잡했습니다.

**Q: 다음 프로젝트에서 개선하고 싶은 부분은?**
A: Figma MCP 활용 실패를 보완하기 위해 Figma Plugin 개발을 통한 디자인 토큰 자동화를 구현하고 싶습니다.
