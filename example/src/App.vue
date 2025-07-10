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
import { Button, Input, Modal, useToggle, useDisclosure } from '@upbox2-ui/vue'

// Form state
const textInput = ref('')
const emailInput = ref('')
const passwordInput = ref('')
const errorInput = ref('')

// Modal state
const isModalOpen = ref(false)

// Composables
const toggleState = useToggle({ initialValue: false })
const disclosureState = useDisclosure({ initialOpen: false })

// Computed values
const formValues = computed(() => ({
  textInput: textInput.value,
  emailInput: emailInput.value,
  passwordInput: passwordInput.value,
  errorInput: errorInput.value,
}))
</script>
