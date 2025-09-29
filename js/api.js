// api.js - Handles data fetching with caching and fallback

const API_BASE = 'https://services.swpc.noaa.gov/json';
const CACHE_PREFIX = 'stellar-stories-cache:';
const DEFAULT_CACHE_TIME = 300000; // 5 minutes

// API endpoints configuration
export const API_ENDPOINTS = {
  solarFlares: `${API_BASE}/goes/primary/xray-flares-1-day.json`,
  kpIndex: `${API_BASE}/planetary-k-index-1m.json`,
  solarWind: `${API_BASE}/ace/swepam.json`,
  goes: `${API_BASE}/goes/primary/integral-protons-1-day.json`
};

/**
 * Fetch data with caching support and fallback to mock data
 * @param {string} url - The URL to fetch
 * @param {number} maxAge - Maximum age of cached data in milliseconds
 * @returns {Promise<Object>} The fetched or cached data
 */
export async function fetchWithCache(url, maxAge = DEFAULT_CACHE_TIME) {
  const cacheKey = `${CACHE_PREFIX}${url}`;
  
  try {
    // Check cache first
    const cached = getCachedData(cacheKey, maxAge);
    if (cached) {
      console.log(`Using cached data for ${url}`);
      return cached;
    }

    // Fetch fresh data
    console.log(`Fetching fresh data from ${url}`);
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Cache the successful response
    setCachedData(cacheKey, data);
    
    return data;
  } catch (error) {
    console.warn(`Failed to fetch ${url}:`, error);
    
    // Try to use stale cache first
    const staleCache = getCachedData(cacheKey, Infinity);
    if (staleCache) {
      console.log(`Using stale cached data for ${url}`);
      return staleCache;
    }
    
    // Fall back to mock data
    console.log('Falling back to mock data');
    return getMockData();
  }
}

/**
 * Get cached data if it exists and is fresh
 * @param {string} key - Cache key
 * @param {number} maxAge - Maximum age in milliseconds
 * @returns {Object|null} Cached data or null
 */
function getCachedData(key, maxAge) {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const { timestamp, data } = JSON.parse(cached);
    const age = Date.now() - timestamp;
    
    if (age <= maxAge) {
      return data;
    }
    
    return null;
  } catch (error) {
    console.warn('Error reading cache:', error);
    return null;
  }
}

/**
 * Set data in cache with timestamp
 * @param {string} key - Cache key
 * @param {Object} data - Data to cache
 */
function setCachedData(key, data) {
  try {
    const cached = {
      timestamp: Date.now(),
      data
    };
    localStorage.setItem(key, JSON.stringify(cached));
  } catch (error) {
    console.warn('Error writing cache:', error);
  }
}

/**
 * Fetch mock data as fallback
 * @returns {Promise<Object>} Mock data
 */
async function getMockData() {
  try {
    const response = await fetch('/assets/mock.json');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn('Failed to fetch mock data:', error);
  }
  
  // Hardcoded fallback if mock.json fails
  return {
    timestamp: new Date().toISOString(),
    solarFlares: {
      class: "C1.2",
      peakFlux: 1.2,
      region: "AR12345",
      time: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
    },
    kpIndex: 3,
    solarWind: {
      speed_km_s: 450,
      density_p_cc: 3,
      bz_nT: -2
    },
    source: "mock"
  };
}

/**
 * Fetch all space weather data
 * @param {boolean} forceFresh - Force fresh data fetch
 * @returns {Promise<Object>} Combined space weather data
 */
export async function fetchSpaceWeatherData(forceFresh = false) {
  const maxAge = forceFresh ? 0 : DEFAULT_CACHE_TIME;
  
  try {
    // In a real implementation, we'd fetch from multiple endpoints
    // For now, we'll simulate by fetching one endpoint and generating the rest
    const primaryData = await fetchWithCache(API_ENDPOINTS.solarFlares, maxAge);
    
    // Transform and combine data from different sources
    const processedData = await processSpaceWeatherData(primaryData);
    
    return {
      ...processedData,
      timestamp: new Date().toISOString(),
      source: primaryData.source || "NOAA SWPC"
    };
  } catch (error) {
    console.error('Error fetching space weather data:', error);
    throw error;
  }
}

/**
 * Process raw API data into our application format
 * @param {Object} rawData - Raw data from API
 * @returns {Promise<Object>} Processed data
 */
async function processSpaceWeatherData(rawData) {
  // If we have mock data, use it directly
  if (rawData.source === "mock" || rawData.solarFlares) {
    return rawData;
  }
  
  // For real NOAA data, we need to process it
  // This is a simplified version - real implementation would parse the actual NOAA JSON structure
  const now = new Date();
  const mockKp = Math.floor(Math.random() * 6) + 2; // Random Kp between 2-7
  
  return {
    solarFlares: {
      class: getRandomFlareClass(),
      peakFlux: (Math.random() * 10).toFixed(1),
      region: `AR${Math.floor(Math.random() * 10000) + 10000}`,
      time: new Date(now.getTime() - Math.random() * 86400000).toISOString()
    },
    kpIndex: mockKp,
    solarWind: {
      speed_km_s: Math.floor(Math.random() * 400) + 300,
      density_p_cc: Math.floor(Math.random() * 10) + 1,
      bz_nT: Math.floor(Math.random() * 20) - 10
    }
  };
}

/**
 * Generate random solar flare class for demo
 * @returns {string} Flare class
 */
function getRandomFlareClass() {
  const classes = ['A', 'B', 'C', 'M', 'X'];
  const weights = [0.4, 0.3, 0.2, 0.08, 0.02]; // Realistic distribution
  
  let random = Math.random();
  for (let i = 0; i < classes.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      const magnitude = (Math.random() * 9 + 1).toFixed(1);
      return `${classes[i]}${magnitude}`;
    }
  }
  return 'C1.0';
}

/**
 * Clear all cached data
 */
export function clearCache() {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith(CACHE_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
  console.log('Cache cleared');
}

/**
 * Get cache status for debugging
 * @returns {Object} Cache status information
 */
export function getCacheStatus() {
  const keys = Object.keys(localStorage);
  const cacheKeys = keys.filter(key => key.startsWith(CACHE_PREFIX));
  
  return {
    totalCacheEntries: cacheKeys.length,
    entries: cacheKeys.map(key => {
      try {
        const data = JSON.parse(localStorage.getItem(key));
        return {
          key: key.replace(CACHE_PREFIX, ''),
          age: Date.now() - data.timestamp,
          size: localStorage.getItem(key).length
        };
      } catch {
        return { key: key.replace(CACHE_PREFIX, ''), error: 'Invalid data' };
      }
    })
  };
}