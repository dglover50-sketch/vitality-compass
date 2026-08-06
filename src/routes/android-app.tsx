import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/android-app")({
  component: AndroidAppPage,
});

function AndroidAppPage() {
  return (
    <div className="min-h-screen bg-warm-950 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-warm-50 mb-4">
            Android App <span className="text-teal-400">Source Project</span>
          </h1>
          <p className="text-lg text-warm-300 max-w-xl mx-auto">
            Download the complete Android Studio project to build and publish
            Vitality Compass on the Google Play Store.
          </p>
        </div>

        <div className="bg-warm-900/60 border border-warm-800 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-warm-100 mb-2">
                What's in the ZIP
              </h2>
              <ul className="text-warm-300 space-y-1 text-sm">
                <li>• Full Android Studio project with Gradle build files</li>
                <li>• Capacitor configuration (webview wrapper)</li>
                <li>• App icons in all required densities (mdpi–xxxhdpi)</li>
                <li>• Feature graphic for Play Store listing</li>
                <li>• AndroidManifest.xml with permissions configured</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-warm-100 mb-2">
                What You'll Need
              </h2>
              <ul className="text-warm-300 space-y-1 text-sm">
                <li>• <strong>Android Studio</strong> (free download from developer.android.com)</li>
                <li>• A computer running Windows, macOS, or Linux</li>
                <li>• A <strong>Google Play Console</strong> developer account ($25 one-time fee)</li>
                <li>• Basic familiarity with running a build (step-by-step guide included)</li>
              </ul>
            </div>
          </div>

          <a
            href="/download/android-project.zip"
            className="block w-full bg-teal-500 hover:bg-teal-400 text-white font-semibold text-lg py-4 rounded-xl text-center transition-colors"
          >
            Download Android Project (ZIP)
          </a>
          <p className="text-warm-500 text-sm text-center mt-3">
            ~200 MB &middot; Includes build guide
          </p>
        </div>

        <div className="bg-warm-900/40 border border-warm-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-warm-100 mb-3">Quick Start</h3>
          <ol className="text-warm-300 text-sm space-y-2 list-decimal list-inside">
            <li>Install Android Studio and open this project</li>
            <li>Let Gradle sync complete (may take a few minutes)</li>
            <li>Create a keystore: <code className="bg-warm-800 px-2 py-0.5 rounded text-xs">Build → Generate Signed Bundle/APK</code></li>
            <li>Build a signed AAB for the Play Store</li>
            <li>Upload to Google Play Console and submit for review</li>
          </ol>
          <p className="text-warm-500 text-xs mt-4">
            Detailed instructions are in the <code className="bg-warm-800 px-1.5 py-0.5 rounded">ANDROID_BUILD_GUIDE.md</code> included in the ZIP.
          </p>
        </div>
      </div>
    </div>
  );
}
