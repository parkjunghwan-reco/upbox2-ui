<template>
  <div class="min-h-screen bg-background text-foreground">
    <div class="container mx-auto px-4 py-8">
      <header class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">Upbox2 UI Example</h1>
        <p class="text-xl text-muted-foreground">
          A modern Vue 3 + TypeScript + TailwindCSS design system
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Button Examples -->
        <div class="bg-card p-6 rounded-lg border">
          <h2 class="text-2xl font-semibold mb-4">Buttons</h2>
          <div class="space-y-3">
            <div class="flex flex-wrap gap-2">
              <Button variant="default" size="small">Default</Button>
              <Button variant="primary" size="small">Primary</Button>
              <Button variant="secondary" size="small">Secondary</Button>
            </div>
            <div class="flex flex-wrap gap-2">
              <Button variant="outline" size="medium">Outline</Button>
              <Button variant="ghost" size="medium">Ghost</Button>
              <Button variant="link" size="medium">Link</Button>
            </div>
            <div class="flex flex-wrap gap-2">
              <Button variant="primary" size="large">Large Button</Button>
              <Button variant="primary" size="large" :disabled="true">
                Disabled
              </Button>
            </div>
          </div>
        </div>

        <!-- Input Examples -->
        <div class="bg-card p-6 rounded-lg border">
          <h2 class="text-2xl font-semibold mb-4">Inputs</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Text Input</label>
              <Input 
                v-model="textInput" 
                placeholder="Enter text..."
                size="medium"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Email Input</label>
              <Input 
                v-model="emailInput" 
                type="email"
                placeholder="Enter email..."
                size="medium"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Password Input</label>
              <Input 
                v-model="passwordInput" 
                type="password"
                placeholder="Enter password..."
                size="medium"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Input with Error</label>
              <Input 
                v-model="errorInput" 
                placeholder="This has an error..."
                size="medium"
                error="This field is required"
              />
            </div>
          </div>
        </div>

        <!-- Modal Example -->
        <div class="bg-card p-6 rounded-lg border">
          <h2 class="text-2xl font-semibold mb-4">Modal</h2>
          <div class="space-y-4">
            <Button variant="primary" @click="isModalOpen = true">
              Open Modal
            </Button>
            
            <Modal v-model:open="isModalOpen">
              <div class="p-6">
                <h3 class="text-lg font-semibold mb-4">Modal Title</h3>
                <p class="text-muted-foreground mb-6">
                  This is a modal dialog. You can close it by clicking the backdrop,
                  pressing the Escape key, or clicking the close button.
                </p>
                <div class="flex justify-end space-x-2">
                  <Button variant="outline" @click="isModalOpen = false">
                    Cancel
                  </Button>
                  <Button variant="primary" @click="isModalOpen = false">
                    Confirm
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </div>

        <!-- Card Examples -->
        <div class="bg-card p-6 rounded-lg border">
          <h2 class="text-2xl font-semibold mb-4">Cards</h2>
          <div class="space-y-4">
            <Card variant="default" padding="medium">
              <h3 class="font-semibold mb-2">Default Card</h3>
              <p class="text-sm text-muted-foreground">
                This is a default card with medium padding.
              </p>
            </Card>
            
            <Card variant="outline" padding="small">
              <h3 class="font-semibold mb-2">Outline Card</h3>
              <p class="text-sm text-muted-foreground">
                This is an outline card with small padding.
              </p>
            </Card>
            
            <Card variant="default" padding="large">
              <h3 class="font-semibold mb-2">Large Padding</h3>
              <p class="text-sm text-muted-foreground">
                This card has large padding for more spacious content.
              </p>
            </Card>
          </div>
        </div>

        <!-- Badge Examples -->
        <div class="bg-card p-6 rounded-lg border">
          <h2 class="text-2xl font-semibold mb-4">Badges</h2>
          <div class="space-y-4">
            <div class="flex flex-wrap gap-2">
              <Badge variant="default" size="small">Default</Badge>
              <Badge variant="primary" size="small">Primary</Badge>
              <Badge variant="secondary" size="small">Secondary</Badge>
            </div>
            <div class="flex flex-wrap gap-2">
              <Badge variant="success" size="medium">Success</Badge>
              <Badge variant="warning" size="medium">Warning</Badge>
              <Badge variant="error" size="medium">Error</Badge>
            </div>
            <div class="flex flex-wrap gap-2">
              <Badge variant="primary" size="large">Large Badge</Badge>
            </div>
          </div>
        </div>

        <!-- Switch Examples -->
        <div class="bg-card p-6 rounded-lg border">
          <h2 class="text-2xl font-semibold mb-4">Switches</h2>
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <Switch v-model="switchState1" size="small" />
              <label class="text-sm">Small Switch</label>
            </div>
            <div class="flex items-center space-x-2">
              <Switch v-model="switchState2" size="medium" />
              <label class="text-sm">Medium Switch</label>
            </div>
            <div class="flex items-center space-x-2">
              <Switch v-model="switchState3" size="large" />
              <label class="text-sm">Large Switch</label>
            </div>
            <div class="flex items-center space-x-2">
              <Switch v-model="switchStateDisabled" :disabled="true" />
              <label class="text-sm text-muted-foreground">Disabled Switch</label>
            </div>
          </div>
        </div>

        <!-- Checkbox Examples -->
        <div class="bg-card p-6 rounded-lg border">
          <h2 class="text-2xl font-semibold mb-4">Checkboxes</h2>
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <Checkbox v-model="checkboxState1" size="small" />
              <label class="text-sm">Small Checkbox</label>
            </div>
            <div class="flex items-center space-x-2">
              <Checkbox v-model="checkboxState2" size="medium" />
              <label class="text-sm">Medium Checkbox</label>
            </div>
            <div class="flex items-center space-x-2">
              <Checkbox v-model="checkboxState3" size="large" />
              <label class="text-sm">Large Checkbox</label>
            </div>
            <div class="flex items-center space-x-2">
              <Checkbox v-model="checkboxStateDisabled" :disabled="true" />
              <label class="text-sm text-muted-foreground">Disabled Checkbox</label>
            </div>
            <div class="flex items-center space-x-2">
              <Checkbox v-model="checkboxStateIndeterminate" :indeterminate="true" />
              <label class="text-sm">Indeterminate Checkbox</label>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Components -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Textarea Examples -->
        <div class="bg-card p-6 rounded-lg border">
          <h2 class="text-2xl font-semibold mb-4">Textarea</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Small Textarea</label>
              <Textarea
                v-model="textareaValue1"
                placeholder="Enter your message..."
                size="small"
                :rows="2"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Medium Textarea</label>
              <Textarea
                v-model="textareaValue2"
                placeholder="Enter your message..."
                size="medium"
                :rows="3"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Large Textarea</label>
              <Textarea
                v-model="textareaValue3"
                placeholder="Enter your message..."
                size="large"
                :rows="4"
              />
            </div>
          </div>
        </div>

        <!-- Alert Examples -->
        <div class="bg-card p-6 rounded-lg border">
          <h2 class="text-2xl font-semibold mb-4">Alerts</h2>
          <div class="space-y-4">
            <Alert variant="info" title="Info Alert" description="This is an informational alert." />
            <Alert variant="success" title="Success Alert" description="This is a success alert." />
            <Alert variant="warning" title="Warning Alert" description="This is a warning alert." />
            <Alert variant="error" title="Error Alert" description="This is an error alert." :closable="true" />
            <Alert variant="default" :closable="true">
              <strong>Custom Alert</strong> - This is a custom alert with slot content.
            </Alert>
          </div>
        </div>

        <!-- More Components Placeholder -->
        <div class="bg-card p-6 rounded-lg border">
          <h2 class="text-2xl font-semibold mb-4">Select & Radio</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Select Option</label>
              <Select
                v-model="selectedValue"
                :options="selectOptions"
                placeholder="Choose an option..."
                size="medium"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Radio Options</label>
              <Radio
                v-model="radioValue"
                :options="radioOptions"
                size="medium"
              />
            </div>
          </div>
        </div>

        <!-- More Components Info -->
        <div class="bg-card p-6 rounded-lg border">
          <h2 class="text-2xl font-semibold mb-4">More Components</h2>
          <div class="space-y-4">
            <p class="text-sm text-muted-foreground">
              This design system includes many more components like Select, Radio, Accordion, 
              Tabs, and more. Each component is built with accessibility in mind and follows 
              modern design patterns.
            </p>
            <div class="flex space-x-2">
              <Badge variant="primary" size="small">Vue 3</Badge>
              <Badge variant="secondary" size="small">TypeScript</Badge>
              <Badge variant="success" size="small">Tailwind CSS</Badge>
            </div>
          </div>
        </div>
      </div>

      <!-- Component States Display -->
      <div class="mt-12 bg-card p-6 rounded-lg border">
        <h2 class="text-2xl font-semibold mb-4">Component States</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 class="text-lg font-medium mb-2">Form Values</h3>
            <pre class="bg-muted p-4 rounded text-sm">{{ formValues }}</pre>
          </div>
          <div>
            <h3 class="text-lg font-medium mb-2">Toggle States</h3>
            <div class="space-y-2">
              <div class="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="small"
                  @click="toggleState.toggle()"
                >
                  Toggle: {{ toggleState.state.value ? 'ON' : 'OFF' }}
                </Button>
              </div>
              <div class="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="small"
                  @click="disclosureState.toggle()"
                >
                  Disclosure: {{ disclosureState.isOpen.value ? 'Open' : 'Closed' }}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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
  useToggle, 
  useDisclosure 
} from '@upbox2-ui/vue'
import type { SelectOption, RadioOption } from '@upbox2-ui/vue'

// Form state
const textInput = ref('')
const emailInput = ref('')
const passwordInput = ref('')
const errorInput = ref('')

// Textarea states
const textareaValue1 = ref('')
const textareaValue2 = ref('')
const textareaValue3 = ref('')

// Modal state
const isModalOpen = ref(false)

// Switch states
const switchState1 = ref(false)
const switchState2 = ref(true)
const switchState3 = ref(false)
const switchStateDisabled = ref(false)

// Checkbox states
const checkboxState1 = ref(false)
const checkboxState2 = ref(true)
const checkboxState3 = ref(false)
const checkboxStateDisabled = ref(false)
const checkboxStateIndeterminate = ref(false)

// Select states
const selectedValue = ref('')
const selectOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4 (Disabled)', disabled: true },
]

// Radio states
const radioValue = ref('')
const radioOptions: RadioOption[] = [
  { value: 'radio1', label: 'Radio Option 1' },
  { value: 'radio2', label: 'Radio Option 2' },
  { value: 'radio3', label: 'Radio Option 3' },
  { value: 'radio4', label: 'Radio Option 4 (Disabled)', disabled: true },
]

// Composables
const toggleState = useToggle({ initialValue: false })
const disclosureState = useDisclosure({ initialOpen: false })

// Computed values
const formValues = computed(() => ({
  textInput: textInput.value,
  emailInput: emailInput.value,
  passwordInput: passwordInput.value,
  errorInput: errorInput.value,
  textareaValue1: textareaValue1.value,
  textareaValue2: textareaValue2.value,
  textareaValue3: textareaValue3.value,
  switchState1: switchState1.value,
  switchState2: switchState2.value,
  switchState3: switchState3.value,
  checkboxState1: checkboxState1.value,
  checkboxState2: checkboxState2.value,
  checkboxState3: checkboxState3.value,
  selectedValue: selectedValue.value,
  radioValue: radioValue.value,
}))
</script>
