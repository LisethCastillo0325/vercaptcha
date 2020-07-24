<?php
class Http {

    /**
     * Enviar formulario con petición HTTP POST
     * en PHP
     * @author parzibyte
     * https://parzibyte.me/blog
     */
    public static function httpPost($url, $datos, $method="POST"){
        // Crear opciones de la petición HTTP
        $opciones = array(
            "http" => array(
                "header" => "Content-type: application/x-www-form-urlencoded\r\n",
                "method" => $method,
                "content" => http_build_query($datos), # Agregar el contenido definido antes
            ),
        );
        // Preparar petición
        $contexto = stream_context_create($opciones);
        // Hacerla
        $resultado = file_get_contents($url, false, $contexto);
        if ($resultado === false) {
            return null;
        }
        return json_decode($resultado, true);
    }

}

?>