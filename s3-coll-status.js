var journals = {
    "Acta": {
        "full_name":"Acta Physics Polonica B",
        "publisher":"Jagiellonian University",
    "count":0
    },
    "Advances in High Energy Physics":{
        "full_name":"Advances in High Energy Physics",
        "publisher":"Hindawi",
    "count":0
    },
   "Chinese Physics C": {
        "full_name":"Chinese Physics C",
        "publisher":"IOP Publishing / Chinese Academy of Sciences",
    "count":0
    },
   "European Physical Journal C": {
        "full_name":"European Physical Journal C",
        "publisher":"Springer / Società Italiana di Fisica",
    "count":0
    },
   "Journal of Cosmology and Astroparticle Physics": {
        "full_name":"Journal of Cosmology and Astroparticle Physics",
        "publisher":"IOP Publishing / SISSA",
    "count":0
    },
   "Journal of High Energy Physics": {
        "full_name":"Journal of High Energy Physics",
        "publisher":"Springer / SISSA",
    "count":0
    },
   "New Journal of Physics": {
        "full_name":"New Journal of Physics",
        "publisher":"IOP Publishing / Deutsche Physikalische Gesellschaft",
    "count":0
    },
   "Nuclear Physics B": {
        "full_name":"Nuclear Physics B",
        "publisher":"Elsevier",
    "count":0
    },
   "Physics Letters B": {
        "full_name":"Physics Letters B",
        "publisher":"Elsevier",
    "count":0
    },
   "Progress of Theoretical and Experimental Physics": {
        "full_name":"Progress of Theoretical and Experimental Physics",
        "publisher":"Oxford University Press / Japanese Physical Society",
    "count":0
    }
};

function evenOdd(i){
    return (i % 2 == 0) ? 'even' : 'odd';
};

function formatMoney(n, c, d, t){
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

function getCollectionsCount(){
    jQuery.getJSON( "https://repo.scoap3.org/tools.py/get_collections_count?callback=?", function( data ) {
        var scoap3_collection_status = data;
        for(var key in scoap3_collection_status['journals']){
            journals[key]['count'] = scoap3_collection_status['journals'][key];
        };
        var i = 0;
        var sum = 0;
            for(var key in journals) {
                jQuery('#s3-collections-count').append('<tr class="row-2 '+ evenOdd(i) +'"><td class="column-1">'+journals[key]['full_name']+'</td><td class="column-2">'+journals[key]['publisher']+'</td><td class="column-3">'+formatMoney(journals[key]['count'],0,',',' ')+'</td></tr>');
                i = i + 1;
            };
        jQuery('#s3-collections-count').append('<tr class="row-2 '+  evenOdd(i) +'"><td class="column-1"><b>Total</b></td><td class="column-2"></td><td class="column-3"><b>'+formatMoney(scoap3_collection_status['other']['all'],0,',',' ')+'</b></td></tr>');
        jQuery('#s3-count-loader').hide();
    });
};

function getDateString(date){
    var month = date.getMonth()+1;
    if (month < 10){
        month = "0"+month;
    };
    var day = date.getDate();
    if (day < 10){
        day = "0"+day;
    };
    return date.getFullYear() + "-" + month + "-" + day;
};

function getRepoStatus(zero_value_filler){
    jQuery.getJSON( "https://repo.scoap3.org/tools.py/get_collections_count?callback=?", function( data ) {
        var scoap3_collection_status = data;
        var date = new Date();

        var date_yesterday = new Date();
        date_yesterday.setDate(date.getDate() - 1);
        yesterday = getDateString(date_yesterday);

        var date_minus_30 = new Date();
        date_minus_30.setDate(date.getDate() - 30);
        minus_30 = getDateString(date_minus_30);

        var yesterday_url = "<a href='http://repo.scoap3.org/search?p=datecreated:" + yesterday + "'>" + formatMoney(scoap3_collection_status['other']['yesterday'],0,',',' ') + "</a>"
        var last_30_days_url = "<a href='http://repo.scoap3.org/search?p=datecreated:" + minus_30 + "->" + yesterday + "'>" + formatMoney(scoap3_collection_status['other']['last_30_days'],0,',',' ') + "</a>"
        var this_year_url = "<a href='http://repo.scoap3.org/search?p=year:" + date.getFullYear() + "'>" + formatMoney(scoap3_collection_status['other']['this_year'],0,',',' ') + "</a>"
        var all = "<a href='http://repo.scoap3.org/search'>" + formatMoney(scoap3_collection_status['other']['all'],0,',',' ') + "</a>"

        jQuery('#scoap3_repo_status_yesterday').html(yesterday_url);
        jQuery('#scoap3_repo_status_last_30_days').html(last_30_days_url);
        jQuery('#scoap3_repo_status_this_year').html(this_year_url);
        jQuery('#scoap3_repo_status_all').html(all);
    });
}

function getCollectionCount(name){
    jQuery.getJSON( "https://repo.scoap3.org/tools.py/get_collections_count?callback=?", function( data ) {
        var scoap3_collection_status = data;
        jQuery('.scoap3_collection_count_' + name.replace(/ /g,'_')).html(scoap3_collection_status['journals'][name]);
    });
}
