import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.dontSleep.app',
	appName: 'dontSleep',
	webDir: 'build',
	server: {
		androidScheme: 'https'
	}
};

export default config;
