import {
  AdMob,
  BannerAdPluginEvents,
  BannerAdPosition,
  BannerAdSize,
  InterstitialAdPluginEvents,
  type AdOptions,
  type BannerAdOptions,
} from "@capacitor-community/admob";

export async function initializeAdMob(): Promise<void> {
  return await AdMob.initialize({});
}

export async function showAdMobBanner(callback: () => void): Promise<void> {
  AdMob.addListener(BannerAdPluginEvents.Loaded, callback);
  const options: BannerAdOptions = {
    adId: "ca-app-pub-6530204715466484/7630804318",
    adSize: BannerAdSize.BANNER,
    position: BannerAdPosition.TOP_CENTER,
    margin: 0,
    // isTesting: true
    // npa: true
  };
  AdMob.showBanner(options);
}

export async function showAdMobInterstitial(
  callback: () => void
): Promise<void> {
  AdMob.addListener(InterstitialAdPluginEvents.Loaded, callback);
  const options: AdOptions = {
    adId: "ca-app-pub-6530204715466484/2573170636",
    // isTesting: true
    // npa: true
  };
  await AdMob.prepareInterstitial(options);
  await AdMob.showInterstitial();
}
