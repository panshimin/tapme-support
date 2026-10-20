import assert from "node:assert/strict";

export function validateContact({ siteUrl, publisher, supportEmail, policyDate, termsDate }, now = new Date()) {
  assert.ok(typeof siteUrl === "string" && /^https:\/\/[^/\s]+(\/[^\s]*)?$/.test(siteUrl), "Set the public HTTPS siteUrl in contact.json.");
  assert.ok(typeof publisher === "string" && publisher.trim() && publisher === publisher.trim(), "Set the approved public publisher name in contact.json.");
  assert.ok(!/^(?:todo|tbd|placeholder|待填写|待确认)$/i.test(publisher), "Replace the placeholder publisher.");
  assert.ok(typeof supportEmail === "string" && /^[a-z0-9._+-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(supportEmail), "Set a valid, registered support email in contact.json.");
  const domain = supportEmail.split("@")[1].toLowerCase();
  assert.ok(!/(^|\.)(example\.(com|net|org)|example|invalid|test|localhost)$/.test(domain), "Replace the placeholder email with a real support mailbox.");
  for (const [name, value] of [["policy", policyDate], ["terms", termsDate]]) {
    assert.ok(typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value), `Set an ISO ${name} effective date.`);
    const date = new Date(`${value}T00:00:00Z`);
    assert.ok(Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value, `The ${name} effective date must be a real calendar date.`);
    assert.ok(value <= now.toISOString().slice(0, 10), `The published ${name} must already be effective.`);
  }
}

const escapeHTML = (value) => value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;" })[c]);

export function validatePublicPage(response, html, path, contact) {
  assert.equal(response.status, 200, `${path}: must be anonymously accessible without redirects or sign-in`);
  assert.match(response.headers.get("content-type") || "", /text\/html/i, `${path}: expected HTML`);
  assert.ok(html.includes(escapeHTML(contact.publisher)), `${path}: missing publisher`);
  assert.ok(html.includes(`href="mailto:${contact.supportEmail}?subject=`), `${path}: missing support email link`);
  assert.ok(!/unpublished draft|发布前草稿|Sign in required/.test(html), `${path}: draft or login page`);
}
