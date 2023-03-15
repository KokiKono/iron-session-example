// pages/admin.tsx

import { IronSessionData } from "iron-session";
import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (user?.admin !== true) {
      return {
        notFound: true,
      };
    }

    console.log({user})
    return {
      props: {
        user: req.session.user,
      },
    };
  },
  {
    cookieName: "myapp_cookiename",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);

export default function Admin({ user }: { user?: IronSessionData["user"] }) {
  const router = useRouter();
  const logout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
    });
    if (response.ok) {
      router.replace("/login");
    }
  };
  return (
    <div>
      <h1>Admin</h1>
      <div>{JSON.stringify(user)}</div>

      <button onClick={logout}>ログアウト</button>
    </div>
  );
}
