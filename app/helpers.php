<?php
/**
 * Converts a string into a slug
 * @param  string $str
 * @return string
 */
function convertToSlug($str) {
    $str = strtolower(trim($str));
    $str = preg_replace('/[^a-z0-9-]/', '-', $str);
    $str = preg_replace('/-+/', "-", $str);
    return rtrim($str, '-');
}
