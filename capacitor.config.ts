import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vitalitycompass.app',
  appName: 'Vitality Compass',
  webDir: 'dist',

  // Point to the live server-rendered site
  server: {
    url: 'https://hellovitalitycompass.com',
    cleartext: false,
  },

  // Splash screen — teal background to match branding
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0A6E6A',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0A6E6A',
    },
  },
};

export default config;