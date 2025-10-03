import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
SMTP_EMAIL = os.getenv('SMTP_EMAIL', '')
SMTP_PASSWORD = os.getenv('SMTP_PASSWORD', '')
BUSINESS_EMAIL = os.getenv('BUSINESS_EMAIL', 'debipanda27@gmail.com')

def send_email(to_email, subject, html_content):
    """Send email using SMTP"""
    if not SMTP_EMAIL or not SMTP_PASSWORD:
        print("Email not configured. Skipping email send.")
        return False
    
    try:
        msg = MIMEMultipart('alternative')
        msg['From'] = SMTP_EMAIL
        msg['To'] = to_email
        msg['Subject'] = subject
        
        html_part = MIMEText(html_content, 'html')
        msg.attach(html_part)
        
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_EMAIL, SMTP_PASSWORD)
            server.send_message(msg)
        
        return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False

def send_quote_notification(quote_data):
    """Send email notification for quote request"""
    subject = f"New Quote Request - {quote_data['name']}"
    
    html = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #064e3b;">New Quote Request</h2>
            <p>You have received a new quote request from your website.</p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Customer Details:</h3>
                <p><strong>Name:</strong> {quote_data['name']}</p>
                <p><strong>Email:</strong> {quote_data['email']}</p>
                <p><strong>Phone:</strong> {quote_data['phone']}</p>
                <p><strong>Product IDs:</strong> {quote_data['product_ids']}</p>
                {f"<p><strong>Message:</strong><br>{quote_data['message']}</p>" if quote_data.get('message') else ''}
            </div>
            
            <p style="color: #666; font-size: 14px;">
                Please respond to this customer within 24 hours.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            <p style="color: #999; font-size: 12px;">
                Pankaj Furniture - Three Generations of Craftsmanship
            </p>
        </body>
    </html>
    """
    
    return send_email(BUSINESS_EMAIL, subject, html)

def send_consultation_notification(consultation_data):
    """Send email notification for consultation request"""
    subject = f"New Consultation Request - {consultation_data['name']}"
    
    html = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #064e3b;">New Design Consultation Request</h2>
            <p>You have received a new design consultation request from your website.</p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Customer Details:</h3>
                <p><strong>Name:</strong> {consultation_data['name']}</p>
                <p><strong>Email:</strong> {consultation_data['email']}</p>
                <p><strong>Phone:</strong> {consultation_data['phone']}</p>
                <p><strong>Project Type:</strong> {consultation_data['project_type']}</p>
                {f"<p><strong>Budget:</strong> {consultation_data['budget']}</p>" if consultation_data.get('budget') else ''}
                {f"<p><strong>Message:</strong><br>{consultation_data['message']}</p>" if consultation_data.get('message') else ''}
            </div>
            
            <p style="color: #666; font-size: 14px;">
                Please schedule a consultation call within 24 hours.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            <p style="color: #999; font-size: 12px;">
                Pankaj Furniture - Three Generations of Craftsmanship
            </p>
        </body>
    </html>
    """
    
    return send_email(BUSINESS_EMAIL, subject, html)

def send_contact_notification(contact_data):
    """Send email notification for contact message"""
    subject = f"New Contact Message - {contact_data['name']}"
    
    html = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #064e3b;">New Contact Message</h2>
            <p>You have received a new message from your website.</p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Contact Details:</h3>
                <p><strong>Name:</strong> {contact_data['name']}</p>
                <p><strong>Email:</strong> {contact_data['email']}</p>
                {f"<p><strong>Subject:</strong> {contact_data['subject']}</p>" if contact_data.get('subject') else ''}
                <p><strong>Message:</strong><br>{contact_data['message']}</p>
            </div>
            
            <p style="color: #666; font-size: 14px;">
                Please respond to this inquiry promptly.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            <p style="color: #999; font-size: 12px;">
                Pankaj Furniture - Three Generations of Craftsmanship
            </p>
        </body>
    </html>
    """
    
    return send_email(BUSINESS_EMAIL, subject, html)

def send_customer_confirmation(customer_email, customer_name, request_type):
    """Send confirmation email to customer"""
    subject = "Thank you for contacting Pankaj Furniture"
    
    html = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #064e3b;">Thank You, {customer_name}!</h2>
            <p>We have received your {request_type} and will get back to you within 24 hours.</p>
            
            <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #064e3b;">
                <p style="margin: 0;">
                    Our team is reviewing your request and will contact you soon with more information.
                </p>
            </div>
            
            <h3 style="color: #064e3b;">Visit Our Showroom</h3>
            <p>
                <strong>Address:</strong> Plot No-97, 7th St, Bapuji Nagar, Bhubaneswar, Odisha 751009<br>
                <strong>Phone:</strong> +91 98765 43210<br>
                <strong>Email:</strong> debipanda27@gmail.com<br>
                <strong>Hours:</strong> Mon-Fri: 10:00 AM - 8:00 PM | Sat-Sun: 10:00 AM - 9:00 PM
            </p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            <p style="color: #999; font-size: 12px;">
                Pankaj Furniture - Three Generations of Craftsmanship<br>
                Since 1965
            </p>
        </body>
    </html>
    """
    
    return send_email(customer_email, subject, html)
