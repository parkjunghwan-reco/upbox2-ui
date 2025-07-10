import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { Slider } from '@upbox2-ui/vue'

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A slider component for selecting a value or range of values.'
      }
    }
  },
  argTypes: {
    modelValue: {
      control: 'number',
      description: 'The current value of the slider'
    },
    min: {
      control: 'number',
      description: 'The minimum value'
    },
    max: {
      control: 'number',
      description: 'The maximum value'
    },
    step: {
      control: 'number',
      description: 'The step increment'
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the slider'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the slider'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled'
    },
    showValue: {
      control: 'boolean',
      description: 'Whether to show the current value'
    },
    showTicks: {
      control: 'boolean',
      description: 'Whether to show tick marks'
    },
    range: {
      control: 'boolean',
      description: 'Whether the slider is a range slider'
    }
  }
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  render: (args) => ({
    components: { Slider },
    setup() {
      const value = ref(50)
      return { args, value }
    },
    template: `
      <div class="w-80">
        <Slider v-model="value" v-bind="args" />
        <p class="mt-4 text-sm text-gray-600">Current value: {{ value }}</p>
      </div>
    `
  }),
  args: {
    min: 0,
    max: 100,
    step: 1,
    orientation: 'horizontal',
    size: 'md',
    disabled: false,
    showValue: false,
    showTicks: false,
    range: false
  }
}

export const WithValue: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref(25)
      return { value }
    },
    template: `
      <div class="w-80">
        <Slider v-model="value" :show-value="true" />
        <p class="mt-4 text-sm text-gray-600">Current value: {{ value }}</p>
      </div>
    `
  })
}

export const WithTicks: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref(60)
      return { value }
    },
    template: `
      <div class="w-80">
        <Slider 
          v-model="value" 
          :show-ticks="true" 
          :tick-step="20"
          :show-value="true"
        />
        <p class="mt-4 text-sm text-gray-600">Current value: {{ value }}</p>
      </div>
    `
  })
}

export const Range: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref([20, 80])
      return { value }
    },
    template: `
      <div class="w-80">
        <Slider 
          v-model="value" 
          :range="true"
          :show-value="true"
        />
        <p class="mt-4 text-sm text-gray-600">Current range: {{ value[0] }} - {{ value[1] }}</p>
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const smallValue = ref(30)
      const mediumValue = ref(50)
      const largeValue = ref(70)
      return { smallValue, mediumValue, largeValue }
    },
    template: `
      <div class="space-y-8">
        <div class="w-80">
          <h3 class="text-sm font-medium mb-2">Small</h3>
          <Slider v-model="smallValue" size="sm" :show-value="true" />
        </div>
        <div class="w-80">
          <h3 class="text-sm font-medium mb-2">Medium</h3>
          <Slider v-model="mediumValue" size="md" :show-value="true" />
        </div>
        <div class="w-80">
          <h3 class="text-sm font-medium mb-2">Large</h3>
          <Slider v-model="largeValue" size="lg" :show-value="true" />
        </div>
      </div>
    `
  })
}

export const Vertical: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref(40)
      return { value }
    },
    template: `
      <div class="flex items-center space-x-8">
        <div class="h-64">
          <Slider 
            v-model="value" 
            orientation="vertical"
            :show-value="true"
          />
        </div>
        <p class="text-sm text-gray-600">Current value: {{ value }}</p>
      </div>
    `
  })
}

export const Steps: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value1 = ref(50)
      const value2 = ref(50)
      const value3 = ref(50)
      return { value1, value2, value3 }
    },
    template: `
      <div class="space-y-8">
        <div class="w-80">
          <h3 class="text-sm font-medium mb-2">Step: 1</h3>
          <Slider v-model="value1" :step="1" :show-value="true" />
        </div>
        <div class="w-80">
          <h3 class="text-sm font-medium mb-2">Step: 5</h3>
          <Slider v-model="value2" :step="5" :show-value="true" />
        </div>
        <div class="w-80">
          <h3 class="text-sm font-medium mb-2">Step: 10</h3>
          <Slider v-model="value3" :step="10" :show-value="true" />
        </div>
      </div>
    `
  })
}

export const Disabled: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref(75)
      return { value }
    },
    template: `
      <div class="w-80">
        <Slider 
          v-model="value" 
          :disabled="true"
          :show-value="true"
        />
        <p class="mt-4 text-sm text-gray-600">This slider is disabled</p>
      </div>
    `
  })
}
