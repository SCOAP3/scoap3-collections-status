<?php
/**
 * @package SCOAP3 Status
 * @version 0.7.1
 */
/*
Plugin Name: SCOAP3 Status
Plugin URI: http://github.com/scoap3/scoap3-collections-status
Description: Adds a short code to display a dynamically updated table showing current articles count for different SCOAP3 collections
Author: CERN
Version: 0.7.1
*/
wp_register_script('s3-coll-status', plugins_url('s3-coll-status.js', __FILE__ ), array('jquery'), NULL, false);
wp_enqueue_script('s3-coll-status');


function create_collections_table() {
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

function create_repo_status($atts) {
    $attributes = shortcode_atts( array(
        'zero_value_filler' => '-'
    ), $atts );
    $text = '<div class="scoap3_repo_cell" id="scoap3_header_out">Articles funded by SCOAP<sup>3</sup>:</div>
          <div class="scoap3_repo_table">
                    <div class="scoap3_repo_row">
                        <div class="scoap3_repo_cell" id="scoap3_header_in">Articles funded by SCOAP<sup>3</sup>:</div>
                        <div class="scoap3_repo_cell value">
                <span id="scoap3_repo_status_today">'. $attributes['zero_value_filler'] .'</span>
                <span class="description">today</span>
            </div>
                        <div class="scoap3_repo_cell value">
                <span id="scoap3_repo_status_last_30_days">'. $attributes['zero_value_filler'] .'</span>
                <span class="description">last 30 days</span>
            </div>
                        <div class="scoap3_repo_cell value">
                <span id="scoap3_repo_status_this_year">'. $attributes['zero_value_filler'] .'</span>
                <span class="description">in 2016</span>
            </div>
                        <div class="scoap3_repo_cell value">
                <span id="scoap3_repo_status_all">'. $attributes['zero_value_filler'] .'</span>
                <span class="description">since '. date("Y") .'</span>
            </div>
                    </div>
                </div>';
    $text .= '<script type="text/javascript"><!--//--><![CDATA[//><!--
                getRepoStatus("'.$attributes['zero_value_filler'].'");
                //--><!]]></script>';
    return $text;
}

function create_collection_count($atts) {
    $attributes = shortcode_atts( array(
        'name' => 'Acta'
    ), $atts );
    $text = '<span class="scoap3_collection_count_'.str_replace(' ','_',$attributes['name']).'">-</span>';
    $text .= '<script type="text/javascript"><!--//--><![CDATA[//><!--
                getCollectionCount("'.$attributes['name'].'");
                //--><!]]></script>';
    return $text;
}

wp_register_style('s3-status-style', plugins_url('s3-status.css', __FILE__ ));
wp_enqueue_style('s3-status-style');

add_shortcode( 'scoap3-collections-status', 'create_collections_table' );
add_shortcode( 'scoap3-repository-status', 'create_repo_status' );
add_shortcode( 'scoap3-collection-count', 'create_collection_count' );
