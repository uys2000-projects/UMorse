import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.uys2000.umorse',
  appName: 'UMorse',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
