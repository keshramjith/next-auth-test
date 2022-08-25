import { GetServerSideProps } from "next"
import { unstable_getServerSession, Session } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"
import { signOut } from "next-auth/react"

const Protected = ({ user }: Session) => {
  if (user) {
    return (
      <>
        <h1>Logged in as {user.name}</h1>
        <button onClick={() => signOut({ callbackUrl: `${window.location.origin}`})}>Logout</button>
      </>
    )
  }
  return (
    <h1>You need to be logged in to view this page!</h1>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false
      }
    }
  }

  const { user } = session
  return {
    props: {
      user
    }
  }
}

export default Protected