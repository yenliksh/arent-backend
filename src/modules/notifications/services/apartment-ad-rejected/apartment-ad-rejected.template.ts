import { DefaultTemplateProps } from '@modules/notifications/types';

interface TemplateProps {
  recipientName: string;
  buttonLink: string;
}

export const apartmentAdRejectedTemplate = ({
  recipientName,
  buttonLink,
  fbLink = process.env.FACEBOOK,
  instagramLink = process.env.INSTAGRAM,
  linkedInLink = process.env.LINKEDIN,
}: DefaultTemplateProps<TemplateProps>) => `
<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title>Livin</title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }</style><!--[if mso]>
    <noscript>
    <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    </noscript>
    <![endif]--><!--[if lte mso 11]>
    <style type="text/css">
      .mj-outlook-group-fix { width:100% !important; }
    </style>
    <![endif]--><style type="text/css">@media only screen and (min-width:480px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }

      .mj-column-per-50 {
        width: 50% !important;
        max-width: 50%;
      }
    }</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 {
      width: 100% !important;
      max-width: 100%;
    }

    .moz-text-html .mj-column-per-50 {
      width: 50% !important;
      max-width: 50%;
    }</style><style type="text/css">@media only screen and (max-width:480px) {
      table.mj-full-width-mobile {
        width: 100% !important;
      }

      td.mj-full-width-mobile {
        width: auto !important;
      }
    }</style><style type="text/css">@font-face {
      font-family: 'Verdana';
      font-weight: 400;
      font-style: normal;
      font-display: swap;
      src: url('https://livin-email-files.s3.ap-south-1.amazonaws.com/fonts/Verdana/Verdana-Regular.woff2') format('woff2'),
        url('https://livin-email-files.s3.ap-south-1.amazonaws.com/fonts/Verdana/Verdana-Regular.woff') format('woff');
    }

    @font-face {
      font-family: 'Verdana';
      font-weight: 700;
      font-style: normal;
      font-display: swap;
      src: url('https://livin-email-files.s3.ap-south-1.amazonaws.com/fonts/Verdana/Verdana-Bold.woff2') format('woff2'),
        url('https://livin-email-files.s3.ap-south-1.amazonaws.com/fonts/Verdana/Verdana-Bold.woff') format('woff');
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    @media (min-width: 480px) {
      .button table {
        max-width: 250px !important;
      }

      .footer__copyright div {
        text-align: left !important;
      }

      .footer__address div {
        margin-right: auto;
        max-width: 235px;
        text-align: left !important;
      }

      .social {
        text-align: right !important;
      }
    }</style></head><body style="word-spacing:normal;background-color:#ffffff;"><div style="background-color:#ffffff;"><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 16px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="width:568px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0;line-height:0;text-align:left;display:inline-block;width:100%;direction:ltr;"><!--[if mso | IE]><table border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td style="vertical-align:middle;width:568px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%"><tbody><tr><td align="left" style="font-size:0px;padding:0;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:87px;"><img alt="Livin" height="32" src="https://livin-email-files.s3.ap-south-1.amazonaws.com/images/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:32px;width:100%;font-size:13px;" width="87"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0 16px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:568px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:0;word-break:break-word;"><p style="border-top:solid 1px #eff1f5;font-size:1px;margin:0px auto;width:100%;"></p><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #eff1f5;font-size:1px;margin:0px auto;width:568px;" role="presentation" width="568px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0 16px;padding-bottom:80px;padding-top:56px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:568px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="left" style="font-size:0px;padding:0;padding-bottom:20px;word-break:break-word;"><div style="font-family:Verdana;font-size:24px;font-weight:700;line-height:34px;text-align:left;color:#000000;">Здравствуйте, ${recipientName}!</div></td></tr><tr><td align="left" style="font-size:0px;padding:0;word-break:break-word;"><div style="font-family:Verdana;font-size:14px;font-weight:400;line-height:20px;text-align:left;color:#313745;">Ваш запрос на публикацию объявления был отклонен ❌</div></td></tr><tr><td align="left" style="font-size:0px;padding:0;word-break:break-word;"><div style="font-family:Verdana;font-size:14px;font-weight:400;line-height:20px;text-align:left;color:#313745;">Вы можете узнать причину в дашборде.</div></td></tr><tr><td align="left" vertical-align="middle" class="button" style="font-size:0px;padding:24px 0;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;width:100%;line-height:100%;"><tbody><tr><td align="center" bgcolor="#1c212d" role="presentation" style="border:none;border-radius:12px;cursor:auto;mso-padding-alt:16px 24px;background:#1c212d;" valign="middle"><a href="${buttonLink}" style="display:inline-block;background:#1c212d;color:#ffffff;font-family:Verdana;font-size:12px;font-weight:700;line-height:16px;margin:0;text-decoration:none;text-transform:none;padding:16px 24px;mso-padding-alt:0px;border-radius:12px;" target="_blank">Дашборд</a></td></tr></tbody></table></td></tr><tr><td align="left" style="font-size:0px;padding:0;word-break:break-word;"><div style="font-family:Verdana;font-size:14px;font-weight:400;line-height:20px;text-align:left;color:#313745;">Хорошего дня,<br>Livin</div></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#1c212d" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#1c212d;background-color:#1c212d;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#1c212d;background-color:#1c212d;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:16px;padding-bottom:0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:568px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="left" style="font-size:0px;padding:0;word-break:break-word;"><div style="font-family:Verdana;font-size:12px;font-weight:400;line-height:17px;text-align:left;color:#afb5c0;">Вы получили это письмо, потому что подписались на рассылку на нашем сайте.</div></td></tr><tr><td align="center" class="footer__address" style="font-size:0px;padding:0;word-break:break-word;"><div style="font-family:Verdana;font-size:12px;font-weight:400;line-height:17px;text-align:center;color:#afb5c0;">ООО «Ливин», 123456, г. Нур-Султан, пр-кт. Туран, д. 22/1, 10 этаж, офис 3</div></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#1c212d" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#1c212d;background-color:#1c212d;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#1c212d;background-color:#1c212d;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:16px;padding-top:0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:284px;" ><![endif]--><div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" class="footer__copyright" style="font-size:0px;padding:0;padding-top:24px;word-break:break-word;"><div style="font-family:Verdana;font-size:12px;font-weight:400;line-height:17px;text-align:center;color:#afb5c0;">© 2022 · Livin · Все права защищены</div></td></tr></tbody></table></div><!--[if mso | IE]></td><td class="" style="vertical-align:top;width:284px;" ><![endif]--><div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" class="social" style="font-size:0px;padding:0;padding-top:24px;word-break:break-word;"><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td><![endif]--><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;"><tbody><tr><td style="padding:0 16px;vertical-align:middle;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px;"><tbody><tr><td style="font-size:0;height:20px;vertical-align:middle;width:20px;"><a href="${fbLink}" target="_blank"><img alt="Facebook" height="20" src="https://livin-email-files.s3.ap-south-1.amazonaws.com/images/facebook.png" style="border-radius:3px;display:block;" width="20"></a></td></tr></tbody></table></td></tr></tbody></table><!--[if mso | IE]></td><td><![endif]--><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;"><tbody><tr><td style="padding:0 16px;vertical-align:middle;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px;"><tbody><tr><td style="font-size:0;height:20px;vertical-align:middle;width:20px;"><a href="${instagramLink}" target="_blank"><img alt="Instagram" height="20" src="https://livin-email-files.s3.ap-south-1.amazonaws.com/images/instagram.png" style="border-radius:3px;display:block;" width="20"></a></td></tr></tbody></table></td></tr></tbody></table><!--[if mso | IE]></td><td><![endif]--><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;"><tbody><tr><td style="padding:0 16px;vertical-align:middle;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px;"><tbody><tr><td style="font-size:0;height:20px;vertical-align:middle;width:20px;"><a href="${linkedInLink}" target="_blank"><img alt="LinkedIn" height="20" src="https://livin-email-files.s3.ap-south-1.amazonaws.com/images/linkedin.png" style="border-radius:3px;display:block;" width="20"></a></td></tr></tbody></table></td></tr></tbody></table><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>
`;
