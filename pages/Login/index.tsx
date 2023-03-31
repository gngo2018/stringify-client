import { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

export default function Login(){
    const { data, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if(data?.user?.email){
            console.log('Email valid!');
            setIsLoading(true);

            //TODO: Insert user role query here
            setTimeout(() => {
                console.log("Delayed for 2 second.");
                setIsLoading(false);
              }, 2000);
        }
    }, [data?.user?.email])

    const handleSignOut = () => {
        signOut()
    }

    const handleSignIn = async () => {
        await signIn('google');
    }
    
    if (status === 'loading' || isLoading) return <h1> loading... please wait</h1>;
    if (status === 'authenticated') {
      return (
        <div>
          <h1> hi {data.user?.name}</h1>
          <Image 
            src={data.user?.image! ?? ''} 
            alt={data.user?.name + ' photo'} 
            height={100}
            width={100}
          />
          <button onClick={() => handleSignOut()}>sign out</button>
        </div>
      );
    }
    return (
      <div>
        <button onClick={() => handleSignIn()}>sign in with gooogle</button>
      </div>
    );
}