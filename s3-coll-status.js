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

function getCollectionsCount(){
    jQuery.getJSON( "https://repo.scoap3.org/tools.py/get_collections_count?callback=?", function( data ) {
        for(var key in data){
            journals[key]['count'] = data[key];
        };
    var i = 0;
    var sum = 0;
        for(var key in journals) {
            jQuery('#s3-collections-count').append('<tr class="row-2 '+ evenOdd(i) +'"><td class="column-1">'+journals[key]['full_name']+'</td><td class="column-2">'+journals[key]['publisher']+'</td><td class="column-3">'+journals[key]['count']+'</td></tr>');
            i = i + 1;
        sum = sum + journals[key]['count'];
        };
    jQuery('#s3-collections-count').append('<tr class="row-2 '+  evenOdd(i) +'"><td class="column-1"><b>Total</b></td><td class="column-2"></td><td class="column-3"><b>'+sum+'</b></td></tr>');
        jQuery('#s3-count-loader').hide();
    });
};
