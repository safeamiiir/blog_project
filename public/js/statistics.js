function yearStatistics() {
    // $('#line2-chart').remove();
    // $('#line3-chart').remove();
    var data = [
            { y: '1397', likes: 80,  comments: 65},
            { y: '1398', likes: 90,  comments: 70},
            { y: '1399', likes: 100, comments: 75},
            { y: '1400', likes: 115, comments: 75},
            { y: '1401', likes: 120, comments: 85},
            { y: '1402', likes: 145, comments: 85},
            { y: '1403', likes: 160, comments: 250}
        ],
        config = {
            data: data,
            xkey: 'y',
            ykeys: ['likes', 'comments'],
            labels: ['پسندیدن ها', 'نظرات'],
            fillOpacity: 0.6,
            hideHover: 'auto',
            behaveLikeLine: true,
            resize: true,
            pointFillColors:['#ffffff'],
            pointStrokeColors: ['black'],
            lineColors:['green','red']
        };

    config.element = 'line1-chart';
    Morris.Line(config);
}

function monthStatistics() {
    // $('#line1-chart').remove();
    // $('#line3-chart').remove();
    var months = ["فروردین", "اردی بهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];

Morris.Line({
    element: 'line2-chart',
    data: [{
        m: '2015-01', // <-- valid timestamp strings
        likes: 0,
        comments: 270
    }, {
        m: '2015-02',
        likes: 54,
        comments: 256
    }, {
        m: '2015-03',
        likes: 243,
        comments: 334
    }, {
        m: '2015-04',
        likes: 206,
        comments: 282
    }, {
        m: '2015-05',
        likes: 161,
        comments: 58
    }, {
        m: '2015-06',
        likes: 187,
        comments: 0
    }, {
        m: '2015-07',
        likes: 210,
        comments: 0
    }, {
        m: '2015-08',
        likes: 204,
        comments: 0
    }, {
        m: '2015-09',
        likes: 224,
        comments: 0
    }, {
        m: '2015-10',
        likes: 301,
        comments: 0
    }, {
        m: '2015-11',
        likes: 262,
        comments: 0
    }, {
        m: '2015-12',
        likes: 199,
        comments: 0
    }, ],
    xkey: 'm',
    ykeys: ['likes', 'comments'],
    labels: ['پسندیدن ها', 'نظرات'],
    xLabelFormat: function(x) { // <--- x.getMonth() returns valid index
        var month = months[x.getMonth()];
        return month;
    },
    dateFormat: function(x) {
        var month = months[new Date(x).getMonth()];
        return month;
    },
});

}

function dayStatistics() {
    // $('#line1-chart').remove();
    // $('#line2-chart').remove();
    Morris.Line({
        element: 'line3-chart',
        data: [
            { period: '2016-05-10', likes: 200, comments: 200 },
            { period: '2016-05-11', likes: 15, comments: 275 },
            { period: '2016-05-12', likes: 80, comments: 20 },
            { period: '2016-05-13', likes: 100, comments: 200},
            { period: '2016-05-14', likes: 50, comments: 60 },
            { period: '2016-05-15', likes: 75, comments: 65 },
            { period: '2016-05-16', likes: 175, comments:95 },
            { period: '2016-05-17', likes: 150, comments:95 },
            { period: '2016-05-18', likes: 120, comments:95 },
            { period: '2016-05-19', likes: 60, comments:95 },
            { period: '2016-05-20', likes: 10, comments:95 }
        ],
        lineColors: ['#819C79', '#fc8710'],
        xkey: 'period',
        ykeys: ['likes','comments'],
        labels: ['پسندیدن ها', 'نظرات'],
        xLabels: 'day',
        xLabelAngle: 45,
        xLabelFormat: function (d) {
            var weekdays = new Array(7);
            weekdays[0] = "SUN";
            weekdays[1] = "MON";
            weekdays[2] = "TUE";
            weekdays[3] = "WED";
            weekdays[4] = "THU";
            weekdays[5] = "FRI";
            weekdays[6] = "SAT";

            return weekdays[d.getDay()] + '-' +
                ("0" + (d.getMonth() + 1)).slice(-2) + '-' +
                ("0" + (d.getDate())).slice(-2);
        },
        resize: true
    });
}