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
    },
    crime: {
      path: '/crime/rankings_by_country.jsp',
      suffixes: {
        'Rank': 'rank',
        'Country': 'country_name',
        'Crime Index': 'crime_index',
        'Safety Index': 'safety_index'
      }
    },
    healthcare: {
      path: '/health-care/rankings_by_country.jsp',
      suffixes: {
        'Rank': 'rank',
        'Country': 'country_name',
        'Health Care Index': 'healthcare_index',
        'Health CareExp. Index': 'healthcare_index_exp'
      }
    },
    pollution: {
      path: '/pollution/rankings_by_country.jsp',
      suffixes: {
        'Rank': 'rank',
        'Country': 'country_name',
        'Pollution Index': 'pollution_index',
        'Exp Pollution Index': 'pollution_index_exp'
      }
    },
    traffic: {
      path: '/traffic/rankings_by_country.jsp',
      suffixes: {
        'Rank': 'rank',
        'Country': 'country_name',
        'Traffic Index': 'traffic_index',
        'Time Index(in minutes)': 'time_index_minutes',
        'Time Exp. Index': 'time_index_exp',
        'Inefficiency Index': 'inefficiency_index',
        'CO2 Emission Index': 'co2_emission_index'
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
    },
    crime: {
      'rank': 'Rank',
      'crime_index': 'Crime Index',
      'safety_index': 'Safety Index'
    },
    healthcare: {
      'rank': 'Rank',
      'healthcare_index': 'Health Care Index',
      'healthcare_index_exp': 'Health Care Index Exponential'
    },
    pollution: {
      'rank': 'Rank',
      'pollution_index': 'Pollution Index',
      'pollution_index_exp': 'Exp Pollution Index'
    },
    traffic: {
      'rank': 'Rank',
      'traffic_index': 'Traffic Index',
      'time_index_minutes': 'Commuting Time Index (in minutes)',
      'time_index_exp': 'Time Exp. Index',
      'inefficiency_index': 'Inefficiency Index',
      'co2_emission_index': 'CO2 Emission Index'
    }
  },
  country_name_replacements: {
    'Bosnia And Herzegovina': 'Bosnia & Herzegovina',
    'North Macedonia': 'Macedonia',
    'Hong Kong': 'Hong Kong SAR China',
    'Trinidad And Tobago': 'Trinidad & Tobago',
    'Myanmar': 'Myanmar (Burma)',
    'Palestine': 'Palestinian Territories',
    'Kosovo (Disputed Territory)': 'Kosovo',
    'Isle Of Man': 'Isle of Man'
  }
}

export default NUMBEO_CONFIG;