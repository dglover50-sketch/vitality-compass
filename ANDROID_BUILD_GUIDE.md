# Android Build Guide — Google Play Submission

This guide walks you through building and submitting the Vitality Compass app to
Google Play, step by step. No technical experience required.

---

## Prerequisites

1. **Install Android Studio** (free)
   - Download from: https://developer.android.com/studio
   - Install with default settings — this will also install the Android SDK

2. **Google Play Developer Account** ($25 one-time fee)
   - Sign up at: https://play.google.com/console/signup

---

## Step 1: Open the Project

1. Launch **Android Studio**
2. Click **Open** (or File → Open)
3. Navigate to the `android/` folder inside your project:
   ```
   /home/team/shared/site/android/
   ```
4. Select it and click **Open**
5. Android Studio will sync the project — wait for the progress bar at the
   bottom to finish (may take 2-3 minutes the first time)

---

## Step 2: Generate a Keystore (App Signing Key)

The keystore is a digital signature that proves you're the app's developer.
You only need to create it once — save it somewhere safe.

1. In Android Studio, go to **Build → Generate Signed Bundle / APK**
2. Select **Android App Bundle** (recommended for Play Store) and click **Next**
3. Under "Key store path", click **Create new…**
4. Fill in:
   - **Key store path:** Choose a folder you'll remember (e.g. `~/Desktop/vitality-keystore.jks`)
   - **Password:** Create a strong password — write it down!
   - **Alias:** `vitalitycompass`
   - **Alias password:** Same as above (or a different one)
   - **Validity:** 25 years (default)
   - **Certificate:** Fill in your name and organization (optional)
5. Click **OK** — the keystore is now created

> ⚠️ **IMPORTANT:** Save the `.jks` file and both passwords somewhere secure.
> If you lose them, you can never update the app on Google Play.

---

## Step 3: Build the Signed App Bundle (AAB)

1. Back at the "Generate Signed Bundle or APK" window, your keystore should
   now be selected
2. Enter the keystore password and alias password you created above
3. Click **Next**
4. For "Build Variants", select **release**
5. Check **V1 (Jar Signature)** and **V2 (Full APK Signature)**
6. Click **Finish**
7. Wait for the build to complete — a notification will appear with a "locate"
   link. Click it to find your `.aab` file.

The file will be named something like `app-release.aab`.

---

## Step 4: Upload to Google Play Console

1. Go to https://play.google.com/console
2. Click **Create app**
3. Fill in:
   - **App name:** Vitality Compass
   - **Default language:** English (United States)
   - **App or game:** App
   - **Free or paid:** Free
4. Click **Create app**
5. Go through the setup checklist on the left sidebar

### Required Info You'll Need:

| Section | What to enter |
|---------|---------------|
| **App content** | Rating questionnaire (answer honestly about your app's content) |
| **App category** | Health & Fitness |
| **Store listing** | App name: "Vitality Compass", short description, full description |
| **Graphics** | Icon, feature graphic, screenshots (see below) |
| **Privacy policy** | Link to your privacy policy URL |

### Upload the Bundle
- In the **Production** track, click **Create new release**
- Upload your `.aab` file
- Add release notes: "Initial release"
- Click **Review** → **Start rollout to Production**

---

## What's Already Included

| Asset | Status |
|-------|--------|
| **App icon** (all sizes) | ✅ Done — compass leaf logo on teal background |
| **App name** | ✅ "Vitality Compass" |
| **Package name** | ✅ `com.vitalitycompass.app` |
| **Splash screen** | ✅ Teal background (#0A6E6A) |
| **Status bar** | ✅ Teal, dark style |
| **Server URL** | ✅ Serves from `vitalitycompass.com` |
| **Plugins** | ✅ Splash Screen, Status Bar |

---

## What You Need to Create

### 1. Feature Graphic (required)
- Size: 1024 × 500 pixels
- This is the main banner shown on your Google Play listing
- Should include your app name, logo, and a tagline
- Use a tool like Canva (canva.com) or hire a designer

### 2. Screenshots (required — minimum 2)
- Phone screenshots: 1080 × 1920 pixels (or take screenshots on a device)
- Recommended: 4-6 screenshots showing the main features
- Take them from the live site (open vitalitycompass.com on a phone and
  screenshot the landing page, dashboard, assessment, content pages)

### 3. Privacy Policy URL
You need a privacy policy page on your website. Recommended content:
- What data you collect (email, name, wellness assessment answers)
- How you use it (to provide personalized wellness guidance)
- Third-party services (Stripe for payments)
- Contact information

---

## Quick Recap

1. ✅ Open `android/` folder in Android Studio
2. 🔑 Create keystore (once)
3. 📦 Build signed AAB
4. 📤 Upload to Google Play Console
5. 🎨 Create feature graphic + screenshots
6. 📄 Add privacy policy
7. 🚀 Submit for review

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Gradle sync failed" | Go to File → Invalidate Caches → Restart |
| "SDK not found" | In Android Studio: Tools → SDK Manager → install API 35 |
| Build errors | Make sure you've selected "release" build variant |
| App shows old content | Run `npx cap copy android` in terminal, then rebuild |

---

## Need Help?

If you get stuck at any step, the Capacitor team has more detailed guides:
- https://capacitorjs.com/docs/android
- https://developer.android.com/studio/publish