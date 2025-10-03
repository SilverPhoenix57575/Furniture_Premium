# Email Notification Setup Guide

Email notifications are now integrated! When customers submit forms, you'll receive emails automatically.

## Quick Setup (Gmail)

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** → **2-Step Verification**
3. Follow the steps to enable it

### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select **Mail** and **Windows Computer** (or Other)
3. Click **Generate**
4. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

### Step 3: Update .env File
Edit `backend/.env`:

```env
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=abcd efgh ijkl mnop
BUSINESS_EMAIL=debipanda27@gmail.com
```

Replace:
- `your-email@gmail.com` - Your Gmail address
- `abcd efgh ijkl mnop` - The app password from Step 2
- `debipanda27@gmail.com` - Email where you want to receive notifications

### Step 4: Restart Backend
```bash
# Stop the server (Ctrl+C)
# Start again
uvicorn server:app --reload
```

## What Gets Sent?

### When Customer Submits:
1. **Quote Request** → You get email with customer details + Customer gets confirmation
2. **Consultation Request** → You get email with project details + Customer gets confirmation
3. **Contact Message** → You get email with message + Customer gets confirmation

### Email Contains:
- Customer name, email, phone
- Their message/requirements
- Timestamp
- Professional HTML formatting

## Using Other Email Providers

### Outlook/Hotmail
```env
SMTP_SERVER=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_EMAIL=your-email@outlook.com
SMTP_PASSWORD=your-password
```

### Yahoo Mail
```env
SMTP_SERVER=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_EMAIL=your-email@yahoo.com
SMTP_PASSWORD=your-app-password
```

### Custom Domain (e.g., GoDaddy, Namecheap)
```env
SMTP_SERVER=smtp.yourdomain.com
SMTP_PORT=587
SMTP_EMAIL=contact@yourdomain.com
SMTP_PASSWORD=your-password
```

## Testing

1. Start the backend
2. Go to your website
3. Submit a quote request or consultation
4. Check your email inbox!

## Troubleshooting

### "Email not configured" message
- Check `.env` file has correct values
- Restart the backend server

### Emails not arriving
- Check spam/junk folder
- Verify app password is correct (no spaces)
- Make sure 2FA is enabled on Gmail
- Check SMTP settings match your provider

### "Authentication failed"
- Use app password, NOT your regular Gmail password
- Remove any spaces from the app password
- Regenerate app password if needed

## Security Notes

- ✅ Never commit `.env` file to Git (it's in `.gitignore`)
- ✅ Use app passwords, not regular passwords
- ✅ Keep SMTP credentials private
- ✅ Emails are sent over encrypted TLS connection

## Need Help?

Contact: debipanda27@gmail.com
