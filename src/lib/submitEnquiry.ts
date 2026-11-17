/**
 * Sends the enquiry form to the Google Apps Script web app
 * (docs/google-apps-script/Code.gs), which saves it to the Google Sheet and emails it.
 * The endpoint URL comes from VITE_FORM_ENDPOINT (see .env.example).
 */

export interface EnquiryPayload {
  fullName: string;
  email: string;
  mobileNumber: string;
  whatsappNumber: string;
  goal: string;
  /** Human-readable plan label */
  plan: string;
  contactMethod: string;
  /** Heading of the form the visitor saw, e.g. "Book Trial – INR 1,999" */
  formTitle: string;
  pageUrl: string;
  /** Honeypot: must stay empty (bots fill it) */
  website: string;
  /** Milliseconds between the form showing and submit (bot check) */
  elapsedMs: number;
}

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
const TIMEOUT_MS = 20000;

export async function submitEnquiry(payload: EnquiryPayload): Promise<void> {
  if (!ENDPOINT) {
    throw new Error('The enquiry form is not connected yet. Please call or WhatsApp us.');
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    // text/plain keeps this a "simple" request, so the browser skips the CORS
    // preflight that Apps Script cannot answer. The script parses the JSON body.
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !data?.ok) {
      throw new Error(data?.error || 'Could not send your request. Please try again.');
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error('The request timed out. Please check your connection and try again.');
    }
    if (err instanceof TypeError) {
      throw new Error('Network error. Please check your connection and try again.');
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}
