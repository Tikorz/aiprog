import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  userName?: string;
}

export default function WelcomeEmail({ userName = "there" }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to AiProg - Start Building with AI</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to AiProg!</Heading>

          <Text style={text}>Hi {userName},</Text>

          <Text style={text}>
            Thanks for joining AiProg! You're now part of a growing community of developers
            building the future with AI.
          </Text>

          <Section style={section}>
            <Text style={text}>
              <strong>What you can do now:</strong>
            </Text>
            <Text style={text}>• Start building applications with our AI assistant</Text>
            <Text style={text}>• Access error-free code generation</Text>
            <Text style={text}>• Get 24/7 AI support</Text>
          </Section>

          <Section style={buttonContainer}>
            <Link style={button} href={`${process.env.NEXT_PUBLIC_URL}/dashboard`}>
              Go to Dashboard
            </Link>
          </Section>

          <Text style={footer}>
            Questions? Just reply to this email - we're here to help!
          </Text>

          <Text style={footer}>
            The AiProg Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#000000",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "560px",
};

const h1 = {
  color: "#ffffff",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "0 0 30px",
};

const text = {
  color: "#a1a1aa",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
};

const section = {
  margin: "32px 0",
};

const buttonContainer = {
  margin: "32px 0",
};

const button = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  color: "#000000",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 32px",
};

const footer = {
  color: "#71717a",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "32px 0 0",
};
