function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function contactEmailHtml({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:40px 20px;background:#000000;font-family:Helvetica,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;">
      <p style="margin:0 0 8px;color:#37e08c;font-size:12px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;">
        Novo contato pelo portfólio
      </p>
      <h1 style="margin:0 0 32px;color:#f5f5f5;font-size:26px;font-weight:800;letter-spacing:-0.02em;line-height:1.15;">
        ${safeName} te enviou uma mensagem
      </h1>

      <div style="border-top:1px solid rgba(255,255,255,0.15);padding-top:24px;">
        <p style="margin:0 0 4px;color:#8a8a8a;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Nome</p>
        <p style="margin:0 0 20px;color:#f5f5f5;font-size:17px;font-weight:700;">${safeName}</p>

        <p style="margin:0 0 4px;color:#8a8a8a;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Email</p>
        <p style="margin:0 0 20px;color:#f5f5f5;font-size:17px;font-weight:700;">${safeEmail}</p>

        <p style="margin:0 0 4px;color:#8a8a8a;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Mensagem</p>
        <p style="margin:0;color:#f5f5f5;font-size:16px;line-height:1.6;">${safeMessage}</p>
      </div>

      <div style="margin-top:32px;">
        <a
          href="mailto:${safeEmail}"
          style="display:inline-block;background:#37e08c;color:#000000;text-decoration:none;font-size:13px;font-weight:800;letter-spacing:-0.01em;text-transform:uppercase;padding:12px 26px;border-radius:999px;"
        >
          Responder ${safeName}
        </a>
      </div>

      <p style="margin:40px 0 0;color:#8a8a8a;font-size:12px;">
        Enviado automaticamente pelo formulário de contato do seu portfólio.
      </p>
    </div>
  </body>
</html>`;
}
