export function verifyLoan(loan) {
  const issues = []
  const required = ['pan', 'income', 'bureauScore', 'bankVerified']
  required.forEach(field => { if (!loan[field] && loan[field] !== 0) issues.push(issue('critical', 'Missing required data', `${label(field)} is required before this application can be verified.`, field)) })
  if (loan.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(String(loan.pan).toUpperCase())) issues.push(issue('high', 'Invalid PAN format', 'PAN must follow the standard five letters, four digits, one letter format.', 'pan'))
  if (Number(loan.bureauScore) < 700) issues.push(issue('high', 'Credit score below policy threshold', `Bureau score of ${loan.bureauScore} is below the 700 policy threshold.`, 'bureauScore'))
  const foir = ((Number(loan.declaredObligation || 0) + Number(loan.calculatedEmi || 0)) / Number(loan.income || 1)) * 100
  if (foir > 50) issues.push(issue('high', 'FOIR exceeds threshold', `Calculated fixed-obligation-to-income ratio is ${foir.toFixed(1)}%, above the 50% policy threshold.`, 'income'))
  if (loan.declaredObligation && loan.calculatedEmi && Math.abs(loan.declaredObligation - loan.calculatedEmi) > 10000) issues.push(issue('medium', 'Repayment obligation mismatch', `Declared monthly obligations (₹${Number(loan.declaredObligation).toLocaleString('en-IN')}) differ materially from assessed EMI (₹${Number(loan.calculatedEmi).toLocaleString('en-IN')}).`, 'declaredObligation'))
  if (loan.product === 'Home Loan' && (!loan.propertyValue || Number(loan.amount) / Number(loan.propertyValue) > .8)) issues.push(issue('medium', 'LTV validation failed', 'Home-loan amount requires a property valuation and must not exceed 80% LTV.', 'propertyValue'))
  const status = issues.some(x => x.severity === 'critical') ? 'exception' : issues.some(x => x.severity === 'high') ? 'attention' : issues.length ? 'review' : 'verified'
  return { issues, status, score: Math.max(0, 100 - issues.reduce((s, x) => s + ({ critical: 35, high: 22, medium: 10 }[x.severity]), 0)), metrics: { foir: Number(foir.toFixed(1)), ltv: loan.propertyValue ? Number(((loan.amount / loan.propertyValue) * 100).toFixed(1)) : null, documents: loan.documents?.length || 0 } }
}
function issue(severity, title, description, field) { return { id: `${field}-${title}`.replaceAll(' ', '-').toLowerCase(), severity, title, description, field } }
function label(field) { return ({ pan: 'PAN', income: 'Monthly income', bureauScore: 'Bureau score', bankVerified: 'Bank verification' })[field] || field }
