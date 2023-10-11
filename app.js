console.log("Hey, I'm alive");

// var viz = new tableau.Viz(placeholderDiv, url, options);
let viz;

// Reference the placeholderDiv
const placeholderDiv = document.getElementById("vizContainer");

// Get a URL
const url =
  "https://public.tableau.com/views/EmbeddingWorkbookProfitsAcrossME-Asia/OfficeSupplyProfitsacrossMEandAsia?:language=en-GB&:display_count=n&:origin=viz_share_link";

// Create options for viz

const options = {
  device: "desktop",
  height: "800px",
  width: "1100px",
};

function initViz() {
  // load viz
  viz = new tableau.Viz(placeholderDiv, url, options);
}

//Listen for the content to be loaded
document.addEventListener("DOMContentLoaded", initViz);

//Buttons
const exportpdfbutton = document.getElementById("exportPDF");
const exportPPTbutton = document.getElementById("exportPPT");
const filterbutton = document.getElementById("FilterButton");

//Function to export PDF and PPT
function exportPDFfunction() {
  viz.showExportPDFDialog();
}
function exportPPTfunction() {
  viz.showExportPowerPointDialog();
}

// Add event listener to buttons
exportpdfbutton.addEventListener("click", exportPDFfunction);
exportPPTbutton.addEventListener("click", exportPPTfunction);
filterbutton.addEventListener("click", getRangeValues);

//Get range value
function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);

  //   need to get the active sheet, but this could a dashboard or worksheet
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();

  //inspect the sheets to filter
  console.log(sheets);

  //bring back sheet to filter
  const sheetToFilter = sheets[0];
  console.log(sheetToFilter);

  // do the filtering
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", {
      min: minValue,
      max: maxValue,
    })
    .then(alert("Filtered!"));
}
