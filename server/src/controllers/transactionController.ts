import Payment from '../models/paymentModel';

export const getTransactions = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};
