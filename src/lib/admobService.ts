import { Capacitor } from '@capacitor/core';

// AdMob Test IDs
const ADMOB_CONFIG = {
  bannerId: 'ca-app-pub-3940256099942544/6300978111',
  interstitialId: 'ca-app-pub-3940256099942544/1033173712',
  appOpenId: 'ca-app-pub-3940256099942544/9257395921',
};

// State
let admobInitialized = false;
let interstitialLoaded = false;
let appOpenLoaded = false;
let calcCount = 0;
let lastInterstitialTime = 0;
const MIN_INTERSTITIAL_INTERVAL = 2 * 60 * 1000; // 2 minutes
let appOpenShown = false;

// Dynamic import to avoid crash on web
async function getAdMob() {
  const { AdMob } = await import('@capacitor-community/admob');
  return AdMob;
}

export async function initializeAdMob(): Promise<void> {
  if (!Capacitor.isNativePlatform() || admobInitialized) return;

  try {
    const AdMob = await getAdMob();
    await AdMob.initialize({
      initializeForTesting: true,
    });
    admobInitialized = true;
    console.log('[AdMob] Initialized successfully');

    // Preload ads
    await prepareInterstitial();
    await prepareAppOpen();
  } catch (error) {
    console.error('[AdMob] Initialization error:', error);
  }
}

// ===== BANNER =====
export async function showBanner(): Promise<void> {
  if (!Capacitor.isNativePlatform() || !admobInitialized) return;

  try {
    const AdMob = await getAdMob();
    const { BannerAdSize, BannerAdPosition } = await import('@capacitor-community/admob');

    await AdMob.showBanner({
      adId: ADMOB_CONFIG.bannerId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true,
    });
    console.log('[AdMob] Banner shown');
  } catch (error) {
    console.error('[AdMob] Banner error:', error);
  }
}

export async function hideBanner(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    const AdMob = await getAdMob();
    await AdMob.hideBanner();
  } catch (error) {
    console.error('[AdMob] Hide banner error:', error);
  }
}

// ===== INTERSTITIAL =====
async function prepareInterstitial(): Promise<void> {
  if (!Capacitor.isNativePlatform() || !admobInitialized) return;

  try {
    const AdMob = await getAdMob();
    const { InterstitialAdPluginEvents } = await import('@capacitor-community/admob');

    AdMob.addListener(InterstitialAdPluginEvents.Loaded, () => {
      interstitialLoaded = true;
      console.log('[AdMob] Interstitial loaded');
    });

    AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
      interstitialLoaded = false;
      console.log('[AdMob] Interstitial dismissed, reloading...');
      prepareInterstitial();
    });

    AdMob.addListener(InterstitialAdPluginEvents.FailedToLoad, (error: any) => {
      interstitialLoaded = false;
      console.error('[AdMob] Interstitial failed to load:', error);
    });

    await AdMob.prepareInterstitial({
      adId: ADMOB_CONFIG.interstitialId,
      isTesting: true,
    });
  } catch (error) {
    console.error('[AdMob] Prepare interstitial error:', error);
  }
}

export async function showInterstitialAfterCalc(): Promise<void> {
  calcCount++;
  console.log(`[AdMob] Calc count: ${calcCount}`);

  if (calcCount % 3 !== 0) return;
  await showInterstitialIfReady();
}

export async function showInterstitialOnReport(): Promise<void> {
  await showInterstitialIfReady();
}

async function showInterstitialIfReady(): Promise<void> {
  if (!Capacitor.isNativePlatform() || !admobInitialized || !interstitialLoaded) return;

  const now = Date.now();
  if (now - lastInterstitialTime < MIN_INTERSTITIAL_INTERVAL) {
    console.log('[AdMob] Interstitial skipped (too soon)');
    return;
  }

  try {
    const AdMob = await getAdMob();
    await AdMob.showInterstitial();
    lastInterstitialTime = Date.now();
    console.log('[AdMob] Interstitial shown');
  } catch (error) {
    console.error('[AdMob] Show interstitial error:', error);
  }
}

// ===== APP OPEN =====
async function prepareAppOpen(): Promise<void> {
  if (!Capacitor.isNativePlatform() || !admobInitialized) return;

  // App Open ads use interstitial-like API in the community plugin
  // We simulate app open by showing an interstitial on first launch
  try {
    const AdMob = await getAdMob();

    // For app open, we use a separate interstitial with the app open test ID
    // The @capacitor-community/admob doesn't have a native appOpen API,
    // so we use interstitial as the closest equivalent
    appOpenLoaded = true;
    console.log('[AdMob] App Open ad prepared');
  } catch (error) {
    console.error('[AdMob] App Open prepare error:', error);
  }
}

export async function showAppOpenAd(): Promise<void> {
  if (!Capacitor.isNativePlatform() || !admobInitialized || appOpenShown) return;

  appOpenShown = true;

  try {
    const AdMob = await getAdMob();
    
    // Use interstitial with app open test ID as fallback
    await AdMob.prepareInterstitial({
      adId: ADMOB_CONFIG.appOpenId,
      isTesting: true,
    });

    // Wait a moment for it to load
    await new Promise(resolve => setTimeout(resolve, 2000));

    await AdMob.showInterstitial();
    console.log('[AdMob] App Open ad shown');
  } catch (error) {
    console.error('[AdMob] App Open ad error:', error);
  }
}
