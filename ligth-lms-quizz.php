<?php
/*
Plugin Name: Light LMS Quizz
Description: Gutenberg blocks for lightning fast answers to interactive questions
Version:     1.0.0
Author:      Pieter Hoekstra
Text Domain: light-lms-quizz
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

defined( 'ABSPATH' ) or die( 'Nope, not accessing this' );

class LightLMS{

    public function __construct(){

        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_scripts'));
        add_action('admin_enqueue_scripts', array($this,'enqueue_admin_scripts')); //admin script

        add_action( 'plugins_loaded', array($this, 'lightLMS_blocks_loader') );

        register_activation_hook(__FILE__, array($this,'plugin_activate')); //activate hook
        register_deactivation_hook(__FILE__, array($this,'plugin_deactivate')); //deactivate hook

    }

    public function plugin_activate(){  

        //flush permalinks
        flush_rewrite_rules();
    }

    public function plugin_deactivate(){
        //flush permalinks
        flush_rewrite_rules();
    }

    public function lightLMS_blocks_loader(){
        add_filter( 'block_categories_all', array($this, 'lightlms_blocks_add_custom_block_category') );
        load_plugin_textdomain( 'light-lms-quizz', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
    }

    public function enqueue_frontend_scripts(){
        wp_enqueue_script( 'light_lms_js_frontend', plugin_dir_url( __FILE__ ) . '/js/evaluate_questions.js', ['jquery', 'wp-i18n'] );
        wp_set_script_translations( 'light_lms_js_frontend', 'light-lms-quizz' );

        wp_enqueue_style( 'frontend_css', plugin_dir_url( __FILE__ ) . '/css/frontend.css', false, '1.0.0' );
    }

    public function enqueue_admin_scripts( $pageHook ){

        wp_enqueue_style( 'admin_css_bar', plugin_dir_url( __FILE__ ) . '/css/light-lms-quizz.css', false, '1.0.0' );


        // Required thing to build Gutenberg Blocks
        $required_js_files = array(
            'wp-blocks',
            'wp-i18n',
            'wp-element',
            'wp-editor'
        );

        if( $pageHook == 'post.php'){

            wp_enqueue_script( 'light_lms_js', plugin_dir_url( __FILE__ ) . '/blocks/register_blocks.js', $required_js_files );

            wp_set_script_translations( 'light_lms_js', 'light-lms-quizz' );

        }

    }

    function my_custom_gutenberg_block_gutenberg_modify_jsx_tag( $tag, $handle, $src ) {

        // Convert our custom block file to be recognized as a JSX file
        if ( 'light_lms_js' == $handle ) {
            $tag = str_replace( "<script", "<script type='text/babel'", $tag );
        }
    
        return $tag;
    }

    /**
     * Adds the LightLMS blocks block category.
     *
     * @param array $categories Existing block categories.
     *
     * @return array Updated block categories.
     */
    public function lightlms_blocks_add_custom_block_category( $categories ) {
        
        return array_merge(
            $categories,
            array(
                array(
                    'slug'  => 'light-lms-quizz',
                    'title' => __('Q & A', 'light-lms-quizz')
                ),
            )
        );
    }
}

new LightLMS;

?>