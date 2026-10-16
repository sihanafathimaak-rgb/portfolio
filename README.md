# Sihana Fathima A.K. — Portfolio

A responsive, multi-page portfolio built with plain HTML, CSS, and vanilla JavaScript. The pages share one stylesheet and one script, and use GSAP/ScrollTrigger and AOS from CDNs for optional motion effects. No build step or package installation is required.

## Run locally

Open `index.html` in a browser, or serve this folder with any static HTTP server. All page links are relative, so the site works from a GitHub Pages project subpath as well as a custom domain.

## Personalize the site

- **Profile photo:** The Home and About pages use `profile.png`, cropped inside a circular frame to focus on the portrait. Keep the image file in the project root unless you update the `src` in both pages.
- **Resume:** The Home page's View Resume button opens the existing `resume.jpeg` in a new tab. Replace the link with a PDF path if you add a PDF resume later.
- **Project links:** Update the GitHub and Live demo URLs on each project card in `projects.html` when project destinations change. Update descriptions, technology tags, and category filters as needed.
- **Contact form:** Create a form at [Formspree](https://formspree.io/) and replace `YOUR_FORM_ID` in the form action in `contact.html` with the form ID it provides. The email link is available as a fallback until the form is configured.
- **Social links or contact details:** Update the matching links and text in the shared navigation/footer or the relevant page.

## Deploy to GitHub Pages

1. Put these files and the `assets` folder at the root of your GitHub repository.
2. Commit and push the site to GitHub.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select your branch (usually `main`) and the root (`/`) folder, then save.
5. Wait for the Pages deployment and open the URL shown in Settings → Pages.

The site is static and uses relative page and asset paths; no build configuration is needed. Google Fonts, GSAP, ScrollTrigger, and AOS are loaded from CDNs, so those optional fonts and animations require an internet connection. Content remains readable if an animation library is unavailable.
