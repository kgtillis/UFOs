// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");
  
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Append a row to the table body
      let row = tbody.append("tr");
  
      // Loop through each field in the dataRow and add
      // each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        }
      );
    });
  }

// Module 11 Challenge

// Keep track of all filters
var filters = {};

// This function will replace your handleClick function
function updateFilters() {

  // Grab values from the filters
  let filterItem = d3.select(this).select("input")

  let itemKey = filterItem.attr("id")

  let itemValue = filterItem.property("value")

  // For element, check if there is a value, if so, then save:
  // element, value, ID of filter in dictionary. 
  if (itemValue) {
    // Appends/adds filter key and id
    filters[itemKey] = itemValue
  } else {
    // Delete key if no value exists
      delete filters[itemKey]
  }

  // Call function to apply all filters and rebuild the table
  filterTable();
}


function filterTable() {

  // Set the filteredData to the tableData
  filteredData = tableData

  // Loop through all of the filters and keep any data that
  // matches the filter values.

  // From Luke TA :
  // Resource: https://stackoverflow.com/questions/10654992/how-to-get-collection-of-keys-in-javascript-dictionary 
  Object.entries(filters).forEach(([key, value]) => {
      filteredData = filteredData.filter(row => row[key] === value);
    });

  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
}

// Attach an event to listen for changes to each filter

// Note: Change for detecting element:
// Resource: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event 
d3.selectAll(".filter").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData); 