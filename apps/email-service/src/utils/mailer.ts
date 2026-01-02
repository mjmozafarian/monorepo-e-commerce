import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail", // Shortcut for Gmail's SMTP settings - see Well-Known Services
    auth: {
        type: "OAuth2",
        user: "mjmozafarian@gmail.com",
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
});

const sendEmail = async ({
    to,
    subject,
    text,
}: {
    to: string;
    subject: string;
    text: string;
}) => {
    const res = await transporter.sendMail({
        from: "Mjm E-Commerce <mjmozafarian@gmail.com>",
        to,
        subject,
        text,
    });

    console.log("Email sent:", res);
};

export default sendEmail;
