import emailjs from "@emailjs/browser";

export const EMAILJS_CONFIG = {
  serviceId: "service_3w6xnar",
  templateId: "template_n0y8lf8",
  publicKey: "hZAwGSThUfj-ARjrP",
};

let initialized = false;
function ensureInit() {
  if (initialized) return;
  emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  initialized = true;
}

export async function sendEmailMessage(message: string) {
  ensureInit();
  return emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
    message,
  });
}
