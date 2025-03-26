let totalIncome = 0;
let totalExpenses = 0;
let dailyExpenses = [];

const incomeInput = document.getElementById("income");
const addIncomeButton = document.getElementById("addIncomeButton");
const expenseDate = document.getElementById("expense-date");
const teaInput = document.getElementById("tea");
const nastaInput = document.getElementById("nasta");
const snacksInput = document.getElementById("snacks");
const travelInput = document.getElementById("travel");
const entertainmentInput = document.getElementById("entertainment");
const utilitiesInput = document.getElementById("utilities");
const addExpenseButton = document.getElementById("addExpenseButton");

const totalIncomeElement = document.getElementById("total-income");
const totalExpensesElement = document.getElementById("total-expenses");
const remainingBalanceElement = document.getElementById("remaining-balance");

const expenseLogBody = document.getElementById("expense-log").getElementsByTagName("tbody")[0];

// Update the income
addIncomeButton.addEventListener("click", function() {
    const income = parseFloat(incomeInput.value);
    if (isNaN(income) || income <= 0) {
        alert("Please enter a valid income amount.");
        return;
    }
    totalIncome += income;
    totalIncomeElement.innerText = totalIncome.toFixed(2);
    remainingBalanceElement.innerText = (totalIncome - totalExpenses).toFixed(2);
    incomeInput.value = ""; // Clear the input field
});

// Add daily expense
addExpenseButton.addEventListener("click", function() {
    const date = expenseDate.value;
    const tea = parseFloat(teaInput.value) || 0;
    const nasta = parseFloat(nastaInput.value) || 0;
    const snacks = parseFloat(snacksInput.value) || 0;
    const travel = parseFloat(travelInput.value) || 0;
    const entertainment = parseFloat(entertainmentInput.value) || 0;
    const utilities = parseFloat(utilitiesInput.value) || 0;

    const total = tea + nasta + snacks + travel + entertainment + utilities;

    if (total <= 0) {
        alert("Please enter at least one expense.");
        return;
    }

    // Add expense to the log
    dailyExpenses.push({ date, tea, nasta, snacks, travel, entertainment, utilities, total });
    totalExpenses += total;

    // Update UI
    totalExpensesElement.innerText = totalExpenses.toFixed(2);
    remainingBalanceElement.innerText = (totalIncome - totalExpenses).toFixed(2);

    // Update the log table
    const row = expenseLogBody.insertRow();
    row.insertCell(0).innerText = date;
    row.insertCell(1).innerText = tea.toFixed(2);
    row.insertCell(2).innerText = nasta.toFixed(2);
    row.insertCell(3).innerText = snacks.toFixed(2);
    row.insertCell(4).innerText = travel.toFixed(2);
    row.insertCell(5).innerText = entertainment.toFixed(2);
    row.insertCell(6).innerText = utilities.toFixed(2);
    row.insertCell(7).innerText = total.toFixed(2);

    // Clear inputs after adding expense
    expenseDate.value = "";
    teaInput.value = "";
    nastaInput.value = "";
    snacksInput.value = "";
    travelInput.value = "";
    entertainmentInput.value = "";
    utilitiesInput.value = "";

    // Update the pie chart
    updatePieChart();
});

// Update the pie chart with current expenses data
function updatePieChart() {
    const categories = ["Tea", "Nasta", "Snacks", "Travel", "Entertainment", "Utilities"];
    const values = [0, 0, 0, 0, 0, 0];

    dailyExpenses.forEach(exp => {
        values[0] += exp.tea;
        values[1] += exp.nasta;
        values[2] += exp.snacks;
        values[3] += exp.travel;
        values[4] += exp.entertainment;
        values[5] += exp.utilities;
    });

    const ctx = document.getElementById('expenseChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                label: 'Expense Breakdown',
                data: values,
                backgroundColor: ['#ff6347', '#ffeb3b', '#8bc34a', '#00bcd4', '#ff9800', '#9c27b0'],
                borderColor: ['#d32f2f', '#fbc02d', '#388e3c', '#0288d1', '#f57c00', '#7b1fa2'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ": $" + tooltipItem.raw.toFixed(2);
                        }
                    }
                }
            }
        }
    });
}
