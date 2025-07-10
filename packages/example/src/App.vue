<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Upbox2 UI Example</h1>
        <p class="text-lg text-gray-600">A comprehensive example showcasing all components</p>
      </div>

      <!-- Form Example -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-6">Form Components</h2>
        
        <div class="space-y-6">
          <!-- Buttons -->
          <div>
            <h3 class="text-lg font-medium mb-3">Buttons</h3>
            <div class="space-x-4">
              <Button variant="primary" size="small">Small</Button>
              <Button variant="primary" size="medium">Medium</Button>
              <Button variant="primary" size="large">Large</Button>
              <Button variant="secondary" size="medium">Secondary</Button>
              <Button variant="outline" size="medium">Outline</Button>
              <Button variant="ghost" size="medium">Ghost</Button>
              <Button variant="primary" size="medium" disabled>Disabled</Button>
            </div>
          </div>

          <!-- Inputs -->
          <div>
            <h3 class="text-lg font-medium mb-3">Inputs</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input v-model="formData.name" placeholder="Your name" />
              <Input v-model="formData.email" type="email" placeholder="Your email" />
              <Input v-model="formData.phone" placeholder="Phone number" disabled />
              <Input v-model="formData.search" placeholder="Search..." size="large" />
            </div>
          </div>

          <!-- Textarea -->
          <div>
            <h3 class="text-lg font-medium mb-3">Textarea</h3>
            <Textarea 
              v-model="formData.message"
              placeholder="Enter your message..."
              :rows="4"
            />
          </div>

          <!-- Select -->
          <div>
            <h3 class="text-lg font-medium mb-3">Select</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select 
                v-model="formData.country"
                :options="countryOptions"
                placeholder="Select country"
              />
              <Select 
                v-model="formData.city"
                :options="cityOptions"
                placeholder="Select city"
                disabled
              />
            </div>
          </div>

          <!-- Radio -->
          <div>
            <h3 class="text-lg font-medium mb-3">Radio</h3>
            <Radio 
              v-model="formData.gender"
              :options="genderOptions"
              name="gender"
            />
          </div>

          <!-- Checkbox -->
          <div>
            <h3 class="text-lg font-medium mb-3">Checkbox</h3>
            <div class="space-y-3">
              <Checkbox 
                v-model="formData.newsletter"
                label="Subscribe to newsletter"
              />
              <Checkbox 
                v-model="formData.terms"
                label="I agree to the terms and conditions"
              />
              <Checkbox 
                v-model="formData.marketing"
                label="Marketing communications (disabled)"
                disabled
              />
            </div>
          </div>

          <!-- Switch -->
          <div>
            <h3 class="text-lg font-medium mb-3">Switch</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <Switch v-model="formData.notifications" />
                <span>Enable notifications</span>
              </div>
              <div class="flex items-center space-x-3">
                <Switch v-model="formData.darkMode" size="large" />
                <span>Dark mode</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Display Components -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-6">Display Components</h2>
        
        <div class="space-y-6">
          <!-- Badges -->
          <div>
            <h3 class="text-lg font-medium mb-3">Badges</h3>
            <div class="space-x-2">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="secondary">Outline</Badge>
            </div>
          </div>

          <!-- Alerts -->
          <div>
            <h3 class="text-lg font-medium mb-3">Alerts</h3>
            <div class="space-y-3">
              <Alert 
                variant="info"
                title="Information"
                description="This is an informational alert message."
                :closable="true"
              />
              <Alert 
                variant="success"
                title="Success"
                description="Your action was completed successfully."
                :closable="true"
              />
              <Alert 
                variant="warning"
                title="Warning"
                description="Please review the information before proceeding."
                :closable="true"
              />
              <Alert 
                variant="error"
                title="Error"
                description="There was an error processing your request."
                :closable="true"
              />
            </div>
          </div>

          <!-- Cards -->
          <div>
            <h3 class="text-lg font-medium mb-3">Cards</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <template #header>
                  <h4 class="font-semibold">Card Title</h4>
                </template>
                <p class="text-gray-600">
                  This is a sample card with some content. Cards are great for organizing information.
                </p>
                <template #footer>
                  <Button variant="primary" size="small">Action</Button>
                </template>
              </Card>
              
              <Card variant="outline">
                <template #header>
                  <h4 class="font-semibold">Bordered Card</h4>
                </template>
                <p class="text-gray-600">
                  This card has a border variant for better visual separation.
                </p>
                <template #footer>
                  <div class="flex space-x-2">
                    <Button variant="outline" size="small">Cancel</Button>
                    <Button variant="primary" size="small">Save</Button>
                  </div>
                </template>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <!-- Interactive Example -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-semibold mb-6">Interactive Example</h2>
        
        <div class="space-y-4">
          <div class="flex items-center space-x-4">
            <Button @click="showModal = true" variant="primary">
              Open Modal
            </Button>
            <Button @click="resetForm" variant="outline">
              Reset Form
            </Button>
          </div>

          <!-- Form Data Display -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold mb-2">Form Data:</h4>
            <pre class="text-sm text-gray-700">{{ JSON.stringify(formData, null, 2) }}</pre>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <Modal v-model:open="showModal" title="Example Modal">
        <div class="space-y-4">
          <p class="text-gray-600">
            This is an example modal dialog. You can place any content here.
          </p>
          
          <div class="space-y-3">
            <Input v-model="modalData.name" placeholder="Name" />
            <Textarea v-model="modalData.message" placeholder="Message" :rows="3" />
          </div>
        </div>
        
        <template #footer>
          <div class="flex justify-end space-x-2">
            <Button @click="showModal = false" variant="outline">
              Cancel
            </Button>
            <Button @click="saveModal" variant="primary">
              Save
            </Button>
          </div>
        </template>
      </Modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  Button,
  Input,
  Textarea,
  Select,
  Radio,
  Checkbox,
  Switch,
  Badge,
  Alert,
  Card,
  Modal,
} from '@upbox2-ui/vue'

// Form data
const formData = reactive({
  name: '',
  email: '',
  phone: '+1 (555) 123-4567',
  search: '',
  message: '',
  country: '',
  city: '',
  gender: 'male',
  newsletter: false,
  terms: false,
  marketing: false,
  notifications: true,
  darkMode: false,
})

// Modal data
const modalData = reactive({
  name: '',
  message: '',
})

// Modal state
const showModal = ref(false)

// Options
const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
]

const cityOptions = [
  { value: 'nyc', label: 'New York' },
  { value: 'la', label: 'Los Angeles' },
  { value: 'chi', label: 'Chicago' },
  { value: 'sf', label: 'San Francisco' },
]

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
]

// Methods
const resetForm = () => {
  Object.assign(formData, {
    name: '',
    email: '',
    phone: '+1 (555) 123-4567',
    search: '',
    message: '',
    country: '',
    city: '',
    gender: 'male',
    newsletter: false,
    terms: false,
    marketing: false,
    notifications: true,
    darkMode: false,
  })
}

const saveModal = () => {
  console.log('Modal data:', modalData)
  showModal.value = false
  // Reset modal data
  modalData.name = ''
  modalData.message = ''
}
</script>
