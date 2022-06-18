from __future__ import annotations

from fractions import Fraction
import json

import pandas as pd

# These are known to appear in the data
multipliers = {
 '1 cup': 1,
 '1 tablespoon': 16,
 '1 table\xadspoon': 16,
 '1 tea\xadspoon': 48,
 '1/2 cup': 2,
 '1/2 tea\xadspoon': 96,
 '1/3 cup': 3,
 '1/4 cup': 4,
 '2 cups': .5,
 '2 tablespoons': 8,
 '2 table\xadspoons': 8,
 '4 cups': .25,
 '8 table\xadspoons (1/2 cup)': 2
}

url = 'https://www.kingarthurbaking.com/learn/ingredient-weight-chart'

def string_to_number(maybe_number: str) -> float:
    """Always convert to float. Sometimes turn ranges into averages"""
    if maybe_number.isnumeric():
        return int(maybe_number)
    top, bottom = maybe_number.split(" to ")
    return (float(top) + float(bottom)) / 2

def normalized_to_cup(measurement: str, grams_in_measurement):
    """Convert everything to grams per cup"""
    return (
        multipliers[measurement] * float(string_to_number(grams_in_measurement))
    )

# Pull in data from chart
from_html = pd.read_html(url)

# pd.read is a list of dataframes
df = from_html[0]

# Filter out large eggs and large cloves of garlic
includes_large = df["Volume"].str.contains("large")
df = df[~includes_large]

# Keep last is based on what I know about the data set
df = df.drop_duplicates(subset="Ingredient", keep='last')

# Normalize the measurements to cups
df["Normalized_Conversion"] = list(map(normalized_to_cup, df.Volume, df.Grams))
df = df.drop(columns=["Volume", "Ounces", "Grams"])

records = df.to_records(index=False)

as_dict = [
    {"value": value, "label": ingredient} for (ingredient,value) in records
]

with open('conversions.json', 'w') as f:
    json.dump(as_dict, f, indent=4)
