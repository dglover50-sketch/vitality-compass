# Vitality Compass — Capacitor Native App

This directory contains Capacitor native projects for iOS and Android that wrap the
Vitality Compass web app for App Store and Google Play submission.

## Prerequisites

- **iOS:** macOS with Xcode 16+ installed
- **Android:** Android Studio (latest stable)

## Quick Start

### 1. Sync the live site

> **Important:** This is a server-rendered app, so the native app loads the live site
> from the production URL. Before building, make sure the latest web build is deployed.

```bash
cd /home/team/shared/site
bun run publish        # Build and deploy the web app
npx cap copy           # Sync web assets to native projects
```

### 2. iOS — Build & Submit

1. Open the iOS project in Xcode:
   ```bash
   npx cap open ios
   ```
   (Or manually open `ios/App/App.xcworkspace` in Xcode)

2. In Xcode:
   - Select your development team in **Signing & Capabilities**
   - Change the **Bundle Identifier** if needed (default: `com.vitalitycompass.app`)
   - Set the deployment target (iOS 16.0+ recommended)
   - Build with **Product → Archive**
   - Upload to App Store Connect via the Organizer window

3. Submit through App Store Connect for review

### 3. Android — Build & Submit

1. Open the Android project in Android Studio:
   ```bash
   npx cap open android
   ```
   (Or manually open the `android/` folder in Android Studio)

2. In Android Studio:
   - Generate a signed build: **Build → Generate Signed Bundle / APK**
   - Select **Android App Bundle** for Play Store submission
   - Create or select a keystore (if you don't have one yet)
   - Build the release bundle

3. Upload the `.aab` file to Google Play Console and submit for review

## Configuration

The main configuration is in `capacitor.config.ts` at the project root:

| Setting | Value |
|---------|-------|
| **appId** | `com.vitalitycompass.app` |
| **appName** | `Vitality Compass` |
| **Server URL** | `https://vitalitycompass.com` |
| **Splash background** | `#0A6E6A` (teal) |
| **Status bar** | `#0A6E6A` (teal), dark style |

## Plugins Installed

- `@capacitor/splash-screen` — branded splash screen on launch
- `@capacitor/status-bar` — teal status bar to match branding

## Updating the App

When the web app is updated:

1. `cd /home/team/shared/site && bun run publish`
2. `npx cap copy` (syncs latest web assets)
3. Rebuild in Xcode / Android Studio
4. Submit updated version to stores

## Notes

- The server URL is set in `capacitor.config.ts`. If the deployment URL changes,
  update it there and run `npx cap copy` again.
- The app requires an internet connection to load content (it's a server-rendered
  web app, not a static bundle).
- PWA support is already configured — users can also install the site directly
  from the browser as a home screen app.