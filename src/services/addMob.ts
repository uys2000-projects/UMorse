import {
  AdMob,
  BannerAdPluginEvents,
  type AdMobBannerSize,
  type BannerAdOptions,
  BannerAdSize,
  BannerAdPosition,
} from "@capacitor-community/admob";

export const intializeAddMob = function () {
  return AdMob.initialize({});
};

export const showAddMobBanner = function (
  addId: string,
  marginTargets: string[]
) {
  AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
    marginTargets.forEach((target) => {
      const el = document.querySelector(target);
      if (el) el.classList.add("pb-20");
    });
  });

  AdMob.addListener(
    BannerAdPluginEvents.SizeChanged,
    (size: AdMobBannerSize) => {}
  );

  const options: BannerAdOptions = {
    adId: addId,
    adSize: BannerAdSize.BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0,
    // isTesting: true,
    // npa: true
  };
  AdMob.showBanner(options);
};
