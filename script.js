var itemCount = 0;
var stockRecords = [];

function receiveStock() {
  var itemName = document.getElementById("item-name").value;
  var quantity = parseInt(document.getElementById("quantity").value);

  if (itemName && quantity) {
    var record = {
      itemName: itemName,
      quantity: quantity
    };

    stockRecords.push(record);
    updateStockTable(stockRecords);

    document.getElementById("item-name").value = "";
    document.getElementById("quantity").value = "";

    itemCount++;
    document.getElementById("item-count").innerHTML = itemCount;

    alert("Stock received successfully!");
  } else {
    alert("Please enter item name and quantity.");
  }
}

function updateStockTable(records) {
  var stockTableBody = document.getElementById("stock-records-body");
  stockTableBody.innerHTML = "";

  for (var i = 0; i < records.length; i++) {
    var newRow = stockTableBody.insertRow();
    var itemNameCell = newRow.insertCell(0);
    var quantityCell = newRow.insertCell(1);
    var actionCell = newRow.insertCell(2);

    itemNameCell.innerHTML = records[i].itemName;
    quantityCell.innerHTML = records[i].quantity;

    var editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.className = "edit-button";
    editButton.addEventListener("click", function() {
      editRow(newRow);
    });

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", function() {
      deleteRow(newRow);
    });

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
  }
}

function editRow(row) {
  var itemNameCell = row.cells[0];
  var quantityCell = row.cells[1];

  var itemName = prompt("Enter new item name", itemNameCell.innerHTML);
  var quantity = parseInt(prompt("Enter new quantity", quantityCell.innerHTML));

  if (itemName && quantity) {
    itemNameCell.innerHTML = itemName;
    quantityCell.innerHTML = quantity;
    alert("Record updated successfully!");
  } else {
    alert("Invalid input. Record not updated.");
  }
}

function deleteRow(row) {
  var rowIndex = row.rowIndex;
  document.getElementById("stock-table").deleteRow(rowIndex);
  stockRecords.splice(rowIndex - 1, 1);
  itemCount--;
  document.getElementById("item-count").innerHTML = itemCount;
  alert("Record deleted successfully!");
}

function searchRecords() {
  var searchInput = document.getElementById("search-input").value.toLowerCase();
  var filteredRecords = stockRecords.filter(function(record) {
    return record.itemName.toLowerCase().includes(searchInput);
  });

  updateStockTable(filteredRecords);
}
