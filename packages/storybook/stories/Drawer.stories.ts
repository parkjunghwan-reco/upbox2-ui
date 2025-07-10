import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { Drawer } from '@upbox2-ui/vue'

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A drawer component that slides in from the edge of the screen to display additional content.'
      }
    }
  },
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Whether the drawer is open'
    },
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'The position from which the drawer slides in'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'The size of the drawer'
    },
    overlay: {
      control: 'boolean',
      description: 'Whether to show an overlay behind the drawer'
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Whether to close the drawer when clicking the overlay'
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether to close the drawer when pressing escape'
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show a close button'
    }
  }
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  render: (args) => ({
    components: { Drawer },
    setup() {
      const isOpen = ref(false)
      const openDrawer = () => {
        isOpen.value = true
      }
      const closeDrawer = () => {
        isOpen.value = false
      }
      return { args, isOpen, openDrawer, closeDrawer }
    },
    template: `
      <div>
        <button 
          @click="openDrawer"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open Drawer
        </button>
        <Drawer v-model="isOpen" v-bind="args" @close="closeDrawer">
          <template #header>
            <h2 class="text-xl font-bold text-gray-900">User Profile Settings</h2>
            <p class="text-sm text-gray-600 mt-1">Manage your account settings and preferences</p>
          </template>
          <div class="space-y-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Tell us about yourself"
                ></textarea>
              </div>
            </div>
            
            <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 class="font-semibold text-blue-900 mb-2">📋 Pro Tips</h3>
              <ul class="text-sm text-blue-800 space-y-1">
                <li>• Use keyboard navigation with Tab and Shift+Tab</li>
                <li>• Press Escape key to close the drawer</li>
                <li>• Click outside the drawer to close it</li>
                <li>• All form fields are properly labeled for accessibility</li>
              </ul>
            </div>
            
            <div class="space-y-3">
              <h3 class="font-semibold text-gray-900">Notification Preferences</h3>
              <div class="space-y-2">
                <label class="flex items-center space-x-2">
                  <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
                  <span class="text-sm text-gray-700">Email notifications</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
                  <span class="text-sm text-gray-700">Push notifications</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200">
                  <span class="text-sm text-gray-700">Marketing emails</span>
                </label>
              </div>
            </div>
          </div>
          <template #footer>
            <div class="flex justify-between items-center">
              <button 
                @click="closeDrawer"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <div class="flex space-x-2">
                <button 
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Reset
                </button>
                <button 
                  @click="closeDrawer"
                  class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </template>
        </Drawer>
      </div>
    `
  }),
  args: {
    position: 'right',
    size: 'md',
    overlay: true,
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: true
  }
}

export const Positions: Story = {
  render: () => ({
    components: { Drawer },
    setup() {
      const drawers = ref({
        left: false,
        right: false,
        top: false,
        bottom: false
      })
      
      const openDrawer = (position: keyof typeof drawers.value) => {
        drawers.value[position] = true
      }
      
      const closeDrawer = (position: keyof typeof drawers.value) => {
        drawers.value[position] = false
      }
      
      return { drawers, openDrawer, closeDrawer }
    },
    template: `
      <div class="grid grid-cols-2 gap-4">
        <button 
          @click="openDrawer('left')"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open Left
        </button>
        <button 
          @click="openDrawer('right')"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Open Right
        </button>
        <button 
          @click="openDrawer('top')"
          class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Open Top
        </button>
        <button 
          @click="openDrawer('bottom')"
          class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Open Bottom
        </button>
        
        <Drawer v-model="drawers.left" position="left" @close="closeDrawer('left')">
          <template #header>
            <h2 class="text-xl font-bold text-gray-900">🔍 Search & Filter</h2>
            <p class="text-sm text-gray-600 mt-1">Find what you're looking for</p>
          </template>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search products..."
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Categories</label>
              <div class="space-y-2">
                <label class="flex items-center space-x-2">
                  <input type="checkbox" class="rounded border-gray-300 text-blue-600">
                  <span class="text-sm text-gray-700">Electronics</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" class="rounded border-gray-300 text-blue-600">
                  <span class="text-sm text-gray-700">Clothing</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" class="rounded border-gray-300 text-blue-600">
                  <span class="text-sm text-gray-700">Books</span>
                </label>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <div class="flex space-x-2">
                <input type="number" placeholder="Min" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <input type="number" placeholder="Max" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
            </div>
          </div>
          <template #footer>
            <div class="flex justify-between">
              <button class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Clear All
              </button>
              <button class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                Apply Filters
              </button>
            </div>
          </template>
        </Drawer>
        
        <Drawer v-model="drawers.right" position="right" @close="closeDrawer('right')">
          <template #header>
            <h2 class="text-xl font-bold text-gray-900">🛒 Shopping Cart</h2>
            <p class="text-sm text-gray-600 mt-1">Review your items</p>
          </template>
          <div class="space-y-4">
            <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span class="text-blue-600 font-semibold">📱</span>
              </div>
              <div class="flex-1">
                <h3 class="font-medium text-gray-900">iPhone 15 Pro</h3>
                <p class="text-sm text-gray-600">$999.00</p>
              </div>
              <div class="flex items-center space-x-2">
                <button class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300">-</button>
                <span class="w-8 text-center text-gray-900">1</span>
                <button class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300">+</button>
              </div>
            </div>
            <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span class="text-green-600 font-semibold">🎧</span>
              </div>
              <div class="flex-1">
                <h3 class="font-medium text-gray-900">AirPods Pro</h3>
                <p class="text-sm text-gray-600">$249.00</p>
              </div>
              <div class="flex items-center space-x-2">
                <button class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300">-</button>
                <span class="w-8 text-center text-gray-900">2</span>
                <button class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300">+</button>
              </div>
            </div>
            <div class="border-t pt-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-gray-600">Subtotal</span>
                <span class="text-gray-900">$1,497.00</span>
              </div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-gray-600">Shipping</span>
                <span class="text-gray-900">$9.99</span>
              </div>
              <div class="flex justify-between items-center font-semibold text-lg">
                <span class="text-gray-900">Total</span>
                <span class="text-gray-900">$1,506.99</span>
              </div>
            </div>
          </div>
          <template #footer>
            <div class="space-y-2">
              <button class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                Checkout
              </button>
              <button class="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Continue Shopping
              </button>
            </div>
          </template>
        </Drawer>
        
        <Drawer v-model="drawers.top" position="top" @close="closeDrawer('top')">
          <template #header>
            <h2 class="text-xl font-bold text-gray-900">📢 Announcements</h2>
            <p class="text-sm text-gray-600 mt-1">Latest news and updates</p>
          </template>
          <div class="space-y-4">
            <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-blue-600 text-sm font-semibold">🎉</span>
                </div>
                <div>
                  <h3 class="font-medium text-blue-900">New Feature Release</h3>
                  <p class="text-sm text-blue-800 mt-1">We've added new components: Tooltip, Drawer, and Slider!</p>
                  <span class="text-xs text-blue-600 mt-2 block">2 hours ago</span>
                </div>
              </div>
            </div>
            <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-green-600 text-sm font-semibold">✨</span>
                </div>
                <div>
                  <h3 class="font-medium text-green-900">Performance Improvements</h3>
                  <p class="text-sm text-green-800 mt-1">Bundle size reduced by 15% and loading speed improved.</p>
                  <span class="text-xs text-green-600 mt-2 block">1 day ago</span>
                </div>
              </div>
            </div>
            <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-purple-600 text-sm font-semibold">🛡️</span>
                </div>
                <div>
                  <h3 class="font-medium text-purple-900">Security Update</h3>
                  <p class="text-sm text-purple-800 mt-1">Enhanced security measures and vulnerability fixes.</p>
                  <span class="text-xs text-purple-600 mt-2 block">3 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
        
        <Drawer v-model="drawers.bottom" position="bottom" @close="closeDrawer('bottom')">
          <template #header>
            <h2 class="text-xl font-bold text-gray-900">🔧 Quick Actions</h2>
            <p class="text-sm text-gray-600 mt-1">Frequently used actions</p>
          </template>
          <div class="grid grid-cols-2 gap-4">
            <button class="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
              <div class="text-2xl mb-2">📝</div>
              <div class="font-medium text-gray-900">Create Note</div>
              <div class="text-sm text-gray-600">Add a new note</div>
            </button>
            <button class="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
              <div class="text-2xl mb-2">📋</div>
              <div class="font-medium text-gray-900">Create Task</div>
              <div class="text-sm text-gray-600">Add a new task</div>
            </button>
            <button class="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
              <div class="text-2xl mb-2">📅</div>
              <div class="font-medium text-gray-900">Schedule Event</div>
              <div class="text-sm text-gray-600">Add to calendar</div>
            </button>
            <button class="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
              <div class="text-2xl mb-2">👥</div>
              <div class="font-medium text-gray-900">Add Contact</div>
              <div class="text-sm text-gray-600">Save contact info</div>
            </button>
          </div>
        </Drawer>
      </div>
    `
  })
}

export const Sizes: Story = {
  render: () => ({
    components: { Drawer },
    setup() {
      const drawers = ref({
        sm: false,
        md: false,
        lg: false,
        xl: false,
        full: false
      })
      
      const openDrawer = (size: keyof typeof drawers.value) => {
        drawers.value[size] = true
      }
      
      const closeDrawer = (size: keyof typeof drawers.value) => {
        drawers.value[size] = false
      }
      
      return { drawers, openDrawer, closeDrawer }
    },
    template: `
      <div class="flex flex-wrap gap-4">
        <button 
          @click="openDrawer('sm')"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Small (sm)
        </button>
        <button 
          @click="openDrawer('md')"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Medium (md)
        </button>
        <button 
          @click="openDrawer('lg')"
          class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Large (lg)
        </button>
        <button 
          @click="openDrawer('xl')"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Extra Large (xl)
        </button>
        <button 
          @click="openDrawer('full')"
          class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
        >
          Full Size
        </button>
        
        <Drawer v-model="drawers.sm" size="sm" @close="closeDrawer('sm')">
          <template #header>
            <h2 class="text-lg font-bold text-gray-900">Small Drawer</h2>
            <p class="text-sm text-gray-600 mt-1">256px width</p>
          </template>
          <div class="space-y-3">
            <p class="text-gray-700">This is a small drawer perfect for navigation menus or quick actions.</p>
            <div class="space-y-2">
              <button class="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded">
                Dashboard
              </button>
              <button class="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded">
                Profile
              </button>
              <button class="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded">
                Settings
              </button>
            </div>
          </div>
        </Drawer>
        
        <Drawer v-model="drawers.md" size="md" @close="closeDrawer('md')">
          <template #header>
            <h2 class="text-lg font-bold text-gray-900">Medium Drawer</h2>
            <p class="text-sm text-gray-600 mt-1">320px width (default)</p>
          </template>
          <div class="space-y-4">
            <p class="text-gray-700">This is the default medium size drawer, good for most use cases.</p>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
            </div>
          </div>
        </Drawer>
        
        <Drawer v-model="drawers.lg" size="lg" @close="closeDrawer('lg')">
          <template #header>
            <h2 class="text-lg font-bold text-gray-900">Large Drawer</h2>
            <p class="text-sm text-gray-600 mt-1">384px width</p>
          </template>
          <div class="space-y-4">
            <p class="text-gray-700">Large drawer provides more space for complex forms or detailed content.</p>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
          </div>
        </Drawer>
        
        <Drawer v-model="drawers.xl" size="xl" @close="closeDrawer('xl')">
          <template #header>
            <h2 class="text-lg font-bold text-gray-900">Extra Large Drawer</h2>
            <p class="text-sm text-gray-600 mt-1">448px width</p>
          </template>
          <div class="space-y-4">
            <p class="text-gray-700">Extra large drawer for comprehensive forms or detailed information displays.</p>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">ZIP</label>
                <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
            </div>
          </div>
        </Drawer>
        
        <Drawer v-model="drawers.full" size="full" @close="closeDrawer('full')">
          <template #header>
            <h2 class="text-lg font-bold text-gray-900">Full Size Drawer</h2>
            <p class="text-sm text-gray-600 mt-1">Takes full width/height</p>
          </template>
          <div class="space-y-6">
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-yellow-600 text-sm font-semibold">⚠️</span>
                </div>
                <div>
                  <h3 class="font-medium text-yellow-900">Full Size Mode</h3>
                  <p class="text-sm text-yellow-800 mt-1">This drawer covers the entire screen, perfect for mobile interfaces or immersive experiences.</p>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <h3 class="font-semibold text-gray-900">Personal Information</h3>
                <div class="space-y-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  </div>
                </div>
              </div>
              
              <div class="space-y-4">
                <h3 class="font-semibold text-gray-900">Professional Details</h3>
                <div class="space-y-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Select Department</option>
                      <option>Engineering</option>
                      <option>Marketing</option>
                      <option>Sales</option>
                      <option>HR</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    `
  })
}

export const WithoutOverlay: Story = {
  render: () => ({
    components: { Drawer },
    setup() {
      const isOpen = ref(false)
      const openDrawer = () => {
        isOpen.value = true
      }
      const closeDrawer = () => {
        isOpen.value = false
      }
      return { isOpen, openDrawer, closeDrawer }
    },
    template: `
      <div>
        <button 
          @click="openDrawer"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open Drawer (No Overlay)
        </button>
        <Drawer 
          v-model="isOpen" 
          :overlay="false" 
          @close="closeDrawer"
        >
          <template #header>
            <h2 class="text-xl font-bold text-gray-900">🚫 No Overlay</h2>
            <p class="text-sm text-gray-600 mt-1">This drawer doesn't have a background overlay</p>
          </template>
          <div class="space-y-4">
            <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 class="font-semibold text-blue-900 mb-2">💡 Use Case</h3>
              <p class="text-sm text-blue-800">Perfect for sidebar navigation that doesn't need to block the main content.</p>
            </div>
            <p class="text-gray-700">
              Without an overlay, users can still interact with the background content while the drawer is open.
            </p>
            <div class="space-y-2">
              <button class="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded border border-gray-200">
                📊 Analytics
              </button>
              <button class="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded border border-gray-200">
                ⚙️ Settings
              </button>
              <button class="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded border border-gray-200">
                👤 Profile
              </button>
            </div>
          </div>
        </Drawer>
      </div>
    `
  })
}

export const CustomStyling: Story = {
  render: () => ({
    components: { Drawer },
    setup() {
      const isOpen = ref(false)
      const openDrawer = () => {
        isOpen.value = true
      }
      const closeDrawer = () => {
        isOpen.value = false
      }
      return { isOpen, openDrawer, closeDrawer }
    },
    template: `
      <div>
        <button 
          @click="openDrawer"
          class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
        >
          Open Custom Styled Drawer
        </button>
        <Drawer 
          v-model="isOpen" 
          contentClassName="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-2xl"
          overlayClassName="bg-purple-900 bg-opacity-50"
          @close="closeDrawer"
        >
          <template #header>
            <div class="bg-gradient-to-r from-purple-600 to-pink-600 -m-6 mb-4 p-6 text-white">
              <h2 class="text-xl font-bold">🎨 Custom Styled Drawer</h2>
              <p class="text-purple-100 mt-1">Beautiful gradients and custom colors</p>
            </div>
          </template>
          <div class="space-y-4">
            <div class="p-4 bg-white bg-opacity-70 rounded-lg border border-purple-200">
              <h3 class="font-semibold text-purple-900 mb-2">✨ Customization Options</h3>
              <ul class="text-sm text-purple-800 space-y-1">
                <li>• Custom background colors and gradients</li>
                <li>• Custom overlay colors and opacity</li>
                <li>• Custom border styles and shadows</li>
                <li>• Flexible styling with CSS classes</li>
              </ul>
            </div>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-purple-700 mb-1">Theme Color</label>
                <div class="flex space-x-2">
                  <div class="w-8 h-8 bg-purple-500 rounded-full border-2 border-white shadow-sm"></div>
                  <div class="w-8 h-8 bg-pink-500 rounded-full border-2 border-white shadow-sm"></div>
                  <div class="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
                  <div class="w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-purple-700 mb-1">Opacity</label>
                <input type="range" min="0" max="100" value="80" class="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer">
              </div>
            </div>
          </div>
          <template #footer>
            <div class="bg-gradient-to-r from-purple-600 to-pink-600 -m-6 mt-4 p-6">
              <div class="flex justify-end space-x-3">
                <button 
                  @click="closeDrawer"
                  class="px-4 py-2 text-sm font-medium text-purple-600 bg-white border border-transparent rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  @click="closeDrawer"
                  class="px-4 py-2 text-sm font-medium text-white bg-purple-800 border border-transparent rounded-md hover:bg-purple-900"
                >
                  Apply Theme
                </button>
              </div>
            </div>
          </template>
        </Drawer>
      </div>
    `
  })
}
