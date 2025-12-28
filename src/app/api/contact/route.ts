import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactRateLimiter } from '@/lib/rate-limiter';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  budget: string;
}

export async function POST(request: NextRequest) {
  try {
    // Get IP address for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'anonymous';

    // Check rate limit
    const rateLimitResult = contactRateLimiter.check(ip);

    if (!rateLimitResult.success) {
      const resetDate = new Date(rateLimitResult.resetTime);
      const minutesUntilReset = Math.ceil((rateLimitResult.resetTime - Date.now()) / 60000);

      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter: minutesUntilReset,
          resetTime: resetDate.toISOString()
        },
        {
          status: 429,
          headers: {
            'Retry-After': minutesUntilReset.toString(),
            'X-RateLimit-Limit': '3',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': resetDate.toISOString()
          }
        }
      );
    }

    const body: ContactFormData = await request.json();
    const { name, phone, email, message, budget } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'lucassioliveira098@gmail.com',
      subject: `New Contact from ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Courier New', monospace;
              background-color: #E5E5DD;
              color: #000000;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #E5E5DD;
              padding: 40px 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
              border-bottom: 2px solid #000000;
              padding-bottom: 20px;
            }
            .header h1 {
              font-size: 32px;
              font-weight: bold;
              letter-spacing: -0.02em;
              margin-bottom: 10px;
            }
            .header p {
              font-size: 12px;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              opacity: 0.8;
            }
            .content {
              background-color: #ffffff;
              border: 1px solid #000000;
              padding: 30px;
              margin-bottom: 30px;
            }
            .field {
              margin-bottom: 20px;
              padding-bottom: 15px;
              border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            }
            .field:last-child {
              border-bottom: none;
              margin-bottom: 0;
            }
            .field-label {
              font-size: 11px;
              font-weight: bold;
              letter-spacing: 0.05em;
              text-transform: uppercase;
              color: #666;
              margin-bottom: 8px;
              display: block;
            }
            .field-value {
              font-size: 16px;
              color: #000000;
              word-wrap: break-word;
            }
            .message-value {
              white-space: pre-wrap;
              line-height: 1.8;
            }
            .budget-badge {
              display: inline-block;
              background-color: #000000;
              color: #E5E5DD;
              padding: 6px 16px;
              font-size: 13px;
              font-weight: bold;
              letter-spacing: 0.05em;
              border-radius: 2px;
            }
            .footer {
              text-align: center;
              padding-top: 20px;
              border-top: 1px solid rgba(0, 0, 0, 0.2);
            }
            .footer p {
              font-size: 11px;
              color: #666;
              letter-spacing: 0.05em;
            }
            .cta-button {
              display: inline-block;
              margin-top: 20px;
              padding: 12px 24px;
              background-color: #000000;
              color: #E5E5DD;
              text-decoration: none;
              font-size: 12px;
              font-weight: bold;
              letter-spacing: 0.05em;
              text-transform: uppercase;
              border: 1px solid #000000;
              transition: all 0.3s ease;
            }
            .cta-button:hover {
              background-color: #E5E5DD;
              color: #000000;
            }
            @media only screen and (max-width: 600px) {
              .container {
                padding: 20px 10px;
              }
              .content {
                padding: 20px;
              }
              .header h1 {
                font-size: 24px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>NEW CONTACT</h1>
              <p>Great collaboration starts here</p>
            </div>

            <div class="content">
              <div class="field">
                <span class="field-label">Name</span>
                <div class="field-value">${name}</div>
              </div>

              <div class="field">
                <span class="field-label">Email</span>
                <div class="field-value">
                  <a href="mailto:${email}" style="color: #000000; text-decoration: underline;">${email}</a>
                </div>
              </div>

              ${phone ? `
              <div class="field">
                <span class="field-label">Phone</span>
                <div class="field-value">
                  <a href="tel:${phone}" style="color: #000000; text-decoration: underline;">${phone}</a>
                </div>
              </div>
              ` : ''}

              <div class="field">
                <span class="field-label">Project Budget (USD)</span>
                <div class="field-value">
                  <span class="budget-badge">${budget || 'Not specified'}</span>
                </div>
              </div>

              <div class="field">
                <span class="field-label">Message</span>
                <div class="field-value message-value">${message}</div>
              </div>
            </div>

            <div class="footer">
              <p style="margin-top: 20px;">Sent from your portfolio contact form</p>
              <p style="margin-top: 5px;">lucasoliveira.io</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message! I will get back to you soon.'
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': '3',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString()
        }
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
