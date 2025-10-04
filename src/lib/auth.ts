import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserRole } from '@/models/User';

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}

export async function requireRole(allowedRoles: UserRole[]) {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const userRole = (session.user as any)?.role as UserRole;

  if (!userRole || !allowedRoles.includes(userRole)) {
    throw new Error('Forbidden: Insufficient permissions');
  }

  return session;
}

// Helper functions to check roles
export async function isAdmin() {
  const session = await getSession();
  return (session?.user as any)?.role === 'admin';
}

export async function isStaff() {
  const session = await getSession();
  const role = (session?.user as any)?.role;
  return role === 'admin' || role === 'staff';
}
