const { useState, useEffect } = React;
const { Search } = LucideReact;

const IROESearchApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load data from data.js
  useEffect(() => {
    setFilteredCountries(iroeData);
    setLoading(false);
  }, []);

  // Filter countries based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = iroeData.filter(
        country => 
          country.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.currencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.alphaCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(iroeData);
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
  };

  const formatNote = (note) => {
    if (!note) return "";
    
    return note.split(", ").map(n => {
      const cleanNote = n.trim();
      return notesExplanations[cleanNote] || `Note ${cleanNote}`;
    }).join('\n');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-center mb-2">IATA Rates of Exchange (IROE) Search</h1>
        <p className="text-center text-gray-600 mb-4">Find currency exchange rates for international air travel ticketing</p>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search by country or currency..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-3 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 font-semibold mb-2 bg-gray-100 p-2 rounded">
        <div>Country</div>
        <div>Currency</div>
        <div>Code</div>
        <div>ROE from NUC</div>
        <div>Actions</div>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading IROE data...</div>
      ) : filteredCountries.length > 0 ? (
        <div className="max-h-64 overflow-y-auto mb-6">
          {filteredCountries.map((country, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-1 md:grid-cols-5 gap-2 p-2 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
            >
              <div className="font-medium">
                {country.localCurrencyLimited && <span className="text-red-500 mr-1">+</span>}
                {country.country}
              </div>
              <div>{country.currencyName}</div>
              <div>{country.alphaCode}</div>
              <div>{country.roeFromNUC}</div>
              <div>
                <button 
                  onClick={() => handleSelectCountry(country)}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">No results found for "{searchTerm}"</div>
      )}

      {selectedCountry && (
        <div className="mt-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Currency Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Country Information</h3>
              <div className="bg-white p-3 rounded border border-gray-200">
                <p><span className="font-medium">Country:</span> {selectedCountry.localCurrencyLimited && <span className="text-red-500 mr-1">+</span>}{selectedCountry.country}</p>
                <p><span className="font-medium">Currency:</span> {selectedCountry.currencyName}</p>
                <p><span className="font-medium">ISO Codes:</span> {selectedCountry.alphaCode} / {selectedCountry.numericCode}</p>
                <p><span className="font-medium">ROE from NUC:</span> {selectedCountry.roeFromNUC}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Rounding Information</h3>
              <div className="bg-white p-3 rounded border border-gray-200">
                <p><span className="font-medium">Local Currency Fares:</span> {selectedCountry.roundingUnitsLocalCurrFares}</p>
                <p><span className="font-medium">Other Charges:</span> {selectedCountry.roundingUnitsOtherCharges}</p>
                <p><span className="font-medium">Decimal Units:</span> {selectedCountry.decimalUnits}</p>
                <p><span className="font-medium">Notes:</span> {selectedCountry.notes}</p>
              </div>
            </div>
          </div>

          {selectedCountry.notes && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Notes Explanation</h3>
              <div className="bg-white p-3 rounded border border-gray-200 text-sm whitespace-pre-line">
                {formatNote(selectedCountry.notes)}
              </div>
            </div>
          )}

          <div className="mt-4">
            <h3 className="font-semibold mb-2">How to Calculate</h3>
            <div className="bg-white p-3 rounded border border-gray-200">
              <p className="mb-2">To calculate fares from NUC to {selectedCountry.currencyName}:</p>
              <ol className="list-decimal pl-5">
                <li>Multiply the NUC amount by the ROE: {selectedCountry.roeFromNUC}</li>
                <li>Convert to {selectedCountry.decimalUnits === "0" ? "whole number" : selectedCountry.decimalUnits + " decimal places"}</li>
                <li>For fares, round up to the next {selectedCountry.roundingUnitsLocalCurrFares} unit</li>
                <li>For other charges, round up to the next {selectedCountry.roundingUnitsOtherCharges} unit</li>
              </ol>

              {selectedCountry.alphaCode === "USD" && selectedCountry.roeFromNUC === "1.000000" && (
                <div className="mt-2 text-sm bg-blue-50 p-2 rounded">
                  <p className="font-medium">Example:</p>
                  <p>NUC 500.75 × 1.000000 = USD 500.75</p>
                </div>
              )}

              {selectedCountry.alphaCode === "EUR" && (
                <div className="mt-2 text-sm bg-blue-50 p-2 rounded">
                  <p className="font-medium">Example:</p>
                  <p>NUC 500.75 × 0.761600 = EUR 381.37 (rounded to EUR 381.37)</p>
                </div>
              )}

              {selectedCountry.alphaCode === "JPY" && (
                <div className="mt-2 text-sm bg-blue-50 p-2 rounded">
                  <p className="font-medium">Example:</p>
                  <p>NUC 500.75 × 116.568000 = JPY 58,371.4 (rounded to JPY 58,400)</p>
                </div>
              )}
              
              {selectedCountry.alphaCode === "INR" && (
                <div className="mt-2 text-sm bg-blue-50 p-2 rounded">
                  <p className="font-medium">Example:</p>
                  <p>NUC 500.75 × 44.328000 = INR 22,197.23 (rounded to INR 22,200)</p>
                </div>
              )}
            </div>
          </div>

          {selectedCountry.localCurrencyLimited && (
            <div className="mt-4 bg-yellow-50 p-3 rounded border border-yellow-200">
              <p className="text-sm"><span className="font-bold">Note:</span> The "+" symbol indicates that acceptance of this currency is restricted to the country concerned. MCOs for unspecified transportation issued in this currency and totally unused traffic documents paid for in this currency will only be honored in the country of original payment.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
