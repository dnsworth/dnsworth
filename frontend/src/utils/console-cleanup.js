// Console cleanup utility for development
// This helps suppress common development warnings and messages

export const setupConsoleCleanup = () => {
  // Only run in development
  if (import.meta.env.DEV) {
    // Suppress React DevTools suggestion
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      const message = args[0];
      if (typeof message === 'string' && message.includes('Download the React DevTools')) {
        return; // Suppress React DevTools suggestion
      }
      originalConsoleLog.apply(console, args);
    };

    // Suppress Vercel Speed Insights debug messages
    const originalConsoleWarn = console.warn;
    console.warn = (...args) => {
      const message = args[0];
      if (typeof message === 'string' && message.includes('[Vercel Speed Insights] Debug mode')) {
        return; // Suppress Vercel debug messages
      }
      originalConsoleWarn.apply(console, args);
    };

    console.log('🔧 Console cleanup enabled for development');
  }
};
