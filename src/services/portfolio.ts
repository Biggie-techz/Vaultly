import { db, auth } from '@/services/firebase';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { getUserProfile, updateUserBalance } from './user';

/**
 * Get the current user's portfolio
 */
export const getUserPortfolio = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const ref = collection(db, 'users', user.uid, 'portfolio');
  const snapshot = await getDocs(ref);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    coinId: doc.data().coinId,
    ...doc.data(),
  }));
};

/**
 * Add a new coin to the user's portfolio
 */
export const addToPortfolio = async (coin: any) => {
  const user = auth.currentUser;
  if (!user) return;

  const ref = collection(db, 'users', user.uid, 'portfolio');
  await addDoc(ref, {
    ...coin,
    totalAmount: coin.amount || 0,
    averageBuyPrice: coin.buyPrice || 0,
    dateAdded: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
};

/**
 * Delete a coin from the user's portfolio by doc ID
 */
export const deleteFromPortfolio = async (id: string, currentValue: number) => {
  const user = auth.currentUser;
  if (!user) return;
  await updateUserBalance(user.uid, currentValue + (await getUserProfile(user.uid))?.balance || 0);

  const ref = doc(db, 'users', user.uid, 'portfolio', id);
  await deleteDoc(ref);
};

/**
 * Update an existing coin in the user's portfolio
 * If the coin already exists, updates the total amount and average buy price
 * @param id - The document ID of the coin to update
 * @param newAmount - Additional amount to add to existing holdings
 * @param totalSpent - USD spent for this purchase
 */
export const updatePortfolioAsset = async (
  id: string,
  newAmount: number,
  totalSpent: number
) => {
  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, 'users', user.uid, 'portfolio', id);

  try {
    const snapshot = await getDocs(
      collection(db, 'users', user.uid, 'portfolio')
    );
    const docData = snapshot.docs.find((doc) => doc.id === id)?.data();

    if (!docData) throw new Error('Portfolio asset not found');

    const prevAmount = docData.totalAmount || 0;
    const prevAvgPrice = docData.averageBuyPrice || 0;

    const updatedAmount = prevAmount + newAmount;
    const updatedAvgPrice =
      (prevAvgPrice * prevAmount + totalSpent) / updatedAmount;

    await updateDoc(ref, {
      totalAmount: updatedAmount,
      averageBuyPrice: updatedAvgPrice,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Error updating portfolio asset:', err);
    throw err;
  }
};

/**
 * Log a transaction for the current user
 * Each buy or sell is recorded separately
 */
export const logTransaction = async (transaction: {
  coinId: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  totalSpent: number;
}) => {
  const user = auth.currentUser;
  if (!user) return;

  const ref = collection(db, 'users', user.uid, 'transactions');
  await addDoc(ref, {
    ...transaction,
    date: new Date().toISOString(),
  });
};

/**
 * Get the current user's transaction history with pagination
 */
export const getUserTransactions = async (page: number = 1, pageLimit: number = 10): Promise<Array<{
  id: string;
  coinId: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  totalSpent: number;
  date: string;
}>> => {
  const user = auth.currentUser;
  if (!user) return [];

  const ref = collection(db, 'users', user.uid, 'transactions');
  const q = query(ref, orderBy('date', 'desc'), limit(pageLimit * page));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      coinId: data.coinId || '',
      type: data.type || 'buy',
      amount: data.amount || 0,
      price: data.price || 0,
      totalSpent: data.totalSpent || 0,
      date: data.date || '',
    };
  });
};

/**
 * Get total transaction count
 */
export const getTransactionCount = async () => {
  const user = auth.currentUser;
  if (!user) return 0;

  const ref = collection(db, 'users', user.uid, 'transactions');
  const snapshot = await getDocs(ref);
  
  return snapshot.size;
};
