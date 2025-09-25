export const environment = {
  production: true,
  apiUrl: '/api',
  wsUrl: location.protocol === 'https:' ? 'wss://' + location.host : 'ws://' + location.host,
  appName: 'Notes Sharing App',
  version: '1.0.0',
  
  // Feature flags
  features: {
    realTimeEditing: true,
    conflictResolution: true,
    versionHistory: true,
    collaboration: true,
    advancedSearch: true,
    exportOptions: true,
    offlineMode: true,
    darkTheme: true
  },
  
  // App configuration
  config: {
    maxNoteLength: 280,
    maxTitleLength: 100,
    autoSaveInterval: 2000, // ms
    maxFileSize: 10 * 1024 * 1024, // 10MB
    supportedFileTypes: ['.txt', '.md', '.json'],
    maxTagsPerNote: 10,
    maxNotesPerFolder: 1000,
    sessionTimeout: 24 * 60 * 60 * 1000 // 24 hours
  },
  
  // External services
  services: {
    analytics: true,
    errorReporting: true,
    logLevel: 'error'
  }
};