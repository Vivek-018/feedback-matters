import { Html,Head ,Button, Font, Preview, Section } from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head>
        <title>Verification Email</title>
      </Head>
      <Preview> Here is your verification code: {otp}</Preview>
      <Section>
        <p>Hi {username},</p>
        <p>Here is your verification code: {otp}</p>
      </Section>
    </Html>
  );
}
