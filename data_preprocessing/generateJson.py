# Jake Coppinger 2016
# Take raw City of Sydney Travel to Work
# data and output JSON of 2011 absolute numbers
# and percentages for each suburb and mode

import csv
import json

csvInputFilename = "City of Sydney Transport to Work dataset.csv"
jsonOutputFilename = "../source/data/city_of_sydney_transport_data_2011.json"

def remove_empty_from_dict(d):
    if type(d) is dict:
        return dict((k, remove_empty_from_dict(v)) for k, v in d.iteritems() if v and remove_empty_from_dict(v))
    elif type(d) is list:
        return [remove_empty_from_dict(v) for v in d if v and remove_empty_from_dict(v)]
    else:
        return d

def prettyPrint(object):
    print(json.dumps(object, sort_keys=True, indent=4, separators=(',', ': ')))

rows = []
with open(csvInputFilename) as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        rows.append(row)

output = {}
actualData = {}
outputData = {}

csvColumns = ["2011%","2011"]
excludedRows = ["Truck"]

for row in rows:
    cleanRow = remove_empty_from_dict(row)
    area = cleanRow["Area"]
    transportMode = cleanRow["Transport Mode"]

    if (transportMode not in excludedRows):
        if (area in outputData) == False:
            outputData[area] = {}

        outputData[area][transportMode] = {}

        for row in csvColumns:
            outputData[area][transportMode][row] = cleanRow[row]

with open(jsonOutputFilename, "w") as outfile:
    json.dump(outputData, outfile, sort_keys=True, indent=4, separators=(',', ': '))

prettyPrint(outputData)
print("JSON written to " + jsonOutputFilename)
