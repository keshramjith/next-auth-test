import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <>
      <h1>Welcome to this webapp!</h1>
      <p>To view your account click on</p>
      <Link href='/protected'><a>Account</a></Link>
    </>
    )
}

export default Home
