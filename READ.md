It is the evaluation from EEme made by Hsueh-Hung Cheng
The objective is to make a heatmap to show the potential saving

## How to run
1. run the server with command
```
python -m SimpleHTTPServer
```

2. open the browser and go to http://localhost:8000

## What I have done
 - Used heatmap.js and leafletjs
 - Randomly generated lat and lng
 - Removed private data (name, addresses, email)
 - Set minimum room level to 13, so users are only allowed to browse the local region
 - Used react.js to generate the table
 - Hosted the demo page on GItHub (people won't see the page unless they have the links)
 - Used input range object to filter data with minimum value
 - Map could be refreshed dynamically
 - Used canvas to draw a bar to indicate the relationship between value and color
