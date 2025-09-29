// utils.js - Utility functions for data processing and formatting

/**
 * Map solar flare class to severity level
 * @param {string} flareClass - Solar flare class (e.g., "M1.2", "X3.5")
 * @returns {Object} Severity information
 */
export function getFlareSeverity(flareClass) {
  if (!flareClass || typeof flareClass !== 'string') {
    return { level: 'calm', label: 'Calm', color: 'var(--success)' };
  }
  
  const classLetter = flareClass.charAt(0).toUpperCase();
  
  switch (classLetter) {
    case 'A':
    case 'B':
    case 'C':
      return { level: 'calm', label: 'Calm', color: 'var(--success)' };
    case 'M':
      return { level: 'watch', label: 'Watch', color: 'var(--orange)' };
    case 'X':
      return { level: 'storm', label: 'Storm', color: 'var(--danger)' };
    default:
      return { level: 'calm', label: 'Calm', color: 'var(--success)' };
  }
}

/**
 * Map Kp index to severity level
 * @param {number} kpValue - Kp index value (0-9)
 * @returns {Object} Severity information
 */
export function getKpSeverity(kpValue) {
  const kp = Number(kpValue);
  
  if (isNaN(kp)) {
    return { level: 'calm', label: 'Calm', color: 'var(--success)', description: 'Calm geomagnetic activity' };
  }
  
  if (kp <= 2) {
    return { level: 'calm', label: 'Calm', color: 'var(--success)', description: 'Calm geomagnetic activity' };
  } else if (kp <= 4) {
    return { level: 'minor', label: 'Minor', color: 'var(--warn)', description: 'Minor geomagnetic activity' };
  } else if (kp <= 6) {
    return { level: 'strong', label: 'Strong', color: 'var(--orange)', description: 'Strong geomagnetic activity' };
  } else {
    return { level: 'severe', label: 'Severe', color: 'var(--danger)', description: 'Severe geomagnetic storm' };
  }
}

/**
 * Get aurora visibility chance based on Kp index
 * @param {number} kpValue - Kp index value
 * @returns {Object} Aurora chance information
 */
export function getAuroraChance(kpValue) {
  const kp = Number(kpValue);
  
  if (isNaN(kp)) {
    return { 
      level: 'low', 
      label: 'Low', 
      description: 'Aurora unlikely in most locations',
      color: 'var(--success)'
    };
  }
  
  if (kp < 4) {
    return { 
      level: 'low', 
      label: 'Low', 
      description: 'Aurora visible only in polar regions',
      color: 'var(--success)'
    };
  } else if (kp === 4 || kp === 5) {
    return { 
      level: 'moderate', 
      label: 'Moderate', 
      description: 'Aurora visible in high latitude regions',
      color: 'var(--warn)'
    };
  } else {
    return { 
      level: 'high', 
      label: 'High', 
      description: 'Aurora visible in mid-latitude regions',
      color: 'var(--orange)'
    };
  }
}

/**
 * Format date and time for display
 * @param {string|Date} date - Date to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
export function formatDateTime(date, options = {}) {
  const {
    includeTime = true,
    includeDate = true,
    timeZone = 'local',
    format = 'friendly'
  } = options;
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }
  
  try {
    if (format === 'friendly') {
      const now = new Date();
      const diffMs = now.getTime() - dateObj.getTime();
      const diffMinutes = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);
      
      // For recent times, show relative format
      if (diffMinutes < 1) {
        return 'Just now';
      } else if (diffMinutes < 60) {
        return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
      } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
      } else if (diffDays === 1) {
        return 'Yesterday';
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      }
    }
    
    // Standard formatting
    const formatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    
    if (includeTime) {
      formatOptions.hour = 'numeric';
      formatOptions.minute = '2-digit';
      formatOptions.hour12 = true;
    }
    
    if (timeZone === 'local') {
      return dateObj.toLocaleDateString('en-US', formatOptions);
    } else {
      formatOptions.timeZone = 'UTC';
      return dateObj.toLocaleDateString('en-US', formatOptions);
    }
  } catch (error) {
    console.warn('Error formatting date:', error);
    return dateObj.toString();
  }
}

/**
 * Format current date and time for header display
 * @returns {string} Formatted current time
 */
export function getCurrentTimeString() {
  return formatDateTime(new Date(), {
    format: 'standard',
    includeDate: true,
    includeTime: true
  });
}

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Generate sparkline data for Kp history
 * @param {number} currentKp - Current Kp value
 * @param {number} hours - Number of hours of history
 * @returns {Array} Array of Kp values
 */
export function generateKpHistory(currentKp, hours = 24) {
  const history = [];
  const baseKp = Number(currentKp) || 3;
  
  for (let i = hours; i >= 0; i--) {
    // Generate realistic variation around the current value
    const variation = (Math.random() - 0.5) * 2; // ±1
    const value = Math.max(0, Math.min(9, baseKp + variation));
    history.push(Math.round(value * 10) / 10); // Round to 1 decimal
  }
  
  return history;
}

/**
 * Calculate local effects based on space weather conditions
 * @param {Object} data - Space weather data
 * @returns {Object} Local effects information
 */
export function calculateLocalEffects(data) {
  const { kpIndex, solarFlares } = data;
  const kp = Number(kpIndex) || 0;
  const flareSeverity = getFlareSeverity(solarFlares?.class);
  
  const effects = {
    gps: 'Stable',
    radio: 'Normal',
    power: 'Stable',
    satellite: 'Normal'
  };
  
  // GPS effects
  if (kp >= 6 || flareSeverity.level === 'storm') {
    effects.gps = 'Degraded';
  } else if (kp >= 4 || flareSeverity.level === 'watch') {
    effects.gps = 'Minor issues';
  }
  
  // Radio communication effects
  if (flareSeverity.level === 'storm') {
    effects.radio = 'Blackouts possible';
  } else if (flareSeverity.level === 'watch' || kp >= 5) {
    effects.radio = 'Minor interference';
  }
  
  // Power grid effects
  if (kp >= 7) {
    effects.power = 'Possible disruptions';
  } else if (kp >= 5) {
    effects.power = 'Minor fluctuations';
  }
  
  // Satellite effects
  if (kp >= 6 || flareSeverity.level === 'storm') {
    effects.satellite = 'Possible issues';
  } else if (kp >= 4 || flareSeverity.level === 'watch') {
    effects.satellite = 'Minor effects';
  }
  
  return effects;
}

/**
 * Check if user prefers reduced motion
 * @returns {boolean} True if reduced motion is preferred
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if user prefers high contrast
 * @returns {boolean} True if high contrast is preferred
 */
export function prefersHighContrast() {
  return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * Validate and sanitize input data
 * @param {any} value - Value to validate
 * @param {string} type - Expected type
 * @param {any} defaultValue - Default value if validation fails
 * @returns {any} Validated value
 */
export function validateData(value, type, defaultValue) {
  switch (type) {
    case 'number':
      const num = Number(value);
      return isNaN(num) ? defaultValue : num;
    case 'string':
      return typeof value === 'string' ? value : String(defaultValue);
    case 'boolean':
      return typeof value === 'boolean' ? value : Boolean(defaultValue);
    default:
      return value !== undefined && value !== null ? value : defaultValue;
  }
}

/**
 * Create a simple event emitter
 * @returns {Object} Event emitter with on, off, and emit methods
 */
export function createEventEmitter() {
  const events = {};
  
  return {
    on(event, callback) {
      if (!events[event]) {
        events[event] = [];
      }
      events[event].push(callback);
    },
    
    off(event, callback) {
      if (events[event]) {
        events[event] = events[event].filter(cb => cb !== callback);
      }
    },
    
    emit(event, data) {
      if (events[event]) {
        events[event].forEach(callback => {
          try {
            callback(data);
          } catch (error) {
            console.error('Error in event callback:', error);
          }
        });
      }
    }
  };
}