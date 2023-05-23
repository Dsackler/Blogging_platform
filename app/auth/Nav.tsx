import Link from 'next/link';
import Login from './Login';
import Logged from './logged';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';

export default async function Nav() {
  const session = await getServerSession(authOptions); //need this to see if there is a session (logged in)
  return (
    <nav className='flex justify-between items-center py-8'>
      <Link href={'/'}>
        <h1 className='font-bold text-lg'>Send it</h1>
      </Link>
      <ul className='flex items-center gap-6'>
        {/*only show login screen if no user is signed in */}
        {!session?.user && <Login />}
        {/* show sign out if user is logged in. And pass user image */}
        {session?.user && <Logged image={session.user?.image || ''} />}
        {/*have to add image in next.config*/}
      </ul>
    </nav>
  );
}
