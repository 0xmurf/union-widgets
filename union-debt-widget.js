// This is the URL of the API 
// Change the ENS or Address to your address 
let url = `https://api.union.finance/api/v1/optimism-mainnet/murf.eth`;

// Fetch the data
let req = new Request(url);
let json = await req.loadJSON();

// Get the total amount owed
let totalOwed = json.union.contracts.total_owed.total / 1e18;

// Check if there's an overdue payment or if the user is currently borrowing
let status = json.union.contracts.is_overdue ? "Overdue" : json.union.contracts.total_owed.interest > 0 ? "Borrowing" : "Not borrowing";

// Create widget
let widget = new ListWidget();
widget.backgroundColor = new Color("#2A2736");

// Add title
let titleText = widget.addText(`Union • Your Credit`);
titleText.textColor = new Color("#FFFFFF");
titleText.font = new Font('SF Pro Rounded', 14);
titleText.textOpacity = 0.7;

widget.addSpacer();

// Create and customize the total owed label
let totalOwedLabel = widget.addText(`Total Owed`);
totalOwedLabel.textColor = new Color("#FFFFFF");
totalOwedLabel.font = new Font('SF Pro Rounded', 16);
totalOwedLabel.textOpacity = 0.6;

// Create and customize the total owed text
let totalOwedText = widget.addText(`$${totalOwed.toFixed(2)}`);
totalOwedText.textColor = new Color("#FFFFFF");
totalOwedText.font = new Font('SF Pro Rounded', 32);

// Create and customize the status text
let statusText = widget.addText(`${status}`);
statusText.textColor = new Color("#FFFFFF");
statusText.font = new Font('SF Pro Rounded', 16);

// Display widget
if (config.runsInWidget) {
  // Runs inside a widget so add it to the homescreen widget
  Script.setWidget(widget);
} else {
  // Show the medium widget inside the app
  widget.presentMedium();
}

Script.complete();
