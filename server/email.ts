import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM || "ArchiLex <onboarding@resend.dev>";

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
    try {
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to,
            subject,
            html,
        });
        if (error) {
            console.error("Resend error:", error);
            throw error;
        }
        console.log("Email sent: %s", data?.id);
        return data;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

export const emailTemplates = {
    verification: (token: string) => ({
        subject: "Επαληθεύστε το email σας - ArchiLex",
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #1d4ed8;">Καλώς ήρθατε στο ArchiLex</h2>
        <p>Ευχαριστούμε για την εγγραφή σας. Παρακαλούμε επαληθεύστε το email σας πατώντας τον παρακάτω σύνδεσμο:</p>
        <div style="margin: 30px 0;">
          <a href="${process.env.APP_URL}/verify-email?token=${token}" 
             style="background-color: #1d4ed8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Επαλήθευση Email
          </a>
        </div>
        <p style="color: #6b7280; font-size: 14px;">Αν δεν δημιουργήσατε εσείς αυτόν τον λογαριασμό, μπορείτε να αγνοήσετε αυτό το email.</p>
      </div>
    `,
    }),
    passwordReset: (token: string) => ({
        subject: "Επαναφορά Κωδικού ArchiLex",
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #1d4ed8;">Επαναφορά Κωδικού</h2>
        <p>Λάβαμε ένα αίτημα για επαναφορά του κωδικού πρόσβασης στον λογαριασμό σας ArchiLex.</p>
        <p>Πατήστε τον παρακάτω σύνδεσμο για να ορίσετε νέο κωδικό. Ο σύνδεσμος λήγει σε 1 ώρα.</p>
        <div style="margin: 30px 0;">
          <a href="${process.env.APP_URL}/reset-password?token=${token}" 
             style="background-color: #1d4ed8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Επαναφορά Κωδικού
          </a>
        </div>
        <p style="color: #6b7280; font-size: 14px;">Αν δεν ζητήσατε εσείς την επαναφορά, μπορείτε να αγνοήσετε αυτό το email.</p>
      </div>
    `,
    }),
    usageWarning80: (uses: number, limit: number) => ({
        subject: "Πλησιάζετε το όριό σας - ArchiLex",
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #d97706;">Ενημέρωση Χρήσης</h2>
        <p>Σας ενημερώνουμε ότι έχετε χρησιμοποιήσει το **80%** του μηνιαίου ορίου σας.</p>
        <p>Τρέχουσα χρήση: <strong>${uses} / ${limit}</strong></p>
        <p>Για να αποφύγετε τη διακοπή της πρόσβασης στα εργαλεία, μπορείτε να αναβαθμίσετε το πλάνο σας.</p>
        <div style="margin: 30px 0;">
          <a href="${process.env.APP_URL}/dashboard" 
             style="background-color: #1d4ed8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Αναβάθμιση Πλάνου
          </a>
        </div>
      </div>
    `,
    }),
    usageLimitReached: (limit: number) => ({
        subject: "Εξαντλήσατε το όριό σας - Αναβαθμίστε - ArchiLex",
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #dc2626;">Εξάντληση Ορίου</h2>
        <p>Έχετε φτάσει στο μέγιστο όριο των <strong>${limit}</strong> χρήσεων για αυτόν τον μήνα.</p>
        <p>Η πρόσβαση στα AI εργαλεία έχει περιοριστεί. Αναβαθμίστε σε Pro πλάνο για απεριόριστη χρήση.</p>
        <div style="margin: 30px 0;">
          <a href="${process.env.APP_URL}/dashboard" 
             style="background-color: #1d4ed8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Αναβάθμιση τώρα
          </a>
        </div>
      </div>
    `,
    }),
    deadlineReminder: (projectName: string, daysLeft: number) => ({
        subject: "Υπενθύμιση προθεσμίας έργου - ArchiLex",
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #1d4ed8;">Υπενθύμιση Προθεσμίας</h2>
        <p>Το έργο <strong>${projectName}</strong> πλησιάζει στην προθεσμία του.</p>
        <p>Απομένουν <strong>${daysLeft} ημέρες</strong> για την ολοκλήρωση.</p>
        <div style="margin: 30px 0;">
          <a href="${process.env.APP_URL}/dashboard" 
             style="background-color: #1d4ed8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Δείτε το Έργο
          </a>
        </div>
      </div>
    `,
    }),
    upgradeSuccess: (planName: string) => ({
        subject: "Επιτυχής αναβάθμιση πλάνου - ArchiLex",
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #059669;">Συγχαρητήρια!</h2>
        <p>Η αναβάθμιση του λογαριασμού σας στο πλάνο <strong>${planName}</strong> ολοκληρώθηκε επιτυχώς.</p>
        <p>Τώρα έχετε πρόσβαση σε όλες τις προηγμένες δυνατότητες και το αυξημένο όριο χρήσης.</p>
        <div style="margin: 30px 0;">
          <a href="${process.env.APP_URL}/dashboard" 
             style="background-color: #1d4ed8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Μετάβαση στο Dashboard
          </a>
        </div>
      </div>
    `,
    }),
};
