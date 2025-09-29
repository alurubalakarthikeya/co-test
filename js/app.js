// app.js - Main application bootstrap and state management

import { fetchSpaceWeatherData, clearCache } from './api.js';
import { 
  updateAllCards, 
  updateHeaderTime, 
  setRefreshLoading, 
  showToast, 
  showModal, 
  hideModal 
} from './ui.js';
import { createEventEmitter, debounce, prefersReducedMotion } from './utils.js';

// Application state
const state = {
  data: null,
  lastUpdated: null,
  autoRefresh: true,
  useMock: false,
  refreshInterval: null,
  loading: false
};

// Event emitter for state changes
const events = createEventEmitter();

// Auto-refresh interval (5 minutes)
const AUTO_REFRESH_INTERVAL = 300000;

/**
 * Initialize the application
 */
async function init() {
  console.log('Initializing Stellar Stories Space Weather Dashboard');
  
  // Set up event listeners
  setupEventListeners();
  
  // Initialize UI
  initializeUI();
  
  // Load initial data
  await loadData();
  
  // Start auto-refresh if enabled
  if (state.autoRefresh) {
    startAutoRefresh();
  }
  
  console.log('Application initialized successfully');
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
  // Refresh button
  const refreshBtn = document.getElementById('refreshBtn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', handleRefresh);
  }
  
  // Card click events for modals
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', handleCardClick);
    card.addEventListener('keydown', handleCardKeydown);
  });
  
  // Modal events
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  
  if (modalOverlay) {
    modalOverlay.addEventListener('click', handleModalOverlayClick);
  }
  
  if (modalClose) {
    modalClose.addEventListener('click', hideModal);
  }
  
  // Keyboard events
  document.addEventListener('keydown', handleGlobalKeydown);
  
  // Toggle buttons
  const motionToggle = document.getElementById('motionToggle');
  const dataToggle = document.getElementById('dataToggle');
  
  if (motionToggle) {
    motionToggle.addEventListener('click', handleMotionToggle);
  }
  
  if (dataToggle) {
    dataToggle.addEventListener('click', handleDataToggle);
  }
  
  // Window events
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  window.addEventListener('beforeunload', handleBeforeUnload);
  
  // Visibility change for performance
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  // State change events
  events.on('data.updated', handleDataUpdated);
  events.on('settings.changed', handleSettingsChanged);
}

/**
 * Initialize UI components
 */
function initializeUI() {
  // Update header time immediately and start interval
  updateHeaderTime();
  setInterval(updateHeaderTime, 60000); // Update every minute
  
  // Apply user preferences
  applyUserPreferences();
  
  // Set initial toggle states
  updateToggleStates();
}

/**
 * Load space weather data
 * @param {boolean} forceFresh - Force fresh data fetch
 */
async function loadData(forceFresh = false) {
  if (state.loading) {
    console.log('Data loading already in progress');
    return;
  }
  
  try {
    state.loading = true;
    setRefreshLoading(true);
    
    console.log('Loading space weather data...');
    const data = await fetchSpaceWeatherData(forceFresh);
    
    // Update state
    state.data = data;
    state.lastUpdated = new Date().toISOString();
    
    // Emit data updated event
    events.emit('data.updated', data);
    
    console.log('Data loaded successfully:', data);
    
  } catch (error) {
    console.error('Failed to load data:', error);
    showToast('Failed to load data - showing cached/mock data');
    
    // Try to show cached data or fallback
    if (!state.data) {
      // Show minimal fallback data
      state.data = {
        solarFlares: { class: 'C1.0', peakFlux: 1.0, region: 'AR12345' },
        kpIndex: 3,
        timestamp: new Date().toISOString(),
        source: 'fallback'
      };
      events.emit('data.updated', state.data);
    }
    
  } finally {
    state.loading = false;
    setRefreshLoading(false);
  }
}

/**
 * Handle refresh button click
 */
async function handleRefresh(event) {
  event.preventDefault();
  console.log('Manual refresh triggered');
  await loadData(true);
}

/**
 * Handle card click for modal display
 */
function handleCardClick(event) {
  // Don't open modal if clicking on a link
  if (event.target.tagName === 'A') {
    return;
  }
  
  showModal(event.currentTarget);
}

/**
 * Handle card keyboard navigation
 */
function handleCardKeydown(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    showModal(event.currentTarget);
  }
}

/**
 * Handle modal overlay click (close on backdrop click)
 */
function handleModalOverlayClick(event) {
  if (event.target === event.currentTarget) {
    hideModal();
  }
}

/**
 * Handle global keyboard shortcuts
 */
function handleGlobalKeydown(event) {
  // Close modal with Escape
  if (event.key === 'Escape') {
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay && modalOverlay.classList.contains('active')) {
      hideModal();
    }
  }
  
  // Refresh with Ctrl+R or Cmd+R (but don't prevent default)
  if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
    // Let browser handle the refresh, but also trigger our data refresh
    setTimeout(() => loadData(true), 100);
  }
}

/**
 * Handle motion toggle
 */
function handleMotionToggle() {
  const toggle = document.getElementById('motionToggle');
  const isActive = toggle.classList.toggle('active');
  
  // Apply reduced motion preference
  document.documentElement.style.setProperty(
    '--animation-duration',
    isActive ? '0.01ms' : ''
  );
  
  // Save preference
  localStorage.setItem('prefersReducedMotion', isActive);
  
  events.emit('settings.changed', { reducedMotion: isActive });
}

/**
 * Handle data source toggle
 */
function handleDataToggle() {
  const toggle = document.getElementById('dataToggle');
  const isActive = toggle.classList.toggle('active');
  
  state.useMock = isActive;
  
  // Clear cache when switching modes
  if (isActive) {
    clearCache();
    showToast('Switched to mock data mode');
  } else {
    showToast('Switched to live data mode');
  }
  
  // Save preference
  localStorage.setItem('useMockData', isActive);
  
  // Reload data
  loadData(true);
  
  events.emit('settings.changed', { useMock: isActive });
}

/**
 * Handle online status change
 */
function handleOnline() {
  console.log('Connection restored');
  showToast('Connection restored - refreshing data');
  loadData(true);
}

/**
 * Handle offline status change
 */
function handleOffline() {
  console.log('Connection lost');
  showToast('Connection lost - showing cached data');
}

/**
 * Handle before page unload
 */
function handleBeforeUnload() {
  // Stop auto-refresh
  if (state.refreshInterval) {
    clearInterval(state.refreshInterval);
  }
}

/**
 * Handle page visibility change for performance
 */
function handleVisibilityChange() {
  if (document.hidden) {
    // Page is hidden, pause auto-refresh
    if (state.refreshInterval) {
      clearInterval(state.refreshInterval);
      state.refreshInterval = null;
    }
  } else {
    // Page is visible, resume auto-refresh
    if (state.autoRefresh && !state.refreshInterval) {
      startAutoRefresh();
    }
  }
}

/**
 * Handle data updated event
 */
function handleDataUpdated(data) {
  console.log('Updating UI with new data');
  updateAllCards(data);
}

/**
 * Handle settings changed event
 */
function handleSettingsChanged(settings) {
  console.log('Settings changed:', settings);
  updateToggleStates();
}

/**
 * Start auto-refresh interval
 */
function startAutoRefresh() {
  if (state.refreshInterval) {
    clearInterval(state.refreshInterval);
  }
  
  state.refreshInterval = setInterval(() => {
    if (!document.hidden && !state.loading) {
      console.log('Auto-refresh triggered');
      loadData();
    }
  }, AUTO_REFRESH_INTERVAL);
  
  console.log(`Auto-refresh started (${AUTO_REFRESH_INTERVAL / 1000}s interval)`);
}

/**
 * Stop auto-refresh interval
 */
function stopAutoRefresh() {
  if (state.refreshInterval) {
    clearInterval(state.refreshInterval);
    state.refreshInterval = null;
    console.log('Auto-refresh stopped');
  }
}

/**
 * Apply user preferences from localStorage
 */
function applyUserPreferences() {
  // Reduced motion preference
  const reducedMotion = localStorage.getItem('prefersReducedMotion') === 'true' ||
                       prefersReducedMotion();
  
  if (reducedMotion) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
  }
  
  // Mock data preference
  state.useMock = localStorage.getItem('useMockData') === 'true';
  
  // Auto-refresh preference
  const autoRefreshPref = localStorage.getItem('autoRefresh');
  if (autoRefreshPref !== null) {
    state.autoRefresh = autoRefreshPref === 'true';
  }
}

/**
 * Update toggle button states
 */
function updateToggleStates() {
  const motionToggle = document.getElementById('motionToggle');
  const dataToggle = document.getElementById('dataToggle');
  
  if (motionToggle) {
    const reducedMotion = localStorage.getItem('prefersReducedMotion') === 'true';
    motionToggle.classList.toggle('active', reducedMotion);
  }
  
  if (dataToggle) {
    dataToggle.classList.toggle('active', state.useMock);
  }
}

/**
 * Get current application state (for debugging)
 */
function getState() {
  return {
    ...state,
    timestamp: new Date().toISOString()
  };
}

/**
 * Error handler for uncaught errors
 */
function handleError(error) {
  console.error('Application error:', error);
  showToast('An error occurred - please refresh the page');
}

// Set up global error handling
window.addEventListener('error', (event) => {
  handleError(event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  handleError(event.reason);
});

// Export for debugging
window.stellarStories = {
  getState,
  loadData,
  clearCache,
  events
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for testing
export {
  init,
  loadData,
  getState,
  state,
  events
};