# SautiLink App

Official download landing page for app.sautilink.com.

## Cloudflare Pages
- Repository: sautilink/app
- Production branch: main
- Framework preset: None
- Build command: leave empty
- Build output directory: public
- Root directory: repository root
- Custom domain: app.sautilink.com

The /ios Pages Function resolves the exact bundle ID com.sautilink.app via Apple's public lookup endpoint, using the visitor's storefront country. If it is not available or the request fails, the function sends the visitor to Apple's official store home. The page only shows the official download badge after a positive availability response; before release it uses a coming-soon link.

Apple assigns the numeric App Store ID. The bundleId lookup parameter is not a guaranteed documented Apple API contract, so if it fails after release, set the optional APPLE_APP_ID Pages environment variable to the real numeric ID once the app is publicly available. This override is only appropriate after release and assumes availability in the visitor's storefront.

Android links to the supplied package com.sautilink.app. No database, secrets or build dependencies needed.
