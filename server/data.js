const now = '2026-08-26T09:30:00.000Z'

export const seedLoans = [
  { id: 'LN-2026-00481', borrower: 'Aarav Mehta', product: 'Home Loan', amount: 4850000, income: 185000, employment: 'Salaried', bureauScore: 782, declaredObligation: 22000, calculatedEmi: 41520, propertyValue: 7200000, pan: 'AABCM1234D', bankVerified: true, documents: ['PAN card', 'Salary slips', 'Bank statement', 'Property valuation'], status: 'verified', createdAt: now, updatedAt: now, reviewer: 'System' },
  { id: 'LN-2026-00482', borrower: 'Nisha Iyer', product: 'Personal Loan', amount: 650000, income: 72000, employment: 'Salaried', bureauScore: 701, declaredObligation: 18000, calculatedEmi: 19850, propertyValue: null, pan: 'AAEPI9988K', bankVerified: true, documents: ['PAN card', 'Bank statement'], status: 'attention', createdAt: now, updatedAt: now, reviewer: null },
  { id: 'LN-2026-00483', borrower: 'Vikram Singh', product: 'Business Loan', amount: 1800000, income: 110000, employment: 'Self-employed', bureauScore: 755, declaredObligation: 15500, calculatedEmi: 36400, propertyValue: null, pan: '', bankVerified: false, documents: ['GST returns', 'Bank statement'], status: 'exception', createdAt: now, updatedAt: now, reviewer: null },
  { id: 'LN-2026-00484', borrower: 'Priya Shah', product: 'Auto Loan', amount: 950000, income: 98000, employment: 'Salaried', bureauScore: 689, declaredObligation: 12000, calculatedEmi: 21100, propertyValue: 1250000, pan: 'BBDPS4567Q', bankVerified: true, documents: ['PAN card', 'Salary slips', 'Bank statement', 'Vehicle quotation'], status: 'review', createdAt: now, updatedAt: now, reviewer: 'R. Kumar' },
  { id: 'LN-2026-00485', borrower: 'Karan Patel', product: 'Home Loan', amount: 3200000, income: 145000, employment: 'Salaried', bureauScore: 768, declaredObligation: 10000, calculatedEmi: 29800, propertyValue: 5100000, pan: 'CCAPP2233R', bankVerified: true, documents: ['PAN card', 'Salary slips', 'Bank statement', 'Property valuation'], status: 'verified', createdAt: now, updatedAt: now, reviewer: 'System' }
]

export const audit = [
  { id: 1, loanId: 'LN-2026-00484', action: 'Assigned for manual review', actor: 'R. Kumar', at: '2026-08-26T08:45:00.000Z' },
  { id: 2, loanId: 'LN-2026-00482', action: 'Verification completed with exceptions', actor: 'System', at: '2026-08-26T08:31:00.000Z' },
  { id: 3, loanId: 'LN-2026-00481', action: 'Record verified automatically', actor: 'System', at: '2026-08-26T08:11:00.000Z' }
]
