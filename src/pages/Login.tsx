import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TrendingUp, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid credentials or user not found';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
            <h1 className="mb-2 text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-sm text-gray-500">Sign in to access your portfolio</p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              <Lock className="size-4" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
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
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-gray-900 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
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
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-gray-900 hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-400">
          By signing in, you agree to our{' '}
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
