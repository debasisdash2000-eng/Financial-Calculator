// --- Tab Navigation ---
const loanTabBtn = document.getElementById("loanTabBtn");
const sipTabBtn = document.getElementById("sipTabBtn");
const loanSection = document.getElementById("loanCalculator");
const sipSection = document.getElementById("sipCalculator");

loanTabBtn.addEventListener("click", () => {
  loanTabBtn.classList.add("active");
  sipTabBtn.classList.remove("active");
  loanSection.classList.add("active");
  sipSection.classList.remove("active");
});

sipTabBtn.addEventListener("click", () => {
  sipTabBtn.classList.add("active");
  loanTabBtn.classList.remove("active");
  sipSection.classList.add("active");
  loanSection.classList.remove("active");
});

// Helper: Format numbers to Indian currency (₹) style
function formatCurrency(amount) {
  return "₹" + Math.round(amount).toLocaleString("en-IN");
}

// --- Loan (EMI) Calculation ---
// Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
const calculateLoanBtn = document.getElementById("calculateLoanBtn");

calculateLoanBtn.addEventListener("click", () => {
  const principal = parseFloat(document.getElementById("loanAmount").value);
  const annualRate = parseFloat(document.getElementById("loanRate").value);
  const tenureYears = parseFloat(document.getElementById("loanTenure").value);

  if (isNaN(principal) || isNaN(annualRate) || isNaN(tenureYears) || principal <= 0 || annualRate <= 0 || tenureYears <= 0) {
    alert("Please enter valid positive numbers for the Loan Calculator.");
    return;
  }

  const monthlyRate = annualRate / (12 * 100);
  const totalMonths = tenureYears * 12;

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - principal;

  document.getElementById("monthlyEmi").textContent = formatCurrency(emi);
  document.getElementById("totalInterest").textContent = formatCurrency(totalInterest);
  document.getElementById("totalPayment").textContent = formatCurrency(totalPayment);
});

// --- SIP Calculation ---
// Formula: M = P * [((1 + i)^n - 1) / i] * (1 + i)
const calculateSipBtn = document.getElementById("calculateSipBtn");

calculateSipBtn.addEventListener("click", () => {
  const monthlyInvestment = parseFloat(document.getElementById("sipInvestment").value);
  const annualRate = parseFloat(document.getElementById("sipReturnRate").value);
  const tenureYears = parseFloat(document.getElementById("sipTenure").value);

  if (isNaN(monthlyInvestment) || isNaN(annualRate) || isNaN(tenureYears) || monthlyInvestment <= 0 || annualRate <= 0 || tenureYears <= 0) {
    alert("Please enter valid positive numbers for the SIP Calculator.");
    return;
  }

  const monthlyRate = annualRate / (12 * 100);
  const totalMonths = tenureYears * 12;

  // SIP Future Value formula
  const maturityValue =
    monthlyInvestment *
    ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
    (1 + monthlyRate);

  const investedAmount = monthlyInvestment * totalMonths;
  const estimatedReturns = maturityValue - investedAmount;

  document.getElementById("investedAmount").textContent = formatCurrency(investedAmount);
  document.getElementById("estimatedReturns").textContent = formatCurrency(estimatedReturns);
  document.getElementById("maturityValue").textContent = formatCurrency(maturityValue);
});