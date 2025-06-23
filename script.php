<?php
    $json = file_get_contents("./country.json");
    $json = json_decode($json);

    foreach($json as $country){
        $img_address = $country->flags->svg;
        $file_name = explode("/", $img_address);
        $file_name = end($file_name);

        echo "Downloading => " . $file_name . "\n";

        $fileContents = file_get_contents($img_address);

        if ($fileContents !== false) {
            file_put_contents("./Pic/" . $file_name , $fileContents);
        }
    }