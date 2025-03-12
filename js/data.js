// IROE data in JSON format
const iroeData = [
  {
    country: "Afghanistan",
    currencyName: "US Dollar",
    alphaCode: "USD",
    numericCode: "840",
    roeFromNUC: "1.000000",
    roundingUnitsLocalCurrFares: "1",
    roundingUnitsOtherCharges: "0.1",
    decimalUnits: "2",
    notes: "5",
    localCurrencyLimited: false
  },
  {
    country: "Afghanistan",
    currencyName: "Afghani",
    alphaCode: "AFN",
    numericCode: "971",
    roeFromNUC: "49.500000",
    roundingUnitsLocalCurrFares: "1",
    roundingUnitsOtherCharges: "1",
    decimalUnits: "0",
    notes: "2, 8",
    localCurrencyLimited: true
  },
  {
    country: "Albania",
    currencyName: "euro",
    alphaCode: "EUR",
    numericCode: "978",
    roeFromNUC: "0.761600",
    roundingUnitsLocalCurrFares: "1",
    roundingUnitsOtherCharges: "0.01",
    decimalUnits: "2",
    notes: "",
    localCurrencyLimited: false
  },
  {
    country: "India",
    currencyName: "US Dollar",
    alphaCode: "USD",
    numericCode: "840",
    roeFromNUC: "1.000000",
    roundingUnitsLocalCurrFares: "1",
    roundingUnitsOtherCharges: "0.1",
    decimalUnits: "2",
    notes: "5",
    localCurrencyLimited: false
  },
  {
    country: "India",
    currencyName: "Indian Rupee",
    alphaCode: "INR",
    numericCode: "356",
    roeFromNUC: "44.328000",
    roundingUnitsLocalCurrFares: "5",
    roundingUnitsOtherCharges: "1",
    decimalUnits: "0",
    notes: "8, 10",
    localCurrencyLimited: true
  },
  {
    country: "Canada",
    currencyName: "Canadian Dollar",
    alphaCode: "CAD",
    numericCode: "124",
    roeFromNUC: "1.177260",
    roundingUnitsLocalCurrFares: "1",
    roundingUnitsOtherCharges: "0.1",
    decimalUnits: "2",
    notes: "8, 12",
    localCurrencyLimited: false
  },
  {
    country: "United Kingdom",
    currencyName: "Pound Sterling",
    alphaCode: "GBP",
    numericCode: "826",
    roeFromNUC: "0.518602",
    roundingUnitsLocalCurrFares: "1",
    roundingUnitsOtherCharges: "0.1",
    decimalUnits: "2",
    notes: "5, 8",
    localCurrencyLimited: false
  },
  {
    country: "Japan",
    currencyName: "Yen",
    alphaCode: "JPY",
    numericCode: "392",
    roeFromNUC: "116.568000",
    roundingUnitsLocalCurrFares: "100",
    roundingUnitsOtherCharges: "10",
    decimalUnits: "0",
    notes: "7, 8",
    localCurrencyLimited: false
  }
];

// Notes explanations
const notesExplanations = {
  "1": "For information apply to the nearest office of an issuing or participating airline.",
  "2": "International fares, fares related charges and excess baggage charges will be quoted in US Dollars. The conversion rate shown herein is to be used solely to convert local currency domestic fares to US Dollars, permitting the combination of domestic fares and international fares on the same ticket.",
  "3": "No rounding is involved; all decimals beyond two shall be ignored.",
  "4": "Rounding of fares and other charges shall be to the nearest rounding unit except US Tax charges shall be rounded to the nearest 0.01.",
  "5": "Rounding of fares and other charges shall be to the nearest rounding unit.",
  "6": "Rounding of other charges shall be accomplished by dropping amounts less than 50 cents/lisenti and increasing amounts of 50 cents/lisenti or more.",
  "7": "Changes to promotional fares in Japanese Yen shall be calculated to JPY 1 and rounded up to JPY 1,000.",
  "8": "Refer to PAT General Rules book section 11.10 for sources for bankers rates of exchange.",
  "10": "When purchasing a ticket in India, non-residents need prior approval from Reserve Bank or must produce a bank certificate evidencing the exchange of foreign currency.",
  "12": "(a) Rounding of local currency fares shall be accomplished by dropping amounts less than 50 cents and increasing amounts of 50 cents or more. Round trip fares in Canadian/US currency shall not exceed twice the one-way fare. (b) Other charges - Canadian Tax Charges rounded to the nearest 0.01."
};
