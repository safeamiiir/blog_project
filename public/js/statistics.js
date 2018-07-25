totalStatistics();

function totalStatistics() {
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: '/user/statisticsTotal',
        success: function (result) {
            $('#total-chart-div').show();
            $('#year-chart-div').hide();
            $('#day-chart-div').hide();
            $('#month-chart-div').hide();
            // console.log(result);
            $('#totalLikes').html(result.totalNum.likes);
            $('#totalComments').html(result.totalNum.comments);
            $('#totalVisits').html(result.totalNum.visits);

            var data = [];
            for ( var i = 0; i < result.visits.length; i++){
                data.push({'period' : result.visits[i].visitDate , 'visits' : result.visits[i].count } );
            }
            for ( var i = 0; i < result.visits.length; i++){ //comments Data Adder
                for ( var j = 0; j < result.comments.length; j++){ //comments Data Adder
                    if ( result.comments[j].commentDate === result.visits[i].visitDate ) { //comments Data Adder
                        data[i].comments = result.comments[j].count; //comments Data Adder
                    } //comments Data Adder
                    else{ //comments Data Adder
                        data[i].comments = 0; //comments Data Adder
                    } //comments Data Adder
                } //comments Data Adder
            } //comments Data Adder
            for ( var i = 0; i < result.visits.length; i++){ //Likes Data Adder
                for ( var j = 0; j < result.likes.length; j++){ //Likes Data Adder
                    if ( result.likes[j].likeDate === result.visits[i].visitDate ) { //Likes Data Adder
                        data[i].likes = result.likes[j].count; //Likes Data Adder
                    } //Likes Data Adder
                    else{ //Likes Data Adder
                        data[i].likes = 0; //Likes Data Adder
                    } //Likes Data Adder
                } //Likes Data Adder
            } //Likes Data Adder
            // console.log('data : ',data);
            $("#total-chart").empty();
            Morris.Line({
                element: 'total-chart',
                data: data,
                lineColors: ['#5b9c4c','#fc371e','#fc8710'],
                xkey: 'period',
                ykeys: ['visits', 'likes','comments',],
                labels: ['بازدید ها','پسندیدن ها','نظر ها'],
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
    });
}

function yearStatistics() {
    $.ajax({
        type: 'POST',
        dataType: "json",
        url: '/user/statisticsTotal',
        success: function (result) {


            $('#year-chart-div').show();
            $('#day-chart-div').hide();
            $('#month-chart-div').hide();
            $('#total-chart-div').hide();
            console.log('result : ' , result);
            $('#totalLikes').html(result.totalNum.likes);
            $('#totalComments').html(result.totalNum.comments);
            $('#totalVisits').html(result.totalNum.visits);

            // var result = {
            //     visits: [
            //         {'visitDate' : '2018-01-02', 'count' : 10},
            //         {'visitDate' : '2018-01-02', 'count' : 11},
            //         {'visitDate' : '2017-01-04', 'count' : 12},
            //         {'visitDate' : '2016-01-02', 'count' : 10},
            //     ],
            //     likes: [
            //         {'likeDate' : '2018-01-02', 'count' : 5},
            //         {'likeDate' : '2018-01-02', 'count' : 10},
            //         {'likeDate' : '2017-01-04', 'count' : 15},
            //         {'likeDate' : '2016-01-02', 'count' : 20},
            //     ],
            //     comments: [
            //         {'commentDate' : '2018-01-02', 'count' : 5},
            //         {'commentDate' : '2018-01-02', 'count' : 2},
            //         {'commentDate' : '2017-01-04', 'count' : 3},
            //         {'commentDate' : '2016-01-02', 'count' : 4},
            //     ]
            //     };

            var data = [];
            data.push({
                'year': result.visits[0].visitDate.substr(0,4),
                'visits': result.visits[0].count,
                'likes': 0,
                'comments' : 0
            });
            for ( var i = 0, j = 1; j < result.visits.length ; i++ , j++){
                if ( result.visits[i].visitDate.substr(0,4) !== result.visits[j].visitDate.substr(0,4)){
                    console.log("in iFFF");
                    data.push({
                        'year': result.visits[j].visitDate.substr(0,4),
                        'visits': result.visits[j].count,
                        'likes': 0,
                        'comments' : 0
                    });
                }
                else {
                    data[data.length-1].visits += result.visits[j].count;
                }
            }
            for ( var i = 0; i < data.length; i++ ){
                for ( var j = 0; j < result.likes.length; j++){
                    if ( data[i].year === result.likes[j].likeDate.substr(0,4)){
                        data[i].likes += result.likes[j].count ;
                    }
                }
            }
            for ( var i = 0; i < data.length; i++ ){
                for ( var j = 0; j < result.comments.length; j++){
                    if ( data[i].year === result.comments[j].commentDate.substr(0,4)){
                        data[i].comments += result.comments[j].count ;
                    }
                }
            }
            console.log('data :', data);
                config = {
                    data: data,
                    xkey: 'year',
                    ykeys: ['visits','likes','comments'],
                    labels: ['بازدید ها','پسندیدن ها','نظر ها'],
                    fillOpacity: 0.6,
                    hideHover: 'auto',
                    behaveLikeLine: true,
                    resize: true,
                    pointFillColors:['#ffffff'],
                    pointStrokeColors: ['black'],
                    lineColors:['#5b9c4c','#fc371e','#fc8710'],
                };
            config.element = 'year-chart';
            $("#year-chart").empty();
            Morris.Line(config);
        }
    });
}

function monthStatistics() {
    $('#month-chart-div').show();
    $('#day-chart-div').hide();
    $('#year-chart-div').hide();
    $('#total-chart-div').hide();
    var months = ["فروردین", "اردی بهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
    $("#month-chart").empty();
    Morris.Line({
        element: 'month-chart',
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
        },],
        xkey: 'm',
        ykeys: ['likes', 'comments'],
        labels: ['پسندیدن ها', 'نظرات'],
        xLabelFormat: function (x) { // <--- x.getMonth() returns valid index
            var month = months[x.getMonth()];
            return month;
        },
        dateFormat: function (x) {
            var month = months[new Date(x).getMonth()];
            return month;
        },
    });
}

function dayStatistics() {

    $.ajax({
        type: 'POST',
        dataType: "json",
        url: '/user/statisticsTotal',
        success: function (result) {
            var date = new Date(Date.now());
            var todayDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

            $('#day-chart-div').show();
            $('#total-chart-div').hide();
            $('#year-chart-div').hide();
            $('#month-chart-div').hide();
            // console.log(result);
            $('#totalLikes').html(result.totalNum.likes);
            $('#totalComments').html(result.totalNum.comments);
            $('#totalVisits').html(result.totalNum.visits);

            var data = [];
            if (result.visits[result.visits.length - 1].visitDate === todayDate) {
                data.push({
                    'period': result.visits[result.visits.length - 1].visitDate,
                    'visits': result.visits[result.visits.length - 1].count
                });
            }
            if (result.likes[result.likes.length - 1].likeDate === todayDate) //for likes
                data[0].likes = result.likes[result.likes.length - 1].count; // for likes
            else // for likes
                data[0].likes = 0; // for likes

            if (result.comments[result.comments.length - 1].commentDate === todayDate) // for Comments
                data[0].comments = result.comments[result.comments.length - 1].count; // for comments
            else // for comments
                data[0].comments = 0; // for comments

            // console.log('dataaaaa : ',data);

            $("#day-chart").empty();
            Morris.Line({
                element: 'day-chart',
                data: data,
                lineColors: ['#5b9c4c','#fc371e','#fc8710'],
                xkey: 'period',
                ykeys: ['visits', 'likes', 'comments',],
                labels: ['بازدید ها', 'پسندیدن ها', 'نظر ها'],
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
    });
}
