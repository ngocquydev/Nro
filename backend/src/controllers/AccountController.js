const AccountService = require('../services/AccountService');
const createAccount = async (req, res) => {
  try {
    const { username, password, productId } = req.body;

    if (!username || !password || !productId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newAccount = await AccountService.create(username, password, productId);
    if (newAccount.success === false) {
      return res.status(400).json({ error: newAccount.message });
    }
    return res.status(201).json(newAccount);
  } catch (error) {
    console.error('Error fetching account details:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getAccountDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await AccountService.getDetailAccount(id);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }
    return res.status(200).json(account);
  } catch (error) {
    console.error('Error fetching account details:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = { createAccount, getAccountDetail };
