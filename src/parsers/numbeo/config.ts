const NUMBEO_CONFIG = {
  host: 'https://www.numbeo.com/',
  prefixes: {
    quality_of_life: {
      path: '/quality-of-life/rankings_by_country.jsp',
      suffixes: {
        'Rank': 'rank',
        'Quality of Life Index': 'qol_index',
        'Country': 'country_name',
        'Purchasing Power Index': 'purchasing_power_index',
        'Safety Index': 'safety_index',
        'Health Care Index': 'healthcare_index',
        'Cost of Living Index': 'cost_of_living_index',
        'Property Price to Income Ratio': 'property_price_to_income_ratio',
        'Traffic Commute Time Index': 'traffic_commune_time_index',
        'Pollution Index': 'pollution_index',
        'Climate Index': 'climate_index'
      }
    }
  },
  feature_names: {
    quality_of_life: {
      'rank': 'Rank',
      'qol_index': 'Index',
      'purchasing_power_index': 'Purchasing Power Index',
      'safety_index': 'Safety Index',
      'healthcare_index': 'Health Care Index',
      'cost_of_living_index': 'Cost of Living Index',
      'property_price_to_income_ratio': 'Property Price to Income Ratio',
      'traffic_commune_time_index': 'Traffic Commute Time Index',
      'pollution_index': 'Pollution Index',
      'climate_index': 'Climate Index'
  
    }
  },
  country_name_replacements: {
    'Bosnia And Herzegovina': 'Bosnia & Herzegovina',
    'North Macedonia': 'Macedonia',
    'Hong Kong': 'Hong Kong SAR China'
  }
}

export default NUMBEO_CONFIG;