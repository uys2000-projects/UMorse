import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.uys2000.umorse',
  appName: 'umorse',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
