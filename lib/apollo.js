// frontend/lib/apollo.js
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  try {
    // ✅ Fetch token from our API route instead of directly from Auth0
    const res = await fetch("/api/auth/token");
    if (!res.ok) {
      console.warn("No token available");
      return { headers };
    }

    const token = await res.text();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  } catch (err) {
    console.error("Token fetch error:", err);
    return { headers };
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
