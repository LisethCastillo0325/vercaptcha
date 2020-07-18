<?php
class Utils{

    

    static function getUrlOrigin($s, $use_forwarded_host=false) {
        $ssl = ( ! empty($s['HTTPS']) && $s['HTTPS'] == 'on' ) ? true:false;
        $sp = strtolower( $s['SERVER_PROTOCOL'] );
        $protocol = substr( $sp, 0, strpos( $sp, '/'  )) . ( ( $ssl ) ? 's' : '' );
      
        $port = $s['SERVER_PORT'];
        $port = ( ( ! $ssl && $port == '80' ) || ( $ssl && $port=='443' ) ) ? '' : ':' . $port;
        
        $host = ( $use_forwarded_host && isset( $s['HTTP_X_FORWARDED_HOST'] ) ) ? $s['HTTP_X_FORWARDED_HOST'] : ( isset( $s['HTTP_HOST'] ) ? $s['HTTP_HOST'] : null );
        $host = isset( $host ) ? $host : $s['SERVER_NAME'] . $port;
      
        return $protocol . '://' . $host;
    }
    
    static function getFullUrl($s, $use_forwarded_host=false ) {
        $urlScript = explode("index.php", $s['SCRIPT_NAME']);
        $uri = str_replace(constant('PROJECT_NAME'), constant('PROJECT_NAME_API'), $urlScript[0]);
        return self::getUrlOrigin($s, $use_forwarded_host ).$uri;
    }

}


?>