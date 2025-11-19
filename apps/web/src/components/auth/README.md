# Authentication Components

This directory contains the integrated authentication components for sign-in and sign-up functionality with email verification.

## Structure

```
auth/
├── auth-layout.tsx          # Main layout with integrated sign-in/sign-up toggle
├── sign-in-form.tsx         # Sign-in form component
├── sign-up-form.tsx         # Sign-up form component
├── email-verification.tsx   # Email verification component for sign-up
├── index.ts                 # Exports for easy importing
└── README.md                # This file
```

## Components

### AuthLayout

The main authentication layout component that provides:
- Integrated sign-in/sign-up toggle (tab switcher)
- Multi-step sign-up flow with email verification
- Responsive split-screen design (form on left, illustration on right)
- Automatic form switching based on user selection
- Consistent branding and styling

**Usage:**
```tsx
import { AuthLayout } from "@/components/auth";

// Default to sign-in mode
export default function AuthPage() {
    return <AuthLayout />;
}

// Start with sign-up mode
export default function SignUpPage() {
    return <AuthLayout initialMode="signup" />;
}
```

**Props:**
```tsx
interface AuthLayoutProps {
    initialMode?: "signin" | "signup"; // Default: "signin"
}
```

### SignInForm

A reusable sign-in form component with:
- Email and password fields
- "Remember me" checkbox
- "Forgot password" link
- Google authentication button
- Form validation

**Props:**
```tsx
interface SignInFormProps {
    onSubmit: (data: { email: string; password: string }) => void;
    onGoogleSignIn: () => void;
}
```

### SignUpForm

A reusable sign-up form component with:
- Full name, email, password, and confirm password fields
- Terms of service agreement checkbox
- Google authentication button
- Password matching validation
- Form validation

**Props:**
```tsx
interface SignUpFormProps {
    onSubmit: (data: {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    }) => void;
    onGoogleSignUp: () => void;
}
```

### EmailVerification

A verification code input component for email verification with:
- 6-digit code input with auto-focus
- Paste support for verification codes
- Resend code functionality with countdown timer
- Back to sign-up option
- Visual feedback and helper text

**Props:**
```tsx
interface EmailVerificationProps {
    email: string;                          // The email address to verify
    onVerify: (code: string) => void;      // Called when user submits valid code
    onBack: () => void;                     // Called when user wants to go back
    onResend: () => void;                   // Called when user requests new code
}
```

**Features:**
- Auto-focus next input field as user types
- Support for pasting 6-digit codes
- 60-second countdown before allowing resend
- Backspace navigation between inputs
- Visual feedback for code completion

## Features

✅ **Single Page Integration**: Sign-in and sign-up on one page with smooth toggle
✅ **Multi-Step Sign-Up**: Email verification step after initial sign-up
✅ **Component-based**: Modular components for easy maintenance and reuse
✅ **Responsive Design**: Works on all screen sizes with hidden right panel on mobile
✅ **Monochromatic Theme**: Uses design tokens from `index.css`
✅ **Lucide Icons**: Modern icon system for consistent UI
✅ **Google OAuth Ready**: Placeholder for Google authentication integration
✅ **Form Validation**: Built-in HTML5 validation with custom checks
✅ **Email Verification**: Code-based email verification with resend functionality

## Authentication Flow

### Sign-In Flow
1. User enters email and password
2. Form submits to backend
3. On success, redirects to `/onboarding`

### Sign-Up Flow
1. **Step 1: Registration Form**
   - User enters name, email, password, and confirms password
   - User agrees to terms of service
   - Form submits to backend
   
2. **Step 2: Email Verification**
   - Backend sends 6-digit verification code to email
   - User enters verification code
   - Code is validated by backend
   - On success, redirects to `/onboarding`

### Google OAuth Flow
1. User clicks "Continue with Google"
2. OAuth flow initiated
3. On success, redirects to `/onboarding`

## How It Works

### Page Structure
- **Root Page (`/`)**: Renders `<AuthLayout />` (defaults to sign-in)
- **Sign-Up Page (`/signup`)**: Renders `<AuthLayout initialMode="signup" />`
- **Login Page (`/login`)**: Renders `<AuthLayout initialMode="signin" />`

### State Management
The `AuthLayout` component manages:
- `mode`: Current auth mode ("signin" | "signup")
- `signUpStep`: Current sign-up step ("form" | "verification")
- `signUpEmail`: Email address for verification

### Transitions
- Toggle between sign-in and sign-up using tab buttons
- After sign-up form submission, automatically transitions to verification step
- Verification step hides the toggle and shows back button
- Dynamic header text based on current mode and step

## Customization

### Backend Integration

Update the handlers in `auth-layout.tsx`:

```tsx
const handleSignIn = async (data: { email: string; password: string }) => {
    try {
        // Call your sign-in API
        const response = await fetch('/api/auth/signin', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        
        if (response.ok) {
            router.push("/onboarding");
        }
    } catch (error) {
        // Handle error
    }
};

const handleSignUp = async (data: {...}) => {
    try {
        // Call your sign-up API
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        
        if (response.ok) {
            // Store email and show verification step
            setSignUpEmail(data.email);
            setSignUpStep("verification");
        }
    } catch (error) {
        // Handle error
    }
};

const handleEmailVerification = async (code: string) => {
    try {
        // Call your verification API
        const response = await fetch('/api/auth/verify', {
            method: 'POST',
            body: JSON.stringify({ email: signUpEmail, code }),
        });
        
        if (response.ok) {
            router.push("/onboarding");
        }
    } catch (error) {
        // Handle error
    }
};

const handleResendCode = async () => {
    try {
        // Call your resend API
        await fetch('/api/auth/resend', {
            method: 'POST',
            body: JSON.stringify({ email: signUpEmail }),
        });
    } catch (error) {
        // Handle error
    }
};
```

### Styling

All components use Tailwind classes and design tokens from `index.css`:
- `--color-primary`
- `--color-foreground`
- `--color-background`
- `--color-muted-foreground`
- `--color-border`

To customize the look, modify these CSS variables in `src/index.css`.

### Right Panel Content

The illustration/content on the right panel can be customized in `auth-layout.tsx`. Currently it shows:
- ORBIT logo
- Welcome message (changes based on sign-in/sign-up mode)
- Three numbered feature highlights

### Verification Code Settings

In `email-verification.tsx`, you can customize:
- Code length (default: 6 digits)
- Resend countdown (default: 60 seconds)
- Code expiration time (mentioned in helper text)

## Migration Notes

All authentication pages now use the unified `AuthLayout`:
- `src/app/page.tsx` - Uses `AuthLayout` (sign-in mode)
- `src/app/signup/page.tsx` - Uses `AuthLayout` with `initialMode="signup"`
- `src/app/login/page.tsx` - Uses `AuthLayout` with `initialMode="signin"`

All authentication logic is centralized in the `auth/` components directory.

## Next Steps

To make this production-ready:

1. **Integrate Real Authentication**:
   - Replace placeholder handlers with actual API calls
   - Add proper error handling and loading states
   - Implement JWT token management
   - Add session management

2. **Email Verification Backend**:
   - Set up email service (SendGrid, AWS SES, etc.)
   - Generate and store verification codes
   - Implement code expiration logic
   - Add rate limiting for resend requests

3. **Add Google OAuth**:
   - Set up Google OAuth credentials
   - Implement the OAuth flow in `handleGoogleAuth`
   - Add proper callback handling
   - Handle OAuth errors

4. **Enhanced Validation**:
   - Add password strength indicator
   - Implement real-time email validation
   - Add helpful error messages
   - Show field-specific validation errors

5. **Security**:
   - Add CSRF protection
   - Implement rate limiting
   - Add captcha for bot protection
   - Hash passwords properly (bcrypt/argon2)
   - Implement brute-force protection

6. **UX Improvements**:
   - Add loading spinners during API calls
   - Show success/error toast notifications
   - Add smooth transitions between steps
   - Implement password visibility toggle
   - Add progress indicator for multi-step flow
   - Improve accessibility (ARIA labels, keyboard navigation)

7. **Error Handling**:
   - Handle network errors gracefully
   - Show user-friendly error messages
   - Add retry logic for failed requests
   - Handle expired verification codes

8. **Testing**:
   - Write unit tests for form validation
   - Add integration tests for auth flow
   - Test email verification process
   - Test edge cases (expired codes, invalid emails, etc.)