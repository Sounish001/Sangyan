// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  updateProfile as firebaseUpdateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import toast from 'react-hot-toast';

// User role types
export type UserRole = 'admin' | 'member' | 'guest';

// Extended user data interface with Paras Stones
export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  membershipStatus?: 'pending' | 'approved' | 'rejected';
  createdAt?: string;
  institute?: string;
  course?: string;
  bio?: string;
  parasStones: number; // New field for Paras Stones
  parasHistory?: ParasTransaction[]; // Transaction history
}

// Paras transaction interface
export interface ParasTransaction {
  id: string;
  amount: number;
  type: 'earned' | 'spent';
  reason: string;
  timestamp: string;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signOut: () => Promise<void>;
  updateProfile: (displayName: string, photoURL?: string) => Promise<void>;
  refreshUserData: () => Promise<void>;
  addParasStones: (amount: number, reason: string) => Promise<void>;
  spendParasStones: (amount: number, reason: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firestore
  const fetchUserData = async (uid: string): Promise<UserData | null> => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        return userDoc.data() as UserData;
      } else {
        // Create default user document with 100 welcome Paras Stones
        const defaultUserData: UserData = {
          uid,
          email: user?.email || null,
          displayName: user?.displayName || null,
          photoURL: user?.photoURL || null,
          role: 'guest',
          membershipStatus: 'pending',
          createdAt: new Date().toISOString(),
          parasStones: 100, // Welcome bonus
          parasHistory: [{
            id: Date.now().toString(),
            amount: 100,
            type: 'earned',
            reason: 'Welcome bonus for signing up!',
            timestamp: new Date().toISOString()
          }]
        };
        
        await setDoc(userDocRef, defaultUserData);
        toast.success('🎉 Welcome! You received 100 Paras Stones!', { duration: 4000 });
        return defaultUserData;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to load user profile');
      return null;
    }
  };

  // Refresh user data
  const refreshUserData = async () => {
    if (user) {
      const data = await fetchUserData(user.uid);
      setUserData(data);
    }
  };

  // Add Paras Stones
  const addParasStones = async (amount: number, reason: string) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const transaction: ParasTransaction = {
        id: Date.now().toString(),
        amount,
        type: 'earned',
        reason,
        timestamp: new Date().toISOString()
      };

      await updateDoc(userDocRef, {
        parasStones: increment(amount),
        parasHistory: [...(userData?.parasHistory || []), transaction]
      });

      await refreshUserData();
      toast.success(`🎉 You earned ${amount} Paras Stones! ${reason}`, { duration: 3000 });
    } catch (error) {
      console.error('Error adding Paras Stones:', error);
      toast.error('Failed to add Paras Stones');
    }
  };

  // Spend Paras Stones
  const spendParasStones = async (amount: number, reason: string): Promise<boolean> => {
    if (!user || !userData) throw new Error('No user logged in');
    
    if (userData.parasStones < amount) {
      toast.error('Insufficient Paras Stones!');
      return false;
    }

    try {
      const userDocRef = doc(db, 'users', user.uid);
      const transaction: ParasTransaction = {
        id: Date.now().toString(),
        amount,
        type: 'spent',
        reason,
        timestamp: new Date().toISOString()
      };

      await updateDoc(userDocRef, {
        parasStones: increment(-amount),
        parasHistory: [...(userData?.parasHistory || []), transaction]
      });

      await refreshUserData();
      toast.success(`✨ You spent ${amount} Paras Stones on ${reason}`);
      return true;
    } catch (error) {
      console.error('Error spending Paras Stones:', error);
      toast.error('Failed to spend Paras Stones');
      return false;
    }
  };

  // Update user profile
  const updateProfile = async (displayName: string, photoURL?: string) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      await firebaseUpdateProfile(user, {
        displayName,
        ...(photoURL && { photoURL }),
      });

      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(
        userDocRef,
        {
          displayName,
          ...(photoURL && { photoURL }),
        },
        { merge: true }
      );

      await refreshUserData();
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
      throw error;
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserData(null);
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
      throw error;
    }
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const data = await fetchUserData(firebaseUser.uid);
        setUserData(data);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    userData,
    loading,
    signOut,
    updateProfile,
    refreshUserData,
    addParasStones,
    spendParasStones,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
