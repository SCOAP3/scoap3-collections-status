<?php
/**
 * @package SCOAP3_Collections_Status
 * @version 0.5
 */
/*
Plugin Name: SCOAP3 Collections Status
Plugin URI: http://github.com/scoap3/scoap3-collections-status
Description: Adds a short code to display a dynamically updated table showing current articles count for different SCOAP3 collections
Author: CERN
Version: 0.5
*/

function create_collections_table() {
    global $journals;
    $table = '<p>Last update on: ' . date("d/m/Y") . '</p>
              <table id="tablepress-10" class="tablepress tablepress-id-10">
                <thead>
                    <tr class="row-1 odd">
                        <th class="column-1">Journal Name</th><th class="column-2">Publisher</th><th class="column-3">Number of articles</th>
                    </tr>
                </thead>
                <tbody id="s3-collections-count" class="row-hover">
                    <tr id="s3-count-loader" class="row-2"><td class="column-1"></td><td class="column-2"><img src="'.plugins_url('default.svg', __FILE__ ).'"></td><td class="column-3"></td></tr>
                </tbody></table>';
    $table .= '<script type="text/javascript"><!--//--><![CDATA[//><!--
                getCollectionsCount();
                //--><!]]></script>';
    return $table;
}

wp_register_script('s3-coll-status', plugins_url('s3-coll-status.js', __FILE__ ), array('jquery'), NULL, false);
wp_enqueue_script('s3-coll-status');

add_shortcode( 'scoap3-collections-status', 'create_collections_table' );
