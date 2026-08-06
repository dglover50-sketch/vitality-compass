# Vitality Compass — Native App Build Guide

Capacitor has been set up to wrap the Vitality Compass website as a native mobile app. Both iOS and Android project files are generated and ready to build.

## Prerequisites

### iOS (App Store)
- **A Mac** — Xcode only runs on macOS
- **Xcode 15+** — Install from the Mac App Store
- **Apple Developer account** — $99/year at https://developer.apple.com
- **An Apple ID** signed into Xcode for code signing

### Android (Google Play)
- **Any computer** (Windows, Mac, or Linux)
- **Android Studio** — Download from https://developer.android.com/studio
- **Google Play Developer account** — $25 one-time at https://play.google.com/console

---

## How to Build

### iOS

1. Open the iOS project in Xcode:
   ```bash
   cd /path/to/site/ios/App
   open App.xcworkspace
   ```

2. In Xcode:
   - Select your team in **Signing & Capabilities** (needs Apple Developer account)
   - Change the **Bundle Identifier** if desired (default: `com.vitalitycompass.app`)
   - Select a simulator or "Any iOS Device" as the build target

3. Build and run:
   - **Run on simulator**: Press `Cmd + R`
   - **Build for App Store**: Product → Archive → Distribute App

4. Submit to App Store through the Organizer window after archiving.

### Android

1. Open the Android project in Android Studio:
   ```bash
   # Open Android Studio, select "Open an existing project"
   # Navigate to /path/to/site/android/
   ```

2. Let Android Studio sync the Gradle files (it will download dependencies automatically).

3. Build:
   - **Debug APK**: Build → Build Bundle(s) / APK(s) → Build APK
   - **Release for Play Store**: Build → Generate Signed Bundle / APK
   - You'll need a **keystore** (Android Studio can create one for you)

4. Upload the `.aab` (Android App Bundle) file to Google Play Console.

---

## How the App Works

- The app loads the live Vitality Compass website in a full-screen WebView
- No browser chrome (no URL bar, no navigation buttons)
- The PWA service worker handles offline caching
- Splash screen shows teal background for 2 seconds on launch
- Status bar is styled in teal matching the brand

## App Store Assets You'll Need

### iOS
- **App Icon** — Already configured in `Assets.xcassets/AppIcon.appiconset` (1024pt)
- **Screenshots** — 6.5" iPhone and 12.9" iPad screenshots (take from simulator)
- **Description** — Use the site's value proposition text
- **Keywords** — wellness, health, nutrition, fitness, meditation, vitality

### Android
- **Icon** — Already generated in `android/app/src/main/res/` at all densities
- **Feature Graphic** — 1024×500 PNG (create from the logo)
- **Screenshots** — 2-8 phone screenshots, 2-7 tablet screenshots
- **Description** — Same as iOS

## Updating the App

When the website is updated, sync the latest web content:

```bash
cd /path/to/site
npx cap copy
```

This updates the bundled web assets. Then rebuild in Xcode/Android Studio.

## App Store Links (once published)

- **iOS**: https://apps.apple.com/app/vitality-compass
- **Android**: https://play.google.com/store/apps/details?id=com.vitalitycompass.app