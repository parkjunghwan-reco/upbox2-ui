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
        </p>
        
        <h2 style="color: #333; margin-bottom: 1rem; font-size: 1.8rem; font-weight: 600;">Features</h2>
        <ul style="line-height: 1.8; color: #666; margin-bottom: 2rem; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem;">🎨 <strong>Headless Components</strong> - Complete control over styling</li>
          <li style="margin-bottom: 0.5rem;">⚡ <strong>Vue 3 + TypeScript</strong> - Modern development experience</li>
          <li style="margin-bottom: 0.5rem;">🎯 <strong>Tailwind CSS</strong> - Utility-first styling</li>
          <li style="margin-bottom: 0.5rem;">♿ <strong>Accessible</strong> - Built with accessibility in mind</li>
          <li style="margin-bottom: 0.5rem;">📱 <strong>Responsive</strong> - Mobile-first design</li>
          <li style="margin-bottom: 0.5rem;">🔧 <strong>Customizable</strong> - Easy to customize and extend</li>
        </ul>
        
        <h2 style="color: #333; margin-bottom: 1rem; font-size: 1.8rem; font-weight: 600;">Components</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
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
            </ul>
          </div>
          <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb;">
            <h3 style="margin: 0 0 0.5rem 0; color: #333; font-size: 1.2rem; font-weight: 600;">Layout Components</h3>
            <ul style="margin: 0; padding-left: 1rem; color: #666; line-height: 1.6;">
              <li>Card</li>
              <li>Modal</li>
            </ul>
          </div>
          <div style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb;">
            <h3 style="margin: 0 0 0.5rem 0; color: #333; font-size: 1.2rem; font-weight: 600;">Feedback Components</h3>
            <ul style="margin: 0; padding-left: 1rem; color: #666; line-height: 1.6;">
              <li>Alert</li>
              <li>Badge</li>
            </ul>
          </div>
        </div>
        
        <h2 style="color: #333; margin-bottom: 1rem; font-size: 1.8rem; font-weight: 600;">Getting Started</h2>
        <p style="line-height: 1.6; color: #666; margin-bottom: 1rem;">
          Each component is designed to be fully customizable while maintaining consistency across your application.
          Browse through the components in the sidebar to see examples and documentation.
        </p>
        
        <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; border-left: 4px solid #3b82f6; margin-top: 2rem;">
          <p style="margin: 0; color: #475569; line-height: 1.5;">
            💡 <strong>Tip:</strong> Use the "Controls" tab in each story to interact with component props in real-time.
          </p>
        </div>
      </div>
    `
  })
}
