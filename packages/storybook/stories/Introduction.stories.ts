import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta = {
  title: 'Introduction',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Welcome: Story = {
  render: () => ({
    template: `
      <div style="padding: 2rem; max-width: 800px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;">
        <h1 style="color: #333; margin-bottom: 1rem; font-size: 2.5rem; font-weight: 700;">Upbox2 UI에 오신 것을 환영합니다</h1>
        <p style="font-size: 1.1rem; line-height: 1.6; color: #666; margin-bottom: 2rem;">
          Upbox2 UI는 TypeScript와 Tailwind CSS로 구축된 현대적이고 접근 가능하며 커스터마이징이 가능한 Vue 3 컴포넌트 라이브러리입니다. 
          디자인 요구사항에 맞게 쉽게 스타일링하고 커스터마이징할 수 있는 포괄적인 헤드리스 컴포넌트 세트를 제공합니다.
          <strong>23개의 컴포넌트</strong>와 계속 증가하는 컴포넌트로 기본 폼 요소부터 복잡한 인터랙티브 컴포넌트까지 모든 UI 요구사항을 충족합니다.
        </p>
        
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 12px; margin-bottom: 2rem; color: white;">
          <h2 style="color: white; margin-bottom: 1rem; font-size: 1.5rem; font-weight: 600;">🎉 최신 업데이트</h2>
          <p style="margin: 0; opacity: 0.9; line-height: 1.5;">
            새로운 컴포넌트가 추가되었습니다: <strong>Tooltip</strong>, <strong>Drawer</strong>, <strong>Slider</strong>! 
            그리고 기존 컴포넌트들의 접근성과 커스터마이징 옵션이 대폭 개선되었습니다.
          </p>
        </div>
        
        <h2 style="color: #333; margin-bottom: 1rem; font-size: 1.8rem; font-weight: 600;">주요 기능</h2>
        <ul style="line-height: 1.8; color: #666; margin-bottom: 2rem; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem;">🎨 <strong>헤드리스 컴포넌트</strong> - 스타일링에 대한 완전한 제어</li>
          <li style="margin-bottom: 0.5rem;">⚡ <strong>Vue 3 + TypeScript</strong> - 현대적인 개발 경험</li>
          <li style="margin-bottom: 0.5rem;">🎯 <strong>Tailwind CSS</strong> - 유틸리티 우선 스타일링</li>
          <li style="margin-bottom: 0.5rem;">♿ <strong>접근성</strong> - 접근성을 고려한 설계</li>
          <li style="margin-bottom: 0.5rem;">📱 <strong>반응형</strong> - 모바일 우선 디자인</li>
          <li style="margin-bottom: 0.5rem;">🔧 <strong>커스터마이징</strong> - 쉬운 커스터마이징 및 확장</li>
          <li style="margin-bottom: 0.5rem;">⌨️ <strong>키보드 내비게이션</strong> - 완전한 키보드 지원</li>
          <li style="margin-bottom: 0.5rem;">🎪 <strong>애니메이션 지원</strong> - 부드러운 전환 및 애니메이션</li>
          <li style="margin-bottom: 0.5rem;">📦 <strong>트리 셰이킹</strong> - 필요한 것만 가져오기</li>
          <li style="margin-bottom: 0.5rem;">🌙 <strong>다크 모드</strong> - 내장된 다크 모드 지원</li>
        </ul>
        
        <h2 style="color: #333; margin-bottom: 1rem; font-size: 1.8rem; font-weight: 600;">컴포넌트</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
          <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb;">
            <h3 style="margin: 0 0 0.5rem 0; color: #333; font-size: 1.2rem; font-weight: 600;">폼 컴포넌트</h3>
            <ul style="margin: 0; padding-left: 1rem; color: #666; line-height: 1.6;">
              <li>Button</li>
              <li>Input</li>
              <li>Textarea</li>
              <li>Select</li>
              <li>Checkbox</li>
              <li>Radio</li>
              <li>Switch</li>
              <li>Slider</li>
            </ul>
          </div>
          <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb;">
            <h3 style="margin: 0 0 0.5rem 0; color: #333; font-size: 1.2rem; font-weight: 600;">레이아웃 컴포넌트</h3>
            <ul style="margin: 0; padding-left: 1rem; color: #666; line-height: 1.6;">
              <li>Card</li>
              <li>Modal</li>
              <li>Drawer</li>
              <li>Tabs</li>
              <li>Accordion</li>
            </ul>
          </div>
          <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb;">
            <h3 style="margin: 0 0 0.5rem 0; color: #333; font-size: 1.2rem; font-weight: 600;">피드백 컴포넌트</h3>
            <ul style="margin: 0; padding-left: 1rem; color: #666; line-height: 1.6;">
              <li>Alert</li>
              <li>Badge</li>
              <li>Toast</li>
              <li>Progress</li>
              <li>Tooltip</li>
            </ul>
          </div>
          <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb;">
            <h3 style="margin: 0 0 0.5rem 0; color: #333; font-size: 1.2rem; font-weight: 600;">표시 컴포넌트</h3>
            <ul style="margin: 0; padding-left: 1rem; color: #666; line-height: 1.6;">
              <li>Avatar</li>
              <li>Skeleton</li>
              <li>Dropdown</li>
              <li>Breadcrumb</li>
            </ul>
          </div>
          <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb;">
            <h3 style="margin: 0 0 0.5rem 0; color: #333; font-size: 1.2rem; font-weight: 600;">내비게이션 컴포넌트</h3>
            <ul style="margin: 0; padding-left: 1rem; color: #666; line-height: 1.6;">
              <li>Pagination</li>
              <li>Breadcrumb</li>
              <li>Tabs</li>
            </ul>
          </div>
        </div>
        
        <h2 style="color: #333; margin-bottom: 1rem; font-size: 1.8rem; font-weight: 600;">시작하기</h2>
        <div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; border: 1px solid #e2e8f0;">
          <h3 style="margin: 0 0 1rem 0; color: #333; font-size: 1.3rem; font-weight: 600;">설치</h3>
          <pre style="background: #2d3748; color: #e2e8f0; padding: 1rem; border-radius: 6px; margin: 0; font-family: 'Fira Code', monospace; overflow-x: auto;">npm install @upbox2-ui/vue @upbox2-ui/tailwind</pre>
        </div>
        
        <div style="background: #f0fff4; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; border: 1px solid #c6f6d5;">
          <h3 style="margin: 0 0 1rem 0; color: #333; font-size: 1.3rem; font-weight: 600;">빠른 예제</h3>
          <pre style="background: #2d3748; color: #e2e8f0; padding: 1rem; border-radius: 6px; margin: 0; font-family: 'Fira Code', monospace; overflow-x: auto; font-size: 0.9rem; line-height: 1.4;">
&lt;template&gt;
  &lt;div&gt;
    &lt;Button variant="primary" @click="showToast"&gt;토스트 표시&lt;/Button&gt;
    &lt;Toast v-if="toastVisible" title="성공!" /&gt;
    
    &lt;Tooltip content="드로어 열기" position="top"&gt;
      &lt;Button @click="openDrawer"&gt;드로어 열기&lt;/Button&gt;
    &lt;/Tooltip&gt;
    
    &lt;Drawer v-model="drawerOpen" position="right"&gt;
      &lt;h2&gt;드로어 내용&lt;/h2&gt;
      &lt;Slider v-model="sliderValue" :min="0" :max="100" /&gt;
    &lt;/Drawer&gt;
  &lt;/div&gt;
&lt;/template&gt;</pre>
        </div>
        
        <p style="line-height: 1.6; color: #666; margin-bottom: 1rem;">
          각 컴포넌트는 애플리케이션 전반에 걸쳐 일관성을 유지하면서 완전히 커스터마이징 가능하도록 설계되었습니다.
          사이드바의 컴포넌트들을 둘러보며 예제와 문서를 확인해보세요.
        </p>
        
        <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; border-left: 4px solid #3b82f6; margin-bottom: 1rem;">
          <p style="margin: 0; color: #475569; line-height: 1.5;">
            💡 <strong>팁:</strong> 각 스토리의 "Controls" 탭을 사용하여 컴포넌트 props를 실시간으로 조작해보세요.
          </p>
        </div>
        
        <div style="background: #fef7f0; padding: 1rem; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 1rem;">
          <p style="margin: 0; color: #92400e; line-height: 1.5;">
            🎨 <strong>스타일링:</strong> 모든 컴포넌트는 커스텀 CSS 클래스를 지원하며 Tailwind 유틸리티로 스타일링할 수 있습니다.
          </p>
        </div>
        
        <div style="background: #f0f9ff; padding: 1rem; border-radius: 8px; border-left: 4px solid #06b6d4; margin-bottom: 1rem;">
          <p style="margin: 0; color: #0e7490; line-height: 1.5;">
            ⌨️ <strong>접근성:</strong> 모든 컴포넌트에는 적절한 ARIA 속성과 키보드 내비게이션이 포함되어 있습니다.
          </p>
        </div>
        
        <div style="background: #ecfdf5; padding: 1rem; border-radius: 8px; border-left: 4px solid #10b981; margin-top: 2rem;">
          <p style="margin: 0; color: #065f46; line-height: 1.5;">
            🚀 <strong>성능:</strong> 컴포넌트는 번들 크기와 런타임 성능에 최적화되어 있습니다.
          </p>
        </div>
      </div>
    `
  })
}
