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
}

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
        for(var key in data['journals']){
            journals[key]['count'] = data['journals'][key];
        };
    var i = 0;
    var sum = 0;
        for(var key in journals) {
            jQuery('#s3-collections-count').append('<tr class="row-2 '+ evenOdd(i) +'"><td class="column-1">'+journals[key]['full_name']+'</td><td class="column-2">'+journals[key]['publisher']+'</td><td class="column-3">'+formatMoney(journals[key]['count'],0,',',' ')+'</td></tr>');
            i = i + 1;
        };
    jQuery('#s3-collections-count').append('<tr class="row-2 '+  evenOdd(i) +'"><td class="column-1"><b>Total</b></td><td class="column-2"></td><td class="column-3"><b>'+formatMoney(data['other']['all'],0,',',' ')+'</b></td></tr>');
        jQuery('#s3-count-loader').hide();
    });
};

function getRepoStatus(zero_value_filler){
    jQuery.getJSON( "https://repo.scoap3.org/tools.py/get_collections_count?callback=?", function( data ) {
        var date = new Date();
        var month = date.getMonth()+1;
        if (month < 10){
            month = "0"+month;
        };
        var day = date.getDate();
        if (day < 10){
            day = "0"+day;
        };
        var today = date.getFullYear() + "-" + month + "-" + day;
        var today_url = "<a href='http://repo.scoap3.org/search?p=datecreated:" + today + "'><strong>" + formatMoney(data['other']['today'],0,',',' ') + "</strong></a>"
        var this_year_url = "<a href='http://repo.scoap3.org/search?p=year:" + date.getFullYear() + "'><strong>" + formatMoney(data['other']['this_year'],0,',',' ') + "</strong></a>"
        var all = "<a href='http://repo.scoap3.org/search'><strong>" + formatMoney(data['other']['all'],0,',',' ') + "</strong></a>"

        jQuery('#scoap3_repo_status').append("Today: " + today_url +
                                             "&nbsp;&nbsp;&nbsp;&nbsp;This year: "+ this_year_url +
                                             "&nbsp;&nbsp;&nbsp;&nbsp;Since 2014: "+ all);
    });
}
