import { __awaiter } from "tslib";
import nodemailer from "nodemailer";
export function sendEmail(to, html) {
    return __awaiter(this, void 0, void 0, function* () {
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: "rjqyogozlfzqlct3@ethereal.email",
                pass: 'VZDHZZkU9rfMtcUdc7',
            },
        });
        let info = yield transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>',
            to: to,
            subject: "Change password",
            html,
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
}
//# sourceMappingURL=sendEmail.js.map