import { json, redirect } from "react-router-dom";
import { USERS_URL } from "../services/api/constants";

export async function action({ request }): Promise<Response | { error: string; }> {
    const searchParams = new URL(request.url).searchParams;
    let mode = searchParams.get("mode") || "login";

    if (mode !== "login" && mode !== "signup") {
        throw json({ message: "Unsupported mode." }, { status: 422 });
    }

    const formData = await request.formData();

    if (mode === 'signup') {
        const password = formData.get("password");
        const passwordConfirm = formData.get("confirmPassword");
        if (password !== passwordConfirm) {
            return { error: "Passwords do not match!" }
        }
    }

    const authData = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    mode === "signup" ? mode = 'register' : mode = 'login';

    const response = await fetch(USERS_URL + mode, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
    });

    if (response.status === 422 || response.status === 401) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: "Could not authenticate user!" }, { status: 500 });
    }

    const resData = await response.json();
    const token = resData.token;
    localStorage.setItem("token", token);

    // we need also to define the expiration time
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());

    return redirect("/");
}

export function getAuthToken() {
    const token = localStorage.getItem("token");

    if (!token) {
        return null; // this means the token is not valid or not set yet
    }

    if (token) {
        return token;
    } else {
        return null; // this means the token is not valid or not set yet
    }
}

export function tokenLoader() {
    const token = getAuthToken();

    if (token) {
        return token;
    } else {
        return redirect("/auth");
    }
}

