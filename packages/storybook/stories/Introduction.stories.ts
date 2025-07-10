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
        <h1 style="color: #333; margin-bottom: 1rem; font-size: 2.5rem; font-weight: 700;">Welcome to Upbox2 UI</h1>
        <p style="font-size: 1.1rem; line-height: 1.6; color: #666; margin-bottom: 2rem;">
          Upbox2 UI is a modern, accessible, and customizable Vue 3 component library built with TypeScript and Tailwind CSS. 
          It provides a comprehensive set of headless components that you can easily style and customize to match your design needs.
          With <strong>23 components</strong> and growing, it covers all your UI needs from basic form elements to complex interactive components.
        </p>
        
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 12px; margin-bottom: 2rem; color: white;">
          <h2 style="color: white; margin-bottom: 1rem; font-size: 1.5rem; font-weight: 600;">🎉 Latest Updates</h2>
          <p style="margin: 0; opacity: 0.9; line-height: 1.5;">
            New components added: <strong>Tooltip</strong>, <strong>Drawer</strong>, and <strong>Slider</strong>! 
            Plus comprehensive updates to existing components with improved accessibility and customization options.
          </p>
        </div>
        
        <h2 style="color: #333; margin-bottom: 1rem; font-size: 1.8rem; font-weight: 600;">Features</h2>
        <ul style="line-height: 1.8; color: #666; margin-bottom: 2rem; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem;">🎨 <strong>Headless Components</strong> - Complete control over styling</li>
          <li style="margin-bottom: 0.5rem;">⚡ <strong>Vue 3 + TypeScript</strong> - Modern development experience</li>
          <li style="margin-bottom: 0.5rem;">🎯 <strong>Tailwind CSS</strong> - Utility-first styling</li>
          <li style="margin-bottom: 0.5rem;">♿ <strong>Accessible</strong> - Built with accessibility in mind</li>
          <li style="margin-bottom: 0.5rem;">📱 <strong>Responsive</strong> - Mobile-first design</li>
          <li style="margin-bottom: 0.5rem;">🔧 <strong>Customizable</strong> - Easy to customize and extend</li>
          <li style="margin-bottom: 0.5rem;">⌨️ <strong>Keyboard Navigation</strong> - Full keyboard support</li>
          <li style="margin-bottom: 0.5rem;">🎪 <strong>Animation Support</strong> - Smooth transitions and animations</li>
          <li style="margin-bottom: 0.5rem;">📦 <strong>Tree Shakeable</strong> - Only import what you need</li>
          <li style="margin-bottom: 0.5rem;">🌙 <strong>Dark Mode Ready</strong> - Built-in dark mode support</li>
        </ul>
        
        <h2 style="color: #333; margin-bottom: 1rem; font-size: 1.8rem; font-weight: 600;">Components</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
          <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb;">
            <h3 style="margin: 0 0 0.5rem 0; color: #333; font-size: 1.2rem; font-weight: 600;">Form Components</h3>
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
            <h3 style="margin: 0 0 0.5rem 0; color: #333; font-size: 1.2rem; font-weight: 600;">Layout Components</h3>
            <ul style="margin: 0; padding-left: 1rem; color: #666; line-height: 1.6;">
              <li>Card</li>
              <li>Modal</li>
              <li>Drawer</li>
              <li>Tabs</li>
              <li>Accordion</li>
            </ul>
          </div>
          <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb;">
            <h3 style="margin: 0 0 0.5rem 0; color: #333; font-size: 1.2rem; font-weight: 600;">Feedback Components</h3>
            <ul style="margin: 0; padding-left: 1rem; color: #666; line-height: 1.6;">
              <li>Alert</li>
              <li>Badge</li>
              <li>Toast</li>
              <li>Progress</li>
              <li>Tooltip</li>
            </ul>
          </div>
          <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb;">
            <h3 style="margin: 0 0 0.5rem 0; color: #333; font-size: 1.2rem; font-weight: 600;">Display Components</h3>
            <ul style="margin: 0; padding-left: 1rem; color: #666; line-height: 1.6;">
              <li>Avatar</li>
              <li>Skeleton</li>
              <li>Dropdown</li>
              <li>Breadcrumb</li>
            </ul>
          </div>
          <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb;">
            <h3 style="margin: 0 0 0.5rem 0; color: #333; font-size: 1.2rem; font-weight: 600;">Navigation Components</h3>
            <ul style="margin: 0; padding-left: 1rem; color: #666; line-height: 1.6;">
              <li>Pagination</li>
              <li>Breadcrumb</li>
              <li>Tabs</li>
            </ul>
          </div>
        </div>
        
        <h2 style="color: #333; margin-bottom: 1rem; font-size: 1.8rem; font-weight: 600;">Getting Started</h2>
        <div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; border: 1px solid #e2e8f0;">
          <h3 style="margin: 0 0 1rem 0; color: #333; font-size: 1.3rem; font-weight: 600;">Installation</h3>
          <pre style="background: #2d3748; color: #e2e8f0; padding: 1rem; border-radius: 6px; margin: 0; font-family: 'Fira Code', monospace; overflow-x: auto;">npm install @upbox2-ui/vue @upbox2-ui/tailwind</pre>
        </div>
        
        <div style="background: #f0fff4; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; border: 1px solid #c6f6d5;">
          <h3 style="margin: 0 0 1rem 0; color: #333; font-size: 1.3rem; font-weight: 600;">Quick Example</h3>
          <pre style="background: #2d3748; color: #e2e8f0; padding: 1rem; border-radius: 6px; margin: 0; font-family: 'Fira Code', monospace; overflow-x: auto; font-size: 0.9rem; line-height: 1.4;">
&lt;template&gt;
  &lt;div&gt;
    &lt;Button variant="primary" @click="showToast"&gt;Show Toast&lt;/Button&gt;
    &lt;Toast v-if="toastVisible" title="Success!" /&gt;
    
    &lt;Tooltip content="Click to open drawer" position="top"&gt;
      &lt;Button @click="openDrawer"&gt;Open Drawer&lt;/Button&gt;
    &lt;/Tooltip&gt;
    
    &lt;Drawer v-model="drawerOpen" position="right"&gt;
      &lt;h2&gt;Drawer Content&lt;/h2&gt;
      &lt;Slider v-model="sliderValue" :min="0" :max="100" /&gt;
    &lt;/Drawer&gt;
  &lt;/div&gt;
&lt;/template&gt;</pre>
        </div>
        
        <p style="line-height: 1.6; color: #666; margin-bottom: 1rem;">
          Each component is designed to be fully customizable while maintaining consistency across your application.
          Browse through the components in the sidebar to see examples and documentation.
        </p>
        
        <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; border-left: 4px solid #3b82f6; margin-bottom: 1rem;">
          <p style="margin: 0; color: #475569; line-height: 1.5;">
            💡 <strong>Tip:</strong> Use the "Controls" tab in each story to interact with component props in real-time.
          </p>
        </div>
        
        <div style="background: #fef7f0; padding: 1rem; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 1rem;">
          <p style="margin: 0; color: #92400e; line-height: 1.5;">
            🎨 <strong>Styling:</strong> All components support custom CSS classes and can be styled with Tailwind utilities.
          </p>
        </div>
        
        <div style="background: #f0f9ff; padding: 1rem; border-radius: 8px; border-left: 4px solid #06b6d4; margin-bottom: 1rem;">
          <p style="margin: 0; color: #0e7490; line-height: 1.5;">
            ⌨️ <strong>Accessibility:</strong> Every component includes proper ARIA attributes and keyboard navigation.
          </p>
        </div>
        
        <div style="background: #ecfdf5; padding: 1rem; border-radius: 8px; border-left: 4px solid #10b981; margin-top: 2rem;">
          <p style="margin: 0; color: #065f46; line-height: 1.5;">
            🚀 <strong>Performance:</strong> Components are optimized for bundle size and runtime performance.
          </p>
        </div>
      </div>
    `
  })
}
