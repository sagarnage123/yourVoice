import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpEmail({
    to,
    otp,
}: {
    to: string;
    otp: string;
}) {
    await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to,
        subject: "Your yourVoice verification code",
        text: `Your yourVoice verification code is:

${otp}

This code expires in 10 minutes.
If you didn’t request this, you can safely ignore this email.`,
    });
}

export function isValidEmail(value: string) {
    if(value===undefined || value===null || value==="student1@college.edu") return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

