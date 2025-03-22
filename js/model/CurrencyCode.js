export class CurrencyCode {
  static VALID_CODES = new Set([
    // Major currencies
    "USD", // US Dollar
    "EUR", // Euro
    "GBP", // British Pound
    "JPY", // Japanese Yen
    "AUD", // Australian Dollar
    "CAD", // Canadian Dollar
    "CHF", // Swiss Franc
    "CNY", // Chinese Yuan
    "INR", // Indian Rupee
    "NZD", // New Zealand Dollar
    "SGD", // Singapore Dollar
    "HKD", // Hong Kong Dollar
    "KRW", // South Korean Won
    "TRY", // Turkish Lira
    "RUB", // Russian Ruble
    "BRL", // Brazilian Real
    "ZAR", // South African Rand
    "MXN", // Mexican Peso
    "SAR", // Saudi Riyal
    "AED", // UAE Dirham

    // European currencies
    "CZK", // Czech Koruna
    "DKK", // Danish Krone
    "NOK", // Norwegian Krone
    "SEK", // Swedish Krona
    "PLN", // Polish Złoty
    "HUF", // Hungarian Forint
    "RON", // Romanian Leu
    "BGN", // Bulgarian Lev
    "HRK", // Croatian Kuna
    "RSD", // Serbian Dinar
    "ALL", // Albanian Lek
    "MDL", // Moldovan Leu
    "UAH", // Ukrainian Hryvnia
    "ISK", // Icelandic Króna
    "LTL", // Lithuanian Litas
    "LVL", // Latvian Lats
    "EEK", // Estonian Kroon
    "MKD", // Macedonian Denar
    "BYN", // Belarusian Ruble
    "AZN", // Azerbaijani Manat
    "AMD", // Armenian Dram
    "GEL", // Georgian Lari
    "KZT", // Kazakhstani Tenge
    "TJS", // Tajikistani Somoni
    "TMT", // Turkmenistani Manat
    "UZS", // Uzbekistani Som
    "KGS", // Kyrgyzstani Som

    // Asian currencies
    "THB", // Thai Baht
    "MYR", // Malaysian Ringgit
    "IDR", // Indonesian Rupiah
    "PHP", // Philippine Peso
    "PKR", // Pakistani Rupee
    "BDT", // Bangladeshi Taka
    "LKR", // Sri Lankan Rupee
    "MMK", // Myanmar Kyat
    "KHR", // Cambodian Riel
    "LAK", // Lao Kip
    "MNT", // Mongolian Tögrög
    "NPR", // Nepalese Rupee
    "BTN", // Bhutanese Ngultrum
    "AFN", // Afghan Afghani
    "VND", // Vietnamese Đồng
    "KPW", // North Korean Won
    "MOP", // Macanese Pataca
    "TWD", // New Taiwan Dollar
    "HKD", // Hong Kong Dollar
    "CNY", // Chinese Yuan
    "JPY", // Japanese Yen
    "KRW", // South Korean Won

    // Middle Eastern currencies
    "ILS", // Israeli New Shekel
    "JOD", // Jordanian Dinar
    "LBP", // Lebanese Pound
    "KWD", // Kuwaiti Dinar
    "BHD", // Bahraini Dinar
    "OMR", // Omani Rial
    "QAR", // Qatari Riyal
    "IRR", // Iranian Rial
    "IQD", // Iraqi Dinar
    "YER", // Yemeni Rial
    "SYP", // Syrian Pound
    "SAR", // Saudi Riyal
    "AED", // UAE Dirham
    "TRY", // Turkish Lira
    "AZN", // Azerbaijani Manat
    "AMD", // Armenian Dram
    "GEL", // Georgian Lari

    // African currencies
    "EGP", // Egyptian Pound
    "MAD", // Moroccan Dirham
    "TND", // Tunisian Dinar
    "DZD", // Algerian Dinar
    "LYD", // Libyan Dinar
    "SDG", // Sudanese Pound
    "ETB", // Ethiopian Birr
    "KES", // Kenyan Shilling
    "UGX", // Ugandan Shilling
    "TZS", // Tanzanian Shilling
    "NGN", // Nigerian Naira
    "GHS", // Ghanaian Cedi
    "XOF", // West African CFA Franc
    "XAF", // Central African CFA Franc
    "ZAR", // South African Rand
    "BWP", // Botswana Pula
    "NAD", // Namibian Dollar
    "SZL", // Swazi Lilangeni
    "LSL", // Lesotho Loti
    "MUR", // Mauritian Rupee
    "SCR", // Seychellois Rupee
    "MGA", // Malagasy Ariary
    "MWK", // Malawian Kwacha
    "ZMW", // Zambian Kwacha
    "AOA", // Angolan Kwanza
    "CDF", // Congolese Franc
    "DJF", // Djiboutian Franc
    "ERN", // Eritrean Nakfa
    "GMD", // Gambian Dalasi
    "GNF", // Guinean Franc
    "LRD", // Liberian Dollar
    "MZN", // Mozambican Metical
    "RWF", // Rwandan Franc
    "SLL", // Sierra Leonean Leone
    "SOS", // Somali Shilling
    "SSP", // South Sudanese Pound
    "STN", // São Tomé and Príncipe Dobra
    "ZWL", // Zimbabwean Dollar

    // Latin American currencies
    "ARS", // Argentine Peso
    "CLP", // Chilean Peso
    "COP", // Colombian Peso
    "PEN", // Peruvian Sol
    "UYU", // Uruguayan Peso
    "PYG", // Paraguayan Guaraní
    "BOB", // Bolivian Boliviano
    "VES", // Venezuelan Bolívar
    "CRC", // Costa Rican Colón
    "PAB", // Panamanian Balboa
    "HNL", // Honduran Lempira
    "NIO", // Nicaraguan Córdoba
    "DOP", // Dominican Peso
    "JMD", // Jamaican Dollar
    "TTD", // Trinidad and Tobago Dollar
    "BBD", // Barbadian Dollar
    "GYD", // Guyanese Dollar
    "SRD", // Surinamese Dollar
    "BZD", // Belize Dollar
    "HTG", // Haitian Gourde
    "CUP", // Cuban Peso
    "CUC", // Cuban Convertible Peso
    "XCD", // East Caribbean Dollar
    "ANG", // Netherlands Antillean Guilder
    "AWG", // Aruban Florin
    "KYD", // Cayman Islands Dollar
    "BSD", // Bahamian Dollar
    "BMD", // Bermudian Dollar
    "FKP", // Falkland Islands Pound
    "GIP", // Gibraltar Pound
    "SHP", // Saint Helena Pound
    "IMP", // Manx Pound
    "JEP", // Jersey Pound
    "GGP", // Guernsey Pound

    // Cryptocurrencies
    "BTC",

    // Obsolete or historical currencies
    "BEF", // Belgian Franc
    "FIM", // Finnish Markka
    "FRF", // French Franc
    "IEP", // Irish Pound
    "ITL", // Italian Lira
    "LUF", // Luxembourgish Franc
    "XDR", // Special Drawing Rights (IMF)
    "DEM", // German Mark
    "NLG", // Dutch Guilder
    "PTE", // Portuguese Escudo
    "ATS", // Austrian Schilling
    "GRD", // Greek Drachma
    "SKK", // Slovak Koruna
    "ESP", // Spanish Peseta

    "BAM",
    "CYP",
    "MTL",
    "SIT",
  ]);

  constructor(code) {
    if (typeof code !== "string") {
      throw new Error("Currency code must be a string");
    }
    if (!CurrencyCode.VALID_CODES.has(code.toUpperCase())) {
      throw new Error(`Invalid currency code: ${code}`);
    }
    this.code = code.toUpperCase();
  }

  getCode() {
    return this.code;
  }

  equals(other) {
    if (!(other instanceof CurrencyCode)) {
      return false;
    }
    return this.code === other.code;
  }

  toString() {
    return this.code;
  }
}
