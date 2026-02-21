import { db } from '@/services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const createUserProfile = async (uid: string, email: string) => {
  try {
    const userRef = doc(db, 'users', uid);

    // Create main user profile
    await setDoc(userRef, {
      email,
      createdAt: new Date().toISOString(),
      balance: 100000,
    });

    // Initialize portfolio subcollection (optional seed)
    // const portfolioRef = collection(db, "users", uid, "portfolio");
    // await addDoc(portfolioRef, {
    //   coinId: "bitcoin",
    //   coinName: "Bitcoin",
    //   amount: 0,
    //   buyPrice: 0,
    //   dateAdded: new Date().toISOString(),
    // });
  } catch (error) {
    console.error('Error creating user profile:', error);
  }
};

export const getUserProfile = async (uid: string) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const updateUserBalance = async (uid: string, newBalance: number) => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { balance: newBalance }, { merge: true });
  } catch (error) {
    console.error('Error updating user balance:', error);
  }
};

export const getTransactionHistory = async (uid: string) => {
  try {
    const transactionsRef = doc(db, 'users', uid, 'transactions');
    const transactionsSnap = await getDoc(transactionsRef);
    if (transactionsSnap.exists()) {
      return transactionsSnap.data()?.history || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    return [];
  }
};
