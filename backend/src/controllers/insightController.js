import asyncHandler from 'express-async-handler';
import Expense from '../models/Expense.js';
import Group from '../models/Group.js';
import mongoose from 'mongoose';

/**
 * GET /api/insights/user
 * Get personalized spending insights for the logged-in user.
 */
export const getUserInsights = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Fetch all expenses where the user is either the payer or a split participant
  // Actually, to get true personal spending, we look at the splits[].amount for this user.
  const expenses = await Expense.find({
    'splits.user': userId
  }).populate('groupId', 'name');

  if (!expenses.length) {
    return res.json({
      totalSpending: 0,
      categoryBreakdown: [],
      monthlyTrend: [],
      insights: ["Add some expenses to see insights!"]
    });
  }

  // 1. Total Spending (User's share)
  let totalSpending = 0;
  const categoryMap = {};
  const monthlyMap = {};
  const groupMap = {};

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  expenses.forEach(exp => {
    const userSplit = exp.splits.find(s => s.user.toString() === userId.toString());
    if (!userSplit) return;

    const amount = userSplit.amount;
    totalSpending += amount;

    // Category breakdown
    categoryMap[exp.category] = (categoryMap[exp.category] || 0) + amount;

    // Monthly trend
    const date = new Date(exp.createdAt);
    const monthYear = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear().toString().slice(-2);
    monthlyMap[monthYear] = (monthlyMap[monthYear] || 0) + amount;

    // Group comparison
    const groupName = exp.groupId?.name || 'Deleted Group';
    groupMap[groupName] = (groupMap[groupName] || 0) + amount;
  });

  // Format category breakdown for Recharts
  const categoryBreakdown = Object.keys(categoryMap).map(cat => ({
    name: cat,
    value: Math.round(categoryMap[cat])
  }));

  // Format monthly trend (last 6 months)
  // Sort by date would be better, but simple keys for now
  const monthlyTrend = Object.keys(monthlyMap).map(month => ({
    month,
    amount: Math.round(monthlyMap[month])
  }));

  // 2. SMART INSIGHTS
  const insights = [];

  // Top Category
  const topCategory = categoryBreakdown.sort((a, b) => b.value - a.value)[0];
  if (topCategory) {
    insights.push(`Your highest spending category is ${topCategory.name} (₹${topCategory.value}).`);
  }

  // Group Insight
  const topGroup = Object.keys(groupMap).sort((a, b) => groupMap[b] - groupMap[a])[0];
  if (topGroup) {
    insights.push(`Your highest spending group is "${topGroup}".`);
  }

  // Monthly Comparison (Simplified)
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const thisMonthExpenses = expenses.filter(e => new Date(e.createdAt).getMonth() === currentMonth && new Date(e.createdAt).getFullYear() === currentYear);
  const lastMonthExpenses = expenses.filter(e => new Date(e.createdAt).getMonth() === lastMonth.getMonth() && new Date(e.createdAt).getFullYear() === lastMonth.getFullYear());

  const thisMonthTotal = thisMonthExpenses.reduce((sum, e) => sum + (e.splits.find(s => s.user.toString() === userId.toString())?.amount || 0), 0);
  const lastMonthTotal = lastMonthExpenses.reduce((sum, e) => sum + (e.splits.find(s => s.user.toString() === userId.toString())?.amount || 0), 0);

  if (lastMonthTotal > 0) {
    const diff = ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
    if (diff > 0) {
      insights.push(`Your spending increased by ${Math.round(diff)}% compared to last month.`);
    } else if (diff < 0) {
      insights.push(`Great job! You spent ${Math.round(Math.abs(diff))}% less than last month.`);
    }
  }

  res.json({
    totalSpending: Math.round(totalSpending),
    categoryBreakdown,
    monthlyTrend,
    groupBreakdown: Object.keys(groupMap).map(g => ({ name: g, value: Math.round(groupMap[g]) })),
    insights
  });
});
