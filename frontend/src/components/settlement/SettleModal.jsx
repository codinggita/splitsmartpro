import { useState } from 'react';
import { X, CheckCircle2, Loader2, IndianRupee } from 'lucide-react';
import { createSettlement } from '../../services/settlementService.js';
import { toast } from '../common/Toast.jsx';

export default function SettleModal({ settlement, groupId, onClose, onSettled }) {
  const [loading, setLoading] = useState(false);

  const handleSettle = async () => {
    setLoading(true);
    try {
      await createSettlement({
        fromUser: settlement.from._id,
        toUser: settlement.to._id,
        groupId,
        amount: settlement.amount,
      });
      toast('Payment recorded successfully', 'success');
      onSettled();
      onClose();
    } catch (err) {
      toast(err.message || 'Failed to record payment', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-[#1E293B] border border-[#334155] rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#334155]">
          <h2 className="text-white font-bold text-lg">Confirm Settlement</h2>
          <button onClick={onClose} className="p-1 rounded-lg text-[#64748B] hover:text-white hover:bg-[#334155] transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <IndianRupee className="w-8 h-8 text-emerald-400" />
          </div>
          
          <p className="text-[#94A3B8] text-sm mb-2">You are recording a payment of</p>
          <p className="text-3xl font-bold text-white mb-6">₹{settlement.amount.toFixed(2)}</p>
          
          <div className="flex items-center justify-center gap-3 text-sm">
            <span className="font-semibold text-white">{settlement.from.name}</span>
            <span className="text-[#475569]">paid</span>
            <span className="font-semibold text-white">{settlement.to.name}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#0F172A]/50 border-t border-[#334155] flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl border border-[#334155] text-[#94A3B8] text-sm font-semibold hover:bg-[#334155] hover:text-white transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSettle}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CheckCircle2 className="w-4 h-4" /> Confirm</>}
          </button>
        </div>
      </div>
    </div>
  );
}
