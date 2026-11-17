# Enquiry form setup (Google Sheet + Gmail)

How it works: the website form sends each enquiry to a Google Apps Script attached to your Google Sheet.
The script:

1. **Saves every enquiry as a row in the sheet.** This has no daily limit.
2. **Emails each enquiry** from your Gmail to the same Gmail, so it shows in both Inbox and Sent.
3. **Groups enquiries once today's email quota is nearly used up.** Free Gmail allows about 100 emails a day. After about 75 single emails, new rows are marked `Pending (digest)` and one **summary email per hour** lists them all. Nothing is lost.

No database, no server and no passwords in the website code.

---

## Step 1: Create the sheet (2 min)

1. Sign in to Chrome with **the Gmail account that should receive the enquiries**.
2. Open <https://sheets.new> and name the file **TeamSamir Enquiries**.
3. Copy the sheet's URL and keep it handy. This is your enquiries sheet.

## Step 2: Add the script (2 min)

1. In the sheet, go to **Extensions → Apps Script**.
2. Delete everything in `Code.gs` and paste in the full contents of `docs/google-apps-script/Code.gs` from this project.
3. Click **Save** (💾). Name the project **TeamSamir Enquiry Backend**.

## Step 3: Run setup once (1 min)

1. In the function dropdown at the top, choose **`setup`** and click **Run**.
2. Google asks for permission. Click **Review permissions**, pick your account, then **Advanced → Go to TeamSamir Enquiry Backend (unsafe) → Allow**.
   (The "unsafe" warning appears because this is your own unpublished script. It only gets access to this sheet and to sending mail as you.)
3. Back in the sheet you'll see an **Enquiries** tab with blue headers. An hourly trigger for the digest email was also created.
4. Optional: choose **`testEmail`** and click **Run**. You should receive a sample enquiry email.

## Step 4: Deploy as a web app (1 min)

1. Click **Deploy → New deployment**.
2. Click the gear icon ⚙ and choose **Web app**.
3. Settings:
   - Description: `v1`
   - **Execute as: Me**
   - **Who has access: Anyone** (required so website visitors can submit; they can only add rows, not read the sheet)
4. Click **Deploy** and copy the **Web app URL**. It ends in `/exec`.

## Step 5: Connect the website

Set the URL as an environment variable:

```
VITE_FORM_ENDPOINT=https://script.google.com/macros/s/XXXXXXXX/exec
```

- **Local:** create `.env` in the project root with that line, then restart `npm run dev`.
- **Hosting** (Vercel, Netlify, etc.): add `VITE_FORM_ENDPOINT` in the project's Environment Variables settings, then **redeploy**. Vite bakes the value in at build time.

Then submit the form once on the site. You should see a new row in the sheet and an email in your inbox.

---

## Day-to-day

- **Follow-up Status** column: a dropdown with New / Called / No Answer / Demo Booked / Converted / Not Interested. **Notes** is free text.
- **Email Status** column: `Sent` means it was emailed on its own. `Pending (digest)` means it will be in the next hourly summary. `Sent in digest …` means it already was.
- Want a ping for every new row with no quota limit? In the sheet, go to **Tools → Notification settings → Edit notifications → "Any changes are made" → "Email – right away"**.

## Changing the script later

After editing `Code.gs` in Apps Script, go to **Deploy → Manage deployments → ✏ Edit → Version: New version → Deploy**.
This keeps the **same URL**, so nothing on the website needs to change. If you choose "New deployment" instead, you get a new URL and must update `VITE_FORM_ENDPOINT`.

## Settings you can change (top of `Code.gs`)

| Setting | Default | Meaning |
|---|---|---|
| `CC` | `[]` | Extra people to copy on each email. Each one uses quota. |
| `DIGEST_RESERVE` | `25` | Emails kept back each day for the hourly summaries |
| `DUPLICATE_WINDOW_SEC` | `120` | Ignores a repeat submit from the same mobile number within 2 min |
| `MIN_FILL_MS` | `2500` | Submits faster than this are treated as bots |

## Upgrading later (more emails)

- **Google Workspace account** (e.g. `info@yourdomain.com`): about 1,500 emails/day. Do the same setup under that account. No code change.
- **Brevo or Amazon SES:** only `sendEnquiryEmail_` and `sendPendingDigest` need to change to call their API. The website doesn't change.
