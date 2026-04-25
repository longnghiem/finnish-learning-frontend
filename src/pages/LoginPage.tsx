import {useAuth} from "../auth/useAuth.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

/**
 * Login page with a simple username / password form.
 *
 * Authenticates against hardcoded credentials via the `useAuth` hook.
 * On successful login, redirects to the home page (`/`).
 * If the user is already logged in, they are immediately redirected.
 *
 * No Zod validation is used — only a non-empty check before calling `login()`.
 */
export function LoginPage() {
    const { isLoggedIn, login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    // Redirect if already logged in
    useEffect(() => {
        if (isLoggedIn) navigate("/", { replace: true });
    }, [isLoggedIn, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!username.trim() || !password.trim()) {
            setError("Please enter both username and password.");
            return;
        }

        const success = login(username, password);
        if (!success) {
            setError("Invalid username or password.");
        }
    };

    // Clear error when user starts typing
    const handleUsernameChange = (value: string) => {
        setUsername(value);
        if (error) setError(null);
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        if (error) setError(null);
    };

    const inputClass =
        "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";
    const labelClass = "mb-1 block text-sm font-medium text-gray-700";

    return (
        <div className="flex items-center justify-center px-4 py-20">
            <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-md">
                <h1 className="mb-6 text-center text-xl font-bold text-gray-800">
                    Log in
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Username */}
                    <div>
                        <label htmlFor="login-username" className={labelClass}>
                            Username
                        </label>
                        <input
                            id="login-username"
                            type="text"
                            value={username}
                            onChange={(e) => handleUsernameChange(e.target.value)}
                            className={inputClass}
                            placeholder="Username"
                            autoComplete="username"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="login-password" className={labelClass}>
                            Password
                        </label>
                        <input
                            id="login-password"
                            type="password"
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            className={inputClass}
                            placeholder="Password"
                            autoComplete="current-password"
                        />
                    </div>

                    {/* Error message */}
                    {error && (
                        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="mt-2 w-full rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                    >
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
}