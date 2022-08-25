import React, { useState } from 'react'
import { signIn, getProviders } from 'next-auth/react'
import { GetServerSideProps } from 'next'

const SignIn = ({ providers }) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <main>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1>Login</h1>
        <label>username:</label>
        <input onChange={(event: React.FormEvent<HTMLInputElement>) => setUsername(event.currentTarget.value)} value={username} />

        <label>password:</label>
        <input onChange={(event: React.FormEvent<HTMLInputElement>) => setPassword(event.currentTarget.value)} value={password} />

        <button type='submit' onClick={() => signIn()}>Login</button>
        <h2>Or sign in with: </h2>
        {Object.values(providers).map(provider => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id, { callbackUrl: `${window.location.origin}/account` })}>Sign in with {provider.name}</button>
          </div>  
        ))}
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: {
      providers
    }
  }
} 

export default SignIn