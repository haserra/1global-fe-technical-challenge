import { json, redirect } from "react-router-dom";
import { USERS_URL } from "../services/api/constants";
import { getAuthToken } from "./authentication";

export async function action({ request, params }) {
    const method = request.method;
    const userId = params.userId;
    const token = getAuthToken();
    //debugger;

    // updating a user
    if (method === "PUT") {
        const data = await request.formData();
        const userUpdated = {
            name: data.get("name"),
            surname: data.get("surname"),
            email: data.get("email"),
        };
        const response = await fetch(USERS_URL + `users/${userId}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userUpdated),
        });

        if (!response.ok) {
            // return { isError: true, message: 'Could not fetch events.' };
            // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
            //   status: 500,
            // });
            throw json(
                { message: "Could not fetch events." },
                {
                    status: 500,
                }
            );
        } else {
            const resData = await response.json();
            return resData;
            //return redirect("/");
            //return null;
        }
    }
    // deleting a user
    if (request.method === "DELETE") {
        // not required
        const data = await request.formData();
        const userDeleted = {
            name: data.get("name"),
            surname: data.get("surname"),
            email: data.get("email"),
        };
        const response = await fetch(USERS_URL + `users/${userId}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                //'Access-Control-Allow-Origin': '*'

            },
            body: JSON.stringify(userDeleted),
        });

        if (!response.ok) {
            // return { isError: true, message: 'Could not fetch events.' };
            // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
            //   status: 500,
            // });
            throw json(
                { message: "Could not fetch events." },
                {
                    status: 500,
                }
            );
        } else {

            return response;
            //return redirect("/error");
            //return null;
        }

    }
    // creating a user
    if (request.method === "POST") {
        const data = await request.formData();
        const newUser = {
            name: data.get("name"),
            surname: data.get("surname"),
            email: data.get("email"),
        };

        const response = await fetch(USERS_URL + `users`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                //'Access-Control-Allow-Origin': '*'
                body: JSON.stringify(newUser),
            },
        });

        if (!response.ok) {
            // return { isError: true, message: 'Could not fetch events.' };
            // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
            //   status: 500,
            // });
            throw json(
                { message: "Could not fetch events." },
                {
                    status: 500,
                }
            );
        } else {
            const resData = await response.json();
            return resData;
            //return redirect("/error");
            //return null;
        }
    }
}

export async function loadUsers() {
    const response = await fetch(USERS_URL + "/users");

    if (!response.ok) {
        // return { isError: true, message: 'Could not fetch events.' };
        // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
        //   status: 500,
        // });
        throw json(
            { message: "Could not fetch events." },
            {
                status: 500,
            }
        );
    } else {
        const resData = await response.json();
        return resData.events;
    }
}

/* 
export function loader() {
    return defer({
        users: loadUsers(),
    });
} */

export async function getUser(userId: string | undefined, token: unknown) {
    const response = await fetch(USERS_URL + "users/" + userId, {
        headers: {
            //'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            //'Access-Control-Allow-Origin': '*'
            //'Access-Control-Allow-Credentials': 'true',
        },
    });

    if (!response.ok) {
        throw json(
            { message: "Could not fetch event." },
            {
                status: 500,
            }
        );
    } else {
        const resData = await response.json();
        return resData.data;
    }
}
