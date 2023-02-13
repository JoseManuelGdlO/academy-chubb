import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'academy',
  webDir: 'www',
  bundledWebRuntime: false,  
  server: {
    "url": "http://192.168.0.21:8100",
    "cleartext": true
  }
};

export default config;
