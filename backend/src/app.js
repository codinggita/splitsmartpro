import express from 'express';
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import balanceRoutes from './routes/balanceRoutes.js';
import settlementRoutes from './routes/settlementRoutes.js';
import insightRoutes from './routes/insightRoutes.js';

const app = express();

app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    /\.vercel\.app$/,
  ],
  credentials: true,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('SplitSmart Pro API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/balance', balanceRoutes);
app.use('/api/settlements', settlementRoutes);
app.use('/api/insights', insightRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
