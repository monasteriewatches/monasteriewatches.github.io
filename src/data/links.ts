/**
 * The site's outside links and launch status, all in one place.
 * Leave a value empty ('') and the part of the site that uses it hides
 * itself, so nothing ever links to a page that isn't there.
 */

/** One honest, dated line about where Lights Out stands. Change it as plans move. */
export const STATUS = 'Reveal early 2027';

/**
 * Where the email list form sends signups.
 * Kit (in use): https://app.kit.com/forms/<form id>/subscriptions
 *   The form id is the number in the address bar when editing the form.
 * Formspree: make a form at formspree.io, paste its URL here
 *   (looks like https://formspree.io/f/abcdwxyz).
 * Buttondown: paste https://buttondown.com/api/emails/embed-subscribe/<your-username>
 * Until this is filled in, the form tells visitors the list opens shortly
 * and offers the contact email instead (if there is one).
 */
export const WAITLIST_ENDPOINT = 'https://app.kit.com/forms/10245021/subscriptions';

/** Public contact address shown in the footer, e.g. 'hello@monasteriewatches.com'. */
export const CONTACT_EMAIL = '';

/** Social profiles. Paste the full profile URL; empty ones are not shown. */
export const SOCIALS: { name: string; href: string }[] = [
  { name: 'Instagram', href: '' },
  { name: 'TikTok', href: '' },
  { name: 'YouTube', href: '' },
  { name: 'LinkedIn', href: '' },
];
