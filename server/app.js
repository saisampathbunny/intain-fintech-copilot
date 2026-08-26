import express from 'express'
import cors from 'cors'
import { seedLoans, audit } from './data.js'
import { verifyLoan } from './verification.js'

const app = express()
const loans = structuredClone(seedLoans)
let auditLog = structuredClone(audit)

app.use(cors())
app.use(express.json({ limit: '1mb' }))

const enrich = loan => ({ ...loan, verification: verifyLoan(loan), audit: auditLog.filter(a => a.loanId === loan.id) })

app.get('/api/health', (_, res) => res.json({ ok: true, time: new Date().toISOString() }))

app.get('/api/dashboard', (_, res) => {
  const records = loans.map(enrich)
  res.json({
    metrics: {
      total: records.length,
      verified: records.filter(record => record.verification.status === 'verified').length,
      attention: records.filter(record => ['attention', 'exception'].includes(record.verification.status)).length,
      review: records.filter(record => record.verification.status === 'review').length,
    },
    recentActivity: auditLog.slice(0, 5),
    records,
  })
})

app.get('/api/loans', (req, res) => {
  const query = String(req.query.q || '').toLowerCase()
  const { status } = req.query
  let records = loans.map(enrich)
  if (query) records = records.filter(record => `${record.id} ${record.borrower} ${record.product}`.toLowerCase().includes(query))
  if (status && status !== 'all') records = records.filter(record => record.verification.status === status)
  res.json(records)
})

app.get('/api/loans/:id', (req, res) => {
  const loan = loans.find(record => record.id === req.params.id)
  if (!loan) return res.status(404).json({ message: 'Loan record not found.' })
  return res.json(enrich(loan))
})

app.post('/api/loans', (req, res) => {
  const data = req.body
  if (!data.borrower?.trim() || !data.product || !Number(data.amount)) return res.status(400).json({ message: 'Borrower name, product and requested amount are required.' })
  const id = `LN-2026-${String(486 + loans.length).padStart(5, '0')}`
  const createdAt = new Date().toISOString()
  const loan = { id, borrower: data.borrower.trim(), product: data.product, amount: Number(data.amount), income: Number(data.income) || 0, employment: data.employment || 'Salaried', bureauScore: Number(data.bureauScore) || 0, declaredObligation: Number(data.declaredObligation) || 0, calculatedEmi: Number(data.calculatedEmi) || 0, propertyValue: Number(data.propertyValue) || null, pan: String(data.pan || '').toUpperCase(), bankVerified: Boolean(data.bankVerified), documents: data.documents || [], status: 'review', createdAt, updatedAt: createdAt, reviewer: null }
  loans.unshift(loan)
  auditLog.unshift({ id: Date.now(), loanId: id, action: 'Loan data ingested and verification triggered', actor: 'Operations user', at: createdAt })
  return res.status(201).json(enrich(loan))
})

app.post('/api/loans/:id/action', (req, res) => {
  const loan = loans.find(record => record.id === req.params.id)
  const { action, note = '' } = req.body
  if (!loan) return res.status(404).json({ message: 'Loan record not found.' })
  if (!['approve', 'review', 'reject'].includes(action)) return res.status(400).json({ message: 'Unsupported action.' })
  loan.status = action === 'approve' ? 'verified' : action === 'reject' ? 'exception' : 'review'
  loan.reviewer = 'Operations user'
  loan.updatedAt = new Date().toISOString()
  auditLog.unshift({ id: Date.now(), loanId: loan.id, action: `${action === 'approve' ? 'Approved' : action === 'reject' ? 'Rejected' : 'Sent for review'}${note ? `: ${note}` : ''}`, actor: 'Operations user', at: loan.updatedAt })
  return res.json(enrich(loan))
})

app.use((error, _req, res, _next) => {
  console.error(error)
  res.status(500).json({ message: 'Unexpected server error. Please try again.' })
})

export default app
