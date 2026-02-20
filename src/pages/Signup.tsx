import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TrendingUp, Mail, Lock, Eye, EyeOff, Loader2, Check } from 'lucide-react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create account';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const passwordRequirements = [
    { met: password.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(password), text: 'One uppercase letter' },
    { met: /[0-9]/.test(password), text: 'One number' },
  ];

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-gray-200 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-gray-200 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md px-4 py-12">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 shadow-lg shadow-gray-200">
              <TrendingUp className="size-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Vaultly</span>
          </Link>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl bg-white p-8 shadow-xl shadow-gray-200/50">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">Create your account</h1>
            <p className="text-sm text-gray-500">Start tracking your crypto portfolio</p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              <Lock className="size-4" />
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 border-gray-200 bg-gray-50 pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-gray-900"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  className="h-12 border-gray-200 bg-gray-50 pl-11 pr-12 text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-gray-900"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            {password.length > 0 && (
              <div className="space-y-2 rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-medium text-gray-500">Password requirements:</p>
                <div className="flex flex-wrap gap-3">
                  {passwordRequirements.map((req, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-1 text-xs ${
                        req.met ? 'text-green-600' : 'text-gray-400'
                      }`}
                    >
                      <Check className="size-3" />
                      {req.text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="h-12 w-full bg-gray-900 text-base font-semibold text-white hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 size-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-gray-900 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-400">
          By creating an account, you agree to our{' '}
          <Link to="/terms" className="underline hover:text-gray-600">
            Terms
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="underline hover:text-gray-600">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
