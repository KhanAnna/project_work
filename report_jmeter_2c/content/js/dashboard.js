/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 99.82344988831026, "KoPercent": 0.17655011168973667};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9916382243810065, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9973322088450185, 500, 1500, "HTTP Request (Видалити героя)"], "isController": false}, {"data": [0.9944710715508388, 500, 1500, "HTTP Request (Отримати героя за id)"], "isController": false}, {"data": [0.997156943585515, 500, 1500, "HTTP Request (Змінити героя)"], "isController": false}, {"data": [0.9723412298387096, 500, 1500, "HTTP Request (Отриати всіх героїв)"], "isController": false}, {"data": [0.9973155628741488, 500, 1500, "HTTP Request (Створити героя)"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 585103, 1033, 0.17655011168973667, 636.6495061553288, 0, 183076, 183.0, 220.0, 63001.0, 63037.0, 2315.29567254424, 28973.625006553906, 427.26502123711975], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["HTTP Request (Видалити героя)", 116201, 6, 0.005163466751577009, 226.42761249902864, 1, 183074, 159.0, 186.0, 195.0, 229.0, 477.4114824279575, 136.6586511919264, 85.78044627523644], "isController": false}, {"data": ["HTTP Request (Отримати героя за id)", 116840, 4, 0.003423485107839781, 306.7640106128003, 0, 183071, 159.0, 187.0, 197.0, 336.950000000008, 479.89879573496313, 125.63594407170552, 74.51298463761152], "isController": false}, {"data": ["HTTP Request (Змінити героя)", 116424, 5, 0.004294647151790009, 232.7272641379794, 1, 127005, 160.0, 187.0, 196.0, 238.0, 621.7603298281967, 165.21581995264327, 136.61139274275163], "isController": false}, {"data": ["HTTP Request (Отриати всіх героїв)", 119040, 1013, 0.8509744623655914, 2154.668943212343, 1, 183019, 163.0, 195.90000000000146, 52442.850000000006, 63014.990000000005, 471.0500490677135, 28473.691132964603, 72.06304910580027], "isController": false}, {"data": ["HTTP Request (Створити героя)", 116598, 5, 0.004288238220209609, 229.55182764712765, 0, 183076, 159.0, 186.0, 195.0, 237.0, 478.9067922962866, 129.59463737642062, 103.353381342492], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 1033, 100.0, 0.17655011168973667], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 585103, 1033, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 1033, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["HTTP Request (Видалити героя)", 116201, 6, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 6, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["HTTP Request (Отримати героя за id)", 116840, 4, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 4, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["HTTP Request (Змінити героя)", 116424, 5, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 5, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["HTTP Request (Отриати всіх героїв)", 119040, 1013, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 1013, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["HTTP Request (Створити героя)", 116598, 5, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 5, "", "", "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
