let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountBtn = document.getElementById("check-amount");
const totalAmountBtn = document.getElementById("total-amount-btn");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expensesValue = document.getElementById("expenses-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;

// Set Budget

totalAmountBtn.addEventListener("click", () => {
  tempAmount = totalAmount.value;
  // Wrong input
  if (tempAmount === "" || tempAmount < 0) {
    errorMessage.classList.remove("hidden");
  } else {
    errorMessage.classList.add("hidden");
    // Set budget
    amount.innerHTML = tempAmount;
    balanceValue.innerText = tempAmount - expensesValue.innerText;
    //   Clear input
    totalAmount.value = "";
  }
});

// Disable edit & delete btn

const disabledBtns = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((elem) => {
    elem.disabled = bool;
  });
};

// Modify list elem

const modifyElement = (elem, edit = false) => {
  let parentDiv = elem.parentElement;
  let currentBalance = balanceValue.innerText;
  let currentExpense = expensesValue.innerText;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disabledBtns(true);
  }

  balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expensesValue.innerText = parseInt(currentExpense) + parseInt(parentAmount);
  parentDiv.remove();
};

// Create list

const listCreate = (expenseName, expenseValue) => {
  let subListContent = document.createElement("div");
  subListContent.classList.add("sublist-content", "flex-space");
  subListContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
  let editBtn = document.createElement("button");
  editBtn.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editBtn.style.fontSize = "1.5em";
  editBtn.addEventListener("click", () => {
    modifyElement(editBtn, true);
  });
  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteBtn.style.fontSize = "1.5em";
  deleteBtn.addEventListener("click", () => {
    modifyElement(deleteBtn);
  });
  subListContent.appendChild(editBtn);
  subListContent.appendChild(deleteBtn);
  document.getElementById("list").appendChild(subListContent);
};

// Add expenses

checkAmountBtn.addEventListener("click", () => {
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hidden");
    return false;
  }
  disabledBtns(false);
  //   Expense
  let expense = parseInt(userAmount.value);
  //   Total expense
  let sum = parseInt(expensesValue.innerText) + expense;
  expensesValue.innerText = sum;
  //   Total Balance = budget - total expense
  const totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;
  //   Create List
  listCreate(productTitle.value, userAmount.value);
  // Clear inputs
  productTitle.value = "";
  userAmount.value = "";
});

console.log(productTitle.value);
